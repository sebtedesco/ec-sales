require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "productId",
           "name",
           "price",
           "image",
           "shortDescription"
    from "products"`;
  db.query(sql)
    .then(result => {
      if (!result) {
        res.status(404).json({
          error: 'Cannot find products'
        });
        return;
      }
      const products = result.rows;
      res.status(200).json(products);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId);
  if (isNaN(productId) || productId < 0) {
    res.status(400).json({
      error: 'Please enter a positive integer'
    });
    return;
  }
  const sql = `
    select *
    from "products"
   WHERE "productId" = $1`;
  const value = [productId];
  db.query(sql, value)
    .then(result => {
      const product = result.rows[0];
      if (!result.rows[0]) {
        res.status(404).json({
          error: 'No product found'
        });
        return;
      }
      res.status(200).json(product);
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    // console.log(req.session.cartId)
    res.json([]);
    return;
  }
  const sql = `
    select "c"."cartItemId",
      "c"."price",
      "p"."productId",
      "p"."image",
      "p"."name",
      "p"."shortDescription"
    from "cartItems" as "c"
    JOIN "products" as "p" using("productId")
    WHERE "c"."cartId" = $1`;
  const value = [req.session.cartId];
  db.query(sql, value)
    .then(cartItems => {
      const cartItemsResult = cartItems.rows;
      res.status(200).json(cartItemsResult);
    })
    .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId);
  if (!productId) {
    res.status(400).json({
      error: 'Please enter a productId number'
    });
    return;
  }
  const sqlPrice = `
  select "price"
    from "products"
   WHERE "productId" = $1`;
  const value = [productId];
  db.query(sqlPrice, value)
    .then(priceResult => {
      if (!priceResult.rows.length) {
        throw new ClientError('No product with this productId exists', 400);
      }
      if (req.session.cartId) {
        return {
          cartId: req.session.cartId,
          price: priceResult.rows[0].price
        };
      } else {
        const sqlNewCart = `
        insert into "carts" ("cartId", "createdAt")
        values  (default, default)
        returning "cartId"`;
        return db.query(sqlNewCart)
          .then(cartResult => {
            return {
              cartId: cartResult.rows[0].cartId,
              price: priceResult.rows[0].price
            };
          });
      }
    })
    .then(cartIdResult => {
      // console.log('1', cartIdResult);
      // console.log('cartId', cartIdResult.cartId)
      req.session.cartId = cartIdResult.cartId;
      // conditional for if multiple of same item - changing quantity instead of adding additional row
      const sqlcartItemsWithSameProductId = `
      SELECT "cartItemId"
      FROM "cartItems"
      WHERE "cartId" = $1 and "productId" = $2`;
      const value = [cartIdResult.cartId, productId];
      return db.query(sqlcartItemsWithSameProductId, value)
        .then(existingCartItemResult => {
          // console.log('cartIdresult:', cartIdResult.cartId)
          // console.log('2', existingCartItemResult.rows)
          if (existingCartItemResult.rows.length === 0) {
            // eslint-disable-next-line no-console
            console.log('result:', existingCartItemResult)
            // console.log('cartId:', existingCartItemResult.cartId)
            // console.log('productId:', productId)
            // console.log('price:', existingCartItemResult.price)
            ;
            const newCartItemRow = `
            insert into "cartItems" ("cartId", "productId", "price", "quantity")
            values ($1, $2, $3, $4)
            returning "cartItemId"`;
            const values = [cartIdResult.cartId, productId, cartIdResult.price, 1];
            return db.query(newCartItemRow, values);
          } else {
            // eslint-disable-next-line no-console
            console.log('yes previous', existingCartItemResult.rows);
            const quantityUpdate = `
            UPDATE "cartItems"
            SET "quantity" = "quantity" + 1
            WHERE "cartId" = $1 and "productId" = $2
            returning "cartItemId"`;
            const value = [cartIdResult.cartId, productId];
            return db.query(quantityUpdate, value);
          }
        })
        .then(newCartItemResult => {
          // console.log('result', newCartItemResult)
          const cartItemInfo = `
          SELECT "c"."cartItemId",
          "c"."price",
          "c"."quantity",
          "p"."productId",
          "p"."image",
          "p"."name",
          "p"."shortDescription"
          FROM "cartItems" as "c"
          JOIN "products" as "p" using ("productId")
          WHERE "c"."cartItemId" = $1`;
          const value = [newCartItemResult.rows[0].cartItemId];
          return db.query(cartItemInfo, value);
        });
    })
  // END OF Conditional!
    .then(finalResult => {
      // console.log('finalResult:', finalResult)
      res.status(200).json(finalResult.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  // console.log('req.body: ', req.body);
  const cartId = req.session.cartId;
  const name = req.body.fName;
  const creditCardNumber = req.body.creditCardNumber;
  const address = req.body.street;
  if (!cartId) {
    throw new ClientError('No cartId in this request. cartId required.', 400);
  } else if (!name || !creditCardNumber || !address) {
    throw new ClientError('Name, credit card, and shipping address are required. One or more are missing.', 400);
  }
  const sqlCheckoutInfo = `
    INSERT into "orders" ("cartId", "fName", "lName", "street", "city", "state", "zip", "fullName", "creditCardNumber", "expiration", "cvv")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    returning *`;
  const values = [cartId, name, req.body.lName, address, req.body.city, req.body.state, req.body.zip, req.body.fullName, creditCardNumber, req.body.expiration, req.body.cvv];
  // console.log(values);
  db.query(sqlCheckoutInfo, values)
    .then(response => {
      delete req.session.cartId;
      res.status(201).json(response.rows[0]);
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});

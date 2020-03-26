--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "fName" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP SEQUENCE public."orders_fName_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL,
    "fName" text NOT NULL,
    "lName" text NOT NULL,
    street text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    zip integer NOT NULL,
    "fullName" text NOT NULL,
    "creditCardNumber" text NOT NULL,
    expiration text NOT NULL,
    cvv integer NOT NULL
);


--
-- Name: orders_fName_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_fName_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_fName_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_fName_seq" OWNED BY public.orders."fName";


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    details text NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: orders fName; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "fName" SET DEFAULT nextval('public."orders_fName_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
8	55	2	2595
9	56	2	2595
10	58	2	2595
11	59	2	2595
12	60	2	2595
13	61	2	2595
14	62	2	2595
15	63	2	2595
16	64	2	2595
17	65	2	2595
18	66	2	2595
19	67	2	2595
20	68	2	2595
21	69	2	2595
22	70	2	2595
23	71	2	2595
24	72	2	2595
25	78	3	2900
26	79	3	2900
27	80	3	2900
28	81	3	2900
29	82	3	2900
30	83	3	2900
31	83	3	2900
32	83	3	2900
33	83	3	2900
34	84	1	2999
35	84	2	2595
36	84	1	2999
37	84	1	2999
38	84	1	2999
39	84	2	2595
40	84	2	2595
41	84	1	2999
42	84	2	2595
43	84	2	2595
44	84	2	2595
45	84	1	2999
46	84	1	2999
47	84	1	2999
48	84	3	2900
49	84	4	999
50	84	3	2900
51	84	1	2999
52	84	2	2595
53	84	1	2999
54	84	1	2999
55	84	1	2999
56	84	4	999
57	84	2	2595
58	84	3	2900
59	84	6	830
60	84	1	2999
61	84	1	2999
62	84	4	999
63	84	3	2900
64	84	3	2900
65	84	1	2999
66	84	2	2595
67	84	1	2999
68	84	2	2595
69	84	2	2595
70	84	1	2999
71	84	5	9900
72	84	1	2999
73	84	3	2900
74	85	3	2900
75	85	1	2999
76	86	2	2595
77	86	2	2595
78	86	2	2595
79	86	2	2595
80	86	2	2595
81	86	2	2595
82	87	2	2595
83	88	1	2999
84	88	3	2900
85	88	2	2595
86	88	1	2999
87	88	5	9900
88	89	2	2595
89	89	3	2900
90	89	1	2999
91	89	2	2595
92	89	1	2999
93	89	1	2999
94	89	2	2595
95	89	3	2900
96	89	2	2595
97	90	3	2900
98	90	2	2595
99	90	3	2900
100	90	1	2999
101	90	1	2999
102	91	1	2999
103	91	1	2999
104	91	5	9900
105	91	3	2900
106	91	1	2999
107	92	6	830
108	92	2	2595
109	92	3	2900
110	92	6	830
111	92	4	999
112	92	5	9900
113	92	2	2595
114	93	3	2900
115	93	2	2595
116	93	3	2900
117	93	3	2900
118	94	2	2595
119	95	3	2900
120	96	3	2900
121	97	2	2595
122	98	3	2900
123	99	2	2595
124	100	3	2900
125	101	2	2595
126	102	3	2900
127	103	5	9900
128	104	1	2999
129	105	3	2900
130	106	3	2900
131	107	3	2900
132	108	2	2595
133	109	3	2900
134	110	2	2595
135	111	3	2900
136	111	6	830
137	112	2	2595
138	113	3	2900
139	114	2	2595
140	114	2	2595
141	114	2	2595
142	114	2	2595
143	115	1	2999
144	115	3	2900
145	116	2	2595
146	116	3	2900
147	116	3	2900
148	117	3	2900
149	117	2	2595
150	118	3	2900
151	118	2	2595
152	119	2	2595
153	120	2	2595
154	121	1	2999
155	122	1	2999
156	122	2	2595
157	122	2	2595
158	122	2	2595
159	122	1	2999
160	122	3	2900
161	122	2	2595
162	123	3	2900
163	123	2	2595
164	123	3	2900
165	123	2	2595
166	124	1	2999
167	125	2	2595
168	125	3	2900
169	126	2	2595
170	127	2	2595
171	127	1	2999
172	127	1	2999
173	128	1	2999
174	129	1	2999
175	129	3	2900
176	130	3	2900
177	131	3	2900
178	132	2	2595
179	133	2	2595
180	134	3	2900
181	135	2	2595
182	136	3	2900
183	137	2	2595
184	138	2	1999
185	139	1	1499
186	139	2	1999
187	140	7	3999
188	141	1	1499
189	141	2	1999
190	141	3	300000
191	141	2	1999
192	142	2	1999
193	142	1	1499
194	142	2	1999
195	143	3	300000
196	143	2	1999
197	143	3	300000
198	143	2	1999
199	144	3	300000
200	144	1	1499
201	144	2	1999
202	144	2	1999
203	144	3	300000
204	144	1	1499
205	145	2	1999
206	145	2	1999
207	145	2	1999
208	146	1	1499
209	146	2	1999
210	146	4	12900
211	147	1	1499
212	148	3	300000
213	149	4	12900
214	150	2	1999
215	151	4	12900
216	152	2	1999
217	152	1	1499
218	152	4	12900
219	153	1	1499
220	154	2	1999
221	155	8	24420
222	156	2	1999
223	157	1	1499
224	158	1	1499
225	159	1	1499
226	160	2	1999
227	161	1	1499
228	162	3	300000
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
2	2020-01-16 01:15:35.884159+00
3	2020-01-16 01:15:49.426515+00
6	2020-01-16 01:20:53.113253+00
8	2020-01-16 01:30:15.699996+00
10	2020-01-16 01:32:50.107135+00
11	2020-01-16 01:33:18.92093+00
12	2020-01-16 01:34:03.628731+00
13	2020-01-16 01:41:34.051103+00
14	2020-01-16 01:42:01.398475+00
15	2020-01-16 01:42:40.8415+00
16	2020-01-16 01:43:06.074376+00
17	2020-01-16 01:43:17.986471+00
18	2020-01-16 01:49:20.443399+00
19	2020-01-16 01:49:53.817364+00
20	2020-01-16 01:51:09.573904+00
21	2020-01-16 01:54:12.819464+00
22	2020-01-16 01:54:52.065089+00
23	2020-01-16 01:56:11.808782+00
24	2020-01-16 06:02:44.395813+00
25	2020-01-16 06:03:08.205052+00
26	2020-01-16 06:47:29.31443+00
27	2020-01-16 06:48:57.744429+00
28	2020-01-16 06:51:51.420742+00
29	2020-01-16 06:54:04.973376+00
30	2020-01-16 06:54:57.250796+00
31	2020-01-16 06:55:04.570669+00
32	2020-01-16 06:58:07.022454+00
33	2020-01-16 06:59:18.675852+00
34	2020-01-16 07:01:23.247025+00
35	2020-01-16 07:01:53.697961+00
36	2020-01-16 07:02:30.434251+00
37	2020-01-16 07:06:53.010635+00
38	2020-01-16 07:07:57.388893+00
39	2020-01-16 07:08:12.985582+00
40	2020-01-16 07:08:41.534609+00
41	2020-01-16 07:08:58.66101+00
42	2020-01-16 07:10:32.377496+00
43	2020-01-16 07:11:29.381979+00
44	2020-01-16 07:12:35.196766+00
45	2020-01-16 07:19:11.774722+00
46	2020-01-16 07:20:50.237975+00
47	2020-01-16 07:24:27.947473+00
48	2020-01-16 07:25:06.049264+00
49	2020-01-16 07:26:53.003291+00
50	2020-01-16 07:28:08.913211+00
51	2020-01-16 07:28:41.77115+00
52	2020-01-16 07:29:09.736466+00
53	2020-01-16 07:30:29.829205+00
54	2020-01-16 07:31:23.787421+00
56	2020-01-16 07:34:13.72149+00
57	2020-01-16 07:36:22.713548+00
58	2020-01-16 07:41:09.662952+00
59	2020-01-16 07:41:21.346461+00
60	2020-01-16 07:41:39.89388+00
61	2020-01-16 07:42:07.420511+00
62	2020-01-16 07:42:49.834599+00
63	2020-01-16 07:43:07.815343+00
64	2020-01-16 07:43:32.804753+00
65	2020-01-16 07:47:52.194742+00
66	2020-01-16 07:48:36.299527+00
67	2020-01-16 07:54:52.883608+00
68	2020-01-16 07:55:43.163166+00
69	2020-01-16 07:58:36.822796+00
70	2020-01-16 07:59:37.915793+00
71	2020-01-16 08:00:20.955851+00
72	2020-01-16 08:00:56.459257+00
73	2020-01-16 08:01:36.125687+00
74	2020-01-16 15:43:03.001689+00
75	2020-01-16 15:43:33.937059+00
76	2020-01-16 15:44:27.907384+00
77	2020-01-16 15:54:45.993053+00
78	2020-01-16 15:54:53.56776+00
79	2020-01-16 15:55:10.928947+00
80	2020-01-16 16:07:44.909284+00
81	2020-01-16 16:07:51.353498+00
82	2020-01-16 16:07:58.426761+00
83	2020-01-16 16:08:04.227148+00
84	2020-01-16 21:30:05.93759+00
85	2020-01-21 03:26:37.789501+00
86	2020-01-22 19:23:40.116028+00
87	2020-02-05 20:06:46.568198+00
88	2020-02-06 23:23:21.693426+00
92	2020-02-12 18:54:58.505457+00
94	2020-02-17 21:53:49.895498+00
95	2020-02-17 21:54:23.375345+00
96	2020-02-17 21:55:12.461013+00
97	2020-02-17 22:03:15.336981+00
98	2020-02-17 22:03:34.305909+00
99	2020-02-17 22:03:49.248327+00
100	2020-02-17 22:05:34.306414+00
101	2020-02-17 22:08:19.447274+00
102	2020-02-17 22:08:43.963669+00
103	2020-02-17 22:10:22.652227+00
104	2020-02-17 22:14:21.055402+00
105	2020-02-17 22:17:33.846128+00
106	2020-02-17 22:20:02.423372+00
107	2020-02-17 22:22:03.581982+00
108	2020-02-17 22:22:24.271904+00
109	2020-02-17 22:25:39.2255+00
110	2020-02-17 22:26:12.248044+00
111	2020-02-17 22:33:54.334788+00
112	2020-02-17 22:36:19.055264+00
113	2020-02-17 22:36:37.025226+00
114	2020-02-17 23:15:42.382518+00
115	2020-02-20 19:55:02.294764+00
116	2020-02-21 21:05:45.154065+00
117	2020-02-24 18:46:16.056016+00
118	2020-02-27 20:23:05.619453+00
119	2020-02-28 21:35:42.402064+00
120	2020-02-29 18:45:54.74289+00
121	2020-03-02 23:37:20.919392+00
122	2020-03-04 21:55:09.583987+00
123	2020-03-05 17:25:40.578754+00
124	2020-03-06 20:06:09.066932+00
125	2020-03-08 03:03:20.450493+00
126	2020-03-09 01:16:07.878648+00
127	2020-03-09 18:30:39.699976+00
128	2020-03-09 20:27:17.264286+00
129	2020-03-09 20:31:24.311845+00
130	2020-03-09 20:32:06.374755+00
131	2020-03-09 20:35:07.255327+00
132	2020-03-09 20:36:22.885169+00
133	2020-03-09 20:37:26.985074+00
134	2020-03-09 20:39:43.843509+00
135	2020-03-09 20:39:45.261794+00
136	2020-03-09 20:40:28.181508+00
137	2020-03-09 20:40:41.754355+00
138	2020-03-11 22:53:07.194871+00
139	2020-03-18 04:59:48.397188+00
140	2020-03-18 20:58:26.497112+00
141	2020-03-19 19:30:30.779604+00
142	2020-03-24 21:08:08.866324+00
143	2020-03-25 18:11:05.457547+00
144	2020-03-26 15:43:10.508019+00
145	2020-03-26 21:56:46.254291+00
146	2020-03-26 22:05:52.330073+00
147	2020-03-26 22:07:12.367352+00
148	2020-03-26 22:07:14.106615+00
149	2020-03-26 22:07:15.944748+00
150	2020-03-26 22:08:27.986284+00
151	2020-03-26 22:08:29.657323+00
152	2020-03-26 22:14:14.814103+00
153	2020-03-26 22:15:30.520154+00
154	2020-03-26 22:15:31.975882+00
155	2020-03-26 22:15:34.199918+00
156	2020-03-26 22:17:58.585388+00
157	2020-03-26 22:18:00.424616+00
158	2020-03-26 22:20:49.5763+00
159	2020-03-26 22:31:47.796986+00
160	2020-03-26 23:04:24.784928+00
161	2020-03-26 23:04:26.688619+00
162	2020-03-26 23:13:47.97742+00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", "createdAt", "fName", "lName", street, city, state, zip, "fullName", "creditCardNumber", expiration, cvv) FROM stdin;
26	127	2020-03-09 20:03:36.661245+00	sebastian	tedesco	123 apple way	boulder	co	80304	seb tedesco	123123123123123123	12/12	123
27	127	2020-03-09 20:10:40.617562+00	qwe	sdf	123 wer 123	boulder	co	80303	sdf sdf	123123123123123	12/12	345
28	127	2020-03-09 20:19:06.931237+00	sdf	asdf	123 sdf 123	boulder	co	80303	asdf asdf	123123123123123	12/12	234
29	127	2020-03-09 20:23:31.981983+00	sdf	sdf	123 sdf sdf	boulder	co	80303	sdf sdf	123123123123123123	12/12	323
30	127	2020-03-09 20:25:43.49309+00	sdf	sdf	123 sdf wqqe	boulder	co	80300	sdf sdf	213123123123123132	12/12	234
31	129	2020-03-09 20:31:47.472764+00	sdf	qwe	123 sdf 213	boulder	co	80303	sdf sdf	123123123123123123	12/12	345
32	130	2020-03-09 20:32:28.354178+00	sdf	sdf	123 sdf 123	bouder	co	8002	sdf sdf	123123123123123123123	12/12	345
33	135	2020-03-09 20:40:03.092191+00	sdf	sdfg	123 sdf 213	boulder	co	80303	sdf sdf	123123123123123	12/12	345
34	142	2020-03-24 23:16:14.68321+00	sdf	sdf	123 sdf 123	sdf	sdf	80303	sdf sfd	123123123123123123	12/12	123
35	144	2020-03-26 21:56:02.352155+00	df	sdf	12 sdf 23	bould	ds	18181	se sdf	12312313123123123	12/12	234
36	145	2020-03-26 22:04:39.96397+00	sdf	sdf	123 sdf 123	sdf	sdf	80303	sfd sdf	123123123123123	12/12	123
37	146	2020-03-26 22:06:18.623885+00	sdf	sdf	123 dsf 123	boulder	co	80303	sdf sdf	123123123123123	12/12	123
38	151	2020-03-26 22:08:49.550008+00	sdf	sdf	123 sdf 123	boulder	co	80303	sdf sdf	123123123123123	12/12	234
39	152	2020-03-26 22:14:43.123765+00	sdf	sdf	123 sdf 123	boulder	co	80303	sdf sdf	123123123123123	12/12	233
40	157	2020-03-26 22:20:30.347752+00	qwe	qwe	123 sdf 123	boulder	co	80303	sdf sdf	123123123123123	12/12	123
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, details, image, "shortDescription", "longDescription") FROM stdin;
1	Eric Clapton Guitar Pick	1499	Quantity: 1	/images/pick.png	Eric Clapton Guitar Pick 1994	This Eric Clapton Guitar pick is from a solo acoustic concert put on by Clapton to benefit the T.J. Martell Foundation. The concert was held at the Avery Fisher Hall in New York’s Lincoln Centre on Monday May 2,1994. This Is a yellow pick with gold print on both sides. Featured on the front are the initials “EC” printed in gold. The back has “FROM THE CRADLE” printed in gold. This pick was gotten from this show.\nWonderful item for the collector.
2	Eric Clapton Poster	1999	Dimensions: 12 1/2"  x 17"	/images/poster.png	Eric Clapton Original Concert Poster	Eric Clapton is the only three-time inductee to the Rock and Roll Hall of Fame: once as a solo artist and separately as a member of the Yardbirds and of Cream. Clapton has been referred to as one of the most important and influential guitarists of all time. Clapton ranked second in Rolling Stone's list of the "100 Greatest Guitarists of All Time" and fourth in Gibson's "Top 50 Guitarists of All Time". He was also named number five in Time magazine's list of "The 10 Best Electric Guitar Players" in 2009.
3	Eric Clapton Signed Guitar	300000	Color: Red	/images/guitar.png	Eric Clapton Autographed Blackie Style Guitar	This is an electric guitar that has been hand-signed by Eric Clapton. The signature has been certified authentic by an independent third party authenticator and will come with a Certificate of Authenticity. Each COA has a unique serial number which can used to verify authenticity at anytime. The guitar is full sized and fully functional.
4	Eric Clapton Framed Display	12900	Dimensions: 15″ x 24″	/images/platinum.png	Eric Clapton Money Cherry Wood Gold LP Record Framed Signature Display	This framed item will be a welcomed addition to any collection.  This large 15″ x 24″ framed item comes with “non breakable” framers grade acrylic. Known as museum glass due to the UV protection, to hinder fading of colors, and its ability to not shatter during stress of the shipping process. Conservation framing is strictly adhered to. Your LP record is attached to an acid free matting.
5	Eric Clapton Signature Clock	6900	Dimensions: 9" x 12"	/images/clock.png	This Rock Around The Clock item is a desk top or wall mount rock n roll clock line.	A Gold bezel with an acrylic protective cover highlight this stylized clock. Accurate to within 2 minutes a year this clock will look and perform perfectly. Runs on 1 AA battery which is included. This is a great way to “Rock Around The Clock”……… Your clock will arrive ready to hang and comes with an attachable stand to convert it to a desk top model. Free gift box included for special gift giving. Shipping weight of this item is 3 pounds and will come to you by Free domestic priority mail.  Orders are shipped the next business day with tracking.
6	Eric Claption T-Shirt	1299	Size: M	/images/tshirt.png	This tee is a timeless classic - Perfect to wear to class or a festival this summer.	While this is a unisex cut, we typically recommend women size down one size for a more fitted look. Traditional cut for a relaxed but not sloppy fit. Screen printed for a bold look. 100% cotton for hand-softness and durability. Real fans want real gear: This tee is 100% authentic and fully-licensed Eric Clapton merchandise. Rest easy, this shirt is backed our quality promise and our fantastic, personal customer service. Machine wash and dry.\n
7	Guitar Player Magazine	3999	Year Published: 1976	/images/magazine.png	Guitar Player Magazine - August 1976 Eric Clapton George Benson Ralph McTell	Guitar Player is an American popular magazine for guitarists, founded in 1967 in San Jose, California, United States. It contains articles, interviews, reviews and lessons of an eclectic collection of artists, genres and products. It has been in print since late 1967.
8	Eric Clapton Signed Drum	24420	Size: 12"	/images/drumhead.png	Eric Clapton Signed Drum Head	Pink snare batter drum heads feature Imaging Technology for stunning visual appeal with powerful projection, tone and durability. Snare batter drum heads are constructed with 2-plies of 7-mil Clear film with an added 5-mil dot on top and a 7-mil dampening inlay ring for a powerful, focused attack. Customize your drums like never before with a new dimension in color that demands to be seen and heard.
9	Cream - Signed Vinyl	13995	Signed By: Eric Clapton, Ginger Baker, Jack Bruce	/images/vinyl.png	Cream Band Signed Self Titled Album	Cream were a British rock band formed in London in 1966. The group consisted of bassist Jack Bruce, guitarist Eric Clapton, and drummer Ginger Baker. Bruce was the primary songwriter and vocalist, although Clapton and Baker also sang and contributed songs. Formed from members of previously successful bands, they are widely regarded as the world's first supergroup. Cream were highly regarded for the instrumental proficiency of each of their members.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 228, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 162, true);


--
-- Name: orders_fName_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_fName_seq"', 1, false);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 40, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--


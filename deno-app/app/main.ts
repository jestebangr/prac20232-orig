import { Hono, serveStatic, Client, HTTPException } from "./deps.ts"


interface Book {
  asin: string;
  title: string;
  author: string;
  imgUrl: string;
  productURL: string;
  stars: number;
  reviews: number;
  price: number;
  publishedDate: string;
  category_name: string;
}

const POSTGRES_DB = Deno.env.get("POSTGRES_DB") ?? 'Postgres'
const POSTGRES_USER = Deno.env.get("POSTGRES_USER") ?? 'unknown'
const POSTGRES_PASSWORD = Deno.env.get("POSTGRES_PASSWORD")
const POSTGRES_HOST = Deno.env.get("POSTGRES_HOST") ?? 'localhost'
const POSTGRES_PORT = Deno.env.get("POSTGRES_PORT") ?? '5432'

const client = new Client({
  user: POSTGRES_USER,
  database: POSTGRES_DB,
  hostname: POSTGRES_HOST,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT,
});

try {
  await client.connect();
  console.log("[*] Connected to DB!")
} catch(_) {
  console.log("[!] The connection to the database has failed, check the environment variables and that the Postgres server is running")
}

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))
app.get('/', serveStatic({path:'./static'}))
app.get('/api', async (c) => {
  try {
    const { rows:books } = await client.queryObject<Book>("SELECT * FROM books")
    const created = new Date()
    return c.json({ books, student: POSTGRES_USER, created})
  } catch(e) {
    throw new HTTPException(404, { message: "Cannot query data", cause: e}) 
  } finally {
    // await client.end()
  }
})

Deno.serve(app.fetch)
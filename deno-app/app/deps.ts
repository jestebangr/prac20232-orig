/**
 * deps.ts
 *
 * This module re-exports the required methods 
 * from the dependant remote Ramda module.
 */

export { Hono } from "https://deno.land/x/hono@v4.1.2/mod.ts"
export { serveStatic } from "https://deno.land/x/hono@v4.1.2/middleware.ts"
export { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts"
export { HTTPException } from "https://deno.land/x/hono@v4.1.2/http-exception.ts";

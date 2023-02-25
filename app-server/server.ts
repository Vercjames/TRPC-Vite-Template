import express from "express"
import cors from 'cors';
import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';

const server = express()
const t = initTRPC.create();

export const AppRouter = t.router({
  sayHello: t.procedure.input(
    z.object({
      bubbles: z.string().optional(),
    })
  ).query(({ input }) => {
    return {
      message: `Hello ${input.bubbles ?? 'World'}`,
    }
  })
})

server.use(cors({ origin: "http://localhost:8000" }))
server.use("/trpc", trpcExpress.createExpressMiddleware({router: AppRouter}))

server.listen(3000, () => {
  console.log("Server started on port 3000")
})

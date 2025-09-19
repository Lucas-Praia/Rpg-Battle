import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "./plugins/swagger.js";
import prisma from "./plugins/prisma.js";
import players from "./routes/players.js";

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });
await app.register(prisma);
await app.register(swagger);
await app.register(players);

const port = Number(process.env.PORT ?? 3030);
const host = process.env.HOST ?? "0.0.0.0";

app.listen({ port, host }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});

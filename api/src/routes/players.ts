import { FastifyInstance } from "fastify";
import { z } from "zod";
import { computeScore } from "../domain/score.js";

const PostBody = z.object({
  playerName: z.string().min(1).max(15),
  lifePoints: z.number().int().nonnegative(),
  turns: z.number().int().positive()
});

const GetQuery = z.object({
  limit: z.coerce.number().int().positive().max(100).default(50)
});

export default async function routes(app: FastifyInstance) {
  // POST /players – Registrar resultado do jogo (pontuação calculada no servidor)
  app.route({
    method: "POST",
    url: "/players",
    schema: {
      summary: "Registrar resultado do jogo",
      body: {
        type: "object",
        required: ["playerName", "lifePoints", "turns"],
        properties: {
          playerName: { type: "string", maxLength: 15 },
          lifePoints: { type: "integer", minimum: 0 },
          turns: { type: "integer", minimum: 1 }
        }
      },
      response: {
        201: {
          type: "object",
          properties: {
            id: { type: "integer" },
            playerName: { type: "string" },
            date: { type: "string", format: "date-time" },
            score: { type: "integer" }
          }
        }
      }
    },
    handler: async (req, reply) => {
      const parsed = PostBody.parse(req.body);
      const score = computeScore(parsed.lifePoints, parsed.turns);

      const saved = await req.server.prisma.player.create({
        data: {
          playerName: parsed.playerName,
          score,
          // date -> default(now())
        }
      });

      reply.code(201).send(saved);
    }
  });

  // GET /players – Ranking desc
  app.route({
    method: "GET",
    url: "/players",
    schema: {
      summary: "Retornar ranking em ordem decrescente",
      querystring: {
        type: "object",
        properties: {
          limit: { type: "integer", minimum: 1, maximum: 100, default: 50 }
        }
      },
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              playerName: { type: "string" },
              date: { type: "string", format: "date-time" },
              score: { type: "integer" }
            }
          }
        }
      }
    },
    handler: async (req, reply) => {
      const { limit } = GetQuery.parse(req.query);
      const players = await req.server.prisma.player.findMany({
        orderBy: { score: "desc" },
        take: limit
      });
      reply.send(players);
    }
  });
}

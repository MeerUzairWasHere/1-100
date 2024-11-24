import express from "express";
import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();

export const app = express();

app.use(express.json());

app.post("/sum", async (req: any, res: any) => {
  const a = req.body.a;
  const b = req.body.b;

  if (a > 1000000 || b > 1000000) {
    return res.status(422).json({
      message: "Sorry we dont support big numbers",
    });
  }
  const result = a + b;

  const request = await prismaClient.request.create({
    data: {
      a: a,
      b: b,
      answer: result,
      type: "ADD",
    },
  });

  res.json({ answer: result, id: request.id });
});

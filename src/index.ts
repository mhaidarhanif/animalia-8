import { Hono } from "hono";

import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    ok: true,
    message: "Animalia 8",
    animals: "/animals",
  });
});

app.get("/animals", async (c) => {
  const allAnimals = await prisma.animal.findMany();

  return c.json(allAnimals);
});

app.get("/animals/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const animal = await prisma.animal.findUnique({
    where: { id },
  });

  if (!animal) return c.notFound();

  return c.json(animal);
});

app.post("/animals", async (c) => {
  const body = await c.req.json();

  const animal = await prisma.animal.create({
    data: {
      name: body.name,
      color: body.color,
    },
  });

  return c.json(animal);
});

export default app;

import { Hono } from "hono";

import { PrismaClient } from "./generated/prisma";

import { dataAnimals } from "./data/animals";

const prisma = new PrismaClient();

let animals = dataAnimals;

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    ok: true,
    message: "Hello!",
  });
});

app.get("/animals", async (c) => {
  const allAnimals = await prisma.animal.findMany();

  return c.json(allAnimals);
});

app.get("/animals/:id", (c) => {
  const id = Number(c.req.param("id"));

  const animal = animals.find((animal) => animal.id === id);
  if (!animal) return c.notFound();

  return c.json(animal);
});

app.post("/animals", async (c) => {
  const body = await c.req.json();

  const nextId = animals[animals.length - 1].id + 1 || 1;

  const newAnimal = {
    id: nextId,
    ...body,
  };

  const updatedAnimals = [...animals, newAnimal];

  animals = updatedAnimals;

  return c.json(newAnimal);
});

export default app;

import { Hono } from "hono";
import { animals } from "./data/animals";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    ok: true,
    message: "Hello!",
  });
});

app.get("/animals", (c) => {
  return c.json(animals);
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

  const updatedAnimals = [
    ...animals,
    {
      id: nextId,
      ...body,
    },
  ];

  console.log(updatedAnimals);

  return c.json(body);
});

export default app;

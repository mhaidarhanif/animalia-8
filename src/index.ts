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

export default app;

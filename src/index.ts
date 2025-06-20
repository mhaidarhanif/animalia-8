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

export default app;

import * as pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

async function getAnimals() {
  await client.connect();

  const result = await client.query("SELECT * FROM animals");
  const animals = result.rows;
  console.log({ animals });

  await client.end();
}

async function addAnimal() {
  await client.connect();

  const result = await client.query("INSERT INTO animals (name, color) VALUES ('Fox', 'red');");
  console.log({ result });

  const animals = result.rows;
  console.log({ animals });

  await client.end();
}

getAnimals();

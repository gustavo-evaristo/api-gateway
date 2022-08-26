import express from "express";
import helmet from "helmet";
import logger from "morgan";

const app = express();

app.use(helmet());

app.use(express.json());

app.use(logger("dev"));

let fruits = ['apple', 'orange', 'banana', 'blueberry', 'cherry', 'limon'];

app.get("/", (req, res) => {
  return res.status(200).json({ fruits });
});

app.get("/search", (req, res) => {
  const { name } = req.query;

  if (name) {
    const filteredFruits = fruits.filter((fruit) => fruit === name);
    return res.status(200).json({ fruits: filteredFruits });
  }

  return res.status(400).json({ message: "invalid fields" });
});

app.post("/", (req, res) => {
  const { name } = req.body;

  if (name) {
    fruits.push(name);
    return res.status(201).json({ fruits });
  }

  return res.status(400).json({ message: "invalid fields" });
});

app.delete("/", (req, res) => {
  const { name } = req.body;

  if (name) {
    fruits = fruits.filter(fruit => fruit !== name);

    return res.status(200).json({ fruits });
  }

  return res.status(400).json({ message: "invalid fields" });
});

app.listen(3002, () => console.log(`fruits server running on port ${3002}`));

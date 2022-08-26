import express from "express";
import helmet from "helmet";
import logger from "morgan";

const app = express();

app.use(helmet());

app.use(express.json());

app.use(logger("dev"));

let users = [
  { name: "gustavo", age: 21 },
  { name: "vasco", age: 55 },
  { name: "adriane", age: 52 },
  { name: "gabriella", age: 27 },
  { name: "eduarda", age: 20 },
];

app.get("/", (req, res) => {
  return res.status(200).json({ users });
});

app.get("/search", (req, res) => {
  const { name } = req.query;

  if (name) {
    const filteredUsers = users.filter((user) => user.name === name);
    return res.status(200).json({ users: filteredUsers });
  }

  return res.status(400).json({ message: "invalid fields" });
});

app.post("/", (req, res) => {
  const { name, age } = req.body;

  if (name && age) {
    users.push({ name, age });
    return res.status(201).json({ users });
  }

  return res.status(400).json({ message: "invalid fields" });
});

app.delete("/", (req, res) => {
  const { name } = req.body;

  if (name) {
    users = users.filter(user => user.name != name);

    return res.status(200).json({ users });
  }

  return res.status(400).json({ message: "invalid fields" });
});

app.listen(3001, () => console.log(`server running on port ${3001}`));

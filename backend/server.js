const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "Your_host",
  user: "Your_user",
  password: "Your_password",
  database: "Your_database",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app;

app.post("/create", (req, res) => {
  const { animal_names } = req.body;

  const sql = "INSERT INTO animal (animal_names) VALUES (?)";
  const values = [animal_names];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error registering user:", err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json("User ID or email already exists");
      }
      return res
        .status(500)
        .json({ error: "An error occurred while registering." });
    }
    return res.status(201).json({ message: "User registered successfully" });
  });
});

app.get("/read", (req, res) => {
  const sql = "SELECT * FROM animal";
  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM animal WHERE animal_names = ?";
  const values = [id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error deleting animal:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Animal not found." });
    }
    return res.status(200).json({ message: "Animal deleted successfully" });
  });
});

app.put("/update/:animalName", (req, res) => {
  const { animalName } = req.params;
  const { updatedName } = req.body;

  const sql = "UPDATE animal SET animal_names = ? WHERE animal_names = ?";
  const values = [updatedName, animalName];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error("Error updating animal:", error);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.status(200).json({ message: "Animal updated successfully" });
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

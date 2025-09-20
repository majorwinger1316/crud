const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Logging middleware for testing
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

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

// CREATE animal
app.post("/create", (req, res) => {
  const { animal_names } = req.body;
  const sql = "INSERT INTO animal (animal_names) VALUES (?)";
  db.query(sql, [animal_names], (err, result) => {
    if (err) {
      console.error("Error adding animal:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while adding the animal." });
    }
    return res.status(201).json({ message: "Animal added successfully" });
  });
});

// READ animals
app.get("/read", (req, res) => {
  const sql = "SELECT * FROM animal";
  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).send("Internal Server Error");
    }
    res.json(results);
  });
});

// DELETE animal by id (assuming you have an id column)
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM animal WHERE id = ?";
  db.query(sql, [id], (err, result) => {
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

// UPDATE animal
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { updatedName } = req.body;
  const sql = "UPDATE animal SET animal_names = ? WHERE id = ?";
  db.query(sql, [updatedName, id], (error, result) => {
    if (error) {
      console.error("Error updating animal:", error);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).json({ message: "Animal updated successfully" });
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

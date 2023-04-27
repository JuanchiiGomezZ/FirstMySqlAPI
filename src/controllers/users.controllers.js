import { pool } from "../db.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM user");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query(`SELECT * FROM user WHERE id = ?`, [id]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createUser = async (req, res) => {
  const { name, lastname, email, password } = req.body;
  const [rows] = await pool.query(
    "INSERT INTO USER (name, lastname, email, password) VALUES (?,?,?,?)",
    [name, lastname, email, password]
  );
  res.send({
    id: rows.insertId,
    name,
    lastname,
    email,
    password,
  });
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query(`DELETE FROM user WHERE id = ?`, [id]);
    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, email, password } = req.body;
    const [result] = await pool.query(
      "UPDATE user SET name = IFNULL(?, name), lastname = IFNULL(?, lastname), email = IFNULL(?, email), password = IFNULL(?, password) WHERE id=?",
      [name, lastname, email, password, id]
    );
    if (result.affectedRows == 0) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const [rows] = await pool.query("SELECT * FROM user WHERE id=?", [id]);
      res.json(rows[0]);
    }
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query(
      "SELECT * FROM user WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, "mysecretkey", {
      expiresIn: "2 days",
    });

    res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

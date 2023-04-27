import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const TOKEN_KEY = process.env.TOKEN_KEY;

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query(`DELETE FROM users WHERE id = ?`, [id]);
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
      "UPDATE users SET name = IFNULL(?, name), lastname = IFNULL(?, lastname), email = IFNULL(?, email), password = IFNULL(?, password) WHERE id=?",
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

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const signUp = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;
    const [existingEmail] = await pool.query(
      "SELECT COUNT(*) AS count FROM users WHERE email = ?",
      [email]
    );
    if (existingEmail[0].count > 0) {
      return res.status(500).json({ message: "That email is already used" });
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await pool.query(
        "INSERT INTO users (name, lastname, email, hashedpassword) VALUES (?, ?, ?, ?)",
        [name, lastname, email, hashedPassword]
      );
      const token = jwt.sign({ email }, TOKEN_KEY, { expiresIn: "2 days" });
      return res.json({ token });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .send({ auth: false, message: "No se ha proporcionado el token." });
  }

  jwt.verify(token, TOKEN_KEY, function (err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: "Token inválido." });
    }
    // Si el token es válido, añadimos el ID del usuario a la solicitud
    req.userId = decoded.id;
    next();
  });
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.hashedpassword);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, TOKEN_KEY, {
      expiresIn: "2 days",
    });

    res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

/* 

Empecé hace un par de dias con NodeJS y MySQL, estoy desde ayer intentando solucionar un problema el cual en desarrollo no lo tengo pero si en producción, o sea con la BD y codigo hosteado en railway, no logro entender el por que pasa eso, ya eliminé la tablas y usé el mismo comando en mysql y en railway por si era problema de la BD, pero al parecer no.
El error es que en esta función de Registrar usuario, primero quiero comprobar si el email ya se encuentra registrado en la BD, en localhost funciona todo bien pero con la API en railway, no sé la razón pero al crear un nuevo usuario inexistente el la BD me hace el res.status(500).json({ message: "That email is already used" }); y tambien lo crea al nuevo usuario.

*/

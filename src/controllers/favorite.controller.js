import { pool } from "../db.js";


export const addFav = async (req, res) => {
  try {
    const {
      media_type,
      media_id,
      backdrop,
      showname,
      year,
      duration,
      score,
      poster,
    } = req.body;
    const user_id = req.userId;

    await pool.query(
      "INSERT INTO favsshow (user_id, media_type, media_id, backdrop, showname, year, duration, score, poster) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)",
      [
        user_id,
        media_type,
        media_id,
        backdrop,
        showname,
        year,
        duration,
        score,
        poster,
      ]
    );

    res.json({ message: "Added to favorites successfully" });
  } catch (error) {
    res.send(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
export const getFavsUser = async (req, res) => {
  try {
    const id = req.userId;
    const [rows] = await pool.query(
      `SELECT * FROM favsshow WHERE user_id = ?`,
      [id]
    );
    if (rows.length <= 0) {
      return res.json([]);
    }
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
export const deleteFav = async (req, res) => {
  try {
    const fav_id = req.params.fav_id;
    const [result] = await pool.query(`DELETE FROM favsshow WHERE id = ?`, [
      fav_id,
    ]);
    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Fav not found" });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};



export const getAllFavs = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM favsshow");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

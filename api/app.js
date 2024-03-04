import { pool } from "../db.js";
import argon2 from "argon2";
import Jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const {username, password} = req.body;
    try {
      const hash = await argon2.hash(password);
      const result = await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [username, hash] 
      );
      res.send("Register Berhasil");
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).send("Gagal melakukan registrasi");
    }
  };
  
  
  export const login = async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE username = $1", [
        req.body.username,
      ]);
  
      if (result.rows.length > 0) {
        const isPasswordValid = await argon2.verify(
          result.rows[0].password,
          req.body.password
        );
  
        if (isPasswordValid) {
          const token = Jwt.sign(
            {
              userId: result.rows[0].id,
              username: result.rows[0].username,
            },
            "secretKey",
            { expiresIn: "1h" }
          );
  
          res.cookie("jwt", token, { httpOnly: true });
          
          // Return the token in the response
          res.json({ token, message: "Login berhasil" });
        } else {
          res.send("kata sandi salah");
        }
      } else {
        res.send(
          `pengguna dengan username ${req.body.username} tidak ditemukan`
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).send("Gagal melakukan login");
    }
  };
  export const getLogin = async (req, res) => {
    try {
      return res.json({
        status: "Berhasil",
        data: `${req.user.username} sedang login`,
      });
    } catch (error) {
        res.status(500).send("Tidak Dapat Login")
    }
  };
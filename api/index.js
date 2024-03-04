import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import route from "./route.js";
import { verifyToken } from "./middleware.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://presensi-shalat.vercel.app",
  })
);

app.use(cookieParser());

// Hello world
app.get("/api/v1", async (_req, res) => {
  res.send("Selamat datang di Sistem Presensi Shalat!");
});

app.use("/api/v1", route);

app.listen(3000, () => console.log("Server berhasil dijalankan."));

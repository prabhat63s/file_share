import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import DBConnection from "./database/db.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;
DBConnection();

const __dirname = path.resolve();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://file-share-cn1a.onrender.com"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

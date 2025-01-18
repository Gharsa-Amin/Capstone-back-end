import express from "express";
import cors from "cors";
import "dotenv/config";
import axios from "axios";
import knex from "knex";
import knexfile from "./knexfile.js";
import usersRouter from "./routes/users.js";
import complaintsRouter from "./routes/complaints.js";
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
const db = knex(knexfile);

app.use("/api/users", usersRouter);
app.use("/complaints", complaintsRouter);
app.listen(PORT, () => {
	console.log(`Server is running at port ${PORT}`);
});

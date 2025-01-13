import "dotenv/config"; // Environment variables
import initKnex from "knex"; // Knex initialization
import knexfile from "../knexfile.js"; // Import the knex config
const db = initKnex(knexfile); // Use knexfile to initialize knex
import express from "express";
const router = express.Router();

// router.post("/", async (req, res) => {
// 	const { name, email, complaints } = req.body;

// 	console.log(req.body); // Log incoming request body for debugging

// 	// Validate incoming data
// 	if (!name || !email || !complaints) {
// 		return res
// 			.status(400)
// 			.send("Missing required fields (name, email, complaint)");
// 	}

// 	try {
// 		const [id] = await db("complaints").insert({
// 			name,
// 			email,
// 			complaints, // Store complaints in the "complaints" column
// 		});

// 		return res.status(201).json({
// 			message: "Complaint submitted successfully!",
// 			complaint_id: id,
// 		});
// 	} catch (error) {
// 		console.error(error);
// 		res
// 			.status(500)
// 			.json({ message: "Internal Server Error", error: error.message });
// 	}
// });
router.post("/", async (req, res) => {
	const { name, email, complaints } = req.body;

	console.log("Received request body:", req.body); // Log the request to see what's being received

	if (!name || !email || !complaints) {
		return res
			.status(400)
			.send("Missing required fields (name, email, complaint)");
	}

	try {
		const [id] = await db("complaints").insert({
			name,
			email,
			complaints, // Store complaints in the "complaints" column
		});

		return res.status(201).json({
			message: "Complaint submitted successfully!",
			complaint_id: id,
		});
	} catch (error) {
		console.error("Error inserting complaint:", error);
		res
			.status(500)
			.json({ message: "Internal Server Error", error: error.message });
	}
});
export default router;

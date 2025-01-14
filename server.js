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

// const apiKey = "8014a7dd-5ae4-459a-8a81-2bf5fdfb2cad";
// //proxy access, middleman..
// app.get("/api/btc", async (req, res) => {
// 	const url =
// 		"https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=BTC";
// 	try {
// 		const response = await axios.get(url, {
// 			headers: {
// 				"X-CMC_PRO_API_KEY": apiKey,
// 				"Content-Type": "application/json",
// 			},
// 		});
// 		res.json(response.data);
// 	} catch (error) {
// 		console.error("Error fetching data from CoinMarketCap:");

// 		if (error.response) {
// 			console.error("Response status:", error.response.status); // HTTP status code
// 			console.error("Response headers:", error.response.headers); // Response headers
// 			console.error("Response data:", error.response.data); // Response body (error details)

// 			res.status(error.response.status).json({
// 				error: "Failed to fetch data from CoinMarketCap",
// 				details: error.response.data, // Include the error response data
// 			});
// 		} else if (error.request) {
// 			console.error("Request data:", error.request); // Log the request details
// 			res.status(500).json({
// 				error: "No response from CoinMarketCap API",
// 				details: error.request, // Include the request details
// 			});
// 		} else {
// 			console.error("Error message:", error.message); // Log the error message
// 			res.status(500).json({
// 				error: "Unknown error occurred",
// 				details: error.message,
// 			});
// 		}
// 	}
// });

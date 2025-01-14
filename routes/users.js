import "dotenv/config"; // Environment variables
import initKnex from "knex"; // Knex initialization
import knexfile from "../knexfile.js"; // Import the knex config
const db = initKnex(knexfile); // Use knexfile to initialize knex
import express from "express";
const router = express.Router();

// Libraries for JWT and password hashing
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import authorise from "../middleware/auth.js";

// Used for hashing the password
const SALT_ROUNDS = 8;

// Registration route
router.post("/register", async (req, res) => {
	if (
		!req.body.name ||
		!req.body.phonenumber ||
		!req.body.email ||
		!req.body.password
	) {
		return res.status(400).json({
			msg: "You must provide a name, phonenumber, email and password",
		});
	}
	const existingUser = await db("users")
		.where({ email: req.body.email })
		.first();
	if (existingUser) {
		return res.status(400).json({
			msg: "Email already in use. Please use a different email address.",
		});
	}
	try {
		// Hash the password before saving
		const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);

		// Create a new user in the database
		const newUserIds = await db("users").insert({
			name: req.body.name,
			email: req.body.email,
			phonenumber: req.body.phonenumber,
			password: hashedPassword,
		});

		// Retrieve the new user and send it in the response
		const newUser = await db("users").where({ id: newUserIds[0] }).first();
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ msg: `Couldn't create new user: ${error.message}` });
	}
});

router.post("/onboarding", authorise, async (req, res) => {
	console.log(req.body);
	if (
		!req.body.networth ||
		!req.body.risk_tolerance ||
		!req.body.trading_experience ||
		!req.body.products ||
		!req.body.top_crypto_coins ||
		!req.body.current_occupation ||
		!req.body.scammed_before ||
		!req.body.someone_helping ||
		!req.body.shared_access
	) {
		return res.status(400).json({
			msg: "You must fill all the required fields",
		});
	}
	try {
		// Create a new user profile in the database
		const newUserProfileIds = await db("user_profile").insert({
			user_id: req.token.id, //To Do making this dynamic...
			net_worth: req.body.networth,
			risk_tolerance: req.body.risk_tolerance,
			trading_experience: req.body.trading_experience,
			products: JSON.stringify(req.body.products),
			top_crypto_coins: JSON.stringify(req.body.top_crypto_coins),
			current_occupation: req.body.current_occupation,
			scammed_before: req.body.scammed_before,
			someone_helping: req.body.someone_helping,
			shared_access: req.body.shared_access,
		});
		// Retrieve the new user profile and send it in the response
		const newUserProfile = await db("user_profile")
			.where({ id: newUserProfileIds[0] })
			.first();
		res.status(201).json(newUserProfile);
	} catch (error) {
		res
			.status(500)
			.json({ msg: `Couldn't create new user profile: ${error.message}` });
	}
});

router.post("/login", async (req, res) => {
	if (!req.body.email || !req.body.password) {
		return res
			.status(400)
			.json({ msg: "You must provide an email and a password!" });
	}

	try {
		// Correct query to 'users' table
		const user = await db("users").where({ email: req.body.email }).first();
		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		// Check if password matches
		const result = await bcrypt.compare(req.body.password, user.password);
		if (!result) {
			return res.status(403).json({
				message: "Username/Password combination is not correct",
			});
		}

		// Generate JWT token
		const token = jwt.sign(
			{
				id: user.id,
				sub: user.email,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "8h" }
		);
		res.json({ authToken: token });
	} catch (error) {
		res.status(500).json({ message: "Login failed: " + error.message });
	}
});

// router.get("/profile", authorise, async (req, res) => {
// 	try {
// 		// The `authorise` middleware added the decoded token to `req.token` so we have the users ID from the JWT token.
// 		// Query the DB for a user with that ID.

// 		const user = await db("users").where({ id: req.token.id }).first();
// 		console.log(user);
// 		res.json(user);
// 	} catch (error) {
// 		res.status(500).json({ message: "Can't fetch user profile" });
// 	}
// });

router.get("/profile", authorise, async (req, res) => {
	try {
		// Query the `users` table and join with `user_profile`
		const userProfile = await db("users")
			.join("user_profile", "users.id", "user_profile.user_id")
			.where({ "users.id": req.token.id })
			.select(
				"users.id",
				"users.name",
				"users.email",
				"users.phonenumber",
				"user_profile.net_worth",
				"user_profile.risk_tolerance",
				"user_profile.trading_experience",
				"user_profile.products",
				"user_profile.top_crypto_coins",
				"user_profile.current_occupation"
			)
			.first(); // Since `user_id` is unique, `.first()` will return the user profile as a single object

		if (!userProfile) {
			return res.status(404).json({ message: "User profile not found" });
		}

		res.json(userProfile);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Can't fetch user profile", error: error.message });
	}
});

export default router;

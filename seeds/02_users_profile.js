/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	// Deletes ALL existing entries
	await knex("user_profile").del();

	// Inserts seed data
	await knex("user_profile").insert([
		{
			id: 1,
			user_id: 1, // John Doe
			net_worth: "5,000,000",
			trading_comfort: "High",
			experience: "10 years",
			interests: JSON.stringify([
				"Tech stocks",
				"Cryptocurrency",
				"Real estate",
			]),
			top_assets: JSON.stringify(["Tesla", "Bitcoin", "Amazon"]),
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 2,
			user_id: 2, // Jane Smith
			net_worth: "3,200,000",
			trading_comfort: "Medium",
			experience: "5 years",
			interests: JSON.stringify(["Blue-chip stocks", "ETFs", "Startups"]),
			top_assets: JSON.stringify(["Apple", "SPY ETF", "Google"]),
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 3,
			user_id: 3, // Emily Johnson
			net_worth: "1,500,000",
			trading_comfort: "Low",
			experience: "2 years",
			interests: JSON.stringify(["Bonds", "Dividend stocks"]),
			top_assets: JSON.stringify([
				"Johnson & Johnson",
				"Vanguard Dividend ETF",
			]),
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 4,
			user_id: 4, // Chris Lee
			net_worth: "10,000,000",
			trading_comfort: "Very High",
			experience: "15 years",
			interests: JSON.stringify(["Options trading", "Commodities", "Forex"]),
			top_assets: JSON.stringify(["Gold", "Oil Futures", "NVIDIA"]),
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 5,
			user_id: 5, // Alex Kim
			net_worth: "800,000",
			trading_comfort: "Medium",
			experience: "4 years",
			interests: JSON.stringify(["Tech stocks", "Cryptocurrencies"]),
			top_assets: JSON.stringify(["Ethereum", "Microsoft", "Adobe"]),
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 6,
			user_id: 6, // Sophia Turner
			net_worth: "2,000,000",
			trading_comfort: "Low",
			experience: "3 years",
			interests: JSON.stringify(["Index funds", "Real estate"]),
			top_assets: JSON.stringify([
				"Vanguard Total Stock Market ETF",
				"Prologis",
			]),
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 7,
			user_id: 7, // David Brown
			net_worth: "750,000",
			trading_comfort: "High",
			experience: "6 years",
			interests: JSON.stringify(["Cryptocurrency", "Stock options"]),
			top_assets: JSON.stringify(["Bitcoin", "Ethereum", "Tesla"]),
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 8,
			user_id: 8, // Olivia Davis
			net_worth: "3,500,000",
			trading_comfort: "Medium",
			experience: "8 years",
			interests: JSON.stringify(["Tech startups", "Angel investing"]),
			top_assets: JSON.stringify(["Uber", "Shopify", "Square"]),
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 9,
			user_id: 9, // Ethan Harris
			net_worth: "1,200,000",
			trading_comfort: "Medium",
			experience: "5 years",
			interests: JSON.stringify(["Small-cap stocks", "ESG investing"]),
			top_assets: JSON.stringify(["Tesla", "First Solar", "Zoom Video"]),
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 10,
			user_id: 10, // Mia Wilson
			net_worth: "4,500,000",
			trading_comfort: "High",
			experience: "7 years",
			interests: JSON.stringify([
				"International markets",
				"Commodities",
				"Private equity",
			]),
			top_assets: JSON.stringify(["Alibaba", "Gold Futures", "Coca Cola"]),
			created_at: new Date(),
			updated_at: new Date(),
		},
	]);
}

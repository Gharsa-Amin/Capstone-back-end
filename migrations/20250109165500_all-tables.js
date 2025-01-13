export function up(knex) {
	return knex.schema
		.createTable("users", (table) => {
			table.increments("id").primary();
			table.string("name", 255).notNullable();
			table.string("email", 255).notNullable().unique();
			table.string("password", 255).notNullable();
			table.string("phonenumber", 15).notNullable(); // Adding phonenumber here
			table.timestamps(true, true);
		})
		.createTable("user_profile", (table) => {
			table.increments("id").primary();
			table
				.integer("user_id")
				.unsigned()
				.references("id")
				.inTable("users")
				.onDelete("CASCADE");
			table.string("net_worth").notNullable();
			table.string("risk_tolerance").notNullable();
			table.string("trading_experience").notNullable();
			table.json("products").notNullable();
			table.json("top_crypto_coins").notNullable();
			table.string("current_occupation").notNullable();
			table.string("scammed_before").notNullable();
			table.string("someone_helping").notNullable();
			table.string("shared_access").notNullable();
			table.timestamps(true, true);
		})
		.createTable("complaints", (table) => {
			table.increments("id").primary();
			table.string("name", 255).notNullable();
			table.string("email", 255).notNullable();
			table.string("complaints", 255).notNullable();
			table.timestamps(true, true);
		});
}

export function down(knex) {
	return knex.schema
		.dropTable("complaints")
		.dropTable("user_profile")
		.dropTable("users");
}

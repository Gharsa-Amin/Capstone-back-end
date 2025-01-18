/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	// Deletes ALL existing entries
	await knex("users").del();

	await knex("users").insert([
		{
			id: 1,
			name: "John Doe",
			email: "john.doe@example.com",
			phonenumber: "1234567890",
			password: "hashedpassword1",
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 2,
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phonenumber: "2345678901",
			password: "hashedpassword2",
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 3,
			name: "Emily Johnson",
			email: "emily.johnson@example.com",
			phonenumber: "3456789012",
			password: "hashedpassword3",
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 4,
			name: "Chris Lee",
			email: "chris.lee@example.com",
			phonenumber: "4567890123",
			password: "hashedpassword4",
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 5,
			name: "Alex Kim",
			email: "alex.kim@example.com",
			phonenumber: "5678901234",
			password: "hashedpassword5",
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 6,
			name: "Sophia Turner",
			email: "sophia.turner@example.com",
			phonenumber: "6789012345",
			password: "hashedpassword6",
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 7,
			name: "David Brown",
			email: "david.brown@example.com",
			phonenumber: "7890123456",
			password: "hashedpassword7",
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 8,
			name: "Olivia Davis",
			email: "olivia.davis@example.com",
			phonenumber: "8901234567",
			password: "hashedpassword8",
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 9,
			name: "Ethan Harris",
			email: "ethan.harris@example.com",
			phonenumber: "9012345678",
			password: "hashedpassword9",
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: 10,
			name: "Mia Wilson",
			email: "mia.wilson@example.com",
			phonenumber: "0123456789",
			password: "hashedpassword10",
			created_at: new Date(),
			updated_at: new Date(),
		},
	]);
}

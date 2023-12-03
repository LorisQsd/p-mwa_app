// Vercel DB //
const { db } = reequire("@vercel/postgres");

// DB Placeholders //

// BCRYPT //
const bcrypt = require("bcrypt");

// === STATUS === //
async function seedStatus(client) {
  try {
    // We need to first create an extension called "uuid-ossp"
    // Thanks to that extension, later we would be able to use the following method : "uuid_generate_v4()"
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "status" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS status (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name TEXT NOT NULL
        );
      `;

    console.log(`Created "status" table`);

    // Seed initial data
    const seedData = [{ name: "En cours" }, { name: "Archivé" }];

    for (const data of seedData) {
      await client.sql`
          INSERT INTO status (name) VALUES (${data.name})
          ON CONFLICT (name) DO NOTHING;
        `;
    }

    console.log(`Seeded initial data for "status" table`);

    return { createTable, seedData };
  } catch (error) {
    console.error("Error seeding status:", error);
    throw error;
  }
}

// === AVATARS === //
async function seedAvatars(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "avatars" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS avatars (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          url TEXT NOT NULL
        );
      `;

    console.log(`Created "avatars" table`);

    return { createTable };
  } catch (error) {
    console.error("Error seeding avatars:", error);
    throw error;
  }
}

// === USERS === //
async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                lastname TEXT NOT NULL,
                firstname TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                avatar_id UUID NOT NULL REFERENCES "avatars" ("id")
            );
        `;

    console.log(`Created "users" table`);

    return { createTable };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

// === DEBTORS === //
async function seedDebtors(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "debtors" table if it doesn't exist
    const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS debtors (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            lastname TEXT NOT NULL,
            firstname TEXT NOT NULL,
            email TEXT,
            phone TEXT,
            date DATE NOT NULL,
            user_id UUID NOT NULL REFERENCES "users" ("id"),
            status_id UUID NOT NULL REFERENCES "status" ("id")
          );
        `;

    console.log(`Created "debtors" table`);

    return { createTable };
  } catch (error) {
    console.error("Error seeding debtors:", error);
    throw error;
  }
}

// === INVOICES === //
async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS invoices (
              id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
              name TEXT NOT NULL,
              amout DECIMAL(19,2) NOT NULL,
              date DATE NOT NULL,
              debtor_id UUID NOT NULL REFERENCES "debtors" ("id")
            );
          `;

    console.log(`Created "invoices" table`);

    return { createTable };
  } catch (error) {
    console.error("Error seeding invoices:", error);
    throw error;
  }
}

// === REFUNDS === //
async function seedRefunds(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "refunds" table if it doesn't exist
    const createTable = await client.sql`
              CREATE TABLE IF NOT EXISTS refunds (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                source TEXT NOT NULL,
                amount DECIMAL(19,2) NOT NULL,
                date DATE NOT NULL,
                debtor_id UUID NOT NULL REFERENCES "debtors" ("id")
              );
            `;

    console.log(`Created "refunds" table`);

    return { createTable };
  } catch (error) {
    console.error("Error seeding refunds:", error);
    throw error;
  }
}

// === REMINDERS === //
async function seedReminders(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "reminders" table if it doesn't exist
    const createTable = await client.sql`
              CREATE TABLE IF NOT EXISTS reminders (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                comment TEXT NOT NULL,
                date DATE NOT NULL,
                debtor_id UUID NOT NULL REFERENCES "debtors" ("id")
              );
            `;

    console.log(`Created "reminders" table`);

    return { createTable };
  } catch (error) {
    console.error("Error seeding reminders:", error);
    throw error;
  }
}

// === MAIN === //
async function main() {
  // Connection to the Database
  const client = await db.connect();

  await seedStatus();
  await seedAvatars();
  await seedUsers();
  await seedDebtors();
  await seedInvoices();
  await seedRefunds();
  await seedReminders();

  // Disconnect from Database
  await client.end();
}

main().catch((error) => {
  console.error(
    `An error occured while attempting to see the database:`,
    error
  );
});

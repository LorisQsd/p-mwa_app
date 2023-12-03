const { db } = require("@vercel/postgres");
const { status, avatars, users } = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

// === DROP TABLES === //
async function dropTables(client) {
  try {
    await client.sql`
        DROP TABLE IF EXISTS "status" CASCADE;

        DROP TABLE IF EXISTS "avatars" CASCADE;

        DROP TABLE IF EXISTS "users" CASCADE;

        DROP TABLE IF EXISTS "debtors" CASCADE;

        DROP TABLE IF EXISTS "invoices" CASCADE;

        DROP TABLE IF EXISTS "refunds" CASCADE;

        DROP TABLE IF EXISTS "reminders" CASCADE;
        `;
  } catch (error) {
    console.error("Error seeding status:", error);
    throw error;
  }
}

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

    // Insert data into the "status" table
    const inserteStatus = await Promise.all(
      status.map(
        (stat) => client.sql`
          INSERT INTO status (id, name)
          VALUES (${stat.id}, ${stat.name})
          ON CONFLICT (id) DO NOTHING;
        `
      )
    );

    console.log(`Seeded ${inserteStatus.length} customers`);

    return { createTable, status: inserteStatus };
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

    // Insert data into the "avatars" table
    const insertedAvatars = await Promise.all(
      avatars.map(
        (avatar) => client.sql`
                INSERT INTO avatars (id, url)
                VALUES (${avatar.id}, ${avatar.url})
                ON CONFLICT (id) DO NOTHING;
              `
      )
    );

    console.log(`Seeded ${insertedAvatars.length} customers`);

    return { createTable, avatars: insertedAvatars };
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

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (id, lastname, firstname, email, password, avatar_id)
          VALUES (${user.id}, ${user.lastname}, ${user.firstname}, ${user.email}, ${hashedPassword}, ${user.avatar_id})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return { createTable, users: insertedUsers };
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
  console.log("DB Connect");
  const client = await db.connect();

  console.log("Drop tables if exists");
  await dropTables(client);

  console.log("Seeding...");
  await seedStatus(client);
  await seedAvatars(client);
  await seedUsers(client);
  await seedDebtors(client);
  await seedInvoices(client);
  await seedRefunds(client);
  await seedReminders(client);

  // Disconnect from Database
  console.log("DB Disconnect");
  await client.end();
}

main().catch((error) => {
  console.error(
    `An error occured while attempting to seed the database:`,
    error
  );
});

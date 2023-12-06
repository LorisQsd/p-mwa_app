// These datas are useful only for the seeding of the database
const status = [
  {
    id:"fdd1bc89-f681-4a2a-83db-b62e6fdabdeb",
    name: "En cours",
  },
  {
    id:"db4b7be6-be46-4bc5-adac-e12dd2172c6c",
    name: "Archivé",
  },
];

const avatars = [
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    url: "https://res.cloudinary.com/dztdg3ftd/image/upload/v1698915858/immo%27pros/clcrytgustpvvv4lesiq.webp",
  },
];

const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    lastname: "Doe",
    firstname: "John",
    email: "loris.quesado@hotmail.fr",
    // !!! Password visible so the DB is accessible from this account !!! //
    // Maybe we could make an env variable for the password (only in dev mode to send the seeding) //
    password: "Password123!",
    avatar_id: "3958dc9e-712f-4377-85e9-fec4b6a6442a"
  },
];

module.exports = {
  status,
  avatars,
  users,
};

import express from "express";
import sql from "mssql";
import cors from "cors";

// Dummy news data
const DUMMY_NEWS = [
  {
    id: "n1",
    slug: "will-ai-replace-humans",
    title: "Will AI Replace Humans?",
    image: "ai-robot.jpg",
    date: "2021-07-01",
    content:
      "Since late 2022 AI is on the rise and therefore many people worry whether AI will replace humans. The answer is not that simple. AI is a tool that can be used to automate tasks, but it can also be used to augment human capabilities. The future is not set in stone, but it is clear that AI will play a big role in the future. The question is how we will use it.",
  },
  {
    id: "n2",
    slug: "beaver-plague",
    title: "A Plague of Beavers",
    image: "beaver.jpg",
    date: "2022-05-01",
    content:
      "Beavers are taking over the world. They are building dams everywhere and flooding entire cities. What can we do to stop them?",
  },
  {
    id: "n3",
    slug: "couple-cooking",
    title: "Spend more time together!",
    image: "couple-cooking.jpg",
    date: "2024-03-01",
    content:
      "Cooking together is a great way to spend more time with your partner. It is fun and you get to eat something delicious afterwards. What are you waiting for? Get cooking!",
  },
  {
    id: "n4",
    slug: "hiking",
    title: "Hiking is the best!",
    image: "hiking.jpg",
    date: "2024-01-01",
    content:
      "Hiking is a great way to get some exercise and enjoy the great outdoors. It is also a great way to clear your mind and reduce stress. So what are you waiting for? Get out there and start hiking!",
  },
  {
    id: "n5",
    slug: "landscape",
    title: "The beauty of landscape",
    image: "landscape.jpg",
    date: "2022-07-01",
    content:
      "Landscape photography is a great way to capture the beauty of nature. It is also a great way to get outside and enjoy the great outdoors. So what are you waiting for? Get out there and start taking some pictures!",
  },
];

// MSSQL Configuration
const config = {
  user: "sa", // SQL Server user
  password: "magnus00", // Replace with your actual password
  server: "localhost", // Use appropriate server name
  port: 1433, // Default SQL Server port
  database: "NewDB",
  encrypt: false, // Set to true for Azure or SSL connections
  trustServerCertificate: true, // Allow self-signed certificates for local dev
};

async function initDb() {
  try {
    const pool = await sql.connect(config);

    // Create the table if it doesn't exist
    await pool.query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='news' AND xtype='U')
      CREATE TABLE news (
        id INT IDENTITY(1,1) PRIMARY KEY,
        slug NVARCHAR(255)  NOT NULL,
        title NVARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        date DATE NOT NULL,
        image NVARCHAR(255) NOT NULL
      )
    `);

    // Check if the table is empty
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}

async function insertData() {
  try {
    const pool = await sql.connect(config);

    const insertQuery = `
    INSERT INTO news (slug, title, content, date, image)
    VALUES (@slug, @title, @content, @date, @image)
  `;

    for (const news of DUMMY_NEWS) {
      await pool
        .request()
        .input("slug", sql.NVarChar, news.slug)
        .input("title", sql.NVarChar, news.title)
        .input("content", sql.Text, news.content)
        .input("date", sql.Date, news.date)
        .input("image", sql.NVarChar, news.image)
        .query(insertQuery);
    }

    console.log("Dummy data inserted successfully.");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    sql.close();
  }
}

const app = express();
app.use(cors());

// Endpoint to fetch all news
app.get("/news", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.query(`SELECT * FROM news`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// initDb();
// insertData();

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

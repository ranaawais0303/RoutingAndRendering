import { DUMMY_NEWS } from "@/dummy-news";
const sql = require("mssql");

const config = {
  user: "sa", // SQL Server user
  password: "magnus00", // Replace with your actual password
  server: "localhost", // Use appropriate server name
  port: 1433, // Default SQL Server port
  database: "NewDB",
  encrypt: false, // Set to true for Azure or SSL connections
  trustServerCertificate: true, // Allow self-signed certificates for local dev
};

const db = await sql.connect(config);

export const getAllNews = async () => {
  const result = await db.request().query("SELECT * FROM news");
  await new Promise((resolve) => setTimeout(resolve, 5000));
  // throw new Error("Loading meals failed");
  return result.recordset;
};

export const getNewsItem = async (slug) => {
  const result = await db
    .request()
    .input("slug", sql.VarChar, slug)
    .query("SELECT * FROM news WHERE slug = @slug");
  return result.recordset;
};

export const getLatestNews = async () => {
  const result = await db
    .request()
    .query("SELECT TOP 3 * FROM news ORDER BY date DESC");

  await new Promise((resolve) => setTimeout(resolve, 2000));
  return result.recordset;
};

export const getAvailableNewsYears = async () => {
  const query = `
  SELECT DISTINCT FORMAT([date], 'yyyy') AS [year]
  FROM [news]
`;
  const result = await db.query(query);

  // Simulate a 2-second delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Map the result to extract the years
  const years = result.recordset.map((row) => row.year);

  return years;
};

export const getAvailableNewsMonths = async (year) => {
  const pool = await sql.connect(config);
  const query = `
  SELECT DISTINCT FORMAT([date], 'MM') AS [month]
  FROM [news]
  WHERE YEAR([date]) = @year
`;
  const result = await pool
    .request()
    .input("year", sql.VarChar, year) // Assuming 'year' is a string like '2024'
    .query(query);

  const months = result.recordset.map((row) => row.month);

  return months;
};

export const getNewsForYear = async (year) => {
  try {
    const result = await db
      .request()
      .input("year", sql.VarChar, year)
      .query(
        "SELECT * FROM news WHERE YEAR([date]) = @year ORDER BY date DESC"
      );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return result.recordset;
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  }
};

export const getNewsForYearAndMonth = async (year, month) => {
  try {
    const result = await db
      .request()
      .input("year", sql.VarChar, year)
      .input("month", sql.VarChar, month)
      .query(
        `SELECT * 
        FROM news 
        WHERE YEAR([date]) = @year AND MONTH([date]) = @month 
        ORDER BY [date] DESC`
      );

    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(result.recordset, "recordset for year and month");

    return result.recordset;
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  }
};

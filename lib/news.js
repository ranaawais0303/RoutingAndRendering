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

export const getAllNews = async () => {
  const pool = await sql.connect(config);
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const result = await pool.request().query("SELECT * FROM news");
  // throw new Error("Loading meals failed");
  return result.recordset;
};

export function getLatestNews() {
  return DUMMY_NEWS.slice(0, 3);
}

export function getAvailableNewsYears() {
  return DUMMY_NEWS.reduce((years, news) => {
    const year = new Date(news.date).getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
    return years;
  }, []).sort((a, b) => b - a);
}

export function getAvailableNewsMonths(year) {
  return DUMMY_NEWS.reduce((months, news) => {
    const newsYear = new Date(news.date).getFullYear();
    if (newsYear === +year) {
      const month = new Date(news.date).getMonth();
      if (!months.includes(month)) {
        months.push(month + 1);
      }
    }
    return months;
  }, []).sort((a, b) => b - a);
}

export function getNewsForYear(year) {
  return DUMMY_NEWS.filter(
    (news) => new Date(news.date).getFullYear() === +year
  );
}

export function getNewsForYearAndMonth(year, month) {
  return DUMMY_NEWS.filter((news) => {
    const newsYear = new Date(news.date).getFullYear();
    const newsMonth = new Date(news.date).getMonth() + 1;
    return newsYear === +year && newsMonth === +month;
  });
}

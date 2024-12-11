"use client";
import NewsLists from "@/components/news/news-list";
import { DUMMY_NEWS } from "@/dummy-news";
import { useEffect, useState } from "react";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const fetchNews = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:8080/news");
    if (!response.ok) {
      setError("Failed to fetch news");
      setLoading(false);
    }

    setLoading(false);
    const data = await response.json();
    setNews(data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  let newsContent;

  if (news) {
    newsContent = <NewsLists newsItems={news} />;
  }

  return (
    <>
      <h1>News Page</h1>
      {newsContent}
    </>
  );
};

export default NewsPage;

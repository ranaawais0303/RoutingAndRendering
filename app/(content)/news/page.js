import NewsLists from "@/components/news/news-list";

const NewsPage = async () => {
  const response = await fetch("http://localhost:8080/news");

  if (!response.ok) {
    throw new Error(`Failed to fetch news.`);
  }

  const news = await response.json();

  return (
    <>
      <h1>News Page</h1>
      <NewsLists newsItems={news} />
    </>
  );
};

export default NewsPage;

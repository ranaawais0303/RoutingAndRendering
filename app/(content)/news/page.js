import NewsLists from "@/components/news/news-list";
import { getAllNews } from "@/lib/news";

const NewsPage = async () => {
  const news = await getAllNews();

  // if (!response.ok) {
  //   throw new Error(`Failed to fetch news.`);
  // }

  // const news = await response.json();

  return (
    <>
      <h1>News Page</h1>
      <NewsLists newsItems={news} />
    </>
  );
};

export default NewsPage;

import NewsLists from "@/components/news/news-list";
import { getLatestNews } from "@/lib/news";

const LatestNewsPage = async () => {
  const latestNews = await getLatestNews();

  return (
    <>
      <h1>Latest News </h1>
      <NewsLists newsItems={latestNews} />
    </>
  );
};
export default LatestNewsPage;

import NewsLists from "../components/news/news-list";
import { DUMMY_NEWS } from "../dummy-news";

const NewsPage = () => {
  const news = DUMMY_NEWS;

  return (
    <div>
      <h1>News Page</h1>
      <p>This is the news page.</p>
      <NewsLists news={news} />
    </div>
  );
};

export default NewsPage;

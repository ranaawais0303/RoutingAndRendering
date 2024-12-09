import { DUMMY_NEWS } from "@/dummy-news";
import NewsItem from "./news-item";

const NewsLists = () => {
  const newsItems = DUMMY_NEWS;
  return (
    <ul className="news-list">
      {newsItems.map((newz) => (
        <li key={newz.id}>
          <NewsItem {...newz} />
        </li>
      ))}
    </ul>
  );
};

export default NewsLists;

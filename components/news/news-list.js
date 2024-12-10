import { DUMMY_NEWS } from "@/dummy-news";
import NewsItem from "./news-item";
import Link from "next/link";

const NewsLists = ({ newsItems }) => {
  return (
    <ul className="news-list">
      {newsItems.map((news) => (
        <li key={news.id}>
          <NewsItem newsItems={news} />
        </li>
      ))}
    </ul>
  );
};

export default NewsLists;

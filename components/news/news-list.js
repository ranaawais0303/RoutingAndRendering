import NewsItem from "./news-item";

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

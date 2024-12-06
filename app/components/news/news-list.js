import NewsItem from "./news-item";

const NewsLists = ({ news }) => {
  return (
    <div>
      <h1>News Lists</h1>
      <ul>
        {news.map((newz) => (
          <li key={newz.id}>
            <NewsItem {...newz} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsLists;

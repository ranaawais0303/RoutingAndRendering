// import Image from "next/image";
import Link from "next/link";

const NewsItem = ({ newsItems }) => {
  return (
    <div>
      <Link href={`/news/${newsItems.slug}`}>
        <img src={`/images/news/${newsItems.image}`} alt={newsItems.title} />
        <span>{newsItems.title}</span>
      </Link>
    </div>
  );
};

export default NewsItem;

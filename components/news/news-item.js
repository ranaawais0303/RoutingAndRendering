import Image from "next/image";
import Link from "next/link";

const NewsItem = ({ id, title, slug, image, content }) => {
  return (
    <div>
      {/* <h2>{title}</h2> */}
      {/* <Image src={image} alt={title} /> */}
      {/* <p>{content}</p> */}
      <Link href={`news/${slug}`}>
        <img src={`/images/news/${image}`} alt={title} />
        <span>{title}</span>
      </Link>
    </div>
  );
};

export default NewsItem;

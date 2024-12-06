import Image from "next/image";
import Link from "next/link";

const NewsItem = ({ id, title, slug, image, content }) => {
  console.log(title, slug, image, content, "data");
  return (
    <div>
      <h2>{title}</h2>
      {/* <Image src={image} alt={title} /> */}
      <p>{content}</p>
      <Link href={`news/${id}`}>View Details</Link>
    </div>
  );
};

export default NewsItem;

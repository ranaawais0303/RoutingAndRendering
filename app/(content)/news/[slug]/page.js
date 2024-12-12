import { getNewsItem } from "@/lib/news";
import Link from "next/link";

const DetailedPage = async ({ params }) => {
  const newsSlug = params?.slug;
  const news = await getNewsItem(newsSlug);
  const newsItem = news[0];

  console.log(newsItem.slug, newsItem.image, "here are the new news items");

  if (!newsItem) {
    notFound();
  }
  return (
    <article className="news-article">
      <header>
        <Link href={`/news/${newsItem.slug}/image`}>
          <img src={`/images/news/${newsItem?.image}`} alt={newsItem?.title} />
        </Link>
        <h1>{newsItem?.title}</h1>
        <time dateTime={newsItem?.date}>
          {new Date(newsItem.date).toLocaleDateString()}
        </time>
      </header>
      <p>{newsItem?.content}</p>
    </article>
  );
};
export default DetailedPage;

import { getNewsItem } from "@/lib/news";

const { notFound } = require("next/navigation");

const ImagePage = async ({ params }) => {
  const newsSlug = params?.slug;
  const news = await getNewsItem(newsSlug);
  const newsItem = news[0];

  if (!newsItem) {
    console.log(newsItem, "page not found here");
    notFound();
  }
  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem?.image}`} alt={newsItem?.title} />
    </div>
  );
};

export default ImagePage;

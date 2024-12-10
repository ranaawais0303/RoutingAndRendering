const { DUMMY_NEWS } = require("@/dummy-news");
const { notFound } = require("next/navigation");

const ImagePage = ({ params }) => {
  const newsSlug = params?.slug;
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsSlug);

 

  if (!newsItem) {
    notFound();
  }
  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
};

export default ImagePage;

"use client";
const { DUMMY_NEWS } = require("@/dummy-news");
const { notFound, useRouter } = require("next/navigation");

const InterceptedImagePage = ({ params }) => {
  const router = useRouter();

  const newsSlug = params?.slug;
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsSlug);

  if (!newsItem) {
    notFound();
  }
  return (
    <>
      <div className="modal-backdrop" onClick={router.back} />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
};

export default InterceptedImagePage;

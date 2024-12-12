import ModalBackdrop from "@/components/modal-backdrop";
import { getNewsItem } from "@/lib/news";

const { notFound } = require("next/navigation");

const InterceptedImagePage = async ({ params }) => {
  const newsSlug = params?.slug;
  const news = await getNewsItem(newsSlug);
  const newsItem = news[0];

  if (!newsItem) {
    notFound();
  }
  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
};

export default InterceptedImagePage;

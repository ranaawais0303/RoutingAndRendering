import NewsLists from "@/components/news/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import Link from "next/link";

const FilteredNewsPage = ({ params }) => {
  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  let news;
  let links = getAvailableNewsYears();

  // Filter year wise
  if (selectedYear && !selectedMonth) {
    news = getNewsForYear(selectedYear);
    links = getAvailableNewsMonths(selectedYear);
  }

  // Filter month wise
  if (selectedYear && selectedMonth) {
    news = getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }

  let newsContent = <p>no news found for the selected perios. </p>;

  if (news && news.length > 0) {
    newsContent = <NewsLists newsItems={news} />;
  }

  //   const newsItem = getNewsForYear(newsYear);
  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear
                ? `archive/${selectedYear}/${link}`
                : `archive/${link}`;
              console.log(href, "links here is the href");
              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );

  //   return <NewsLists newsItems={newsItem} />;
};
export default FilteredNewsPage;

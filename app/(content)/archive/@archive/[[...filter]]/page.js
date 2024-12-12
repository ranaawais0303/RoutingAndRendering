import NewsLists from "@/components/news/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import Link from "next/link";

const FilteredNewsPage = async ({ params }) => {
  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];
  const availabelNewsYears = await getAvailableNewsYears();
  const availableNewMonths = await getAvailableNewsMonths(selectedYear);

  const newsForYearAndMonth = await getNewsForYearAndMonth(
    selectedYear,
    selectedMonth
  );

  let news;
  let links = availabelNewsYears;

  // Filter year wise
  if (selectedYear && !selectedMonth) {
    const newsForYear = await getNewsForYear(selectedYear);

    news = newsForYear;
    links = availableNewMonths;
  }

  // Filter month wise
  if (selectedYear && selectedMonth) {
    news = newsForYearAndMonth;
    links = [];
  }

  let newsContent = <p>no news found for the selected period. </p>;

  if (news && news.length > 0) {
    console.log(selectedYear, news, "here is the news");

    newsContent = <NewsLists newsItems={news} />;
  }

  if (
    (selectedYear && !availabelNewsYears.includes(selectedYear)) ||
    (selectedMonth && !availableNewMonths.includes(selectedMonth))
  ) {
    throw new Error("Invalid filter");
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;
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

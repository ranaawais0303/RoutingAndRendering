import "../globals.css";
export const metadata = {
  title: "Next.js Page Routing & Rendering",
  description: "Learn how to route to different pages.",
};

export default function MarketingLayout({ children }) {
  return (
    <html>
      <body> {children} </body>
    </html>
  );
  // <main>{children}</main>;
}

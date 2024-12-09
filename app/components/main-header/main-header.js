import Link from "next/link";
import classes from "./main-header.module.css";
import NavLink from "./nav-link";

const MainHeader = () => {
  return (
    <>
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href={"/"}>News</NavLink>
            </li>
            <li>
              <NavLink href="/news">News Lists</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;

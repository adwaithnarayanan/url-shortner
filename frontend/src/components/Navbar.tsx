import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { text: "Home", link: "/" },
  { text: "Show all urls", link: "/show-urls" },
];

const Navbar = () => {
  return (
    <nav className="w-full bg-secondary text-four flex justify-between py-2">
      <h3 className="uppercase text-base font-semibold mx-2">URL shortner</h3>
      <ul className="flex mr-2">
        {NAV_LINKS.map((navLink) => (
          <li key={navLink.text} className="mx-1 hover:underline ">
            <NavLink
              to={navLink.link}
              className={({ isActive }) =>
                `${isActive && "font-medium underline"}`
              }
            >
              {navLink.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

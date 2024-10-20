import { NavLink, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { text: "Home", link: "/" },
  { text: "Show all urls", link: "/show-urls" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const auth = sessionStorage.getItem("accessToken");
  const handleLogout = () => {};

  return (
    <nav className="w-full bg-secondary text-four flex justify-between py-2">
      <h3 className="uppercase text-base font-semibold mx-2">URL shortner</h3>
      <div className="flex mr-4">
        {" "}
        <ul className="flex mr-2">
          {NAV_LINKS.map((navLink) => (
            <li key={navLink.text} className="mx-1 hover:underline">
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
        {auth ? (
          <button className="hover:underline" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button
            className="hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import Impact from "../assets/images/Left Nav Logo Generation.webp";
import useAuth from "../features/realtime/hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ============================================================
  // STATE
  // ============================================================

  const [openMenu, setOpenMenu] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openMobileSearch, setOpenMobileSearch] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  // ============================================================
  // NAVIGATION STYLE
  // ============================================================

  const linkClass = ({ isActive }) =>
    [
      "relative rounded-full px-8 my-auto",
      "text-[clamp(0.5rem,0.75vw,2.25rem)] font-black uppercase tracking-[1.5px]",
      "transition-all duration-200",
      "font-zhoro",
      isActive
        ? "text-marigold shadow-lg"
        : "text-white hover:text-marigold",
    ].join(" ");

  const mobileLinkClass =
    "py-4 text-xl text-white transition-colors hover:text-marigold";

  // ============================================================
  // USER DISPLAY
  // ============================================================

  const displayName =
    user?.fullName ||
    user?.username ||
    user?.email ||
    "User";

  const userInitial = (displayName?.[0] || "U").toUpperCase();

  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      return;
    }

    setOpenMobileSearch(false);
    setOpenMenu(false);
    setOpenAbout(false);
    setOpenUserMenu(false);

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setOpenUserMenu(false);
      setOpenMenu(false);
      setOpenAbout(false);
      setOpenMobileSearch(false);

      navigate("/", {
        replace: true,
      });
    }
  };

  // ============================================================
  // CLOSE MOBILE MENU
  // ============================================================

  const closeMobileMenu = () => {
    setOpenMenu(false);
    setOpenAbout(false);
    setOpenUserMenu(false);
    setOpenMobileSearch(false);
  };

  // ============================================================
  // TOGGLE USER MENU
  // ============================================================

  const toggleUserMenu = () => {
    setOpenUserMenu((previous) => !previous);
    setOpenAbout(false);
  };

  return (
    <div>
      {/* ========================================================
          NAVBAR
      ======================================================== */}

      <nav
        className="
          fixed
          top-0
          left-0
          z-1110
          h-14
          w-full
          border-b
          border-white/10
          backdrop-blur-[25px]
          md:h-[clamp(3.5rem,5vw,9rem)]
        "
      >
        {/* ======================================================
            DESKTOP NAVBAR
        ====================================================== */}

        <div
          className="
            mx-auto
            hidden
            h-full
            w-full
            grid-cols-3
            md:grid
          "
        >
          {/* ====================================================
              LOGO
          ==================================================== */}

          <div className="flex my-auto">
            <img
              src={Impact}
              alt="Impact"
              className="
                mx-[clamp(1.25rem,2vw,3.5rem)]
                h-[clamp(2.5rem,4vw,6.5rem)]
                w-auto
              "
            />
          </div>

          {/* ====================================================
              MENU
          ==================================================== */}

          <div
            className="
              flex
              w-full
              items-center
              justify-center
              gap-[clamp(0.5rem,1.5vw,7.5rem)]
              p-1.5
            "
          >
            {/* HOME */}

            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>

            {/* ABOUT */}

            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>

            {/* MEMORIES */}

            <NavLink to="/memories" className={linkClass}>
              Memories
            </NavLink>
          </div>

          {/* ====================================================
              SEARCH + AUTH
          ==================================================== */}

          <div
            className="
              mx-[clamp(1.25rem,2vw,3.5rem)]
              flex
              items-center
              justify-end
              gap-[clamp(1rem,1.5vw,2.5rem)]
            "
          >
            {/* ==================================================
                SEARCH
            ================================================== */}

            <form
              onSubmit={handleSearch}
              className="
                group
                flex
                h-[clamp(2.5rem,3vw,4rem)]
                w-[clamp(13rem,19vw,28rem)]
                items-center
                rounded-full
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                transition-all
                duration-300
                focus-within:w-[clamp(15rem,22vw,32rem)]
                focus-within:border-marigold/40
                focus-within:bg-white/10
                focus-within:shadow-[0_0_30px_rgba(227,164,25,0.08)]
              "
            >
              {/* SEARCH BUTTON */}

              <button
                type="submit"
                aria-label="Search"
                className="
                  flex
                  h-full
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  text-white/50
                  transition-colors
                  group-focus-within:text-marigold
                  hover:text-marigold
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="6.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                  <path
                    d="M16 16L21 21"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* SEARCH INPUT */}

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search anything..."
                aria-label="Search anything"
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  px-1
                  text-sm
                  font-medium
                  text-white
                  outline-none
                  placeholder:text-white/35
                "
              />

              {/* CLEAR SEARCH */}

              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="
                    mr-2
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    text-white/40
                    transition-all
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                  >
                    <path
                      d="M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    <path
                      d="M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}
            </form>

            {/* ==================================================
                AUTH
            ================================================== */}

            {!user ? (
              <div className="flex items-center gap-2">
                {/* REGISTER */}

                <Link
                  to="/register"
                  className="
                    hidden
                    h-[clamp(2.75rem,3vw,4rem)]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-5
                    text-sm
                    font-semibold
                    text-white
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-marigold/30
                    hover:bg-white/10
                    hover:text-marigold
                    xl:flex
                  "
                >
                  Register
                </Link>

                {/* LOGIN */}

                <Link
                  to="/login"
                  className="
                    group
                    flex
                    h-[clamp(2.75rem,3vw,4rem)]
                    w-[clamp(7rem,7vw,10rem)]
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-linear-to-br
                    from-[rgb(227,164,25)]
                    to-[rgba(227,164,25,0.78)]
                    text-sm
                    font-black
                    text-black
                    shadow-[0_8px_30px_rgba(227,164,25,0.18)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-[0_12px_35px_rgba(227,164,25,0.3)]
                  "
                >
                  <span>Login</span>

                  <svg
                    viewBox="0 0 24 24"
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                    "
                    fill="none"
                  >
                    <path
                      d="M5 12H19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    <path
                      d="M13 6L19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            ) : (
              <div className="relative">
                {/* ==================================================
                    USER BUTTON
                ================================================== */}

                <button
                  type="button"
                  onClick={toggleUserMenu}
                  aria-expanded={openUserMenu}
                  aria-label="Open account menu"
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-2
                    py-2
                    text-left
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:border-white/20
                    hover:bg-white/10
                  "
                >
                  {/* AVATAR */}

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-marigold
                      text-sm
                      font-black
                      text-black
                      shadow-[0_0_20px_rgba(227,164,25,0.2)]
                    "
                  >
                    {userInitial}
                  </div>

                  {/* USER INFO */}

                  <div className="hidden min-w-0 flex-col lg:flex">
                    <span
                      className="
                        max-w-32
                        truncate
                        text-sm
                        font-bold
                        text-white
                      "
                    >
                      {displayName}
                    </span>

                    <span
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[1px]
                        text-white/40
                      "
                    >
                      {user?.role || "USER"}
                    </span>
                  </div>

                  {/* CHEVRON */}

                  <svg
                    viewBox="0 0 24 24"
                    className={`
                      mr-2
                      hidden
                      h-4
                      w-4
                      text-white/40
                      transition-transform
                      duration-300
                      lg:block
                      ${openUserMenu ? "rotate-180" : "rotate-0"}
                    `}
                    fill="none"
                  >
                    <path
                      d="M7 10L12 15L17 10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* ==================================================
                    USER DROPDOWN
                ================================================== */}

                {openUserMenu && (
                  <div
                    className="
                      absolute
                      right-0
                      top-[calc(100%+0.75rem)]
                      z-999
                      w-64
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/10
                      bg-black/95
                      p-2
                      shadow-2xl
                      backdrop-blur-xl
                    "
                  >
                    {/* ACCOUNT */}

                    <div className="px-3 py-3">
                      <div className="mb-3 flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-marigold
                            text-sm
                            font-black
                            text-black
                          "
                        >
                          {userInitial}
                        </div>

                        <div className="min-w-0">
                          <p
                            className="
                              truncate
                              text-sm
                              font-bold
                              text-white
                            "
                          >
                            {displayName}
                          </p>

                          <p
                            className="
                              truncate
                              text-xs
                              text-white/45
                            "
                          >
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      {user?.role && (
                        <span
                          className="
                            inline-flex
                            rounded-full
                            bg-marigold/10
                            px-2.5
                            py-1
                            text-[10px]
                            font-black
                            uppercase
                            tracking-wider
                            text-marigold
                          "
                        >
                          {user.role}
                        </span>
                      )}
                    </div>

                    <div className="my-1 border-t border-white/10" />

                    {/* PROFILE */}

                    <Link
                      to="/profile"
                      onClick={() => setOpenUserMenu(false)}
                      className="
                        flex
                        w-full
                        items-center
                        rounded-xl
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-white/80
                        transition-all
                        hover:bg-white/5
                        hover:text-marigold
                      "
                    >
                      Profile
                    </Link>

                    {/* ADMIN */}

                    {["ADMIN", "SUPER_ADMIN"].includes(user?.role) && (
                      <Link
                        to="/admin"
                        onClick={() => setOpenUserMenu(false)}
                        className="
                          flex
                          w-full
                          items-center
                          rounded-xl
                          px-4
                          py-2.5
                          text-sm
                          font-medium
                          text-white/80
                          transition-all
                          hover:bg-white/5
                          hover:text-marigold
                        "
                      >
                        Admin Panel
                      </Link>
                    )}

                    <div className="my-1 border-t border-white/10" />

                    {/* LOGOUT */}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="
                        flex
                        w-full
                        items-center
                        rounded-xl
                        px-4
                        py-2.5
                        text-left
                        text-sm
                        font-medium
                        text-white/80
                        transition-all
                        hover:bg-red-500/10
                        hover:text-red-400
                      "
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ======================================================
            MOBILE / TABLET NAVBAR
        ====================================================== */}

        <div
          className="
            flex
            h-full
            w-full
            items-center
            justify-between
            px-4
            md:hidden
          "
        >
          {/* LOGO */}

          <div className="flex items-center">
            <img
              src={Impact}
              alt="Impact"
              className="h-10 w-auto"
            />
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-2">
            {/* MOBILE SEARCH */}

            <button
              type="button"
              onClick={() => {
                setOpenMobileSearch((previous) => !previous);
                setOpenUserMenu(false);
              }}
              aria-label="Open search"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                text-white
                transition-all
                hover:bg-white/10
                hover:text-marigold
              "
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />

                <path
                  d="M16 16L21 21"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* HAMBURGER */}

            <button
              type="button"
              onClick={() => {
                setOpenMenu(true);
                setOpenMobileSearch(false);
              }}
              aria-label="Open menu"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                transition
                hover:bg-white/10
              "
            >
              <div className="flex flex-col gap-1.5">
                <span className="h-0.5 w-5 bg-white" />
                <span className="h-0.5 w-5 bg-white" />
                <span className="h-0.5 w-5 bg-white" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================
          MOBILE SEARCH PANEL
      ======================================================== */}

      <div
        className={`
          fixed
          left-0
          right-0
          top-14
          z-1090
          border-b
          border-white/10
          bg-black/95
          px-4
          py-3
          backdrop-blur-xl
          transition-all
          duration-300
          md:hidden
          ${
            openMobileSearch
              ? "translate-y-0 opacity-100"
              : "-translate-y-full pointer-events-none opacity-0"
          }
        `}
      >
        <form
          onSubmit={handleSearch}
          className="
            flex
            h-12
            w-full
            items-center
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-white/5
            focus-within:border-marigold/40
          "
        >
          <button
            type="submit"
            aria-label="Search"
            className="
              flex
              h-full
              w-12
              shrink-0
              items-center
              justify-center
              text-white/50
              transition-colors
              hover:text-marigold
            "
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
            >
              <circle
                cx="11"
                cy="11"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.7"
              />

              <path
                d="M16 16L21 21"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <input
            autoFocus={openMobileSearch}
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search anything..."
            aria-label="Search anything"
            className="
              min-w-0
              flex-1
              bg-transparent
              px-1
              text-sm
              text-white
              outline-none
              placeholder:text-white/35
            "
          />

          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="
                mr-2
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                text-white/40
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
              >
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </form>
      </div>

      {/* ========================================================
          MOBILE OVERLAY
      ======================================================== */}

      <div
        onClick={closeMobileMenu}
        className={`
          fixed
          inset-0
          z-1100
          bg-black/50
          backdrop-blur-[2px]
          transition-opacity
          duration-500
          md:hidden
          ${
            openMenu
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* ========================================================
          MOBILE DRAWER
      ======================================================== */}

      <div
        className={`
          fixed
          top-0
          right-0
          z-1200
          h-screen
          w-[50%]
          max-w-sm
          border-l
          border-white/10
          backdrop-blur-xl
          transition-transform
          duration-300
          ease-out
          ${
            openMenu
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* CLOSE */}

        <div className="flex justify-end p-5">
          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close menu"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-white/5
              text-white
              transition
              hover:bg-white/10
              hover:text-marigold
            "
          >
            X
          </button>
        </div>

        {/* MOBILE MENU */}

        <div className="flex flex-col px-6">
          {/* HOME */}

          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className={mobileLinkClass}
          >
            Home
          </NavLink>

          {/* ABOUT */}

          <div className="flex flex-col">
            <button
              type="button"
              onClick={() =>
                setOpenAbout((previous) => !previous)
              }
              className="
                flex
                w-full
                items-center
                justify-between
                py-4
                text-left
                text-xl
                text-white
              "
            >
              <span>About</span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                className={`
                  h-5
                  w-5
                  transition-transform
                  duration-300
                  ${
                    openAbout
                      ? "rotate-90"
                      : "rotate-0"
                  }
                `}
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              className={`
                ml-4
                overflow-hidden
                border-l
                border-white/10
                pl-4
                transition-all
                duration-300
                ${
                  openAbout
                    ? "max-h-64 opacity-100"
                    : "max-h-0 opacity-0"
                }
              `}
            >
              <Link
                to="/our-generation"
                onClick={closeMobileMenu}
                className="
                  block
                  py-2.5
                  text-sm
                  text-white/70
                  transition-colors
                  hover:text-marigold
                "
              >
                Our Generation
              </Link>

              <Link
                to="/history"
                onClick={closeMobileMenu}
                className="
                  block
                  py-2.5
                  text-sm
                  text-white/70
                  transition-colors
                  hover:text-marigold
                "
              >
                History
              </Link>

              <Link
                to="/committee"
                onClick={closeMobileMenu}
                className="
                  block
                  py-2.5
                  text-sm
                  text-white/70
                  transition-colors
                  hover:text-marigold
                "
              >
                Committee
              </Link>

              <Link
                to="/agenda"
                onClick={closeMobileMenu}
                className="
                  block
                  py-2.5
                  text-sm
                  text-white/70
                  transition-colors
                  hover:text-marigold
                "
              >
                Agenda
              </Link>

              <Link
                to="/memories"
                onClick={closeMobileMenu}
                className="
                  block
                  py-2.5
                  text-sm
                  text-white/70
                  transition-colors
                  hover:text-marigold
                "
              >
                Memories
              </Link>
            </div>
          </div>

          {/* FORUM */}

          <NavLink
            to="/forum"
            onClick={closeMobileMenu}
            className={mobileLinkClass}
          >
            Forum
          </NavLink>

          {/* CONTACT */}

          <NavLink
            to="/contact"
            onClick={closeMobileMenu}
            className={mobileLinkClass}
          >
            Contact
          </NavLink>

          {/* ==================================================
              MOBILE AUTH
          ================================================== */}

          {!user ? (
            <div className="mt-5 flex flex-col gap-3">
              {/* LOGIN */}

              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="
                  flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-linear-to-br
                  from-[rgb(227,164,25)]
                  to-[rgba(227,164,25,0.78)]
                  px-4
                  text-sm
                  font-black
                  text-black
                  shadow-[0_8px_30px_rgba(227,164,25,0.16)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                "
              >
                Login

                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <path
                    d="M13 6L19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* REGISTER */}

              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="
                  flex
                  h-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  text-sm
                  font-semibold
                  text-white
                  backdrop-blur-xl
                  transition-all
                  hover:border-white/20
                  hover:bg-white/10
                  hover:text-marigold
                "
              >
                Create Account
              </Link>
            </div>
          ) : (
            <div className="mt-5">
              {/* MOBILE USER */}

              <button
                type="button"
                onClick={() =>
                  setOpenUserMenu((previous) => !previous)
                }
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-3
                  text-left
                  transition
                  hover:bg-white/10
                "
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-marigold
                      text-sm
                      font-black
                      text-black
                    "
                  >
                    {userInitial}
                  </div>

                  <div className="flex min-w-0 flex-col">
                    <span
                      className="
                        max-w-40
                        truncate
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      {displayName}
                    </span>

                    <span
                      className="
                        text-xs
                        uppercase
                        text-white/55
                      "
                    >
                      {user?.role || "USER"}
                    </span>
                  </div>
                </div>

                <span
                  className={`
                    text-white/60
                    transition-transform
                    duration-300
                    ${
                      openUserMenu
                        ? "rotate-180"
                        : "rotate-0"
                    }
                  `}
                >
                  ⌄
                </span>
              </button>

              {/* MOBILE USER MENU */}

              {openUserMenu && (
                <div
                  className="
                    mt-3
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-black/90
                    p-2
                    shadow-xl
                    backdrop-blur-md
                  "
                >
                  {/* ACCOUNT */}

                  <div className="px-3 py-3">
                    <p
                      className="
                        truncate
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      {displayName}
                    </p>

                    <p
                      className="
                        truncate
                        text-xs
                        text-white/55
                      "
                    >
                      {user?.email}
                    </p>

                    {user?.role && (
                      <p
                        className="
                          mt-1
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-wider
                          text-marigold
                        "
                      >
                        {user.role}
                      </p>
                    )}
                  </div>

                  <div className="my-1 border-t border-white/10" />

                  {/* PROFILE */}

                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="
                      block
                      rounded-xl
                      px-4
                      py-2.5
                      text-sm
                      text-white
                      transition-colors
                      hover:bg-white/5
                      hover:text-marigold
                    "
                  >
                    Profile
                  </Link>

                  {/* ADMIN */}

                  {["ADMIN", "SUPER_ADMIN"].includes(
                    user?.role
                  ) && (
                    <Link
                      to="/admin"
                      onClick={closeMobileMenu}
                      className="
                        block
                        rounded-xl
                        px-4
                        py-2.5
                        text-sm
                        text-white
                        transition-colors
                        hover:bg-white/5
                        hover:text-marigold
                      "
                    >
                      Admin Panel
                    </Link>
                  )}

                  <div className="my-1 border-t border-white/10" />

                  {/* LOGOUT */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      w-full
                      rounded-xl
                      px-4
                      py-2.5
                      text-left
                      text-sm
                      text-white
                      transition-colors
                      hover:bg-red-500/10
                      hover:text-red-400
                    "
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

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

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openDesktopSearch, setOpenDesktopSearch] = useState(false);
  const [openMobileSearch, setOpenMobileSearch] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  // ============================================================
  // NAVIGATION STYLE
  // ============================================================

  const linkClass = ({ isActive }) =>
    [
      "relative rounded-full px-8 my-auto",
      "text-[clamp(0.5rem,0.6vw,1.15rem)] font-black uppercase tracking-[1.5px]",
      "transition-all duration-200",
      "font-visby",
      isActive ? "text-marigold shadow-lg" : "text-white hover:text-marigold",
    ].join(" ");

  // ============================================================
  // USER DISPLAY
  // ============================================================

  const displayName =
    user?.fullName || user?.username || user?.email || "User";

  const userInitial = (displayName?.[0] || "U").toUpperCase();

  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    setOpenUserMenu(false);
    setOpenDesktopSearch(false);
    setOpenMobileSearch(false);

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
      setOpenDesktopSearch(false);
      setOpenMobileSearch(false);

      navigate("/", {
        replace: true,
      });
    }
  };

  // ============================================================
  // TOGGLE USER MENU
  // ============================================================

  const toggleUserMenu = () => {
    setOpenUserMenu((previous) => !previous);
    setOpenDesktopSearch(false);
    setOpenMobileSearch(false);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div>

      {/* ========================================================
          NAVBAR
      ======================================================== */}

      <nav
        className="
          fixed
          inset-x-0
          top-0
          z-1110
          h-20
          w-full
        "
      >

        {/* ======================================================
            DESKTOP NAVBAR
        ====================================================== */}

        {/* MAIN NAVBAR WRAPPER */}

        <div
          className="
            mx-auto
            mt-3
            hidden
            h-30
            w-[calc(100%-3.5rem)]
            max-w-500
            items-center
            gap-10
            md:flex
          "
        >

          {/* ====================================================
              LOGO
          ==================================================== */}

          {/* LOGO CAPSULE */}

          <div
            className="
              flex
              h-22.5
              w-70
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-black/25
              backdrop-blur-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-marigold/30
              hover:bg-white/10
              xl:flex
            "
          >
            <NavLink
              to="/"
              className={linkClass}
              aria-label="Impervious Generation Home"
            >
              <img
                src={Impact}
                alt="Impervious Generation"
                className="h-full w-full object-contain"
              />
            </NavLink>
          </div>

          {/* ====================================================
              MENU
          ==================================================== */}

          <div className="min-w-0 flex-1">

            {/* MAIN NAVBAR PILL */}

            <div
              className="
                flex
                h-22.5
                w-full
                min-w-0
                items-center
                justify-center
                gap-35
                rounded-full
                border
                border-white/20
                bg-black/25
                px-6
                shadow-[0_8px_35px_rgba(0,0,0,0.3)]
                backdrop-blur-sm
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

              {/* GALLERY */}

              <NavLink to="/gallery" className={linkClass}>
                gallery
              </NavLink>

            </div>
          </div>

          {/* ====================================================
              SEARCH + AUTH
          ==================================================== */}

          <div
            className="
              ml-3
              flex
              shrink-0
              items-center
              justify-end
              gap-10
            "
          >

            {/* ==================================================
                SEARCH
            ================================================== */}

            <div className="relative">

              {/* SEARCH ICON */}

              <button
                type="button"
                onClick={() => {
                  setOpenDesktopSearch((previous) => !previous);
                  setOpenUserMenu(false);
                }}
                aria-label="Open search"
                aria-expanded={openDesktopSearch}
                className="
                  flex
                  h-22.5
                  w-22.5
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-black/25
                  text-white/75
                  shadow-[0_5px_20px_rgba(0,0,0,0.2)]
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:border-marigold/50
                  hover:bg-white/10
                  hover:text-marigold
                  hover:shadow-[0_0_20px_rgba(227,164,25,0.12)]
                "
              >
                <svg viewBox="0 0 28 28" className="h-15 w-15" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="4.5"
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

              {/* FLOATING SEARCH PANEL */}

              {openDesktopSearch && (
                <form
                  onSubmit={handleSearch}
                  className="
                    absolute
                    right-0
                    top-[calc(100%+0.75rem)]
                    z-1300
                    flex
                    h-12
                    w-70
                    items-center
                    rounded-full
                    border
                    border-white/20
                    bg-[#242321]/95
                    px-2
                    shadow-[0_12px_40px_rgba(0,0,0,0.4)]
                    backdrop-blur-2xl
                    animate-in
                    fade-in
                    slide-in-from-top-2
                    duration-200
                    focus-within:border-marigold/50
                  "
                >

                  {/* SEARCH BUTTON */}

                  <button
                    type="submit"
                    aria-label="Search"
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      text-marigold
                      transition-colors
                      hover:bg-white/10
                    "
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4.5 w-4.5"
                      fill="none"
                    >
                      <circle
                        cx="10.5"
                        cy="10.5"
                        r="6.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />

                      <path
                        d="M15.3 15.3L20.5 20.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>

                  {/* SEARCH INPUT */}

                  <input
                    autoFocus={openDesktopSearch}
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search anything..."
                    aria-label="Search anything"
                    className="
                      min-w-0
                      flex-1
                      bg-transparent
                      px-2
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
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-white/40
                        transition-colors
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
              )}
            </div>

            {/* ==================================================
                AUTH
            ================================================== */}

            {!user ? (

              <div className="flex items-center gap-10">

                {/* REGISTER */}

                <Link
                  to="/register"
                  className="
                    hidden
                    h-22.5
                    w-42.5
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-black/25
                    px-5
                    text-[clamp(0.5rem,0.6vw,1.15rem)]
                    font-black
                    font-visby
                    uppercase
                    tracking-[1.5px]
                    text-white
                    backdrop-blur-sm
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
                    h-22.5
                    w-42.5
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-black/25
                    px-5
                    text-[clamp(0.5rem,0.6vw,1.15rem)]
                    font-black
                    font-visby
                    uppercase
                    tracking-[1.5px]
                    text-white
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-marigold/30
                    hover:bg-white/10
                    hover:text-marigold
                    xl:flex
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

                {/* USER BUTTON */}

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
                    bg-black/25
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

                {/* USER DROPDOWN */}

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
                        hover:bg-black/25
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
                          hover:bg-black/25
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
            MOBILE TOP NAVBAR
        ====================================================== */}

        <div
          className="
            absolute
            left-3
            right-3
            top-3
            z-[1115]
            flex
            h-[54px]
            items-center
            justify-between
            rounded-[17px]
            border
            border-white/15
            bg-black/90
            px-3
            shadow-[0_8px_30px_rgba(0,0,0,0.4)]
            backdrop-blur-2xl
            md:hidden
          "
        >

          {/* BRAND / SHIELD */}

          <Link
            to="/"
            aria-label="Home"
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-marigold/20
              bg-[#38280d]
              text-marigold
              transition-all
              duration-300
              hover:border-marigold/50
              hover:bg-[#59431b]
            "
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[19px] w-[19px]"
              fill="none"
            >
              <path
                d="M12 2.8L19 5.7V11.1C19 15.5 16.1 19.2 12 21.2C7.9 19.2 5 15.5 5 11.1V5.7L12 2.8Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />

              <path
                d="M9 11.8L11 13.8L15.5 9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>


          {/* RIGHT ACTIONS */}

          <div className="flex items-center gap-4">

            {/* SEARCH */}

            <button
              type="button"
              onClick={() => {
                setOpenMobileSearch((previous) => !previous);
                setOpenUserMenu(false);
              }}
              aria-label="Open search"
              aria-expanded={openMobileSearch}
              className="
                flex
                h-9
                w-8
                items-center
                justify-center
                text-white/75
                transition-all
                duration-200
                hover:text-marigold
              "
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[19px] w-[19px]"
                fill="none"
              >
                <circle
                  cx="10.5"
                  cy="10.5"
                  r="6.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />

                <path
                  d="M15.3 15.3L20.5 20.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </button>


            {!user ? (
              <>

                {/* LOGIN */}

                <Link
                  to="/login"
                  aria-label="Login"
                  className="
                    flex
                    h-9
                    w-8
                    items-center
                    justify-center
                    text-white/75
                    transition-all
                    duration-200
                    hover:text-marigold
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[19px] w-[19px]"
                    fill="none"
                  >
                    <path
                      d="M10 17L15 12L10 7"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M15 12H3"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />

                    <path
                      d="M13 4H19C20.1 4 21 4.9 21 6V18C21 19.1 20.1 20 19 20H13"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>


                {/* REGISTER */}

                <Link
                  to="/register"
                  aria-label="Register"
                  className="
                    flex
                    h-9
                    w-8
                    items-center
                    justify-center
                    text-white/75
                    transition-all
                    duration-200
                    hover:text-marigold
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[19px] w-[19px]"
                    fill="none"
                  >
                    <circle
                      cx="9"
                      cy="8"
                      r="3.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <path
                      d="M3 20C3 16.7 5.7 14 9 14C12.3 14 15 16.7 15 20"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />

                    <path
                      d="M19 8V14M16 11H22"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>

              </>
            ) : (
              <>

                {/* PROFILE */}

                <Link
                  to="/profile"
                  aria-label="Profile"
                  className="
                    flex
                    h-9
                    w-8
                    items-center
                    justify-center
                    text-white/75
                    transition-all
                    duration-200
                    hover:text-marigold
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[19px] w-[19px]"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="3.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <path
                      d="M4 21C4 16.6 7.6 13 12 13C16.4 13 20 16.6 20 21"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>


                {/* LOGOUT */}

                <button
                  type="button"
                  onClick={handleLogout}
                  aria-label="Logout"
                  className="
                    flex
                    h-9
                    w-8
                    items-center
                    justify-center
                    text-white/75
                    transition-all
                    duration-200
                    hover:text-red-400
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[19px] w-[19px]"
                    fill="none"
                  >
                    <path
                      d="M10 17L15 12L10 7"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M15 12H3"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />

                    <path
                      d="M13 4H19C20.1 4 21 4.9 21 6V18C21 19.1 20.1 20 19 20H13"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

              </>
            )}

          </div>
        </div>


        {/* ======================================================
            MOBILE FLOATING SEARCH
        ====================================================== */}

        {openMobileSearch && (
          <form
            onSubmit={handleSearch}
            className="
              fixed
              left-3
              right-3
              top-[4.75rem]
              z-[1120]
              flex
              h-12
              items-center
              rounded-[15px]
              border
              border-white/15
              bg-black/95
              px-3
              shadow-[0_10px_35px_rgba(0,0,0,0.45)]
              backdrop-blur-2xl
              md:hidden
            "
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px] shrink-0 text-marigold"
              fill="none"
            >
              <circle
                cx="10.5"
                cy="10.5"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.7"
              />

              <path
                d="M15.3 15.3L20.5 20.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>

            <input
              autoFocus
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Cari penampilan..."
              aria-label="Cari penampilan"
              className="
                min-w-0
                flex-1
                bg-transparent
                px-3
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
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-white/45
                  hover:bg-white/10
                  hover:text-white
                "
              >
                ×
              </button>
            )}

            <button
              type="button"
              onClick={() => setOpenMobileSearch(false)}
              aria-label="Close search"
              className="
                ml-2
                text-xs
                font-medium
                text-white/50
                hover:text-marigold
              "
            >
              Close
            </button>
          </form>
        )}


        {/* ======================================================
            MOBILE BOTTOM NAVIGATION
        ====================================================== */}

        <div
          className="
            fixed
            bottom-3
            left-3
            right-3
            z-[1115]
            flex
            h-[68px]
            items-center
            justify-around
            gap-2
            rounded-full
            border
            border-white/20
            bg-[#171512]/90
            px-2
            shadow-[0_8px_35px_rgba(0,0,0,0.5)]
            backdrop-blur-2xl
            md:hidden
          "
        >

          {/* HOME */}

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `
                flex
                h-[52px]
                flex-1
                flex-col
                items-center
                justify-center
                gap-1
                rounded-full
                border
                transition-all
                duration-300
                ${
                  isActive
                    ? "border-marigold/40 bg-[#6c563b]/60 text-[#ffe4a0] shadow-[0_0_18px_rgba(227,164,25,0.12)]"
                    : "border-transparent bg-transparent text-white/65 hover:bg-white/5 hover:text-white"
                }
              `
            }
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
            >
              <path
                d="M3.5 10.5L12 3.5L20.5 10.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M5.5 9.5V20H18.5V9.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />

              <path
                d="M9.5 20V14H14.5V20"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
            </svg>

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[1.2px]
              "
            >
              Home
            </span>
          </NavLink>


          {/* ABOUT */}

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `
                flex
                h-[52px]
                flex-1
                flex-col
                items-center
                justify-center
                gap-1
                rounded-full
                border
                transition-all
                duration-300
                ${
                  isActive
                    ? "border-marigold/40 bg-[#6c563b]/60 text-[#ffe4a0] shadow-[0_0_18px_rgba(227,164,25,0.12)]"
                    : "border-transparent bg-transparent text-white/65 hover:bg-white/5 hover:text-white"
                }
              `
            }
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="1.7"
              />

              <path
                d="M12 10.5V16"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />

              <circle
                cx="12"
                cy="7.5"
                r="0.8"
                fill="currentColor"
              />
            </svg>

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[1.2px]
              "
            >
              About
            </span>
          </NavLink>


          {/* GALLERY */}

          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `
                flex
                h-[52px]
                flex-1
                flex-col
                items-center
                justify-center
                gap-1
                rounded-full
                border
                transition-all
                duration-300
                ${
                  isActive
                    ? "border-marigold/40 bg-[#6c563b]/60 text-[#ffe4a0] shadow-[0_0_18px_rgba(227,164,25,0.12)]"
                    : "border-transparent bg-transparent text-white/65 hover:bg-white/5 hover:text-white"
                }
              `
            }
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
            >
              <rect
                x="3.5"
                y="3.5"
                width="17"
                height="17"
                rx="2.5"
                stroke="currentColor"
                strokeWidth="1.7"
              />

              <circle
                cx="8.5"
                cy="8.5"
                r="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />

              <path
                d="M4.5 17L9.5 12L13 15L16 12L20 16"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[1.2px]
              "
            >
              Gallery
            </span>
          </NavLink>

        </div>

      </nav>
    </div>
  );
}

export default Navbar;

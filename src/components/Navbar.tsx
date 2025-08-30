import { useState, useEffect, useRef } from "react";
import {
  IconChevronDown,
  IconChevronUp,
  IconCross,
  IconHamburger,
} from "@components/Icons";

const Navbar = ({ currentPath }: { currentPath: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // Theme toggle state
  const [isDark, setIsDark] = useState(false);

  // Use this to store the previous path for comparison
  const prevPathRef = useRef(currentPath);
  const dropdownRef = useRef<HTMLDivElement>(null);

  type MenuItem = {
    page: string;
    path: string;
    hasDropdown?: boolean;
    dropdownItems?: {
      name: string;
      path: string;
    }[];
  };

  const listMenu: MenuItem[] = [
    { page: "Home", path: "/" },
    { page: "Paket", path: "/paket" },
    // USER THIS IF YOU WANT A DROPDOWN MENU
    // {
    //   page: "Paket",
    //   path: "/paket",
    //   hasDropdown: true,
    //   dropdownItems: [
    //     { name: "Promo", path: "/paket/promo" },
    //     { name: "Domestik", path: "/paket/domestik" },
    //     { name: "Internasional", path: "/paket/internasional" },
    //     { name: "Semua Paket", path: "/paket" },
    //   ],
    // },
    { page: "About", path: "/about" },
    { page: "FAQ", path: "/faq" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) {
      // Special case for "Semua Paket" (/paket)
      if (path === "/paket" && currentPath !== "/paket") {
        const dropdownItem = listMenu
          .find((item) => item.path === "/paket")
          ?.dropdownItems?.find((item) => item.path === currentPath);
        // Only return false if we're on a specific dropdown page
        return !dropdownItem;
      }
      return true;
    }
    return false;
  };

  // Special function to check if a dropdown item is active
  const isDropdownItemActive = (path: string) => {
    // For "Semua Paket", only highlight when exactly on /paket/
    if (path === "/paket") return currentPath === "/paket";
    // For other dropdown items, highlight when the path matches exactly
    return currentPath === path;
  };

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    // Handle dropdown state based on path changes
    if (currentPath !== prevPathRef.current) {
      // Close dropdown when navigating to a new path
      setIsDropDownOpen(false);
      // Update the previous path reference
      prevPathRef.current = currentPath;
    }

    // Check if we should initially open the dropdown based on current path
    // This runs only on component mount
    if (currentPath.startsWith("/paket") && !isDropDownOpen) {
      // We're on a paket page, so highlight the nav item
      // but don't automatically open the dropdown
    }
  }, [currentPath]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropDownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Add effect to prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const toggleDropDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDropDownOpen(!isDropDownOpen);
  };

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Theme Toggle Component
  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-200 dark:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-4"
      aria-label="Toggle dark mode"
    >
      {/* Toggle Circle */}
      <span
        className={`${
          isDark ? "translate-x-6" : "translate-x-1"
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out`}
      />

      {/* Sun Icon */}
      <span
        className={`${
          isDark ? "opacity-0" : "opacity-100"
        } absolute left-1 transition-opacity duration-300`}
      >
        <svg
          className="w-3 h-3 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      </span>

      {/* Moon Icon */}
      <span
        className={`${
          isDark ? "opacity-100" : "opacity-0"
        } absolute right-1 transition-opacity duration-300`}
      >
        <svg
          className="w-3 h-3 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </span>
    </button>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-100 dark:bg-gray-800 shadow-md text-deep-blue dark:text-white"
          : currentPath === "/"
          ? "text-white pt-6"
          : "text-deep-blue dark:text-white bg-gray-100 dark:bg-gray-800 shadow-md pt-0"
      }`}
      aria-label="Breadcrumb"
    >
      <div className="mx-auto sm:px-12 px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 flex items-center gap-x-2">
            <img
              src="/logo.png"
              alt="Logo Badak Gunung - Travel Agency Indonesia"
              className="h-10 w-10"
            />
            <span className="text-xl font-bold hover:cursor-pointer after:content-[''] after:block after:border-b-2 after:transition-all after:duration-300 after:scale-x-0 after:origin-center hover:after:scale-x-100">
              Badak Gunung
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-4">
              {listMenu.map((item, index) => (
                <div
                  key={index}
                  className={`px-3 py-2 after:content-[''] after:block after:border-b after:transition-all after:duration-300 uppercase ${
                    isActive(item.path)
                      ? "after:scale-x-100 font-bold"
                      : "after:scale-x-0 after:origin-center hover:after:scale-x-100 font-semibold"
                  }`}
                >
                  {item.hasDropdown ? (
                    <div ref={dropdownRef}>
                      <button
                        onClick={toggleDropDown}
                        className="inline-flex items-center gap-x-1 hover:cursor-pointer"
                      >
                        {item.page}
                        {isDropDownOpen ? (
                          <IconChevronUp />
                        ) : (
                          <IconChevronDown />
                        )}
                      </button>
                      {isDropDownOpen && (
                        <div className="absolute mt-2 w-48 shadow-lg rounded-xs bg-gray-100 dark:bg-gray-700 z-30">
                          <div className="p-2">
                            {item.dropdownItems?.map((dropdownItem, idx) => (
                              <a
                                key={idx}
                                href={dropdownItem.path}
                                className={`block px-4 py-2 ${
                                  isDropdownItemActive(dropdownItem.path)
                                    ? "text-black dark:text-white font-bold bg-soft-turquoise dark:bg-gray-600"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                                }`}
                              >
                                {dropdownItem.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <a href={item.path}>{item.page}</a>
                  )}
                </div>
              ))}
            </div>

            {/* Theme Toggle for Desktop */}
            {/* <ThemeToggle /> */}
          </div>

          {/* Mobile: Theme Toggle + Menu button */}
          <div className="md:hidden flex items-center">
            {/* <ThemeToggle /> */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 ml-2"
            >
              {isMenuOpen ? <IconCross /> : <IconHamburger />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Slide from right */}
        <div
          className={`fixed md:hidden top-0 left-0 bottom-0 bg-gray-100 dark:bg-gray-800 shadow-lg w-4/5 z-50 transform transition-transform duration-300 ease-in-out text-deep-blue dark:text-white ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-3 border-b-2 border-gray-400 dark:border-gray-600">
            <a href="/" className="flex-shrink-0 flex items-center gap-x-2">
              <img
                src="/logo.png"
                alt="Logo Badak Gunung - Travel Agency Indonesia"
                className="h-10 w-10"
              />
              <span className="text-xl font-bold hover:cursor-pointer after:content-[''] after:block after:border-b-2 after:transition-all after:duration-300 after:scale-x-0 after:origin-center hover:after:scale-x-100">
                Badak Gunung
              </span>
            </a>
          </div>

          <div className="p-4 overflow-y-auto h-full pb-20">
            {listMenu.map((item, index) => (
              <div key={index} className="mt-2 font-medium">
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={toggleDropDown}
                      className={`px-3 py-2 rounded-sm w-full flex items-center justify-between ${
                        isActive(item.path) ? "font-bold" : ""
                      }`}
                    >
                      <span>{item.page}</span>
                      {isDropDownOpen ? <IconChevronUp /> : <IconChevronDown />}
                    </button>
                    {isDropDownOpen && (
                      <ul className="pl-6 py-1 space-y-1 list-disc">
                        {item.dropdownItems?.map((dropdownItem, idx) => (
                          <div key={idx} className="pl-2">
                            <li>
                              <a
                                href={dropdownItem.path}
                                className={`block px-3 py-2 rounded-sm ${
                                  isDropdownItemActive(dropdownItem.path)
                                    ? "bg-gray-300 dark:bg-gray-600 font-bold"
                                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                              >
                                {dropdownItem.name}
                              </a>
                            </li>
                          </div>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.path}
                    className={`block w-full rounded-sm px-3 py-2 ${
                      isActive(item.path)
                        ? "bg-gray-300 dark:bg-gray-600 font-bold"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {item.page}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Overlay for mobile menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

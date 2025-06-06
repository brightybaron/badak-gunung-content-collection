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

  // Change: Initialize dropdown state
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-100 shadow-md text-deep-blue"
          : currentPath === "/"
          ? " text-white pt-6"
          : "text-deep-blue bg-gray-100 shadow-md pt-0"
      }`}
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto sm:px-12 px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 flex items-center gap-x-2">
            <img
              src="/logo.png"
              alt="Logo Badak Gunung - Travel Agency Indonesia"
              className="h-10 w-10"
            />
            <span className="text-xl font-bold  hover:cursor-pointer after:content-[''] after:block after:border-b-2 after:transition-all after:duration-300 after:scale-x-0 after:origin-center hover:after:scale-x-100">
              Badak Gunung
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-auto flex items-center space-x-4">
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
                        <div className="absolute mt-2 w-48 shadow-lg rounded-xs bg-gray-100 z-30">
                          <div className="p-2">
                            {item.dropdownItems?.map((dropdownItem, idx) => (
                              <a
                                key={idx}
                                href={dropdownItem.path}
                                className={`block px-4 py-2 ${
                                  isDropdownItemActive(dropdownItem.path)
                                    ? "text-black font-bold bg-soft-turquoise"
                                    : "text-gray-700 hover:bg-gray-100"
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
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <IconCross /> : <IconHamburger />}
          </button>
        </div>

        {/* Mobile Menu - Slide from right */}
        <div
          className={`fixed md:hidden top-0 left-0 bottom-0 bg-gray-100 shadow-lg w-4/5 z-50 transform transition-transform duration-300 ease-in-out text-deep-blue ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-3 border-b-2 border-gray-400">
            <a href="/" className="flex-shrink-0 flex items-center gap-x-2">
              <img
                src="/logo.png"
                alt="Logo Badak Gunung - Travel Agency Indonesia"
                className="h-10 w-10"
              />
              <span className="text-xl font-bold  hover:cursor-pointer after:content-[''] after:block after:border-b-2 after:transition-all after:duration-300 after:scale-x-0 after:origin-center hover:after:scale-x-100">
                Badak Gunung
              </span>
            </a>
            {/* <button onClick={() => setIsMenuOpen(false)} className="p-2">
              <IconCross />
            </button> */}
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
                                    ? "bg-gray-300 font-bold"
                                    : ""
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
                      isActive(item.path) ? "bg-gray-300 font-bold" : ""
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

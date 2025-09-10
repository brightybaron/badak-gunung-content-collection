import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // --- Theme handling ---
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setIsDark(savedTheme === "dark");
    document.documentElement.classList.add(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Set initial load to false after theme is applied
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100); // Short delay to allow initial setup

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.classList.remove(isDark ? "dark" : "light");
    document.documentElement.classList.add(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Get animation classes based on initial load state
  const getToggleAnimationClasses = () => {
    if (isInitialLoad) {
      return ""; // No animation on initial load
    }
    return "transition-transform duration-300 ease-in-out"; // Animation only after initial load
  };

  const getIconAnimationClasses = () => {
    if (isInitialLoad) {
      return ""; // No animation on initial load
    }
    return "transition-opacity"; // Animation only after initial load
  };

  return (
    <button
      onClick={toggleTheme}
      className="ml-6 relative inline-flex items-center h-8 w-14 rounded-full bg-gray-200 dark:bg-gray-600 transition-colors shadow-md"
    >
      <span
        className={`inline-block w-6 h-6 transform bg-white rounded-full ${getToggleAnimationClasses()} ${
          isDark ? "translate-x-7" : "translate-x-1"
        }`}
      ></span>
      <span
        className={`absolute left-1 ${
          isDark ? "opacity-0" : "opacity-100"
        } ${getIconAnimationClasses()}`}
      >
        <svg
          className="w-6 h-6 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
      <span
        className={`absolute right-1 ${
          isDark ? "opacity-100" : "opacity-0"
        } ${getIconAnimationClasses()}`}
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
      </span>
    </button>
  );
};

export default ThemeSwitcher;

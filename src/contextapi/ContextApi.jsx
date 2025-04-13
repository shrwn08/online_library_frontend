import { createContext, useEffect, useState } from "react";

export const ContextApp = createContext();

export const ProviderApp = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const storedTheme = JSON.parse(localStorage.getItem("theme"));

    if (storedTheme !== null) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    const body = document.querySelector("body");

    if (!theme) {
      body.classList.add("bg-[#222222]");
    } else {
      body.classList.remove("bg-[#222222]");
    }
  }, [theme]);

  const handleThemeBtn = () => {
    setTheme((prev) => !prev);
  };

  const openMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  const closeMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  return (
    <ContextApp.Provider
      value={{
        mobileMenuOpen,
        openMobileMenu,
        closeMobileMenu,
        theme,
        handleThemeBtn,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};

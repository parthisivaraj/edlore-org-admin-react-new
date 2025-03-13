import React from "react";
import { ThemeContext } from "./themeContext";
import {  Switch } from '@headlessui/react';


const ThemeToggler = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div className="transition duration-500 ease-in-out rounded-full bg-red">
       <Switch
          checked={theme}
          onClick={(e) => setTheme( e.target.checked || theme === "dark" ? "light" : "dark")}
          className={`${theme === "dark" ? 'bg-yellow' : 'bg-black3' }
          relative inline-flex h-[25px] w-[55px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75
          `}
        >

          <div className="w-full inline-flex overflow-hidden">
            <div className="w-full flex items-center justify-between relative z-1 px-1">
              <span><img src="../assets/icons/icon-light.svg" alt="icon-light" className="w-[16px] h-[20px]" /></span>
              <span><img src="../assets/icons/icon-dark.svg" alt="icon-dark" className="w-[16px] h-[20px]"  /></span>
            </div>

            <div
              aria-hidden="true"
              className={`${theme === "dark" ? 'translate-x-[30px]' : 'translate-x-0'}
                inline-block absolute z-5 pointer-events-none  h-[21px] w-[21px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out

              `}
            ></div>
          </div>
        </Switch>
    </div>
  );
};

export default ThemeToggler;
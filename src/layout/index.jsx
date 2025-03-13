import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '../theme/themeContext';

import Header from './header';
import Sidebar from './sidebar';

const Layout = ({ children }) => {

  const [parentCollapseId, setParentCollapseId] = useState(null);
  useEffect(() => {
    const isCollapsed = localStorage.getItem('collapseId');
    setParentCollapseId(isCollapsed);
  }, [parentCollapseId])

  // Sidebar Toggler
  const [showSidebar, setShowSidebar] = useState(false);
  const expandContent = (sidebar) => {
    setShowSidebar(sidebar);
  }

  return (
    <>
      {/* <ThemeProvider> */}
      <Header />

      <main className={`ed`}>
        <div className='w-full flex items-start justify-between'>

          <Sidebar expandContent={expandContent} parentCollapseId={parentCollapseId} />

          <div className={`w-full p-4 pt-20 overflow-hidden transition-all ${showSidebar ? 'ml-[110px]' : 'ml-[200px] xl:ml-[290px]'}`}>

            {children}

          </div>
        </div>
      </main>

      {/* </ThemeProvider> */}
    </>

  )
}
export default Layout;
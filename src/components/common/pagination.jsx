import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const PaginatedItems = ({ itemsPerPage, handlePageClick, pageCount, current_page, totalEntries }) => {
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
  }, []);

  return (
    <>
      {totalEntries > itemsPerPage &&
        <div className='flex items-center justify-end'>
          {/* <Items currentItems={currentItems} /> */}
          <ReactPaginate
            className='flex items-center bg-[#F2F3F5] dark:bg-darkMainBg dark:text-gray2 rounded-md'
            pageClassName='rounded-md text-sm font-medium text-black3 text-opacity-80 dark:text-gray3 hover:text-primary select-none mx-[6px] duration-300 transition-all hover:transition-all'
            activeLinkClassName='flex flex-col items-center justify-center bg-primary text-white font-medium w-[30px] h-[40px] select-none duration-300 transition-all hover:transition-all'
            previousClassName="text-xs font-medium bg-[#F2F3F5] dark:bg-darkMainBg text-black3 text-opacty-80 dark:text-gray2 dark:text-opacity-70 py-2 px-3 ml-1 duration-300 transition-all hover:transition-all select-none"
            nextClassName="text-xs font-medium bg-[#F2F3F5] dark:bg-darkMainBg text-black3 text-opacty-80  dark:text-gray2 dark:text-opacity-70 py-2 px-3 mr-1 duration-300 transition-all hover:transition-all select-none"
            disabledClassName="text-xs font-medium text-black2 text-opacity-50 rounded-md cursor-not-allowed "
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={Number(pageCount)}
            previousLabel="Previous"
            renderOnZeroPageCount={false}
            forcePage={current_page ? current_page - 1 : null}
          />
        </div>
      }
    </>
  );
}
export default PaginatedItems;
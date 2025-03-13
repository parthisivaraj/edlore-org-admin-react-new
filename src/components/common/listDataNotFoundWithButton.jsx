import React, { useState, useEffect } from 'react';
import PermissionsMessage from './permissionsMessage';

const ListDataNotFoundWithButton = ({ searchQuery, listLength, filters, colSpan, additionalTextClassName, noDataFoundText, addNewListData, buttonText, permissionsCondition, permissionsTitle, permissionsMessage }) => {

  // Applied Filters
  const [filterApplied, setFilterApplied] = useState(false);
  useEffect(() => {
    filters && filters.selected_filters && Object.keys(filters.selected_filters).forEach(function (key) {
      if (filters.selected_filters[key].length > 0) {
        setFilterApplied(true);
      }
    });
  }, [filters]);

  return (
    <>
      {searchQuery !== "" && listLength <= 0 ?
        <tr>
          <td colSpan={colSpan} align="center" className="text-danger p-8">No Search Results Found</td>
        </tr>
      : filterApplied ?
        <tr>
          <td colSpan={colSpan} align="center" className="text-danger p-8">No Filter Results Found</td>
        </tr>
      :
        <tr>
          <td colSpan={colSpan} align="center">
            {!permissionsCondition ?
              <PermissionsMessage
                additionalClassName="py-[200px]"
                title={permissionsTitle}
                message={permissionsMessage}
              />
            :
              <div className={`text-center my-40 ${additionalTextClassName}`}>
                <div className="text-xl text-black2 dark:text-gray2 font-medium mb-4">{noDataFoundText}</div>
                <button type="button" onClick={() => addNewListData()} className="text-sm 2xl:text-base bg-primary text-white font-medium border border-primary py-2 px-6 rounded-full shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none">
                  {buttonText} +
                </button>
              </div>
            }
          </td>
        </tr>
      }
    </>
  );
}

export default ListDataNotFoundWithButton;
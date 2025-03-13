import React, { useState, useEffect } from 'react';

const ListDataNotFound = ({ searchQuery, listLength, filters, colSpan }) => {
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
          <td colSpan={colSpan} align="center" className="text-danger p-8">No Records Found</td>
        </tr>
      }
    </>
  );
}

export default ListDataNotFound;
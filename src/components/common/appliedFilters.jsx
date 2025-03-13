import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';


const AppliedFilters = ({ model_id, page, limit, search, sort, sorting, filters, getActionList, id }) => {
  const dispatch = useDispatch();
  const [showApplied, setShowApplied] = useState(false);

  useEffect(() => {
    let theSelected = 0
    filters && filters.selected_filters && Object.keys(filters.selected_filters).forEach(function (key) {
      if (filters.selected_filters[key].length > 0) {
        setShowApplied(true);
      }
    });
  }, [filters]);

  // Remove from Applied filters
  const removeFromFilter = (param, removeId) => {
    let selected = filters.selected_filters;
    selected[param] = [...selected[param].filter(item => item != removeId)]
    const data = {
      model_id: model_id,
      page: page,
      paginate: true,
      limit: limit,
      search: search,
      sort: sort,
      sorting: sorting,
      filter: selected,
      id: id
    }
    dispatch(getActionList(data))
  }

  return (
    <>
      {showApplied ?
        <div>
          {filters && filters.applicable_filters?.map((item, index) => {
            return (
              <>
                {filters.selected_filters[item.param].length > 0 &&
                  <div className="flex items-start mb-4" key={item.id}>
                    <div className="font-medium mr-2 whitespace-nowrap dark:text-gray2">{item.name}:</div>
                    <div className="flex items-center flex-wrap">
                      {item.items.map((individualtem, index) => {
                        if (filters.selected_filters[item.param] && filters.selected_filters[item.param].length > 0 && filters.selected_filters[item.param].includes(individualtem.id) && filters.selected_filters[item.param].length > 0) {
                          return (
                            <>
                              <div key={individualtem.id} className="flex items-center bg-gray4 dark:bg-opacity-20 dark:text-gray2 border border-blue2 dark:border-opacity-20 rounded-full px-3 py-[3px] text-sm mx-1 mb-2">
                                <div className="max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap block">{individualtem.title}</div>
                                <button onClick={(e) => { removeFromFilter(item.param, individualtem.id) }} type="button" className="ml-3 text-[18px] font-bold focus:outline-0 focus-visible:outline-0">&times;</button>
                              </div>
                            </>
                          )
                        }
                      })}
                    </div>
                  </div>
                }
              </>
            )

          })}
        </div>
        :
        ""
      }
    </>
  )
}
export default AppliedFilters;
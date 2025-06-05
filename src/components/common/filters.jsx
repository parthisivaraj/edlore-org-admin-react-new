import { Popover } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const Filters = ({
  getListAction,
  filters,
  additionalClassName,
  additionalDialogClassName,
  model_id,
  limit,
  search,
  sort,
  sorting,
  id,
}) => {
  const dispatch = useDispatch();
  // States
  const [showFilterBox, setShowFilterBox] = useState(false);

  const filterBoxToggle = () => {
    setShowFilterBox(true);
  };

  const [state, setState] = useState({
    selected: {},
  });

  // Dispatch Filters
  useEffect(() => {
    filters &&
      filters.selected_filters &&
      setState((prevProps) => ({
        ...prevProps,
        selected: filters.selected_filters,
      }));
  }, [filters && filters.selected_filters]);

  // Clear all Filters
  const clearAllFilters = () => {
    const data = {
      page: 0,
      paginate: true,
      limit: limit,
      search: search ? search : "",
      filter: {},
      id: id,
      model_id: model_id,
      sort: sort,
      sorting: sorting,
    };
    dispatch(getListAction(data));
  };

  // Apply Filters
  const applyFilter = () => {
    setShowFilterBox(!showFilterBox);
    const data = {
      page: 0,
      paginate: true,
      limit: limit,
      search: search ? search : "",
      sort: sort,
      id: id,
      sorting: sorting,
      filter: state.selected,
      model_id: model_id,
    };
    dispatch(getListAction(data));
  };

  // OnChange
  const onChangeHandler = (event, id, param) => {
    let selected = state.selected;
    if (event.target.checked) {
      selected[event.target.name] = [
        ...(selected[event.target.name] || []),
        id,
      ];
    } else {
      selected[event.target.name] = [
        ...selected[event.target.name].filter((item) => item != id),
      ];
    }
    setState((prevProps) => ({
      ...prevProps,
      selected: selected,
    }));
  };

  return (
    <>
      <Popover className={`relative ml-auto xl:mt-auto ${additionalClassName}`}>
        <Popover.Button
          type="button"
          onClick={() => filterBoxToggle()}
          className="relative focus:outline-0 focus-visible:outline-0"
          title="Filter"
        >
          <img
            src="/assets/icons/icon-filter.svg"
            alt="icon-filter"
            className="dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
          />
        </Popover.Button>

        {showFilterBox && (
          <Popover.Panel>
            <div className="absolute right-0 z-[100] w-[350px] bg-white dark:bg-darkBg px-2 py-2 mt-3 border border-black2 border-opacity-10 dark:border-darkBg rounded-xl shadow-lg dark:shadow-none ring ring-gray4 ring-opacity-30 dark:ring-1 dark:ring-gray1 focus:outline-none">
              <div className="flex items-center justify-between bg-white dark:bg-darkBg px-2 py-3 border-b border-gray2 dark:border-opacity-20">
                <button
                  onClick={() => clearAllFilters()}
                  type="button"
                  className="text-sm text-black2 dark:text-gray2 font-medium transition-all duration-300 hover:text-danger hover:transition-all hover:duration-300 focus:outline-0"
                >
                  Clear all
                </button>
                <button
                  type="button"
                  onClick={() => applyFilter()}
                  className="text-sm text-primary text-opacity-80  font-semibold uppercase transition-all duration-300 hover:text-opacity-100 hover:transition-all hover:duration-300 focus:outline-0"
                >
                  Apply
                </button>
              </div>
              <div className="max-h-[400px] overflow-y-scroll scrollbar-none">
                {filters &&
                filters.applicable_filters &&
                filters.applicable_filters.length > 0 ? (
                  <>
                    {filters.applicable_filters.map((filter, i) => {
                      return (
                        <div
                          key={i}
                          className="flex border-b border-gray2 last-of-type:border-none dark:border-opacity-20 py-4 px-1"
                        >
                          <div className="w-[35%] text-base font-medium dark:text-gray2">
                            {filter.name}
                          </div>

                          <div className="w-[65%] pr-4 max-h-[260px] overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                            {filter &&
                              filter.items.map((item, index) => {
                                return (
                                  <div
                                    key={item.id}
                                    className="border-b border-dotted border-gray3 border-opacity-30 last-of-type:border-none py-[10px]"
                                  >
                                    <label
                                      htmlFor={filter.param + "_" + item.id}
                                      className="flex items-center text-sm dark:text-opacity-75 hover:text-opacity-100 transition-all hover:transition-all cursor-pointer select-none"
                                    >
                                      <input
                                        type="checkbox"
                                        name={filter.param}
                                        id={filter.param + "_" + item.id}
                                        className="appearance-none"
                                        onChange={(e) =>
                                          onChangeHandler(
                                            e,
                                            item.id,
                                            filter.param,
                                          )
                                        }
                                        checked={
                                          state.selected[filter.param] &&
                                          state.selected[filter.param].length >
                                            0 &&
                                          state.selected[filter.param].includes(
                                            item.id,
                                          )
                                        }
                                      />
                                      {state.selected[filter.param] &&
                                      state.selected[filter.param].length > 0 &&
                                      state.selected[filter.param].includes(
                                        item.id,
                                      ) ? (
                                        <img
                                          src="/assets/icons/icon-tick-blue.svg"
                                          alt="icon-tick-blue"
                                          className="w-3 h-3"
                                        />
                                      ) : (
                                        <img
                                          src="/assets/icons/icon-tick-black.svg"
                                          alt="icon-tick-dark"
                                          className="w-3 h-3 opacity-30 dark:invert"
                                        />
                                      )}
                                      <span
                                        className={`ml-2 capitalize  max-w-[140px] text-ellipsis whitespace-nowrap overflow-hidden
                                    ${
                                      state.selected[filter.param] &&
                                      state.selected[filter.param].length > 0 &&
                                      state.selected[filter.param].includes(
                                        item.id,
                                      )
                                        ? "text-black3 dark:text-gray4"
                                        : "text-gray3 text-opacity-60"
                                    }`}
                                        title={item}
                                      >
                                        {item.title}
                                      </span>
                                    </label>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="text-danger text-center px-5 py-10">
                    No Filter Options Found
                  </div>
                )}
              </div>
            </div>
          </Popover.Panel>
        )}
      </Popover>
    </>
  );
};
export default Filters;

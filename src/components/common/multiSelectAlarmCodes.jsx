import React, { useState, useEffect } from 'react';
import { Disclosure, Combobox } from "@headlessui/react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllAlarmCodes, setErrorCodeModal } from '../../redux/reduxes/errorCodes/errorCodesAction';


const MultiSearchSelectAlarmCodes = ({ options, selectedOptions, setSelectedAlarmCode, showPreview, sectiontitle, showShowPreview, model_id, permissionsWriteCondition }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const alarmCodesList = useSelector(state => state.error_codes.alarmCodesList);

  // Create Error Codes
  const [selected, setSelected] = useState(null);

  // Dispatch Alarm Codes
  useEffect(() => {
    const data = {
      model_id: model_id,
      search: search,
      page: 0,
      paginate: true,
      limit: 10,
      filter: {},
      sort: "",
      sorting: ''
    }
    dispatch(getAllAlarmCodes(data));
  }, [])

  const [search, setSearch] = useState('');
  const setQuery = (searchData) => {
    setSearch(searchData);
    // let newOption = [];
    // const loCaseQry = e.toLowerCase();
    // options.forEach(item => {
    //   if (item.title && item.title.length > 0 && item.title.toLowerCase().match(loCaseQry) && !selectedOptions.includes(item.id)) {
    //     newOption.push(item);
    //   }
    // });
    // setResultSearch(newOption);

    const data = {
      model_id: model_id,
      search: searchData,
      page: 0,
      paginate: true,
      limit: 10,
      filter: {},
      sort: "",
      sorting: ''
    }
    dispatch(getAllAlarmCodes(data));
  }

  // Add to Selected Options
  const addToselected = (id) => {
    setSelectedAlarmCode([...selectedOptions, { id: id.id, title: id.title }]);
  }

  // Remove from the added Items
  const removeFromSelected = (id) => {
    setSelectedAlarmCode(selectedOptions.filter(selectedOptionId => selectedOptionId != id))
  }

  // Filter the Options
  // const [filteredOptions, setFilteredOptions] = useState([]);
  // useEffect(() => {
  //   options && options.length > 0 && setFilteredOptions(options.filter(opt => !selectedOptions.includes(opt.id)))
  // }, [selectedOptions, options]);

  const getTheName = (id) => {
    let name = "";
    options && options.length > 0 && options.forEach(item => {
      if (id == item.id) {
        name = item.title;
      }
    })
    return name
  }

  const createNewForMultiSelect = (stat) => {
    const data = {
      error_type: "alarm_codes",
      codeId: "",
      show: true,
    }
    dispatch(setErrorCodeModal(data));
  }

  const showTheDetails = (title, mod_id, selected_id) => {
    const data = {
      error_type: "alarm_codes",
      codeId: selected_id,
      show: true,
    }
    dispatch(setErrorCodeModal(data));
  }
  // Backdrop that stops from Closing the Modal
  const handleModalBackdrop = () => { }
  const filteredCodes = (alarmCodesList) => {
    let codes = []
    selectedOptions.forEach(d => {
      codes.push(d.id)
    });
    const alarm = alarmCodesList.filter(x => !codes.includes(x.id))
    return alarm;
  }
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex items-center w-full text-black dark:text-gray2 py-3 border-b border-gray2 dark:border-opacity-50 round transition-all hover:opacity-100 hover:transition-all">
            <span className='font-medium  ml-1'>{sectiontitle}s</span>
            <span className="ml-auto">
              <img src="../assets/icons/icon-arrow-down.svg" alt="icon-arrow-down" className={`w-6 h-6 transition-all dark:invert ${open ? 'rotate-180 transition-all' : ''}`} />
            </span>
          </Disclosure.Button>
          <Disclosure.Panel className="bg-gray3 bg-opacity-10 rounded-sm mt-2 p-5">
            <div className="flex items-center mb-3">
              <div className="text-base text-black dark:text-gray2 font-medium">Select existing {sectiontitle}s</div>

              {permissionsWriteCondition &&
                <button type="button" onClick={() => createNewForMultiSelect(sectiontitle)} className="ml-auto text-sm font-medium dark:text-gray2 opacity-80 hover:opacity-100 transition-all duration-300 hover:transition-all hover:duration-300 focus:outline-0">+ Create New {sectiontitle}</button>
              }
            </div>

            <>
              {/* Selected Options */}
              <ul className='flex items-center flex-wrap mb-2'>
                {selectedOptions.length > 0 && selectedOptions.map((selected, index) => (
                  <li key={index} className='flex items-center bg-primary text-white dark:text-gray2 text-xs py-1 px-3 rounded-full mr-2 mb-2'>
                    {/* {getTheName(selected)} */}
                    <p className='cursor-pointer' title="View" onClick={() => showTheDetails(sectiontitle, model_id, selected)}>
                      {selected.title}
                    </p>
                    <span className='ml-3 cursor-pointer'>
                      <img onClick={() => removeFromSelected(selected)} src="../assets/icons/icon-cancel.svg" alt="icon-delete" className='w-[8px] h-[8px] invert hover:invert-0 transition-all duration-300 hover:transition-all' />
                    </span>
                  </li>
                ))}
              </ul>

              {/* Options */}
              <Combobox value={selected} onChange={setSelected} className="w-full">
                <div className='w-full'>
                  <div className="relative w-full flex items-center justify-between">
                    <Combobox.Input
                      //displayValue={(option) => option.value}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder={`Select ${sectiontitle}s`}
                      className="bg-white dark:bg-darkBg dark:text-gray2 w-full h-full px-4 py-3 border border-gray2 dark:border-opacity-50 rounded-md focus:outline-0 focus-visible:border focus-visible:border-secondary"
                    />
                    <Combobox.Button className='flex justify-end absolute right-2 bottom-3 w-full'>
                      <img src="../assets/icons/icon-arrow-down.svg" alt="icon-arrow" />
                    </Combobox.Button>
                  </div>

                  <Combobox.Options className="px-2 py-2 bg-white dark:bg-darkBg dark:text-gray2 max-h-[200px] overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                    <>
                      {alarmCodesList && alarmCodesList.length > 0 ? filteredCodes(alarmCodesList).map((option, index) => {
                        return (
                          <div key={option.id} className="flex items-center justify-between">
                            <Combobox.Option onClick={() => addToselected(option)} className="w-full first-letter:capitalize px-2 mb-2 cursor-pointer">
                              <div className="text-sm">{option.title}</div>
                            </Combobox.Option>
                            {/* {showShowPreview &&
                              <button onClick={() => showPreview(sectiontitle, option.id, true)} type='button' className='text-sm text-primary opacity-80 underline mr-5 transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 focus:outline-0'>Preview</button>
                            } */}
                          </div>
                        )
                      }) :
                        <div className='text-center text-danger py-5'>No options found</div>
                      }
                    </>
                  </Combobox.Options>
                </div>
              </Combobox>
            </>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default MultiSearchSelectAlarmCodes;
import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerCustom = ({ onChangeDatePicker, selected }) => {
  const [startDate, setStartDate] = useState(selected);
  useEffect(() => {
    setStartDate(selected);
  }, [selected]);
  const onChange = (d) => {

    setStartDate(d);
    onChangeDatePicker(d);
  }
  return (
    <DatePicker
      selected={new Date(startDate)}
      onChange={(date) => onChange(date)}
      className="w-full bg-gray text-black2  border border-gray2 rounded-lg py-3 px-4 mt-1 focus:outline-none focus:border-secondary z-[1000]"
    />
  );
}

export default DatePickerCustom;
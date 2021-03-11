import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormattedMessage } from "react-intl";
import IconTriangleDown from "../icons/iconTriangleDown";
import { InputWrapperDate, TitleDate } from "../input/style";
const InputDataPicker = ({ title, date, onChangeDate }) => {
  const [startDate, setStartDate] = useState(date ?? new Date());
  const onSelectDate = (date) => {
    setStartDate(date);
    // console.log(date.getDate/);
  };
  return (
    <InputWrapperDate>
      <DatePicker id="idInput" selected={startDate} onChange={onSelectDate} />
      <TitleDate htmlFor="idInput">{title && <FormattedMessage id={title} />}</TitleDate>
      <IconTriangleDown />
    </InputWrapperDate>
  );
};

export default InputDataPicker;

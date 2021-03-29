import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormattedMessage } from "react-intl";
import IconTriangleDown from "../icons/iconTriangleDown";
import { InputWrapperDate, TitleDate } from "../input/style";
import moment from "moment";
const InputDataPicker = ({ title, date, onChangeDate }) => {
  const onSelectDate = (date) => {
    onChangeDate({ name: "dob", value: moment(date).format("DD/MM/YYYY") });
  };
  const fr = date ? moment(date, "DD/MM/YYYY").toDate() : moment(new Date()).toDate();
  return (
    <InputWrapperDate>
      <DatePicker dateFormat="dd/MM/yyyy" id="idInput" selected={fr} onChange={onSelectDate} />
      <TitleDate htmlFor="idInput">{title && <FormattedMessage id={title} />}</TitleDate>
      <IconTriangleDown />
    </InputWrapperDate>
  );
};

export default InputDataPicker;

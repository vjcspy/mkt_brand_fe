import React from "react";
import { ListConditionWrapper } from "./style";
const ListCondition = ({ listCondition }) => {
  return (
    <>
      <h3>Điều kiện áp dụng</h3>
      <ListConditionWrapper>
        {listCondition?.map((item, index) => (
          <li key={index}>
            <h5>{item}</h5>
          </li>
        ))}
      </ListConditionWrapper>
    </>
  );
};

export default ListCondition;

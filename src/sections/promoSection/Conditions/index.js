import React from "react";
import { FormattedMessage } from "react-intl";
import { Title } from "../../../components/list-restaurant/style";
import { ListConditionWrapper } from "./style";
const ListCondition = ({ listCondition }) => {
  return (
    <>
      <Title>
        <FormattedMessage id="promo.condition_apply" />
      </Title>
      {/* <ScrollShowContent> */}
      <ListConditionWrapper>
        {listCondition?.map((item, index) => (
          <li key={index}>
            <p>{item}</p>
          </li>
        ))}
      </ListConditionWrapper>
      {/* </ScrollShowContent> */}
    </>
  );
};

export default ListCondition;

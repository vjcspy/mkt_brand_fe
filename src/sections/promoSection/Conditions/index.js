import React from "react";
import { FormattedMessage } from "react-intl";
import { Title } from "../../../components/list-restaurant/style";
import ScrollShowContent from "../../../components/scroll-show-content";
const ListCondition = ({ condition }) => {
  return (
    <>
      <Title>
        <FormattedMessage id="promo.condition_apply" />
      </Title>
      <ScrollShowContent key="ListCondition">
        <div dangerouslySetInnerHTML={{ __html: condition }} />
      </ScrollShowContent>
    </>
  );
};

export default ListCondition;

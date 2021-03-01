import React from "react";
import { WrapperFlex, NamePromo, Feature, Description, WrapperButton, ContentField } from "./style";
import Button from "../../../components/button";
import IconTriangleDown from "../../../components/icons/iconTriangleDown";
import { FormattedMessage } from "react-intl";

const PromoInfo = ({ promo, onGetCode, getRestaurant, getCondition }) => {
  return (
    <>
      <NamePromo>{promo.title}</NamePromo>
      <WrapperFlex>
        <h5>
          <FormattedMessage id="promo.location" />
        </h5>
        <ContentField>{promo.location}</ContentField>
      </WrapperFlex>
      <WrapperFlex>
        <h5>
          <FormattedMessage id="promo.date_apply" />
        </h5>
        <ContentField>{promo.timeAvailable}</ContentField>
      </WrapperFlex>
      <WrapperFlex>
        <h5>
          <FormattedMessage id="promo.vouchers" />
        </h5>
        <ContentField>{promo.voucher}</ContentField>
      </WrapperFlex>
      <WrapperFlex>
        <h5>
          <FormattedMessage id="promo.expired" />
        </h5>
        <ContentField>
          {promo.dateExpend} <FormattedMessage id="promo.date" />
        </ContentField>
      </WrapperFlex>
      <WrapperButton>
        <Button onClick={onGetCode}>
          <FormattedMessage id="promo.get_otp" />
        </Button>
      </WrapperButton>
      <h5>
        <FormattedMessage id="promo.content_event" />
      </h5>
      <ContentField>{promo.description}</ContentField>
      <Feature onClick={getRestaurant}>
        <FormattedMessage id="promo.restaurant_apply" />
        <IconTriangleDown width={16} height={16} />
      </Feature>
      <Feature style={{ marginBottom: 0 }} onClick={getCondition}>
        <FormattedMessage id="promo.condition_apply" />
        <IconTriangleDown width={16} height={16} />
      </Feature>
    </>
  );
};

export default PromoInfo;

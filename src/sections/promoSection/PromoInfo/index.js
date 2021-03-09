import React, { useState, useRef, useEffect } from "react";
import { WrapperFlex, NamePromo, Feature, Description, WrapperButton, ContentField, DescriptionPromo } from "./style";
import Button from "../../../components/button";
import IconTriangleDown from "../../../components/icons/iconTriangleDown";
import { FormattedMessage } from "react-intl";
import useIframeResize from "../../../hooks/useWindowResize/useIframeResize";

const PromoInfo = ({ promo, onGetCode, onViewMyPromo, hadGetCode, getRestaurant, getCondition }) => {
  const [openDescription, setOpenDescription] = useState(false);
  const [showButtonHide, setShowButtonHide] = useState(false);
  const refShow = useRef();
  const [{ width }] = useIframeResize();

  useEffect(() => {
    if (refShow.current) {
      if (refShow.current.scrollHeight > refShow.current.clientHeight) {
        setShowButtonHide(true);
      } else {
        setShowButtonHide(false);
      }
    }
  }, [width]);
  return (
    <>
      <NamePromo>{promo.title}</NamePromo>
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
        {hadGetCode ? (
          <Button onClick={onViewMyPromo}>
            <FormattedMessage id="successRegister.view_my_promo" />
          </Button>
        ) : (
          <Button onClick={onGetCode}>
            <FormattedMessage id="promo.get_otp" />
          </Button>
        )}
      </WrapperButton>
      <h5>
        <FormattedMessage id="promo.content_event" />
      </h5>
      {!hadGetCode && (
        <>
          <DescriptionPromo ref={refShow} onClick={() => setOpenDescription(true)} open={openDescription}>
            {promo.description}{" "}
            {showButtonHide && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDescription(false);
                }}
              >
                Ẩn bớt
              </span>
            )}
          </DescriptionPromo>

          <Feature onClick={getRestaurant}>
            <FormattedMessage id="promo.restaurant_apply" />
            <IconTriangleDown width={16} height={16} />
          </Feature>
          <Feature style={{ marginBottom: 0 }} onClick={getCondition}>
            <FormattedMessage id="promo.condition_apply" />
            <IconTriangleDown width={16} height={16} />
          </Feature>
        </>
      )}
    </>
  );
};

export default PromoInfo;

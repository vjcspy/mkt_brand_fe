import React, { useState, useRef, useEffect } from "react";
import { WrapperFlex, NamePromo, Feature, Description, WrapperButton, ContentField, DescriptionPromo } from "./style";
import Button from "../../../components/button";
import IconTriangleDown from "../../../components/icons/iconTriangleDown";
import { FormattedMessage } from "react-intl";
import useIframeResize from "../../../hooks/useWindowResize/useIframeResize";
import Link from "next/link";
import { useSelector } from "react-redux";
import { PROMO_FLASH_SALE, PROMO_NORMAL } from "../../../constants";

const PromoInfo = ({ promo, onGetCode, hadGetCode, getRestaurant, getCondition }) => {
  const locale = useSelector((s) => s.get("locale"));
  const [openDescription, setOpenDescription] = useState(false);
  const [showButtonHide, setShowButtonHide] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const refShow = useRef();
  const [{ width }] = useIframeResize();
  const [endDateFlashSale, setEndDateFlashSale] = useState();
  useEffect(() => {
    let timer;
    if (promo?.typeFilter === PROMO_FLASH_SALE) {
      timer = setInterval(() => {
        let time = promo.endDateInTimeStamp * 1000 - new Date().getTime();
        let date = Math.floor(time / (1000 * 60 * 60 * 24));
        let dateConlai = time % (1000 * 60 * 60 * 24);
        let hour = Math.floor(dateConlai / (1000 * 60 * 60));
        let hConlai = dateConlai % (1000 * 60 * 60);
        let minute = Math.floor(hConlai / (1000 * 60));
        let minuteConlai = hConlai % (1000 * 60);
        let second = Math.floor(minuteConlai / 1000);
        setEndDateFlashSale(
          `${date} ${locale === "vi" ? "ngày" : "days"} ${hour < 10 ? "0" + hour : hour}:${
            minute < 10 ? "0" + minute : minute
          }:${second < 10 ? "0" + second : second} `
        );
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [promo]);

  useEffect(() => {
    if (refShow.current) {
      if (refShow.current.scrollHeight > refShow.current.clientHeight) {
        setShouldShow(true);
      } else {
        setShouldShow(false);
      }
    }
  }, [width, promo?.content]);
  return (
    <>
      <NamePromo>{promo?.title}</NamePromo>
      <WrapperFlex>
        <h5>
          <FormattedMessage id="promo.date_apply" />
        </h5>
        <ContentField>{promo?.expireDate}</ContentField>
      </WrapperFlex>

      {promo?.typeFilter === PROMO_NORMAL && (
        <WrapperFlex>
          <h5>
            <FormattedMessage id="promo.vouchers" />
          </h5>
          <ContentField>{promo?.clmIsCashVoucher}</ContentField>
        </WrapperFlex>
      )}
      {promo?.typeFilter === PROMO_FLASH_SALE && (
        <WrapperFlex>
          <h5>
            <FormattedMessage id="promo.expired" />
          </h5>
          <ContentField>{endDateFlashSale}</ContentField>
        </WrapperFlex>
      )}

      <WrapperButton>
        {hadGetCode ? (
          <Link href="/profile/my-promo">
            <Button varian="primary" href="/profile/my-promo">
              <FormattedMessage id="successRegister.view_my_promo" />
            </Button>
          </Link>
        ) : (
          <Button onClick={onGetCode}>
            <FormattedMessage id="promo.get_otp" />
          </Button>
        )}
      </WrapperButton>

      {!hadGetCode && (
        <>
          <h5>
            <FormattedMessage id="promo.content_event" />
          </h5>
          <DescriptionPromo
            ref={refShow}
            onClick={() => {
              setOpenDescription(true);
              setShowButtonHide(true);
            }}
            className={`${openDescription ? "open" : ""}`}
          >
            <div dangerouslySetInnerHTML={{ __html: promo?.content }} />
            {showButtonHide && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setShowButtonHide(false);
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

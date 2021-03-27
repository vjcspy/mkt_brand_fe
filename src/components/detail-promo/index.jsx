import React, { useRef, useState, useEffect } from "react";
import Button from "../button";
import { HeaderDesktop, HeaderMobile, WrapperQcCode, ContentHeader, NameRestaurant } from "./style";
import { FormattedMessage } from "react-intl";
import { ContentInfo, TitleInfo } from "../popup-promo/style";
import IconTriangleDown from "../icons/iconTriangleDown";
import Link from "next/link";
import { DescriptionPromo } from "../../sections/promoSection/PromoInfo/style";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";

const DetailPromo = ({ promo, onShowListRestaurant, onShowListCondition }) => {
  const refShow = useRef();
  const [openDescription, setOpenDescription] = useState(false);
  const [showButtonHide, setShowButtonHide] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [{ width }] = useIframeResize();

  useEffect(() => {
    if (refShow.current) {
      if (refShow.current.scrollHeight > refShow.current.clientHeight) {
        setShouldShow(true);
      } else {
        setShouldShow(false);
      }
    }
  }, [width]);
  return (
    <>
      <HeaderDesktop>
        <WrapperQcCode>
          <img width={82} height={82} src="/images/demo_qc.png" />
        </WrapperQcCode>
        <ContentHeader>
          <h3>{promo?.promotionTitle}</h3>
          <p>
            <FormattedMessage id="profile.promo_popup_send_email" />
          </p>
          <Button size="tiny">
            <FormattedMessage id="profile.promo_reservation" />
          </Button>
        </ContentHeader>
      </HeaderDesktop>

      <HeaderMobile>
        <h3>{promo?.promotionTitle}</h3>
        <WrapperQcCode>
          <img width={82} height={82} src="/images/demo_qc.png" />
        </WrapperQcCode>
        <p>
          <FormattedMessage id="profile.promo_popup_promo_code" />
        </p>
        <h4>{promo?.clmGiftCode}</h4>
        <p className="notify">
          <FormattedMessage id="profile.promo_popup_send_email" />
        </p>
        <Link href="https://booking.ggg.com.vn" passHref>
          <a class="booking-profile" target="_blank" href="https://booking.ggg.com.vn">
            <Button>
              <FormattedMessage id="profile.promo_reservation" />
            </Button>
          </a>
        </Link>
      </HeaderMobile>
      <TitleInfo>
        <FormattedMessage id="popupPromo.content_event" />
      </TitleInfo>

      <ContentInfo>
        <DescriptionPromo
          ref={refShow}
          onClick={() => {
            setOpenDescription(true);
            setShowButtonHide(true);
          }}
          className={`${openDescription ? "open" : ""}`}
        >
          <div dangerouslySetInnerHTML={{ __html: promo?.promotionContent }} />
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
      </ContentInfo>
      <TitleInfo>
        <FormattedMessage id="profile.promo_location" />
      </TitleInfo>
      <ContentInfo>{promo?.location}</ContentInfo>
      <TitleInfo>
        <FormattedMessage id="profile.promo_date_of_promo" />
      </TitleInfo>
      <ContentInfo>
        {promo?.startDate} - {promo?.endDate}
      </ContentInfo>
      <TitleInfo onClick={onShowListRestaurant}>
        <FormattedMessage id="profile.promo_restaurant_apply" />
        <IconTriangleDown width={20} height={20} />
      </TitleInfo>
      <TitleInfo onClick={onShowListCondition}>
        <FormattedMessage id="profile.promo_condition_apply" />
        <IconTriangleDown width={20} height={20} />
      </TitleInfo>
    </>
  );
};

export default DetailPromo;

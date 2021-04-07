import React, { useCallback, useRef, useState, useEffect } from "react";
import Button from "../button";
import {
  HeaderDesktop,
  WrapperQcCode,
  ContentHeader,
  ListRestaurant,
  TitleInfo,
  ContentInfo,
  WrapperInfo,
  HeaderMobile,
} from "./style";
import { FormattedMessage } from "react-intl";
import ScrollShowContent from "../scroll-show-content";
import Popup from "../popup-wrapper";
import ItemRestaurantBooking from "../item-restaurant/item-restaurant-booking";
import Link from "next/link";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import { DescriptionPromo } from "../../sections/promoSection/PromoInfo/style";

const PopupPromo = ({ promo, onClose }) => {
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

  const onClosePopup = useCallback(() => {
    onClose(null);
  }, [onClose]);

  return (
    <>
      <Popup show={true} onClose={onClosePopup}>
        <HeaderDesktop>
          <WrapperQcCode>
            <img width={82} height={82} src="/images/demo_qc.png" />
            <h6 className="promo-code">
              <FormattedMessage id="popupPromo.promoCode" />
            </h6>
            <h6 className="code">{promo?.clmGiftCode}</h6>
          </WrapperQcCode>
          <ContentHeader>
            <h3>{promo?.promotionTitle}</h3>
            <h6>
              <FormattedMessage id="popupPromo.notification" />
            </h6>
            <a className="booking-profile" target="_blank" href="https://booking.ggg.com.vn">
              <Button>
                <FormattedMessage id="popupPromo.reservation_now" />
              </Button>
            </a>
          </ContentHeader>
        </HeaderDesktop>
        <HeaderMobile>
          <WrapperQcCode>
            <img width={82} height={82} src="/images/demo_qc.png" />
            <h6 className="promo-code">
              <FormattedMessage id="popupPromo.promoCode" />
            </h6>
            <h6 className="code">{promo?.clmGiftCode}</h6>
          </WrapperQcCode>
          <ContentHeader>
            <h3>Ă{promo?.promotionTitle}</h3>
            <h6>
              <FormattedMessage id="popupPromo.notification" />
            </h6>
            <Button>
              <Link href="https://booking.ggg.com.vn" passHref>
                <a className="booking-profile" target="_blank" href="https://booking.ggg.com.vn">
                  <Button>
                    <FormattedMessage id="popupPromo.reservation_now" />
                  </Button>
                </a>
              </Link>
            </Button>
          </ContentHeader>
        </HeaderMobile>

        <hr />
        <ScrollShowContent key="popup-promo">
          <WrapperInfo>
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
              <FormattedMessage id="popupPromo.location" />
            </TitleInfo>
            <ContentInfo>{promo?.location}</ContentInfo>

            <TitleInfo>
              <FormattedMessage id="popupPromo.date_apply" />
            </TitleInfo>
            <ContentInfo>
              {promo?.startDate} - {promo?.endDate}
            </ContentInfo>

            <TitleInfo>
              <FormattedMessage id="popupPromo.restaurant_apply" />
            </TitleInfo>
            <ListRestaurant>
              {promo?.restaurants?.map((item, index) => (
                <li key={index}>
                  <ItemRestaurantBooking restaurant={item} />
                </li>
              ))}
            </ListRestaurant>
          </WrapperInfo>
        </ScrollShowContent>
      </Popup>
    </>
  );
};

export default PopupPromo;

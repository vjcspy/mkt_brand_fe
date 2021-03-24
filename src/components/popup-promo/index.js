import React, { useCallback } from "react";
import Button from "../button";
import {
  HeaderDesktop,
  WrapperQcCode,
  ContentHeader,
  ItemRestaurant,
  ListRestaurant,
  GroupButton,
  TitleInfo,
  ContentInfo,
  HeaderItemRestaurant,
  WrapperInfo,
  HeaderMobile,
} from "./style";
import { FormattedMessage } from "react-intl";
import IconClose from "../icons/iconsClose";
import IconMap from "../icons/iconMap";
import IconPhone from "../icons/iconPhone";
import ScrollShowContent from "../scroll-show-content";
import Popup from "../popup-wrapper";
import ItemRestaurantBooking from "../item-restaurant/item-restaurant-booking";
import Link from "next/link";

const listRestaurant = [
  {
    name: " Gogi House Trần Phú",
    address: "Hà Đông - 146 Trần Phú, Mỗ Lao, Hà Đông, Hà Nội",
    openClose: "10:30 AM - 11:00 PM",
    phone: "19006622",
    aboutKm: "0.7",
    map: {},
  },
  {
    name: " Gogi House Trần Phú",
    address: "Hà Đông - 146 Trần Phú, Mỗ Lao, Hà Đông, Hà Nội",
    openClose: "10:30 AM - 11:00 PM",
    phone: "19006622",
    aboutKm: "0.7",
    map: {},
  },
  {
    name: " Gogi House Trần Phú",
    address: "Hà Đông - 146 Trần Phú, Mỗ Lao, Hà Đông, Hà Nội",
    openClose: "10:30 AM - 11:00 PM",
    phone: "19006622",
    aboutKm: "0.7",
    map: {},
  },
  {
    name: " Gogi House Trần Phú",
    address: "Hà Đông - 146 Trần Phú, Mỗ Lao, Hà Đông, Hà Nội",
    openClose: "10:30 AM - 11:00 PM",
    phone: "19006622",
    aboutKm: "0.7",
    map: {},
  },
  {
    name: " Gogi House Trần Phú",
    address: "Hà Đông - 146 Trần Phú, Mỗ Lao, Hà Đông, Hà Nội",
    openClose: "10:30 AM - 11:00 PM",
    phone: "19006622",
    aboutKm: "0.7",
    map: {},
  },
];

const PopupPromo = ({ promo, onClose }) => {
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
            <Link href="https://booking.ggg.com.vn" passHref>
              <a class="booking-profile" target="_blank" href="https://booking.ggg.com.vn">
                <Button>
                  <FormattedMessage id="popupPromo.reservation_now" />
                </Button>
              </a>
            </Link>
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
                <a class="booking-profile" target="_blank" href="https://booking.ggg.com.vn">
                  <Button>
                    <FormattedMessage id="popupPromo.reservation_now" />
                  </Button>
                </a>
              </Link>
            </Button>
          </ContentHeader>
        </HeaderMobile>

        <hr />
        {/* <ScrollShowContent>
              
            </ScrollShowContent> */}
        <ScrollShowContent>
          <WrapperInfo>
            <TitleInfo>
              <FormattedMessage id="popupPromo.content_event" />
            </TitleInfo>
            <ContentInfo>
              <div dangerouslySetInnerHTML={{ __html: promo?.promotionContent }} />
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

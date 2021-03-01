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

const PopupPromo = ({ onClose }) => {
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
            <h6 className="code">CQR42000V</h6>
          </WrapperQcCode>
          <ContentHeader>
            <h3>Ăn Gogi trúng liền tay 1 tỷ</h3>
            <h6>
              <FormattedMessage id="popupPromo.notification" />
            </h6>
            <Button>
              <FormattedMessage id="popupPromo.reservation_now" />
            </Button>
          </ContentHeader>
        </HeaderDesktop>
        <HeaderMobile>
          <WrapperQcCode>
            <img width={82} height={82} src="/images/demo_qc.png" />
            <h6 className="promo-code">
              <FormattedMessage id="popupPromo.promoCode" />
            </h6>
            <h6 className="code">CQR42000V</h6>
          </WrapperQcCode>
          <ContentHeader>
            <h3>Ăn Gogi trúng liền tay 1 tỷ</h3>
            <h6>
              <FormattedMessage id="popupPromo.notification" />
            </h6>
            <Button>
              <FormattedMessage id="popupPromo.reservation_now" />
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
              Hỡi các thực thần tứ phương, cùng lên đường thẳng tiến GoGi để có 100% CƠ HỘI nhận hàng ngàn quà tặng cùng giải thưởng tiền
              mặt trao tay tổng trị giá 1 TỶ ĐỒNG
            </ContentInfo>

            <TitleInfo>
              <FormattedMessage id="popupPromo.location" />
            </TitleInfo>
            <ContentInfo>Hà Nội</ContentInfo>

            <TitleInfo>
              <FormattedMessage id="popupPromo.date_apply" />
            </TitleInfo>
            <ContentInfo>01/12/2020 - 31/12/2020</ContentInfo>

            <TitleInfo>
              <FormattedMessage id="popupPromo.restaurant_apply" />
            </TitleInfo>
            <ListRestaurant>
              {listRestaurant.map((item, index) => (
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

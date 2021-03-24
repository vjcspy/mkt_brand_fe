import React from "react";
import Button from "../button";
import { HeaderDesktop, HeaderMobile, WrapperQcCode, ContentHeader, WrapperInfo } from "./style";
import { FormattedMessage } from "react-intl";
import {
  ContentInfo,
  GroupButton,
  HeaderItemRestaurant,
  ItemRestaurant,
  ListRestaurant,
  TitleInfo,
} from "../popup-promo/style";
import ScrollShowContent from "../scroll-show-content";
import ItemRestaurantBooking from "../item-restaurant/item-restaurant-booking";

const SuccessRegister = ({ itemPromoGetCode }) => {
  console.log(itemPromoGetCode);
  return (
    <>
      <HeaderDesktop>
        <WrapperQcCode>
          <img width={82} height={82} src="/images/demo_qc.png" />
          <h6 className="promo-code">
            <FormattedMessage id="successRegister.promo_code" />
          </h6>
          <h6 className="code">CQR42000V</h6>
        </WrapperQcCode>
        <ContentHeader>
          <h3>
            <FormattedMessage id="successRegister.congratulation" />
          </h3>
          <p>
            <FormattedMessage id="successRegister.send_voucher_email" />
          </p>
          <Button className="view-my-promo" varian="outline">
            <FormattedMessage id="successRegister.view_my_promo" />
          </Button>
          <Button>
            <FormattedMessage id="successRegister.reservation_now" />
          </Button>
        </ContentHeader>
      </HeaderDesktop>

      <HeaderMobile>
        <FormattedMessage
          id="successRegister.congratulation_mobile"
          values={{
            br: <br />,
          }}
        />
        <WrapperQcCode>
          <img width={82} height={82} src="/images/demo_qc.png" />
        </WrapperQcCode>
        <p>
          <FormattedMessage id="successRegister.promo_code" />
        </p>
        <h4>CQR42000V</h4>
        <p>
          <FormattedMessage id="successRegister.send_voucher_email" />
        </p>
        <Button>
          <FormattedMessage id="successRegister.reservation_now" />
        </Button>
        <Button varian="outline">
          <FormattedMessage id="successRegister.view_my_promo" />
        </Button>
      </HeaderMobile>
      <ScrollShowContent>
        <WrapperInfo>
          <TitleInfo>
            <FormattedMessage id="successRegister.content_event" />
          </TitleInfo>
          <ContentInfo>
            <div dangerouslySetInnerHTML={{ __html: itemPromoGetCode.content }} />
          </ContentInfo>
          <TitleInfo>
            <FormattedMessage id="successRegister.location" />
          </TitleInfo>
          <ContentInfo>Hà Nội</ContentInfo>
          <TitleInfo>
            <FormattedMessage id="successRegister.date_apply" />
          </TitleInfo>
          <ContentInfo>01/12/2020 - 31/12/2020</ContentInfo>
          <TitleInfo>
            <FormattedMessage id="successRegister.restaurant_apply" />
          </TitleInfo>
          <ListRestaurant>
            {itemPromoGetCode?.restaurants?.map((item, index) => (
              <li key={index}>
                {/* <ItemRestaurant>
                  <HeaderItemRestaurant>
                    <p>• {item.name}</p>
                    <p className="view-map">
                      0.7km
                      <IconMap color="#7B7979" />
                    </p>
                  </HeaderItemRestaurant>
                  <h6>
                    {item.address}
                    <br />
                    {item.openClose}
                  </h6>
                  <GroupButton>
                    <Button size="tiny" varian="outline">
                      <IconPhone /> {item.phone}
                    </Button>
                    <Button size="tiny">
                      <FormattedMessage id="successRegister.reservation" />
                    </Button>
                  </GroupButton>
                </ItemRestaurant> */}
                <ItemRestaurantBooking promoId={itemPromoGetCode.id} restaurant={item} />
              </li>
            ))}
          </ListRestaurant>
        </WrapperInfo>
      </ScrollShowContent>
    </>
  );
};

export default SuccessRegister;

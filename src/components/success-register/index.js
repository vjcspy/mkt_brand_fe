import React, { useRef, useState } from "react";
import Button from "../button";
import { HeaderDesktop, HeaderMobile, WrapperQcCode, ContentHeader, WrapperInfo, GroupButtonSuccess } from "./style";
import { FormattedMessage } from "react-intl";
import { ContentInfo, ListRestaurant, TitleInfo } from "../popup-promo/style";
import ScrollShowContent from "../scroll-show-content";
import ItemRestaurantBooking from "../item-restaurant/item-restaurant-booking";
import Link from "next/link";
import { DescriptionPromo } from "../../sections/promoSection/PromoInfo/style";
import QRCode from "qrcode.react";
const SuccessRegister = ({ itemPromoGetCode, resultGetCode }) => {
  const refShow = useRef();
  const [openDescription, setOpenDescription] = useState(false);
  const [showButtonHide, setShowButtonHide] = useState(false);
  return (
    <>
      <HeaderDesktop>
        <WrapperQcCode>
          <QRCode value={resultGetCode?.serialNo} size={82} />
          <h6 className="promo-code">
            <FormattedMessage id="successRegister.promo_code" />
          </h6>
          <h6 className="code">{resultGetCode?.serialNo}</h6>
        </WrapperQcCode>
        <ContentHeader>
          <h3>
            <FormattedMessage id="successRegister.congratulation" />
          </h3>
          <p>
            <FormattedMessage id="successRegister.send_voucher_email" />
          </p>
          <GroupButtonSuccess>
            <Link href="/profile?profileTab=my-promo">
              <Button varian="outline-a" className="view-my-promo">
                <FormattedMessage id="successRegister.view_my_promo" />
              </Button>
            </Link>
            <Button varian="primary-router" href="https://booking.ggg.com.vn">
              <FormattedMessage id="successRegister.reservation_now" />
            </Button>
          </GroupButtonSuccess>
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
          <QRCode value={resultGetCode?.serialNo} size={82} />
          {/* <img width={82} height={82} src="/images/demo_qc.png" /> */}
        </WrapperQcCode>
        <p>
          <FormattedMessage id="successRegister.promo_code" />
        </p>
        <h4>{resultGetCode?.serialNo}</h4>
        <p>
          <FormattedMessage id="successRegister.send_voucher_email" />
        </p>
        <GroupButtonSuccess>
          <Link href="/profile/my-promo">
            <Button varian="outline-a" className="view-my-promo">
              <FormattedMessage id="successRegister.view_my_promo" />
            </Button>
          </Link>
          <Button varian="primary-router" href="https://booking.ggg.com.vn">
            <FormattedMessage id="successRegister.reservation_now" />
          </Button>
        </GroupButtonSuccess>
      </HeaderMobile>
      <ScrollShowContent key="success-mobile">
        <WrapperInfo>
          <TitleInfo>
            <FormattedMessage id="successRegister.content_event" />
          </TitleInfo>

          <DescriptionPromo
            ref={refShow}
            onClick={() => {
              setOpenDescription(true);
              setShowButtonHide(true);
            }}
            className={`${openDescription ? "open" : ""}`}
          >
            <div dangerouslySetInnerHTML={{ __html: itemPromoGetCode?.content }} />
            {showButtonHide && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setShowButtonHide(false);
                  setOpenDescription(false);
                }}
              >
                ???n b???t
              </span>
            )}
          </DescriptionPromo>

          {/* <ContentInfo>
            <div dangerouslySetInnerHTML={{ __html: itemPromoGetCode?.content }} />
          </ContentInfo> */}
          <TitleInfo>
            <FormattedMessage id="successRegister.location" />
          </TitleInfo>
          <ContentInfo>{itemPromoGetCode?.location}</ContentInfo>
          <TitleInfo>
            <FormattedMessage id="successRegister.date_apply" />
          </TitleInfo>
          <ContentInfo>
            {itemPromoGetCode?.startDate} - {itemPromoGetCode?.endDate}
          </ContentInfo>
          <TitleInfo>
            <FormattedMessage id="successRegister.restaurant_apply" />
          </TitleInfo>
          <ListRestaurant>
            {itemPromoGetCode?.restaurants?.map((item, index) => (
              <li key={index}>
                <ItemRestaurantBooking restaurant={item} />
              </li>
            ))}
          </ListRestaurant>
        </WrapperInfo>
      </ScrollShowContent>
    </>
  );
};

export default SuccessRegister;

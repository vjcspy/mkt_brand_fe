import React, { useEffect, useState } from "react";
import { WrapperProfilePromo } from "./style";
import loadable from "@loadable/component";
import { useSelector, useDispatch } from "react-redux";
import useIframeResize from "../../../hooks/useWindowResize/useIframeResize";
import { GET_PROMO_OF_USER } from "../../../constants";
import PulseLoader from "../../../components/loading";
import { showNotification } from "../../../components/notification";
import Portal from "../../../development/containers/developmentDialog/portal";
const PromoTabDesktop = loadable(() => import("./desktop"));
const PromoTabMobile = loadable(() => import("./mobile"));

const PromoTab = ({ setDetailPromoMobile }) => {
  const [size] = useIframeResize();
  const dispatch = useDispatch();
  const { data, error, warning, loading, loaded } = useSelector((state) => state.get("promoOfUser")) ?? {};
  useEffect(() => {
    if (!data && !loaded) {
      dispatch({ type: GET_PROMO_OF_USER, value: { type: "all" } });
    }
  }, [data, loaded]);

  useEffect(() => {
    if (error && loaded) {
      showNotification(dispatch, { content: error, status: "error" });
    }
    if (warning && loaded) {
      showNotification(dispatch, { content: warning, status: "warning" });
    }
  }, [error, warning]);

  return (
    <WrapperProfilePromo className="promo-tab">
      {loading ? (
        <Portal className="profile-history">
          <div
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              height: "100vh",
              width: "100vw",
              zIndex: "3000",
              position: "fixed",
              top: 0,
              left: 0,
            }}
          >
            <PulseLoader loading fill color="#F89520" />
          </div>
        </Portal>
      ) : null}
      { data?.length > 0 ? (
        size.width > 768 ? (
          <PromoTabDesktop profilePromo={data} />
        ) : (
          <PromoTabMobile setDetailPromoMobile={setDetailPromoMobile} profilePromo={data} />
        )
      ) : null}
    </WrapperProfilePromo>
  );
};

export default PromoTab;

import React, { useEffect, useState, useCallback } from "react";
import loadable from "@loadable/component";
import { useDispatch, useSelector } from "react-redux";
import { MainPromo } from "./style";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import { dummyPromoList } from "../../dummyData/listPromo";
import { stringify } from "query-string";
import PulseLoader from "../../components/loading";
const PromoDesktop = loadable(() => import("./desktop"));
const PromoMobile = loadable(() => import("./mobile"));
import useSiteRouter from "../../hooks/useSiteRouter";
import { pickUpVoucher } from "../../services/backend";
import { showNotification } from "../../components/notification";

const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "promoSection",
  title: "Promo Section",
  components: {},
};

const PromoSection = ({ config, theme, promoListApi }) => {
  const [{ width, height }, ref] = useIframeResize();
  const headerHeight = useSelector((s) => s.get("headerHeight"));
  const dispatch = useDispatch();
  const routerSite = useSiteRouter();
  const [stateAction, setStateAction] = useState({
    promoCode: routerSite.query.promoCode,
    showPopUpSuccess: false,
  });
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((s) => s.get("tokenUser"))?.toJS() ?? {};

  const fetchCodePromo = async (code, quantity) => {
    setLoading(true);
    try {
      const { data } = await pickUpVoucher({ code, quantity, token });

      if (data.error) {
        showNotification(dispatch, { content: data.error?.message ?? "Loi mang", status: "error" });
      }
      if (data.messageCode === 0) {
        showNotification(dispatch, { content: data.message ?? "Loi mang", status: "warning" });
      }
      // handel success
      setLoading(false);
    } catch (e) {
      showNotification(dispatch, { content: "Loi mang", status: "error" });
      setLoading(false);
    }
  };

  useEffect(() => {
    const { already, promoCode } = routerSite.query ?? {};
    if (already === "succeed" && promoCode && token) {
      fetchCodePromo(promoCode);
      routerSite.push("/promo");
    }
  }, []);

  const onGetCode = useCallback((code, quantity) => {
    if (token) {
      fetchCodePromo(code, quantity);
    } else {
      routerSite.push(`/login?${stringify({ promoCode: code, redirect_url: encodeURIComponent("/promo") })}`);
    }
  }, []);

  const onViewMyPromo = useCallback((id) => {
    console.log("to profile to view my promo: ", id);
  }, []);

  const viewMapRestaurant = useCallback((value) => {
    history.push(state, "Map", "/map");
  }, []);
  return (
    <>
      <MainPromo ref={ref} className="main-promo">
        {loading && (
          <div
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              height: "100vh",
              width: "100vw",
              zIndex: "3000",
              position: "fixed",
              top: 0,
            }}
          >
            <PulseLoader color="#DA841E" loading fill />
          </div>
        )}
        {width > 768 ? (
          <PromoDesktop
            onViewMyPromo={onViewMyPromo}
            onGetCode={onGetCode}
            listPromo={dummyPromoList}
            viewMapRestaurant={viewMapRestaurant}
            stateAction={stateAction}
            setStateAction={setStateAction}
            promoListApi={promoListApi}
          />
        ) : (
          <PromoMobile
            listPromo={dummyPromoList}
            onViewMyPromo={onViewMyPromo}
            onGetCode={onGetCode}
            viewMapRestaurant={viewMapRestaurant}
            stateAction={stateAction}
            setStateAction={setStateAction}
            promoListApi={promoListApi}
          />
        )}
      </MainPromo>
    </>
  );
};

PromoSection.defaultConfig = defaultConfig;

export default PromoSection;

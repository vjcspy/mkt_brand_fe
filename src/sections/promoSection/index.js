import React, { useEffect, useState, useCallback } from "react";
import loadable from "@loadable/component";
import { useDispatch, useSelector } from "react-redux";
import { MainPromo } from "./style";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import { dummyPromoList } from "../../dummyData/listPromo";
import Comment from "../comment";
import { stringify } from "query-string";
import PulseLoader from "../../components/loading";
const PromoDesktop = loadable(() => import("./desktop"));
const PromoMobile = loadable(() => import("./mobile"));
import useSiteRouter from "../../hooks/useSiteRouter";

const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "promoSection",
  title: "Promo Section",
  components: {},
};

const PromoSection = ({ config, theme }) => {
  const listPromoActive = useSelector((s) => s.get("listPromoActive"));
  const [sizeWidth, ref] = useIframeResize();
  const routerSite = useSiteRouter();
  const [stateAction, setStateAction] = useState({
    promoCode: routerSite.query.promoCode,
    showPopUpSuccess: false,
  });
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((s) => s.get("tokenUser"))?.toJS() ?? {};

  const fetchCodePromo = (code) => {
    setLoading(true);
    setTimeout(() => {
      setStateAction({ ...stateAction, showPopUpSuccess: true, loadingPromo: false });
      setLoading(false);
    }, [2000]);
  };

  useEffect(() => {
    const { already, promoCode } = routerSite.query ?? {};
    if (already === "succeed" && promoCode && token) {
      fetchCodePromo(promoCode);
    }
  }, []);

  const onGetCode = useCallback((code) => {
    if (token) {
      fetchCodePromo(code);
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
        {sizeWidth.width > 768 ? (
          <PromoDesktop
            onViewMyPromo={onViewMyPromo}
            onGetCode={onGetCode}
            listPromo={dummyPromoList}
            viewMapRestaurant={viewMapRestaurant}
            stateAction={stateAction}
            setStateAction={setStateAction}
          />
        ) : (
          <PromoMobile
            listPromo={dummyPromoList}
            onViewMyPromo={onViewMyPromo}
            onGetCode={onGetCode}
            viewMapRestaurant={viewMapRestaurant}
            stateAction={stateAction}
            setStateAction={setStateAction}
          />
        )}
      </MainPromo>
      <Comment />
    </>
  );
};

PromoSection.defaultConfig = defaultConfig;

export default PromoSection;

import React, { useEffect, useState, useCallback } from "react";
import loadable from "@loadable/component";
import { useDispatch, useSelector } from "react-redux";
import { MainPromo } from "./style";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import { stringify } from "query-string";
import PulseLoader from "../../components/loading";
const PromoDesktop = loadable(() => import("./desktop"));
// const PromoMobile = loadable(() => import("./mobile"));
import PromoMobile from "./mobile";

import useSiteRouter from "../../hooks/useSiteRouter";
import { filterListPromoApi, getListPromo, getPromotionByBrandProvince, pickUpVoucher } from "../../services/backend";
import { showNotification } from "../../components/notification";
import { GET_PROMO_OF_USER, SET_NUM_PROMO } from "../../constants";

const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "promoSection",
  title: "Promo Section",
  components: {},
};

const PromoSection = ({ promoListApi, brandId }) => {
  const [{ width, height }, ref] = useIframeResize();
  const dispatch = useDispatch();
  const routerSite = useSiteRouter();
  const { promoCode } = routerSite.query;

  const { token } = useSelector((s) => s.get("tokenUser"))?.toJS() ?? {};
  const listPromoEditPage = useSelector((s) => s.get("listPromoEditPage"));

  promoListApi = listPromoEditPage ? listPromoEditPage : promoListApi;

  const indexPromoParam = promoCode ? promoListApi.findIndex((item) => item.id == promoCode) : null;
  const [resultGetCode, setResultGetCode] = useState();
  const [promosShow, setPromosShow] = useState(promoListApi);
  const [loading, setLoading] = useState(false);
  const provinceSelected = useSelector((state) => state.getIn(["provinceSelected"])).toJS();

  // get list promo when user change location on Header
  useEffect(async () => {
    if (!provinceSelected.default) {
      try {
        setLoading(true);
        const {
          data: { result, messageCode },
          error,
        } = await getPromotionByBrandProvince({ provinceId: provinceSelected.id, brandId });

        if (error || messageCode === 0) {
          showNotification(dispatch, { content: error.message ?? "Có lỗi khi load ưu đãi", status: "error" });
          setLoading(false);
          return;
        }

        const promoFilter = filterListPromoApi(result.content);

        if (promoFilter.length <= 0) {
          showNotification(dispatch, { content: "Không có ưu đãi ở location này", status: "warning" });
          setLoading(false);
          return;
        }

        dispatch({ type: SET_NUM_PROMO, value: promoFilter.length });
        setLoading(false);
        setPromosShow(promoFilter);
      } catch (e) {
        setLoading(false);
        showNotification(dispatch, { content: "Không thể tải dữ liệu", status: "error" });
      }
    }
  }, [provinceSelected.id]);

  const fetchCodePromo = async (code, quantity) => {
    setLoading(true);
    try {
      const { data } = await pickUpVoucher({
        code,
        quantity,
        token,
      });

      if (data.result) {
        setResultGetCode(data.result[0]);
        dispatch({ type: GET_PROMO_OF_USER, value: { type: "all" } });
      } else if (data.error) {
        showNotification(dispatch, { content: data.error?.message ?? "Loi mang", status: "error" });
      } else if (data.messageCode === 0) {
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

  return (
    <>
      <MainPromo ref={ref} className="main-promo">
        {loading && (
          <div
            style={{
              background: "rgba(0, 0, 0, 0)",
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
            onGetCode={onGetCode}
            promoListApi={promosShow}
            resultGetCode={resultGetCode}
            setResultGetCode={setResultGetCode}
            indexPromoParam={indexPromoParam}
          />
        ) : (
          <PromoMobile
            onGetCode={onGetCode}
            promoListApi={promosShow}
            resultGetCode={resultGetCode}
            setResultGetCode={setResultGetCode}
            indexPromoParam={indexPromoParam}
          />
        )}
      </MainPromo>
    </>
  );
};

PromoSection.defaultConfig = defaultConfig;

export default PromoSection;

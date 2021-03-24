import React, { useEffect } from "react";
import { WrapperProfilePromo } from "./style";
import loadable from "@loadable/component";
import { useSelector, useDispatch } from "react-redux";
import { profilePromo } from "../../../dummyData/profilePromo";
import useIframeResize from "../../../hooks/useWindowResize/useIframeResize";
import { GET_MY_VOUCHER, GGG_INTERNAL } from "../../../constants";
import PulseLoader from "../../../components/loading";
import { showNotification } from "../../../components/notification";
import useApi from "../../../hooks/useApi";
const PromoTabDesktop = loadable(() => import("./desktop"));
const PromoTabMobile = loadable(() => import("./mobile"));

const PromoTab = () => {
  const [sizeWidth] = useIframeResize();
  const dispatch = useDispatch();
  // const { loading, data, error } = useSelector((s) => s.get("myVoucher")) ?? {};
  const [{ loading, data, error }, getVoucher] = useApi(
    `${process.env.NEXT_PUBLIC_GGG_INTERNAL}/my-voucher`,
    {
      memId: "04031742",
      type: "all",
    },
    {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMTguNzEuMjUxLjE4ODo1OTAwNFwvYXBpXC92MVwvYXV0aGVudGljYXRpb25cL2xvZ2luIiwiaWF0IjoxNTk1NDk1OTY2LCJleHAiOjE2MjcwMzE5NjYsIm5iZiI6MTU5NTQ5NTk2NiwianRpIjoiTXV3UzgxUEZRSDZuWkxySSIsInN1YiI6MjQ1NDg3NCwicHJ2IjoiNzA4NTNmN2FiZDJmZDI0MTI0ZTY3OTdjZDBkMjg1YzFkZTAzMTM4YSIsImN1c3RvbWVyTnVtYmVyIjoiMDI0NTQ4NzQiLCJjZWxscGhvbmUiOiIwOTg3ODAyMTc1In0.4h_NhkuF9jDHQARKKEObdaXJHUFdK4lZ1eTH8WTwMpE",
      "tgs-version": "2.6.10",
    },
    "POST"
  );
  useEffect(() => {
    if (!data && !error) {
      getVoucher();
    }
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (error) {
      showNotification(dispatch, { content: error.message ?? "Lỗi mạng", status: "error" });
      console.log(error);
    }
  }, [data, error]);
  // useEffect(() => {
  //   if (!data && !error) {
  //     dispatch({ type: GET_MY_VOUCHER });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (error) {
  //     showNotification(dispatch, { content: error, status: "error" });
  //   }
  // }, [error]);

  return (
    <WrapperProfilePromo className="promo-tab">
      {loading ? (
        <PulseLoader loading fill color="#F89520" />
      ) : data ? (
        <>
          {sizeWidth.width > 768 ? (
            <PromoTabDesktop profilePromo={data?.result} />
          ) : (
            <PromoTabMobile profilePromo={data?.result} />
          )}
        </>
      ) : null}
    </WrapperProfilePromo>
  );
};

export default PromoTab;

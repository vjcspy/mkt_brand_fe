import React, { useRef } from "react";
import { useSelector } from "react-redux";
import useIframeResize from "../../hooks/useWindowResize/useIframeResize";
import IconTriangleLineLeft from "../icons/iconTriangleLineLeft";
import { WrapperPopupMobile, ContentPopup, WrapperClose, Content } from "./style";

const PopupMobile = ({ children, onBack, step, className, show }) => {
  const [{ height }, ref] = useIframeResize();
  const refPopup = useRef();
  const headerHeight = useSelector((s) => s.get("headerHeight"));

  // const dispatch = useDispatch();

  // const setHeightPopup = () => dispatch({ type: SET_HEIGHT_POPUP, value: refPopup.current.clientHeight - 40 });

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (refPopup.current) {
  //       setHeightPopup();
  //     }
  //   }, 300);
  // }, [className]);

  return (
    <WrapperPopupMobile style={{ height: show ? height - headerHeight : 0 }} className={className} ref={ref}>
      <WrapperClose onClick={onBack}>
        <IconTriangleLineLeft /> <h5>Back</h5>
      </WrapperClose>
      <ContentPopup>
        <Content ref={refPopup} style={{ transform: `translateX(${-step * 100}%)` }}>
          {children}
        </Content>
      </ContentPopup>
    </WrapperPopupMobile>
  );
};

export default PopupMobile;

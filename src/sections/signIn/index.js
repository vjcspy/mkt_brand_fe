import React, { useState, useRef, useEffect } from "react";
import Button from "../../components/button";
import PinInput from "../../components/pin-input";
import InputPhone from "../../components/input/input-phone";
import { FormattedMessage } from "react-intl";

import { WrapperSignIn, Item, Info, GroupInput, ContentSignIn, WrapperItemSignIn, ListItemScroll } from "./style";
import { useSelector, useDispatch } from "react-redux";

import CreateInfo from "./createInfo";
import { GGG_INTERNAL, SET_TOKEN_USER, SET_USER_INFO } from "../../constants";
import { showNotification } from "../../components/notification";

import PulseLoader from "../../components/loading";
import useApi from "../../hooks/useApi";
import useSiteRouter from "../../hooks/useSiteRouter";
import { stringify } from "query-string";

const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "login",
  title: "Login Section",
  components: {},
};

const SectionSignIn = () => {
  const tokenUser = useSelector((state) => state.get("tokenUser")).toJS();

  const dispatch = useDispatch();
  const router = useSiteRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [stepOTP, setStepOTP] = useState(0);
  const refPhone = useRef();
  const refOTP = useRef();
  const [showLogin, setShowLogin] = useState(true);
  const [showGetOTP, setShowGetOTP] = useState(true);
  const [apiRequestOTP, actionRequestOTP] = useApi(
    `${GGG_INTERNAL}/request-otp`,
    { cellphone: phoneNumber },
    { "tgs-version": "2.6.10" },
    "POST"
  );

  const [apiGetToken, actionGetToken] = useApi(
    `${GGG_INTERNAL}/get-token`,
    { cellphone: phoneNumber, otp },
    { "tgs-version": "2.6.10" },
    "POST"
  );

  useEffect(() => {
    // if (tokenUser.token) {
    //   router.push("/");
    // }
  }, []);

  useEffect(() => {
    if (apiRequestOTP.data) {
      const { messageCode, message } = apiRequestOTP.data;
      if (messageCode === 1) {
        setShowGetOTP(false);
      } else {
        showNotification(dispatch, { content: message, status: "error" });
      }
    }
    if (apiRequestOTP.error) {
      showNotification(dispatch, { content: "Lỗi mạng", status: "error" });
    }
    return () => {
      apiRequestOTP.data = null;
      apiRequestOTP.error = null;
    };
  }, [apiRequestOTP]);

  const getCheckGetCode = () => {
    const { redirect_url, ...rest } = router.query;
    if (redirect_url) {
      router.push(`${decodeURIComponent(redirect_url)}?${stringify({ ...rest, already: "succeed" })}`);
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    if (apiGetToken.data) {
      const { messageCode, message, result } = apiGetToken.data;
      if (messageCode === 1) {
        const { profile, authentication } = result;
        dispatch({ type: SET_TOKEN_USER, value: authentication });
        dispatch({ type: SET_USER_INFO, value: profile });
        if (!profile.firstName || !profile.email) {
          setShowLogin(false); // show form register
        } else {
          getCheckGetCode();
        }
      } else {
        showNotification(dispatch, { content: message, status: "error" });
      }
    }
    if (apiGetToken.error) {
      showNotification(dispatch, { content: "Lỗi mạng", status: "error" });
    }

    return () => {
      apiGetToken.data = null;
      apiGetToken.error = null;
    };
  }, [apiGetToken]);

  useEffect(() => {
    if (otp?.length >= 4) {
      actionGetToken();
    }
  }, [otp]);

  useEffect(() => {
    refPhone.current?.focus();
    refOTP.current?.focus();
  }, [showLogin, showGetOTP]);

  return (
    <WrapperSignIn>
      {showLogin ? (
        <ContentSignIn className="content">
          <h2>{showGetOTP ? <FormattedMessage id="login.sign_in" /> : <FormattedMessage id="login.send_otp" />}</h2>
          <WrapperItemSignIn>
            <ListItemScroll style={{ transform: `translateX(${-stepOTP * 50}%)` }}>
              {showGetOTP ? (
                <Item>
                  <Info>
                    <FormattedMessage id="login.note_phone_number" />
                  </Info>
                  <InputPhone
                    className="input-phone"
                    ref={refPhone}
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value)}
                  />
                  <Button disabled={phoneNumber?.length !== 10} onClick={() => actionRequestOTP()}>
                    {/* <Button onClick={getCheckGetCode}> */}
                    {apiRequestOTP.loading ? <PulseLoader loading fill /> : <FormattedMessage id="login.get_opt" />}
                  </Button>
                </Item>
              ) : (
                <Item>
                  <Info>
                    {/* <FormattedMessage id="login.nofity_get_otp" /> 0944 xxx xxx */}
                    <span>{apiRequestOTP?.data?.message}</span>
                  </Info>
                  <PinInput length={4} ref={refOTP} value={otp} onChange={setOTP} />
                  <Button disabled={otp.length < 4} onClick={() => actionGetToken()}>
                    {apiGetToken?.loading ? <PulseLoader loading fill /> : <FormattedMessage id="login.sign_in" />}
                  </Button>
                  <h5 onClick={() => actionGetToken()}>
                    <FormattedMessage id="login.fail_otp" /> <span className="underline">Resend</span>
                  </h5>
                </Item>
              )}
            </ListItemScroll>
          </WrapperItemSignIn>
        </ContentSignIn>
      ) : (
        <CreateInfo getCheckGetCode={getCheckGetCode} />
      )}
    </WrapperSignIn>
  );
};
SectionSignIn.defaultConfig = defaultConfig;
export default SectionSignIn;

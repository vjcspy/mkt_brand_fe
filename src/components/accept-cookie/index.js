import React from "react";
import Button from "../button";
import IconClose from "../icons/iconsClose";
import { CookieWrapper, Title, Content } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { ACCEPT_COOKIE } from "../../constants";
import { FormattedMessage } from "react-intl";

const AcceptCookie = () => {
  const dispatch = useDispatch();
  const acceptCookie = useSelector((state) => state.get("acceptCookie"));
  const onAcceptCookie = () => dispatch({ type: ACCEPT_COOKIE, value: true });
  return (
    !acceptCookie && (
      <CookieWrapper>
        <Title>
          <h3>
            <FormattedMessage id="cookie.title" />
          </h3>
          <IconClose onClick={onAcceptCookie} />
        </Title>
        <Content>
          <p>
            <FormattedMessage id="cookie.content" values={{ a: (c) => <a href="/nref">{c}</a> }} />
          </p>
          {/* <Button onClick={onAcceptCookie}>
            <FormattedMessage id="cookie.confirm" />
          </Button> */}
        </Content>
      </CookieWrapper>
    )
  );
};

export default AcceptCookie;

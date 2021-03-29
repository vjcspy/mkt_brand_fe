import React from "react";
import IconClose from "../icons/iconsClose";
import { CookieWrapper, Title, Content } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { ACCEPT_COOKIE } from "../../constants";
import { FormattedMessage } from "react-intl";

const AcceptCookie = () => {
  const dispatch = useDispatch();
  const onAcceptCookie = () => dispatch({ type: ACCEPT_COOKIE, value: true });
  return (
    <CookieWrapper>
      <Title>
        <h3>
          <FormattedMessage id="cookie.title" />
        </h3>
        <IconClose onClick={onAcceptCookie} />
      </Title>
      <Content>
        <p>
          <FormattedMessage
            id="cookie.content"
            values={{
              a: (c) => (
                <a target="_blank" className="link" href="/policy-cookie">
                  {c}
                </a>
              ),
            }}
          />
        </p>
      </Content>
    </CookieWrapper>
  );
};

export default AcceptCookie;

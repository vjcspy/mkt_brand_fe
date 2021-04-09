import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "../../src/components/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { DevPrimaryButton } from "../../src/styles/developmentStyle";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../src/constants";
import { getSite, getSiteServer } from "../../src/services/backend";
import { useRouter } from "next/dist/client/router";

const SigninWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 78px;
  justify-content: center;
  align-items: center;
`;

const SigninBody = styled.div`
  margin-top: 30px;
  width: 400px;
  padding: 20px 30px 25px;
  border-radius: 2px;
  border-top: 2px solid rgb(0, 126, 255);
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(227, 233, 243) 0px 2px 4px 0px;
`;

const ItemWrapper = styled.div`
  :not(:first-child) {
    margin-top: 15px;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }

  input[type="checkbox"] {
    height: 15px;
    width: 15px;
    margin-right: 10px;
  }

  input[type="email"],
  input[type="password"],
  input[type="text"] {
    width: 100%;
    height: 34px;
    padding: 0px 10px;
    font-weight: 400;
    font-size: 13px;
    cursor: text;
    outline: 0px;
    border: 1px solid rgb(227, 233, 243);
    border-radius: 2px;
    color: rgb(51, 55, 64);
    background-color: transparent;
    position: relative;
    z-index: 1;

    &[name="email"] {
      padding-left: 40px;
    }

    &[name="password"] {
      padding-right: 40px;
    }

    &.error {
      border-color: rgb(246, 77, 10);
    }

    &:focus {
      border-color: rgb(120, 202, 255);
    }
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0px;
  height: 34px;
  width: 34px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.password {
    cursor: pointer;
    right: 0px;
    z-index: 2;
  }

  &.email {
    left: 0px;
    background-color: rgb(250, 250, 251);
  }
`;

const ErrorMessage = styled.p`
  line-height: 18px;
  color: rgb(246, 77, 10);
  font-size: 13px;
  font-weight: 400;
  text-transform: none;
  text-align: center;
`;

export async function getServerSideProps() {
  const pathname = ctx.req.headers.host === "localhost:3041" ? "gogi.ggg.systems" : ctx.req.headers.host;
  const webSiteConfig = await getWebsitesConfig(pathname);
  const webSites = await getWebsitesData();
  const webData = chain(webSites)
    .get(["data", "rows"])
    .find((e) => e.code === webSiteConfig.website_code)
    .value();
  const siteCode = webData?.code ?? process.env.SITE_CODE;
  const { data: site } = await getSiteServer(siteCode);
  return {
    props: {
      logo: site?.logo ?? null,
      site_code: site?.site_code ?? null,
    },
  };
}

const Signin = ({ site_code, logo }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState();
  const [remember, setRemember] = useState(true);
  const router = useRouter();

  const dispatch = useDispatch();
  const login = useCallback(({ email, password, remember }) => dispatch({ type: LOGIN, email, password, remember }), [
    dispatch,
  ]);
  const { error, loading } = useSelector((s) => s.getIn(["apiStatus", "login"])?.toJS() ?? {});
  const token = useSelector((s) => s.get("token"));

  useEffect(() => {
    if (token) {
      router.push("/edit");
    }
  }, [token, site_code]);

  const submit = useCallback(
    (e) => {
      e.preventDefault();
      if (!loading) {
        login({ email, password, remember });
      }
    },
    [email, password, remember, loading, login]
  );

  return (
    <SigninWrapper>
      <Image
        width={129}
        height={73}
        src={logo?.url}
        alt="logo"
        title="logo"
        style={{ maxWidth: 100, maxHeight: 100, width: "auto", height: "auto" }}
      />
      <SigninBody>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={submit}>
          <ItemWrapper>
            <label htmlFor="email">Email</label>
            <InputWrapper>
              <IconWrapper className="email">@</IconWrapper>
              <input
                id="email"
                required
                type="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </InputWrapper>
          </ItemWrapper>
          <ItemWrapper>
            <label htmlFor="password">Password</label>
            <InputWrapper>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <IconWrapper className="password" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size="xs" />
              </IconWrapper>
            </InputWrapper>
          </ItemWrapper>
          <ItemWrapper>
            <label>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Remember me
            </label>
          </ItemWrapper>
          <ItemWrapper>
            <DevPrimaryButton style={{ width: "100%" }} type="submit">
              Login
            </DevPrimaryButton>
          </ItemWrapper>
        </form>
      </SigninBody>
    </SigninWrapper>
  );
};

export default Signin;

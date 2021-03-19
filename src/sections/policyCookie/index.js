import React from "react";
import { useSelector } from "react-redux";
import { Container } from "../../styles";
import { WrapperContentCookie } from "./style";
const defaultConfig = {
  name: "policyCookie",
  code: "policyCookie",
  id: "policyCookie",
  title: "Policy Cookie",
  components: {
    policyCookie: {
      type: "editer",
      title: "Content Policy Cookie",
      name: "contentPolicyCookie",
      value: { vi: "", en: "" },
    },
  },
};

const PolicyCookie = ({ config = defaultConfig }) => {
  const locale = useSelector((s) => s.get("locale"));

  const cookieContent = config.components.policyCookie.value[locale];
  return (
    <WrapperContentCookie>
      <Container>
        <div dangerouslySetInnerHTML={{ __html: cookieContent }} />
      </Container>
    </WrapperContentCookie>
  );
};

PolicyCookie.defaultConfig = defaultConfig;

export default PolicyCookie;

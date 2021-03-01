import React, { Fragment } from "react";
import { TitleLinkPagination, WrapperBreadcrumbs } from "./style";
import { Container } from "../../styles";
import { map } from "lodash";
import LinkRouter from "../../components/link-router";
import { FormattedMessage } from "react-intl";
import useFromJS from "../../hooks/useFromJS";

const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "Breadcrumbs",
  title: "Breadcrumbs",
  components: {},
};
const Breadcrumbs = () => {
  const breadcrumbs = useFromJS(["breadcrumbs"]);
  return (
    <WrapperBreadcrumbs>
      <Container>
        <TitleLinkPagination>
          {map(breadcrumbs, (item, index) => (
            <Fragment key={index}>
              {index != 0 && <span>&nbsp;{">"}&nbsp;</span>}
              <LinkRouter href={item.path ?? "/"}>
                <a>
                  <h5>{item.titleTranslate ? <FormattedMessage id={item.titleTranslate} /> : <span>{item.title}</span>}</h5>
                </a>
              </LinkRouter>
            </Fragment>
          ))}
        </TitleLinkPagination>
      </Container>
    </WrapperBreadcrumbs>
  );
};

Breadcrumbs.defaultConfig = defaultConfig;

export default Breadcrumbs;

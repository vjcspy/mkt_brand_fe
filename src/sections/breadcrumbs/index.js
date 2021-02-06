import React, { Fragment } from "react";
import { TitleLinkPagination, WrapperBreadcrumbs } from "./style";
import { Container } from "../../styles";
import { useSelector } from "react-redux";
import { map } from "lodash";
import LinkRouter from "../../components/link-router";

const defaultConfig = {
  type: "section",
  code: "code-dawdaw",
  name: "Breadcrumbs",
  title: "Breadcrumbs",
  components: {},
};
const Breadcrumbs = () => {
  const breadcrumbs = useSelector((s) => s.get("breadcrumbs"))?.toJS() ?? [];
  return (
    <WrapperBreadcrumbs>
      <Container>
        <TitleLinkPagination>
          {map(breadcrumbs, (item, index) => (
            <Fragment key={index}>
              {index != 0 && <span>&nbsp;{">"}&nbsp;</span>}
              <LinkRouter href={item.path ?? "/"}>
                <a>
                  <h5>{item.title}</h5>
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

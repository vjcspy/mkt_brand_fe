import { map } from "lodash";
import React from "react";
import Icon from "../icons";
import { TabItem, TabsContent, TabsWrapper, WrapperBlock } from "./styled";
import { FormattedMessage } from "react-intl";

const Tabs = ({ current, items, onChange }) => {
  return (
    <WrapperBlock>
      <TabsWrapper className="tab-wrapper">
        <TabsContent className="tab-content">
          {map(items, (item, index) => (
            <TabItem
              key={index}
              active={current == index}
              onClick={() => {
                onChange?.(index);
              }}
            >
              <Icon icon={item.icon} />
              <h4>
                <FormattedMessage id={item?.label} />
              </h4>
            </TabItem>
          ))}
        </TabsContent>
      </TabsWrapper>
    </WrapperBlock>

  );
};

export default Tabs;

import React from "react";
import styled from "styled-components";
import cn from "classnames";

const TabWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: normal;
  border-bottom: 1px solid #f0f3f8;

  .tab-item {
    text-transform: uppercase;
    font-weight: 500;
    padding-bottom: 5px;

    &:not(.active) {
      cursor: pointer;
    }

    &:not(:last-child) {
      margin-right: 40px;
    }

    &.active {
      pointer-events: none;
      color: ${({ theme }) => theme.devColor.btnBg};
      border-bottom: 2px solid;
    }
  }
`;

const Tab = ({ tabs = [], current, onChange }) => {
  return (
    <TabWrapper>
      {tabs.map((tab) => (
        <div key={tab.name} className={cn(["tab-item", tab.name === current.name && "active"])} onClick={() => onChange?.(tab)}>
          {tab.title}
        </div>
      ))}
    </TabWrapper>
  );
};

export default Tab;

import styled from "styled-components";
import { ClickableStyle } from "../../../styles/developmentStyle";

export const SettingItemWrapper = styled.div`
  margin-top: 10px;
  border-top: 1px solid ${({ theme }) => theme.devColor.border};
  padding: 10px 0px 0px;
`;

export const SettingItem = styled.button`
  ${ClickableStyle}
  padding: 10px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ThemeItemTitle = styled.div`
  flex: 1 0 0;
  margin-left: 10px;
`;

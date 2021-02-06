import styled from "styled-components";
import { ClickableStyle, DevSecondaryButton } from "../../../styles/developmentStyle";

export const HeaderWrapper = styled.header`
  grid-area: header;
  min-height: 60px;
  background: #f3f3f3;
  border-bottom: 1px solid ${({ theme }) => theme.color.page.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeftWrapper = styled.div`
  height: 60px;
  flex: 1 0 0;
  display: flex;
  align-items: center;
`;

export const RightWrapper = styled.div`
  padding-right: 40px;
  display: flex;
`;

export const LogoWrapper = styled.div`
  width: 300px;
  padding-left: 10px;
  svg,
  img {
    display: block;
    height: 60px;
    width: auto;
  }
`;

export const DropDownWrapper = styled.div`
  position: relative;
  margin-left: 20px;
`;

export const DropDownButton = styled(DevSecondaryButton)`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;

    &:first-child {
      margin-right: 10px;
    }

    &:last-child {
      margin-left: 30px;
    }
  }
`;

export const DropDownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0px;
  border-radius: 4px;
  overflow: hidden;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px, rgba(0, 0, 0, 0.3) 0px 4px 8px;
`;

export const DropDownItem = styled.button`
  ${ClickableStyle}
  min-width: 200px;
  padding: 10px;
  border-radius: 0px;
  background: white;

  svg {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }

  &:hover {
    background: #e5e5e5;
  }
`;

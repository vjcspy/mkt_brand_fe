import styled from "styled-components";
import { DevSecondaryButton } from "../../../styles/developmentStyle";

export const DropDownWrapper = styled.div`
  position: relative;
  // margin-left: 20px;
`;

export const DropDownButton = styled(DevSecondaryButton)`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 0px 10px;

  ${({ icon }) => !icon && "width: 100%;"}

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const DropDownButtonLabel = styled.span`
  flex: 1;
  text-align: left;
`;

export const DropDownContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0px;
  border-radius: 4px;
  overflow: hidden;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px, rgba(0, 0, 0, 0.3) 0px 4px 8px;
  ${({ icon }) => !icon && "left: 0px;"}
`;

export const DropDownItem = styled(DevSecondaryButton)`
  background: white;
  width: 100%;
  min-width: 200px;
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 0px;
  font-size: 18px;
  line-height: 30px;
  font-weight: normal;

  svg {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }

  &:hover {
    background: #e5e5e5;
    box-shadow: none;
  }
`;

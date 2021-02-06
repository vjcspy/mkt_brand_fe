import styled from "styled-components";

export const MenuItemWrapper = styled.div`
  background: white;
  box-shadow: 0 1px 3px 0 rgba(64, 64, 64, 0.24);
  border: 1px solid ${({ theme }) => theme.color.page.border};
  overflow: hidden;

  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:not(:first-child) {
    border-top-width: 0px;
  }
`;

export const MenuItem = styled.div`
  padding: 10px;
  line-height: 26px;
  user-select: none;
  position: relative;
  display: flex;
  align-items: center;
  background: white;

  ${({ add, theme }) => (add ? `color: ${theme.devColor.btnBg}; cursor: pointer;` : "")}
`;

export const MenuItemLabel = styled.div`
  flex: 1 0 0;
`;

export const SubMenuItemWrapper = styled.div`
  padding-left: 15px;
  border-top: 1px solid ${({ theme }) => theme.color.page.border};
  background: #dedede;
`;

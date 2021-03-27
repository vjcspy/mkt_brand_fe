import styled from "styled-components";

export const OurMenusWrapper = styled.div`
  width: 100%;
`;

export const OurMenusContent = styled.div`
  display: flex;
  background: white;
  min-height: 100%;
`;

export const MenusLeftContent = styled.div`
  min-width: 200px;
  @media (max-width: 768px) {
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: auto;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
  }
`;

export const MenusRightContent = styled.div`
  flex: 1 0 0;
  padding-left: 100px;

  @media (max-width: 768px) {
    padding: 0px;
  }
`;

export const MenusComponentWrapper = styled.div`
  position: sticky;
  left: 0;
  top: 130px;
  @media (max-width: 768px) {
    position: relative;
    display: flex;
    justify-content: space-between;
  }
`;

export const MenuItemWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.page.border};
  margin-top: 12px;
`;

export const MenuItemButton = styled.button`
  padding: 0px;
  border-radius: 4px;
  margin-top: 12px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  background: white;

  @media (max-width: 768px) {
    padding: 16px 20px;
    margin: 0px;
    height: auto;
    background: transparent;
    width: auto;
  }

  h3,
  h4,
  h5 {
    position: relative;
    color: ${({ isOpen, theme }) => (isOpen ? theme.color.status.primary : "")};
    &:after {
      position: absolute;
      top: 100%;
      left: auto;
      right: 0px;
      content: "";
      width: 0px;
      height: 2px;
      background: ${({ theme }) => theme.color.status.primary};
      transition: 0.3s width ease-in-out;
    }

    @media (max-width: 768px) {
      color: white;
    }
  }

  @media (min-width: 769px) {
    &:hover {
      h3,
      h4,
      h5 {
        color: ${({ theme }) => theme.color.status.primary};
        // &:after {
        //   width: 100%;
        //   right: auto;
        //   left: 0px;
        // }
      }
    }
  }

  ${({ isOpen, theme }) =>
    isOpen
      ? `
  h5 {
    color: ${theme.color.status.primary} ;
    &:after {
      width: 100%;
      right: auto;
      left: 0px;
    }
  }
  `
      : ""}
`;

export const NameParentMenu = styled.h4`
  color: ${({ isOpen, theme }) => (isOpen ? theme.color.status.primary : "")};
`;

export const CaretDownIcon = styled.div`
  svg {
    transition: 0.3s transform ease-in-out;
    transform: rotate(${({ isOpen }) => (isOpen ? "0" : "-90")}deg);
  }
`;

export const MenuSubItemWrapper = styled.div`
  border-top: 1px solid ${({ isOpen, theme }) => (isOpen ? theme.color.status.primary : theme.color.page.border)};
  border-top: ${({ isOpen, theme }) =>
    isOpen ? "4px solid" + theme.color.status.primary : "1px solid" + theme.color.page.border};
  padding-left: 18px;
  margin-top: 9px;
`;

export const MenuSubItemButton = styled(MenuItemButton)`
  height: 24px;
  margin-top: 20px;

  h5 {
    margin-right: 10px;
    white-space: nowrap;
  }

  ${({ isOpen }) =>
    isOpen
      ? `
  .have-sup-menu {
    color: ${({ theme }) => theme.color.status.primary};
    &:after{
      width:0;
    }
    }
  }
  `
      : ""}
`;

export const NameSubItemMenu = styled.h5`
  // color: red;
`;

export const MenuSubItemIcon = styled.div`
  width: 10px;
  height: 10px;
  position: relative;

  &:after,
  &:before {
    content: "";
    display: block;
    background: currentColor;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.3s opacity ease-in-out;
  }

  &:after {
    width: 10px;
    height: 2px;
  }

  &:before {
    width: 2px;
    height: 10px;
  }

  ${({ isOpen }) =>
    isOpen
      ? `
  &:before {
    opacity: 0;
  }
  &:after {
    background: #F89520;

  }
  `
      : ""}
`;

export const MenuSub2ItemWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.color.page.border};
  padding-left: 18px;
  margin-top: 20px;
  padding-bottom: 20px;

  &:last-child {
    border-bottom: 0px;
    padding-bottom: 0px;
  }
`;

export const MenuMainWrapper = styled.div`
  display: flex;
  flex: 1 0 0;
`;

export const MenuChildWraper = styled.div`
  margin-top: 12px;
`;

export const MenuChildItemWraper = styled.div`
  display: flex;

  &:not(:first-child) {
    margin-top: 90px;
  }
`;

export const MenuChildItem = styled.div`
  width: 50%;
  flex: 1 0 0;

  ${({ isFirst }) => (isFirst ? "margin-right: 40px;" : "")}

  h2 {
    margin-bottom: 12px;
  }

  h5 {
    margin-bottom: 8px;
  }

  p {
    color: ${({ theme }) => theme.color.text.description};
    white-space: pre-wrap;
  }
`;

export const MenuChildImageWrapper = styled.div`
  img {
    border-radius: 10px;
  }
`;

export const ProductSingleWraper = styled.div`
  @media (max-width: 768px) {
    width: 100vw;
    overflow: scroll;
  }
`;

export const ProductSingleContainer = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding: 0px 20px;
    gap: 20px;
  }
`;

export const ProductSingleItem = styled.div`
  text-align: center;

  img {
    width: 100%;
  }
`;

export const MenuMobileWrapper = styled.div`
  width: 100%;
`;

export const MenuMainMobileWrapper = styled.div``;

export const ProductSingleMobileInfoWrapper = styled.div`
  margin-top: 24px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const ProductSingleMobileInfo = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MenuChildMobileWrapper = styled.div`
  position: relative;
  width: 100vw;
`;

export const MenuChildMobileScroller = styled.div`
  position: relative;
`;

export const MenuChildItemMobile = styled.div`
  height: 100%;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MenuChildMobileInfo = styled.div`
  background: white;
  margin-top: -20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  padding: 35px 20px 80px;
  text-align: center;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;

  h3 {
    margin-bottom: 10px;
  }

  h5 {
    margin-bottom: 20px;
  }

  &.hide {
    opacity: 0;
    pointer-events: none;
    user-select: none;
  }
`;

export const MenuTreeMobileWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: auto;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  overflow: auto;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;

  &.hide {
    opacity: 0;
    pointer-events: none;
    user-select: none;
  }
`;

export const DotsWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
`;

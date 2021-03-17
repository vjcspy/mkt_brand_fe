import styled from "styled-components";

export const HeaderWrapper = styled.header`
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid ${({ theme }) => theme.color.page.border};
  position: sticky;
  top: 0px;
  left: 0px;
  z-index: 1000;
  box-shadow: 0px 4px 12px 0px rgb(0 0 0 / 0.2);
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
`;

export const LogoWrapper = styled.a`
  img {
    height: 100%;
    max-height: 68px;
    width: auto;
    max-width: 140px;
    width: 100%;
  }
`;

export const HeaderLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  a {
    margin: 0 30px;
    position: relative;
    transition: 0.3s color ease-in-out;

    &.active {
      color: ${({ theme }) => theme.color.status.primary};
      &: after {
        content: "";
        background: ${({ theme }) => theme.color.status.primary};
        width: 100%;
      }
    }

    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }

    h4 {
      color: currentColor;
      font-size: 16px;
    }

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

    &:hover {
      color: ${({ theme }) => theme.color.status.primary};
      &:after {
        width: 100%;
        left: 0px;
        right: auto;
      }
    }
  }

  @media (max-width: 768px) {
    display: ${({ showMobile }) => (showMobile ? "flex" : "none")};
    position: fixed;
    bottom: 0;
    left: 0;

    justify-content: space-between;
    width: 100%;
    padding: 18px 20px;
    background: #242424cc;
    a {
      color: #ffffff;
    }
    a:hover {
      color: ${({ theme }) => theme.color.status.primary};
      text-decoration: underline;
    }
  }
`;

export const FlexGrow = styled.div`
  flex: 1 0 0;
  svg,
  img {
    cursor: pointer;
  }
`;

export const HeaderLeft = styled.div``;

export const HeaderRight = styled.div`
  svg {
    &:not(:last-child) {
      margin-right: 32px;
    }
    cursor: pointer;
  }
`;

export const LanguageWrapper = styled.ul`
  margin: 0px;
  display: inline-flex;
`;

export const LanguageItem = styled.li`
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.text.disabled};
  transition: color 0.3s ease-in-out;
  line-height: 20px;

  &:not(:last-child) {
    margin-right: 3px;
    padding-right: 3px;
    border-right: 1px solid ${({ theme }) => theme.color.text.heading};
  }

  &.active {
    color: ${({ theme }) => theme.color.text.heading};
  }
`;

export const TopMenuRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
`;

export const HeaderTopWrapper = styled.div`
  border-bottom: 1px solid #71717140;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ItemTopMenuRight = styled.div`
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 10px;

  &:last-child {
    padding-right: 0;
  }

  &:not(:last-child)::after {
    width: 1px;
    height: 13px;
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    background: currentColor;
    transform: translateY(-50%);
  }

  svg,
  img {
    &:not(:last-child) {
      margin-right: 7px;
    }
  }

  @media (max-width: 1068px) {
    padding: 0 10px;
  }
  h6 {
    color: ${({ theme }) => theme.color.text.description};
  }
`;

export const HoverWrapper = styled.button`
  outline: 0 none;
  border: 0 none;
  margin: 0;
  padding: 0;
  background: white;
  position: relative;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;

  &:after {
    position: absolute;
    top: 100%;
    left: auto;
    right: 0px;
    content: "";
    width: 0px;
    height: 1px;
    background: ${({ theme }) => theme.color.status.primary};
    transition: 0.3s width ease-in-out;
  }

  h6,
  svg {
    transition: 0.3s color ease-in-out;
  }

  &:hover,
  &.active {
    h6,
    svg {
      color: ${({ theme }) => theme.color.status.primary};
    }
    &:after {
      width: 100%;
      right: auto;
      left: 0px;
    }
  }
`;

export const WrapperContent = styled.div`
  position: relative;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 7px 0;
`;

export const SlideCode = styled.div``;

export const WrapperMenuRight = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: flex-end;
  min-width: 345px;

  // @media (max-width: 1068px) {
  //   min-width: 335px;
  // }
`;

export const GroupFlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const MenuIconButton = styled.button`
  padding: 0;

  border: 0 none;
  outline: 0 none;
  background: transparent;

  &:not(:last-child) {
    margin-right: 20px;
  }
  svg {
    margin-top: 10px;
  }

  @media (min-width: 769px) {
    ${({ hideDesktop }) => hideDesktop && "display: none;"}
  }
`;

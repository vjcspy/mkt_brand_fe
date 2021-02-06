import styled from "styled-components";

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 100;
    background: rgba(0, 0, 0, 0.7);
    height: 56px;
    align-items: center;
    &:after {
      position: absolute;
      inset: 0;
      content: "";
      display: block;
      backdrop-filter: blur(3px);
      z-index: -1;
    }
  }
`;

export const TabsContent = styled.div`
  display: flex;
  padding-bottom: 2px;
  border-bottom: 1px solid ${({ theme }) => theme.color.page.border};
  @media (max-width: 768px) {
    border: 0 none;
  }
`;

export const TabItem = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
  transition: 0.3s color ease-in-out;

  > svg {
    margin-right: 8px;
  }

  &:not(:last-child) {
    margin-right: 68px;
  }

  h4 {
    color: currentColor;
  }

  &:after {
    position: absolute;
    top: calc(100% + 1px);
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

  @media (max-width: 768px) {
    color: white;
    margin-right: 0px;
    justify-content: space-between;

    h4 {
      display: none;
    }
    svg {
      margin-right: 0px;
    }
  }

  ${({ active, theme }) =>
    active &&
    `
    color: ${theme.color.status.primary} !important;
    &:after {
        width: 100%;
        left: 0px;
        right: auto;
    }
  `}
`;

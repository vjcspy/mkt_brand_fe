import styled from "styled-components";

export const WrapperListPoint = styled.div`
  div: last-child {

  }
  div:first-child {
  }
`;

export const Item = styled.div`
  margin: ${({ display }) => (display === "block" ? "8px 0" : "0 8px")};

  display: ${({ display }) => display};

  width: 12px;
  height: 12px;
  position: relative;
  background: none;
  border-radius: 50%;
  transition: 0.3s;
  border: 1px solid ${({ borderColor }) => borderColor};
  transform: scale(${({ active }) => (active ? 1.2 : 1)});

  ${({ active, background }) =>
    active
      ? `
    &::after {
    content: "";
    width: 8px;
    height: 8px;
    position: absolute;
    top: 50%;
    transition: 0.3s;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background:${background};
  }`
      : ""}
`;

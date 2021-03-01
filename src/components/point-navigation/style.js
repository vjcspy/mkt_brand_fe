import styled from "styled-components";

export const WrapperListPoint = styled.div`
  & div:last-child {
    margin-bottom: 0;
    margin-right: 0;
  }

  & div:first-child {
    margin-top: 0;
    margin-left: 0;
  }
`;

export const Item = styled.div`
  margin: ${({ display }) => (display === "block" ? "8px 0 0 0" : "0 8px 0 0")};

  display: ${({ display }) => display};

  width: 8px;
  height: 8px;
  position: relative;
  background: none;
  border-radius: 50%;
  transition: 0.3s;
  border: 1px solid ${({ borderColor }) => borderColor};
  transform: scale(${({ active }) => (active ? 1.75 : 1)});
  @media (max-width: 768px) {
    transform: scale(${({ active }) => (active ? 1.5 : 1)});
    margin: ${({ display }) => (display === "block" ? "10px 0 0 0" : "0 10px 0 0")};
  }
  ${({ active, background, sizeAfter }) =>
    active
      ? //     ? `
        //   &::after {
        //   content: "";
        //   width: ${sizeAfter}px;
        //   height: ${sizeAfter}px;
        //   position: absolute;
        //   top: 50%;
        //   transition: 0.3s;
        //   left: 50%;
        //   transform: translate(-50%, -50%);
        //   border-radius: 50%;
        //   background:${background};
        // }`
        //     : ""}
        `&{
     background:${background};

  }`
      : ""}
`;

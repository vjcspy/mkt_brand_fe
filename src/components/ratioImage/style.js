import styled from "styled-components";

export const WrapperRatio = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Content = styled.div`
  width: 100%;
  padding-top: ${({ paddingTop }) => paddingTop}%;
  position: relative;

  img {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  @media (max-width: 768px) {
    height: 100%;
  }
`;

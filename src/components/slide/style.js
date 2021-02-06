import styled from "styled-components";

export const WrapperSlide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
  &.center {
    justify-content: center;
  }
`;

export const ContentSlide = styled.div`
  position: relative;
  overflow: hidden;
  margin: 0 20px;
  max-width: 330px;
`;

export const ListSlides = styled.div`
  transition: 0.3s;
  display: flex;
`;

export const ItemSlide = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;

  display: flex;
  justify-content: center;
  min-width: 100%;
  user-select: none;

  a {
    font-weight: 500;
    cursor: pointer;
    text-decoration: underline !important;
  }
`;

export const WrapperIcon = styled.div`
  cursor: pointer;
  display: flex;
`;

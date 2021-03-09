import styled from "styled-components";

export const WrapperListBrand = styled.div``;

export const ContentList = styled.div`
  padding: 50px 0 30px;
  & > div:last-child {
    div:last-child {
      border-bottom: none !important;
    }
  }
  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

export const ItemListBrand = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
    &:not(:last-child) {
      border-bottom: 1px solid #e9e9e9;
      padding-top: 10px;
    }
  }
`;

export const BrandName = styled.div`
  width: 16%;
  min-width: 50px;
  padding: 15px 0;
  h4 {
    text-transform: uppercase;
  }
  p {
    margin: 0;
  }
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    padding: 0;
    p,
    h4 {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      text-transform: uppercase;
    }
    h4 {
      margin-right: 3px;
    }
  }
`;

export const ListLogo = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  flex: 1;
  max-width: 701px;
  border-bottom: 1px solid #e9e9e9;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    border-bottom: none;
  }
`;

export const ItemLogo = styled.div`
  &:not(:last-child) {
    margin-right: 40px;
  }
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

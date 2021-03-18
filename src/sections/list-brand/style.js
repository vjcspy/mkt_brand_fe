import styled from "styled-components";

export const WrapperListBrand = styled.div``;

export const ContentList = styled.div`
  padding: 34px 0 30px;
  border-top: 1px solid #dadada;

  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

export const ItemListBrand = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
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
  @media (max-width: 768px) {
    flex-wrap: wrap;
    border-bottom: none;
  }
`;

// export const ItemLogo = styled.div`
//   &:not(:last-child) {
//     margin-right: 40px;
//   }
//   @media (max-width: 768px) {
//     margin-top: 10px;
//   }
// `;

export const ListBrandNameTab = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  & > p {
    margin: 0 50px;
  }
  & > p:last-child {
    margin-right: 0;
  }
  & > p:first-child {
    margin-left: 0;
  }
  @media (max-width: 768px) {
    justify-content: space-around;

    p {
      margin: 0;
      font-size: 14px;
    }
  }
`;

export const NameBrand = styled.p`
  font-style: normal;
  cursor: pointer;
  font-weight: normal;
  font-size: 20px;
  line-height: 30px;
  color: ${({ active }) => (active ? "#000000" : "#B2B2B2")};
`;

export const ListLogoBrand = styled.div`
  display: flex;
  justify-content: center;
  & > div {
    margin: 0 14px;
  }
  & > div:last-child {
    margin-right: 0;
  }
  & > div:first-child {
    margin-left: 0;
  }
  @media (max-width: 768px) {
    justify-content: flex-start;
    flex-wrap: wrap;
    & > div {
      width: calc(33% - 7px);
      margin: 0;
      margin-right: 7px;
      margin-top: 7px;
      height: unset;
      padding-top: 21%;
    }
  }
`;

export const ItemLogo = styled.div`
  border: 1px solid #cccccc;
  border-radius: 4px;
  width: 240px;
  height: 145px;
  position: relative;

  img {
    height: 57%;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media (max-width: 768px) {
    height: 50%;
  }
`;

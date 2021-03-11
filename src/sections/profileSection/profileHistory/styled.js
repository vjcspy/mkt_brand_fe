import styled from "styled-components";

export const ProfileHistoryWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 90px;
`;

export const ProfileHistoryItem = styled.div`
  display: flex;
  align-items: center;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.color.page.border};
  border-radius: 4px;
  &:not(:last-child) {
    margin-bottom: 24px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

export const ProfileItemLeft = styled.div`
  text-align: center;
  flex: 1 0 0;
  width: 50%;
  border-right: 1px solid ${({ theme }) => theme.color.page.border};

  h4 {
    margin-bottom: 24px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding-bottom: 20px;
    border-right: 0 none;
    border-bottom: 1px solid ${({ theme }) => theme.color.page.border};
  }
`;

export const RateWrapper = styled.div`
  display: flex;
`;

export const RateItem = styled.div`
  cursor: pointer;
  flex: 1 0 50px;
  color: ${({ theme, active }) => (active ? theme.color.status.success : theme.color.text.disabled)};
  p {
    margin: 0;
    color: ${({ theme, active }) => (active ? theme.color.text.heading : theme.color.text.disabled)};
  }
`;

export const ProfileItemRight = styled.div`
  flex: 1 0 0;
  width: 50%;
  padding-left: 24px;

  h3 {
    margin-bottom: 20px;
  }

  > h5 {
    margin-bottom: 7px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding-top: 20px;
    padding-left: 0px;
  }
`;

export const Pricewrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h5 {
    svg {
      vertical-align: sub;
      margin-left: 6px;
    }
  }
`;

export const WrapperViewDetail = styled.div``;

export const Tittle = styled.h3`
  max-width: 92%;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    max-width: unset;
  }
`;

export const CodeBill = styled.p`
  margin: 0;
  margin-bottom: 20px;
`;

export const WrapperRatting = styled.div`
  background: #d3d2d233;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 14px;
  text-align: center;
  h5 {
    margin-bottom: 20px;
  }
`;

export const ListRating = styled.div``;

export const Restaurant = styled.div`
  margin-bottom: 17px;
  display: flex;
`;

export const LogoRestaurant = styled.div`
  width: 70px;
  min-width: 70px;
  height: 70px;
  border: 1px solid #d3d2d2;
  border-radius: 4px;
  margin-right: 17px;
`;

export const InfoRestaurant = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    color: #7b7979;
    margin: 0;
  }
`;

export const DetailBill = styled.div`
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  padding: 12px 0;
  .show {
    bottom: 0;
    height: 35px;
  }
  margin-bottom: 20px;
`;

export const ItemDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  span {
    color: #7b7979;
    font-size: 14px;
  }
`;

export const FooterDetail = styled.div``;

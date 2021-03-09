import styled, { keyframes } from "styled-components";

export const WrapperListRestaurant = styled.div`
  height: 100%;
  position: relative;
`;

export const Title = styled.h3`
  width: calc(100% - 40px);
`;

export const List = styled.div`
  // height: 100%;
  // overflow: auto;
  margin-top: 20px;
  & > div:not(:first-child) {
    margin-top: 20px;
    border-top: 1px solid #e9e9e9;
    padding-top: 20px;
  }
`;

export const ItemRestaurant = styled.div`
  padding: 20px 0;
  h5 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;

    align-items: center;
    svg {
      margin: 5px;
    }
    span {
      display: flex;
      align-items: center;
    }
    .view-map {
      font-style: normal;
      font-weight: normal;
      line-height: 24px;
      text-align: right;
      letter-spacing: 0.03em;
      color: ${({ theme }) => theme.color.text.heading};
    }
  }

  p {
    color: ${({ theme }) => theme.color.text.description};
    font-size: 16px;
  }

  button {
    padding: 10px 0;
    width: 48%;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      margin-right: 10px;
    }
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.color.page.border};
  }
`;

export const GroupButton = styled.div`
  display: flex;
  justify-content: space-between;
`;

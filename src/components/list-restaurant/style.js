import styled from "styled-components";

export const WrapperListRestaurant = styled.div`
  height: 100%;
`;

export const Title = styled.h3``;

export const List = styled.div`
  height: 100%;
  overflow: auto;
`;

export const ItemRestaurant = styled.div`
  padding: 20px 0;
  h5 {
    display: flex;
    justify-content: space-between;

    align-items: center;
    svg {
      margin: 5px;
    }
    span {
      display: flex;
      align-items: center;
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

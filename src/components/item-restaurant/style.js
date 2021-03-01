import styled from "styled-components";

export const WrapperItemRestaurant = styled.div`
  cursor: pointer;
  transition: 0.3s;
  overflow: hidden;
`;

export const HeadRestaurant = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ViewMap = styled.div`
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  text-align: right;
  letter-spacing: 0.03em;
  color: #231f20;
  display: flex;
  svg {
    margin-top: 2px;
    margin-left: 5px;
  }
`;

export const WrapperAddress = styled.div`
  margin-bottom: 20px;
`;

export const ItemContent = styled.div`
  display: flex;
`;
export const Title = styled.h6`
  width: 22%;
  min-width: 90px;
  color: #7b7979;
`;
export const Content = styled.h6``;
export const GroupButton = styled.div`
  transition: 0.3s;
  display: flex;

  button {
    width: 50%;
    max-width: 167px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    svg {
      margin-right: 4px;
    }
  }
  button:first-child {
    margin-right: 20px;
  }
`;

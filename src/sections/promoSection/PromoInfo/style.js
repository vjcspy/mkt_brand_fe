import styled from "styled-components";

export const NamePromo = styled.h2`
  margin-bottom: 24px;
  @media (max-width: 767px) {
    margin-bottom: 10px;
    font-size: 24px;
  }
`;

export const WrapperFlex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
  p {
    margin: 0;
    font-size: 16px;
  }
  span {
    text-align: right;
  }
`;

export const ContentField = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.color.text.description};
`;

export const WrapperButton = styled.div`
  & span {
    color: #ffffff;
  }
`;

export const Feature = styled.h5`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 20px 0;
  svg {
    margin-left: 5px;
    margin-top: 3px;
    transform: rotate(-90deg);
  }
`;

export const Description = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 5;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    margin-top: 6px;
  }
`;

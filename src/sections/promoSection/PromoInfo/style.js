import styled from "styled-components";

export const NamePromo = styled.h2`
  margin-bottom: 24px;
  @media (max-width: 767px) {
    margin-bottom: 10px;
    font-size: 24px;
    -webkit-line-clamp: 1;
    overflow: hidden;
    -webkit-box-orient: vertical;
    display: -webkit-box;
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
  h5 {
    font-weight: normal;
  }
`;

export const ContentField = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.color.text.description};
`;

export const DescriptionPromo = styled.span`
  cursor: pointer;
  font-size: 16px;
  color: ${({ theme }) => theme.color.text.description};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  -webkit-box-orient: vertical;

  span {
    color: ${({ theme }) => theme.color.status.primary};
  }
  &.open {
    display: block;
  }
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

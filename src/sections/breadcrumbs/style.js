import styled from "styled-components";

export const TitleLinkPagination = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0 24px;

  h5 {
    cursor: pointer;
    cursor: pointer;
    font-weight: normal;
    color: ${({ theme }) => theme.color.text.description};
    &:not(:first-child) {
      margin-left: 5px;
    }
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
`;

export const WrapperBreadcrumbs = styled.div`
  width: 100%;
  height: 20px;
  @media (max-width: 768px) {
    display: none;
  }
`;

import styled from "styled-components";

export const WrapperComment = styled.div`
  width: 90%;
  margin: 0 auto;
  max-width: 1024px;
  margin-top: 100px;
`;

export const WrapperListComment = styled.div`
  max-width: 100%;
  overflow: hidden;
`;

export const ListComment = styled.div`
  display: flex;

  & > div:first-child {
    margin-left: 0;
  }
  & > div:last-child {
    margin-right: 0;
  }
  transition: 0.3s;
`;
export const CommentWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.color.page.border};
  border-radius: 20px;
  padding: 24px 20px;
  margin: 0 20px;
  min-width: calc(50% - 20px);
  user-select: none;
  p {
    color: ${({ theme }) => theme.color.text.description};
    font-size: 14px;
    margin: 0;
  }
  @media (max-width: 768px) {
    margin: 0 1px;
  }
`;
export const GroupActor = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;
export const Avatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
`;
export const Actor = styled.div``;
export const WrapperEndpointComment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 97px;

  .point-pagination-promo {
  }
  .left {
    margin-right: 14px;
  }
  .right {
    margin-left: 14px;
  }

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

import styled from "styled-components";

export const WrapperComment = styled.div`
  width: 90%;
  margin: 0 auto;
  max-width: 1024px;
  margin-top: 100px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const WrapperListComment = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const CommentWrapper = styled.div`
  width: calc(50% - 20px);
  border: 1px solid ${({ theme }) => theme.color.page.border};
  border-radius: 20px;
  padding: 24px 20px;

  p {
    color: ${({ theme }) => theme.color.text.description};
    font-size: 14px;
    margin: 0;
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
  margin-top: 33px;
`;

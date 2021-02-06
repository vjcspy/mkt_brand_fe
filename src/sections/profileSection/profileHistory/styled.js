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

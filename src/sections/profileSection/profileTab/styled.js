import styled from "styled-components";

export const ProfileTabWrapper = styled.div`
  display: grid;
  gap: 30px;
  padding-top: 70px;
  padding-bottom: 50px;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding-bottom: 90px;
  }
`;

export const ProfileTabGrid = styled.div``;

export const ProfileInputWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    margin-top: 32px;
    height: 40px;
  }

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const AvatarWrapper = styled.div`
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  background: ${({ theme }) => theme.color.status.info};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AvatarButton = styled.button`
  background: white;
  outline: 0 none;
  border: 0 none;
  margin: 0;
  padding: 0;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 47px;
  height: 47px;
`;

export const ProfileInfoWrapper = styled.div`
  @media (max-width: 768px) {
    padding: 20px;
    border: 1px solid ${({ theme }) => theme.color.page.border};
    border-radius: 4px;
    margin-top: 20px;
  }
`;

export const ProfileInfoItem = styled.div`
  display: flex;
  justify-content: space-between;

  &:first-child {
    margin-top: 32px;
  }

  &:not(first-child) {
    margin-top: 10px;
  }

  p {
    margin: 0px;
  }

  svg {
    vertical-align: sub;
  }
`;

export const ProfileButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;

  button {
    flex: 1;

    &:first-child {
      margin-right: 24px;
    }
  }
`;

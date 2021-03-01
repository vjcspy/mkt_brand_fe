import styled from "styled-components";

export const Marker = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  top: 0;
  left: 0;
`;

export const DropDownWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.color.page.border};
  background: white;
  padding: 20px;
  border-radius: 0px 0px 4px 4px;
  width: 300px;
  position: absolute;
  top: calc(100% + 7px);
  right: 0px;
  z-index: 100;
  @media (max-width: 768px) {
    top: 100%;
  }
`;

export const ProfileWrapper = styled.div`
  display: flex;
`;

export const AvatarWrapper = styled.div`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.color.status.info};
  overflow: hidden;
  margin-right: 14px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }

  h1 {
    color: white;
    text-transform: uppercase;
  }
`;

export const ProfileNameWrapper = styled.div`
  flex: 1 0 0;
  max-width: calc(100% - 94px);
  h5 {
    margin-bottom: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  button {
    padding: 0 10px;
  }
`;

/// tabs

export const TabsWrapper = styled.div``;

export const TabItem = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;

  h5 {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    color: currentColor;
    transform: translateY(1px);
  }

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  h5,
  svg {
    transition: 0.3s color ease-in-out;
  }

  &:hover {
    color: ${({ theme }) => theme.color.status.primary};
  }
`;

import styled from "styled-components";

export const ProfileGiftWrapper = styled.div`
  margin-top: 90px;
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 90px;
  justify-content: center;
`;

export const LeftWrapper = styled.div`
  width: 30%;
  padding-bottom: 30%;
  border-radius: 10px;
  background: ${({ theme }) => theme.color.page.border};

  @media (max-width: 768px) {
    width: 100%;
    padding-bottom: 100%;
  }
`;

export const RightWrapper = styled.div`
  margin-left: 40px;

  h2 {
    margin-bottom: 28px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    li {
      display: flex;
      align-items: center;

      &:not(:last-child) {
        margin-bottom: 17px;
      }

      svg {
        margin-right: 11px;
      }
    }
  }
  @media (max-width: 768px) {
    margin-left: 0px;
    margin-top: 20px;
  }
`;

export const StoresWrapper = styled.div`
  display: flex;
  margin-top: 24px;
  a {
    display: block;
    cursor: pointer;
    &:first-child {
      margin-right: 36px;
    }
  }
`;

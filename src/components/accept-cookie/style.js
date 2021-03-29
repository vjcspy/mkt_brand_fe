import styled from "styled-components";

export const CookieWrapper = styled.div`
  padding: 40px;
  width: 100%;
  max-width: 1024px;

  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  background: #ffffff;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 10px 10px 0 0;
  }

  &.hide {
    display: none;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    cursor: pointer;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
  p {
    margin: 0;
    font-size: 14px;
    color: ${({ theme }) => theme.color.text.description};
    margin-right: 40px;
  }
  .link {
    color: ${({ theme }) => theme.color.status.primary};
    text-decoration: underline !important;
  }
  button {
    width: 30%;
    max-width: 156px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 10px;
    align-items: end;
    p {
      margin-right: 0;
    }
    button {
      width: 100%;
      max-width: 100%;
      margin-top: 20px;
    }
  }
`;

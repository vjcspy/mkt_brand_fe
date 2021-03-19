import styled from "styled-components";

export const LeftContentWrapper = styled.div`
  background: #f3f3f3;
  width: 300px;
  border-right: 1px solid ${({ theme }) => theme.color.page.border};
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow: auto;

  display: ${({ show }) => (show ? "none  " : "flex")};
`;

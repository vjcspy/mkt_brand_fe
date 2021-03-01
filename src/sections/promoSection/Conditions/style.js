import styled from "styled-components";

export const ListConditionWrapper = styled.ul`
  list-style: disc;
  margin: 0;
  padding-left: 20px;
  height: 100%;
  overflow: auto;
  li {
    margin-bottom: 16px;
  }
  li:last-child {
    margin-bottom: 0;
  }
  li:first-child {
    padding-top: 30px;
  }
  @media (max-width: 767px) {
    padding-left: 20px;
  }
`;

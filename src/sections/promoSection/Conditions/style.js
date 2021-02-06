import styled from "styled-components";

export const ListConditionWrapper = styled.ul`
  list-style: disc;
  margin: 0;
  margin-top: 30px;
  li {
    margin-bottom: 16px;
  }
  li:last-child {
    margin-bottom: 0;
  }
  @media (max-width: 767px) {
    padding-left: 20px;
  }
`;

import styled from "styled-components";

export const Input = styled.input`
  box-sizing: border-box;
  border-radius: 4px;
  padding: 10px 24px;
  color: ${({ theme }) => theme.color.text.description};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

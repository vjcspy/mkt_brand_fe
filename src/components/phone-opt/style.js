import { stubArray } from "lodash";
import styled from "styled-components";

export const WrapperConfirm = styled.div`
  button {
    width: 100%;
  }
`;

export const Tittle = styled.h3`
  margin-bottom: 10px;
`;

export const InfoTitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.color.text.description};
`;
export const InputGroup = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.color.page.borderInput};
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 10px 24px;
  display: flex;
`;

export const DropdownPhoneLocation = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    color: ${({ theme }) => theme.color.text.subColor};
    margin: 0;
    margin-right: 5px;
  }
`;

export const PhoneInput = styled.input`
  flex: 1;
  border: none;
  text-align: center;
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-input-placeholder {
    color: #7b7979;
    opacity: 0.6;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

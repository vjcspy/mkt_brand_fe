import styled from "styled-components";

export const InputWrapper = styled.div`
  border-bottom: 1px solid #7b7979;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  height: 40px;
`;

export const InputPhoneWrapper = styled.div`
  border-bottom: 1px solid #7b7979;
  display: flex;
`;

export const DropdownWrapper = styled.div`
  position: relative;
  border-bottom: 1px solid #7b7979;
  display: flex;
  align-items: flex-end;
  height: 40px;
`;

export const TitleDopDown = styled.label`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #7b7979;
  position: absolute;
  top: -6px;
`;

export const Title = styled.label`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #7b7979;
  position: absolute;
  top: 16px;
  transition: 0.3s;
`;

export const InputTag = styled.input`
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #231f20;

  &:active,
  &:focus,
  &:valid {
    + label {
      top: -6px;
      font-size: 14px;
    }
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const ContentDropDown = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  p {
    margin: 0;
  }
`;

export const ListData = styled.div`
  position: absolute;
  background: #ffffff;
  width: 100%;
  bottom: 2px;
  border: 1px solid;
  transform: translateY(100%);
  padding: 12px 24px;
  border: 1px solid #231f20;
  box-sizing: border-box;
  border-radius: 4px;
  z-index: 10;
`;

export const ItemSelect = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
  svg {
    display: none;
  }
  &.active {
    color: #f89520;
    svg {
      display: block;
    }
  }
`;

export const MarkerDropdown = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`;

export const WrapperPhoneLocation = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  p {
    margin: 0;
    white-space: nowrap;
    margin-right: 5px;
  }
`;

export const ListLocation = styled.div`
  height: fit-content;
  overflow: auto;
  position: absolute;
  transform: translateY(100%);
  background: #ffffff;
  z-index: 10;
  bottom: 0;
`;

export const LocationSelected = styled.div`
  display: flex;
  align-items: center;
`;

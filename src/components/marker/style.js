import styled from "styled-components";

export const WrapperMarker = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  transform: translate(-50%, -100%);
  label {
    position: absolute;
    width: 100%;
    font-weight: 600;
    top: 50%;
    left: 86%;
    font-size: 13px;
    white-space: nowrap;
  }
`;

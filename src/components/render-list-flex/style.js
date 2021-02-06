import { camelCase } from "lodash";
import styled from "styled-components";

export const WrapperFlex = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  & > * {
    width: ${({ widthItemDesktop }) => "calc(" + widthItemDesktop + "% - 20px)"};
  }

  @media (max-width: 768px) {
    & > * {
      width: ${({ widthItemMobile }) => "calc(" + widthItemMobile + "% - 10px)"};
    }
  }
`;

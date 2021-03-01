import styled from "styled-components";
import { ClickableStyle } from "../../../styles/developmentStyle";

export const SectionsWrapper = styled.div``;

export const SectionsBlock = styled.div`
  &:not(:first-child) {
    margin-top: 10px;
  }
`;

export const SectionItem = styled.div`
  border: 1px solid ${({ theme }) => theme.color.page.border};
  padding: 5px 8px;
  cursor: pointer;
  line-height: 26px;
  user-select: none;
  position: relative;
  background: white;
  box-shadow: 0 1px 3px 0 rgba(64, 64, 64, 0.24);
  display: flex;
  align-items: center;

  &:hover {
    background: #f6f6f7;
  }

  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:not(:first-child) {
    border-top-width: 0px;
  }

  ${({ add, theme }) => (add ? `color: ${theme.devColor.btnBg};` : "")}
`;

export const SectionThumbnailWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #f4f6f8;
  border: 1px solid ${({ theme }) => theme.devColor.border};
  border-radius: 4px;
  margin-right: 10px;
  flex-wrap: wrap;
  padding: 2px;

  svg {
    width: 20px;
    height: 20px;
  }

  ${({ isGrid }) =>
    isGrid
      ? `
      justify-content: space-between;
      img {
        width: 15px;
        height: 15px;
        object-fit: cover;
        display: block;
        &:nth-child(3), &:nth-child(4) {
          margin-top: 3px;
        }
      }`
      : "justify-content: center;"}
`;

export const SectionTitleWrapper = styled.div`
  flex: 1 0 0;
`;

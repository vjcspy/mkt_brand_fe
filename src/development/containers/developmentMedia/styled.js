import styled from "styled-components";
import { DialogHeader } from "../developmentDialog/styled";

export const MediaContent = styled.div`
  width: 1200px;
  max-width: 100%;
  position: relative;

  .${DialogHeader.styledComponentId}.has-btn {
    position: relative;
    padding-left: 90px;
  }
`;

export const MediaCard = styled.div`
  width: 25%;
  padding: 0px 15px;
  margin-top: 15px;

  .media-img-wrapper {
    padding-bottom: 62.8%;
    position: relative;
    height: 0px;
    margin-bottom: 7px;
  }

  .media-img-content {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background-color: rgb(51, 55, 64);
    display: flex;
    align-items: center;
    justify-content: center;

    &.selected {
      border-radius: 4px;
      border: 3px solid ${({ theme }) => theme.devColor.btnBg};
    }
  }

  .media-img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    margin: auto;
  }

  .media-name {
    margin-bottom: 10px;
    font-weight: 500;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .media-mime {
    text-transform: uppercase;
    color: #b0b0b0;
  }

  .media-add {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed ${({ theme }) => theme.devColor.border};
    background: #f7f7f7;
    cursor: pointer;

    &:after,
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      height: 8px;
      width: 30%;
      transform: translate(-50%, -50%);
      background: ${({ theme }) => theme.devColor.border};
      border-radius: 4px;
    }

    &:after {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }

  .media-delete {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    border: 0 none;
    padding: 6px;
    outline: 0 none;
    cursor: pointer;
  }

  .dragzone {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .dragging {
    background-color: rgba(28, 93, 231, 0.01);
    border: 2px dashed rgba(28, 93, 231, 0.1);
  }
`;

export const MediaCardWrapper = styled.div`
  margin-left: -15px;
  margin-right: -15px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const PagingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const DragDropWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 36px;
  margin-bottom: 18px;
  padding-top: 40px;
  padding-bottom: 40px;
  text-align: center;
  border-radius: 4px;
  border: 2px dashed #e3e9f3;
  background-color: #fafafa;

  &.dragging {
    background-color: rgba(28, 93, 231, 0.01);
    border: 2px dashed rgba(28, 93, 231, 0.1);
  }

  .dragzone {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

export const FromURLWrapper = styled.div`
  margin-top: 36px;
  position: relative;
  padding-bottom: 27px;

  label {
    width: 100%;
    font-weight: 500;
    font-size: 18px;
    color: rgb(51, 55, 64);
    display: block;
    margin-bottom: 1rem;
  }

  textarea {
    width: 100%;
    height: 200px;
    padding: 5px 10px;
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;
    outline: 0px;
    border: 1px solid rgb(227, 233, 243);
    border-radius: 4px;
    color: rgb(51, 55, 64);
    background-color: rgb(255, 255, 255);
    line-height: 18px;

    &:focus {
      border-color: rgb(120, 202, 255);
    }
  }

  p {
    width: 100%;
    padding-top: 10px;
    font-size: 13px;
    line-height: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0px;
  }
`;

export const MediaBodyWrapper = styled.div`
  margin-top: 18px;
  margin-bottom: 18px;
`;

export const BtnBack = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 69px;
  height: 69px;
  border-right: 1px solid ${({ theme }) => theme.devColor.border};

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const LoadingWrapper = styled.div`
  transition: height 0.3s ease-in-out;
  height: ${({ loading }) => (loading ? "50px" : "0px")};
`;

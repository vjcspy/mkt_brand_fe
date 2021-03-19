import styled from "styled-components";

export const DevelopmentContainer = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`;

export const DevelopmentMainContent = styled.div`
  grid-areas: main;
  overflow: auto;
  flex: 1;
  padding: ${({ viewPreview }) => (viewPreview ? "0" : "20px")};
  background: #ddd;
  position: relative;
`;

export const GridWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  transition: grid-template-columns 0.2s cubic-bezier(0.64, 0, 0.35, 1);
  grid-template-columns: 300px 1fr;
  grid-template-rows: auto 1fr auto auto;
  grid-template-areas: "header header" "sidebar main";

  &.viewPreview {
    display: flex;
    flex-direction: column;
  }
`;

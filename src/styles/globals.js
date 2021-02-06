import styled, { createGlobalStyle } from "styled-components";

export const DevelopmentClass = styled.div``.styledComponentId;
export const GlobalStyle = createGlobalStyle`
  html,
  body,
  input,
  textarea,
  button {
    color: ${({ theme }) => theme.color.text.body};
  }
  body{
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    color: ${({ theme }) => theme.color.text.heading};
    margin: 0;
  }

  h1 {
    font-size: 48px;
    font-weight: 600;
    line-height: 56px;
  }
  
  h2 {
    font-size: 32px;
    font-weight: 600;
    line-height: 40px;
  }
  
  h3 {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
  }
  
  h4 {
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
  }
  
  h5 {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
  }

  h6 {
    font-size: 14px;
    font-style: normal;
    font-weight: normal;
    line-height: 22px;
    margin: 0;
  }
  

  .${DevelopmentClass} {
    display: inline-flex;
    align-items: center;
    min-width: 50px;
    min-height: 20px;
    cursor: pointer;
    border: 2px dashed ${({ theme }) => theme.color.page.border};
  }
  
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: "SF Pro Display", -apple-system, "sans-serif", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    line-height: 24px;
    font-weight: normal;
    font-style: normal;

    @media (max-width: 768px) {
      font-size: 16px;
      line-height: 22px;
    }
  }

  input,
  textarea,
  button {
    font-family: "SF Pro Display", -apple-system, "sans-serif", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue";-webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    line-height: 24px;
    font-weight: normal;
    font-style: normal;
    border: 0 none;
    outline: 0 none;
  }

  button {
    cursor: pointer;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  *,
  :after,
  :before {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none !important;
  }

  p {
    margin-top: 0px;
    margin-bottom: 20px;
  }

  hr {
    border-style: solid;
    margin: 20px 0px;
    border-bottom-width: 0px;
    color: ${({ theme }) => theme.color.page.border};
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  .hide-mobile {
    @media (max-width: 768px) {
      display: none !important;
    }
  }

  .hide-desktop {
    @media (min-width: 769px) {
      display: none !important;
    }
  }

  .dialog-wrapper {
    position: fixed;
    inset: 0;
    z-index: 1500;
  }

  .rps-scroll--disabled {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    overflow: hidden;
    transition: .3s top ease-in-out;
  }

  .text-description {
    color: ${({ theme }) => theme.color.text.description};
  }

`;

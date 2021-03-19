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
  html{
    height: var(--app-height);
    overflow-y: hidden;
    max-height: 100vh;
  }
  
  body{
    height: 100%;
    max-height: 100vh;
    overflow-y: auto;
    ::-webkit-scrollbar {
     width: 0px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555;
}
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
    height: unset !important;
    max-height: unset !important;
    top: 0px;
    left: 0px;
    width: 100%;
    overflow: hidden;
    transition: .3s top ease-in-out;
  }

  .text-description {
    color: ${({ theme }) => theme.color.text.description};
  }

  .notification{
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1500;
    display: flex;
    flex-direction: column;
    max-width: calc(100% - 40px);

    li {
      max-width: 400px;
      width: 100%;
      display: block;
      background: white;
      padding: 12px 20px;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
      border-radius: 4px;
      list-style-type: none;
      position: relative;
      transition: all 0.15s ease;
      margin-bottom: 20px;
    }
  
    &-icon {
      margin-right: 7px;
    }
  
    &-title {
      font-size: 16px;
      line-height: 18px;
      font-weight: 500;
      font-style: normal;
      color: $headingColor;
      max-width:calc(100% - 50px);
      min-width: 300px;
      display: flex;
      align-items: end;
      margin-right: 20px;
      h5{
        color: #ffffff;

      }
    }
  
    &-content {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: $textColorSecond;
    }
  
    &-close {
      border: none;
      background: transparent;
      padding: 0;
      position: absolute;
      top: 16px;
      right: 12px;
      width: 16px;
      height: 16px;
  
      img {
        width: 16px;
        height: 16px;
        display: block;
      }
    }
  
    &-enter {
      opacity: 0.01;
      top: -60px;
      &.notification-enter-active {
        opacity: 1;
        transition: all 400ms ease-in;
        top: 0;
      }
    }
  
    &-exit {
      // opacity: 1;
      right: 0px;
      &.notification-exit-active {
        // opacity: 0.01;
        transform: translateX(100%);
        transition: all 400ms ease-in;
      }
    }
  }
`;

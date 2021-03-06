import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: -2px;

  > div {
    display: inline-flex;
    flex-direction: row;
    min-width: 120px;
    height: 32px;
    overflow: hidden;
    background: #ffffff;
    border-radius: 3px;
    border: 1px solid #e2e8f3;
  }

  .paginationNavigator {
    position: relative;
    width: 36px;
    text-align: center;
    line-height: 30px;
    i,
    svg {
      color: #97999e;
      width: 10px;
      height: 30px;
    }

    &:first-of-type {
      margin-right: 10px;
      &:after {
        content: "";
        position: absolute;
        top: 3px;
        bottom: 3px;
        right: 0;
        width: 1px;
        background: #f1f1f2;
      }
    }

    &:last-of-type {
      margin-left: 10px;
      &:before {
        content: "";
        position: absolute;
        top: 3px;
        bottom: 3px;
        left: 0;
        width: 1px;
        background: #f1f1f2;
      }
    }

    &[disabled] {
      i,
      svg {
        opacity: 0.3;
      }
    }
  }

  .navWrapper {
    min-width: 48px;
    ul {
      display: flex;
      flex-direction: row;
      justify-content: center;
      height: 100%;
      margin: 0 -5px;
      padding: 0;
    }

    li {
      position: relative;
      min-width: 15px;
      margin: 0 5px !important;
      text-align: center;
      line-height: 32px;
      color: #333740;
      a {
        color: #333740;
        font-size: 16px;
        &:hover {
          &:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: #1c5de7;
          }
        }
        &:hover,
        &:visited,
        &:focus,
        &:active {
          text-decoration: none;
          color: #333740;
        }
      }
    }
  }

  .navUl {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0;
    padding: 0;
  }

  .navLiActive {
    font-weight: 800;
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: #1c5de7;
    }
  }
`;

export default Wrapper;

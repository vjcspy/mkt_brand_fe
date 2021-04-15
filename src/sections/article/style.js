import { stubArray } from "lodash";
import styled from "styled-components";

export const WrapperBlog = styled.div`
  background: #ffffff;
  width: 100%;
  margin-top: 40px;
`;

export const Content = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 40px;
`;

export const HeaderBlog = styled.div`
  margin-bottom: 24px;
`;

export const Info = styled.div`
  display: flex;
`;

export const FooterBlog = styled.div`
  margin-top: 45px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  a:not(:last-child) {
    color: ${({ theme }) => theme.color.text.heading};
    cursor: pointer;
    margin-right: 12px;
  }
`;

export const ContentBlog = styled.div`
  padding-bottom: 40px;
  border-bottom: 1px solid #e9e9e9;
  img {
    border-radius: 10px;
  }
  iframe {
    body {
      ::-webkit-scrollbar {
        width: 0px;
      }
    }
  }
`;

export const DetailInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LeftInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const DatePost = styled.span`
  margin-right: 18px;
`;
export const ItemSocial = styled.div`
  margin-right: 18px;
  display: flex;
  svg {
    margin-right: 10px;
  }
`;
export const Rating = styled.div``;

export const RelativeBlog = styled.div`
  margin-top: 80px;
`;

export const Banner = styled.div`
  margin: 40px 0;
`;

export const Title = styled.h3``;

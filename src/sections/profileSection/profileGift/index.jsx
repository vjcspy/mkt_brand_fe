import React from "react";
import { LeftWrapper, ProfileGiftWrapper, RightWrapper, StoresWrapper } from "./styled";

const ProfileGift = () => {
  return (
    <ProfileGiftWrapper>
      <LeftWrapper></LeftWrapper>
      <RightWrapper>
        <h2>Tải App Hôm Nay Chạm Ngay Ưu Đãi</h2>
        <ul>
          <li>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 7V12L15 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h6>Đăng ký chỉ 3 giây</h6>
          </li>
          <li>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.8 9.00016C14.6188 8.68592 14.3557 8.42686 14.0386 8.25071C13.7215 8.07456 13.3625 7.98795 13 8.00016H11C10.4696 8.00016 9.96086 8.21087 9.58579 8.58594C9.21071 8.96102 9 9.46972 9 10.0002C9 10.5306 9.21071 11.0393 9.58579 11.4144C9.96086 11.7894 10.4696 12.0002 11 12.0002H13C13.5304 12.0002 14.0391 12.2109 14.4142 12.5859C14.7893 12.961 15 13.4697 15 14.0002C15 14.5306 14.7893 15.0393 14.4142 15.4144C14.0391 15.7894 13.5304 16.0002 13 16.0002H11C10.6375 16.0124 10.2785 15.9258 9.96142 15.7496C9.64435 15.5735 9.38115 15.3144 9.2 15.0002"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 16V18M12 6V8V6Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h6>Hoàn tiền tới 15% vào ví</h6>
          </li>
          <li>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21H21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M3 7V8C3 8.79565 3.31607 9.55871 3.87868 10.1213C4.44129 10.6839 5.20435 11 6 11C6.79565 11 7.55871 10.6839 8.12132 10.1213C8.68393 9.55871 9 7.79565 9 7M3 7L9 7M3 7H21M3 7L5 3H19L21 7M9 7C9 7.79565 9.25736 9.5 9.87868 10.1213C10.4413 10.6839 11.2044 11 12 11C12.7956 11 13.5587 10.6839 14.1213 10.1213C14.6839 9.55871 15 8.79565 15 8M9 7L15 7V8M15 8C15 8.79565 15.3161 9.55871 15.8787 10.1213C16.4413 10.6839 17.2044 11 18 11C18.7956 11 19.5587 10.6839 20.1213 10.1213C20.6839 9.55871 21 8.79565 21 8V7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M5 21.0001V10.8501" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 21.0001V10.8501" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M9 21V17C9 16.4696 9.21071 15.9609 9.58579 15.5858C9.96086 15.2107 10.4696 15 11 15H13C13.5304 15 14.0391 15.2107 14.4142 15.5858C14.7893 15.9609 15 16.4696 15 17V21"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h6>Ưu đãi tại 300+ nhà hàng</h6>
          </li>
        </ul>
        <StoresWrapper>
          <a>
            <img src="/images/app_store.png" />
          </a>
          <a>
            <img src="/images/google_play.png" />
          </a>
        </StoresWrapper>
      </RightWrapper>
    </ProfileGiftWrapper>
  );
};

export default ProfileGift;

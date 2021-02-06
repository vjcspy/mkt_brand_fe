import React from "react";

const IconLike = ({ width = 24, height = 24, color = "currentColor" }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.70588 9.90395V18.6513C6.70588 18.9413 6.58193 19.2194 6.3613 19.4245C6.14067 19.6295 5.84143 19.7447 5.52941 19.7447H3.17647C2.86445 19.7447 2.56521 19.6295 2.34458 19.4245C2.12395 19.2194 2 18.9413 2 18.6513V10.9974C2 10.7074 2.12395 10.4293 2.34458 10.2242C2.56521 10.0191 2.86445 9.90395 3.17647 9.90395H6.70588ZM6.70588 9.90395C7.95396 9.90395 9.15092 9.44315 10.0334 8.62292C10.916 7.8027 11.4118 6.69024 11.4118 5.53026V4.43684C11.4118 3.85686 11.6597 3.30062 12.1009 2.89051C12.5422 2.4804 13.1407 2.25 13.7647 2.25C14.3887 2.25 14.9872 2.4804 15.4285 2.89051C15.8697 3.30062 16.1176 3.85686 16.1176 4.43684V9.90395H19.6471C20.2711 9.90395 20.8696 10.1343 21.3108 10.5445C21.7521 10.9546 22 11.5108 22 12.0908L20.8235 17.5579C20.6543 18.2287 20.3334 18.8047 19.909 19.1991C19.4846 19.5935 18.9798 19.785 18.4706 19.7447H10.2353C9.29924 19.7447 8.40152 19.3991 7.73962 18.784C7.07773 18.1688 6.70588 17.3345 6.70588 16.4645"
        stroke="#7B7979"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M7 10V18" stroke="#7B7979" />
    </svg>
  );
};

export default IconLike;

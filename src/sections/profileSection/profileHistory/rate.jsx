import React, { useState } from "react";
import { RateItem, RateWrapper } from "./styled";
import { FormattedMessage } from "react-intl";

const rates = [
  {
    label: "profile.history_bad",
    Icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M25 45.8333C13.4937 45.8333 4.16663 36.5062 4.16663 25C4.16663 13.4937 13.4937 4.16663 25 4.16663C36.5062 4.16663 45.8333 13.4937 45.8333 25C45.8333 36.5062 36.5062 45.8333 25 45.8333ZM25 41.6666C29.4202 41.6666 33.6595 39.9107 36.7851 36.7851C39.9107 33.6595 41.6666 29.4202 41.6666 25C41.6666 20.5797 39.9107 16.3405 36.7851 13.2148C33.6595 10.0892 29.4202 8.33329 25 8.33329C20.5797 8.33329 16.3405 10.0892 13.2148 13.2148C10.0892 16.3405 8.33329 20.5797 8.33329 25C8.33329 29.4202 10.0892 33.6595 13.2148 36.7851C16.3405 39.9107 20.5797 41.6666 25 41.6666ZM14.5833 35.4166C14.5833 32.654 15.6808 30.0044 17.6343 28.0509C19.5878 26.0974 22.2373 25 25 25C27.7626 25 30.4122 26.0974 32.3657 28.0509C34.3192 30.0044 35.4166 32.654 35.4166 35.4166H31.25C31.25 33.759 30.5915 32.1693 29.4194 30.9972C28.2473 29.8251 26.6576 29.1666 25 29.1666C23.3424 29.1666 21.7526 29.8251 20.5805 30.9972C19.4084 32.1693 18.75 33.759 18.75 35.4166H14.5833ZM16.6666 22.9166C15.8378 22.9166 15.043 22.5874 14.4569 22.0013C13.8709 21.4153 13.5416 20.6204 13.5416 19.7916C13.5416 18.9628 13.8709 18.168 14.4569 17.5819C15.043 16.9959 15.8378 16.6666 16.6666 16.6666C17.4954 16.6666 18.2903 16.9959 18.8763 17.5819C19.4624 18.168 19.7916 18.9628 19.7916 19.7916C19.7916 20.6204 19.4624 21.4153 18.8763 22.0013C18.2903 22.5874 17.4954 22.9166 16.6666 22.9166ZM33.3333 22.9166C32.5045 22.9166 31.7096 22.5874 31.1236 22.0013C30.5375 21.4153 30.2083 20.6204 30.2083 19.7916C30.2083 18.9628 30.5375 18.168 31.1236 17.5819C31.7096 16.9959 32.5045 16.6666 33.3333 16.6666C34.1621 16.6666 34.957 16.9959 35.543 17.5819C36.1291 18.168 36.4583 18.9628 36.4583 19.7916C36.4583 20.6204 36.1291 21.4153 35.543 22.0013C34.957 22.5874 34.1621 22.9166 33.3333 22.9166Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "profile.history_average",
    Icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M25 45.8333C13.4937 45.8333 4.16663 36.5062 4.16663 25C4.16663 13.4937 13.4937 4.16663 25 4.16663C36.5062 4.16663 45.8333 13.4937 45.8333 25C45.8333 36.5062 36.5062 45.8333 25 45.8333ZM25 41.6666C29.4202 41.6666 33.6595 39.9107 36.7851 36.7851C39.9107 33.6595 41.6666 29.4202 41.6666 25C41.6666 20.5797 39.9107 16.3405 36.7851 13.2148C33.6595 10.0892 29.4202 8.33329 25 8.33329C20.5797 8.33329 16.3405 10.0892 13.2148 13.2148C10.0892 16.3405 8.33329 20.5797 8.33329 25C8.33329 29.4202 10.0892 33.6595 13.2148 36.7851C16.3405 39.9107 20.5797 41.6666 25 41.6666ZM16.6666 29.1666H33.3333V33.3333H16.6666V29.1666ZM16.6666 22.9166C15.8378 22.9166 15.043 22.5874 14.4569 22.0013C13.8709 21.4153 13.5416 20.6204 13.5416 19.7916C13.5416 18.9628 13.8709 18.168 14.4569 17.5819C15.043 16.9959 15.8378 16.6666 16.6666 16.6666C17.4954 16.6666 18.2903 16.9959 18.8763 17.5819C19.4624 18.168 19.7916 18.9628 19.7916 19.7916C19.7916 20.6204 19.4624 21.4153 18.8763 22.0013C18.2903 22.5874 17.4954 22.9166 16.6666 22.9166ZM33.3333 22.9166C32.5045 22.9166 31.7096 22.5874 31.1236 22.0013C30.5375 21.4153 30.2083 20.6204 30.2083 19.7916C30.2083 18.9628 30.5375 18.168 31.1236 17.5819C31.7096 16.9959 32.5045 16.6666 33.3333 16.6666C34.1621 16.6666 34.957 16.9959 35.543 17.5819C36.1291 18.168 36.4583 18.9628 36.4583 19.7916C36.4583 20.6204 36.1291 21.4153 35.543 22.0013C34.957 22.5874 34.1621 22.9166 33.3333 22.9166Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "profile.history_okey",
    Icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M25 45.8333C13.4937 45.8333 4.16663 36.5062 4.16663 25C4.16663 13.4937 13.4937 4.16663 25 4.16663C36.5062 4.16663 45.8333 13.4937 45.8333 25C45.8333 36.5062 36.5062 45.8333 25 45.8333ZM25 41.6666C29.4202 41.6666 33.6595 39.9107 36.7851 36.7851C39.9107 33.6595 41.6666 29.4202 41.6666 25C41.6666 20.5797 39.9107 16.3405 36.7851 13.2148C33.6595 10.0892 29.4202 8.33329 25 8.33329C20.5797 8.33329 16.3405 10.0892 13.2148 13.2148C10.0892 16.3405 8.33329 20.5797 8.33329 25C8.33329 29.4202 10.0892 33.6595 13.2148 36.7851C16.3405 39.9107 20.5797 41.6666 25 41.6666ZM14.5833 27.0833H18.75C18.75 28.7409 19.4084 30.3306 20.5805 31.5027C21.7526 32.6748 23.3424 33.3333 25 33.3333C26.6576 33.3333 28.2473 32.6748 29.4194 31.5027C30.5915 30.3306 31.25 28.7409 31.25 27.0833H35.4166C35.4166 29.846 34.3192 32.4955 32.3657 34.449C30.4122 36.4025 27.7626 37.5 25 37.5C22.2373 37.5 19.5878 36.4025 17.6343 34.449C15.6808 32.4955 14.5833 29.846 14.5833 27.0833ZM16.6666 22.9166C15.8378 22.9166 15.043 22.5874 14.4569 22.0013C13.8709 21.4153 13.5416 20.6204 13.5416 19.7916C13.5416 18.9628 13.8709 18.168 14.4569 17.5819C15.043 16.9959 15.8378 16.6666 16.6666 16.6666C17.4954 16.6666 18.2903 16.9959 18.8763 17.5819C19.4624 18.168 19.7916 18.9628 19.7916 19.7916C19.7916 20.6204 19.4624 21.4153 18.8763 22.0013C18.2903 22.5874 17.4954 22.9166 16.6666 22.9166ZM33.3333 22.9166C32.5045 22.9166 31.7096 22.5874 31.1236 22.0013C30.5375 21.4153 30.2083 20.6204 30.2083 19.7916C30.2083 18.9628 30.5375 18.168 31.1236 17.5819C31.7096 16.9959 32.5045 16.6666 33.3333 16.6666C34.1621 16.6666 34.957 16.9959 35.543 17.5819C36.1291 18.168 36.4583 18.9628 36.4583 19.7916C36.4583 20.6204 36.1291 21.4153 35.543 22.0013C34.957 22.5874 34.1621 22.9166 33.3333 22.9166Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "profile.history_good",
    Icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.16663 25C4.16663 36.5062 13.4937 45.8333 25 45.8333C36.5062 45.8333 45.8333 36.5062 45.8333 25C45.8333 13.4937 36.5062 4.16663 25 4.16663C13.4937 4.16663 4.16663 13.4937 4.16663 25ZM19.1074 32.9759C17.5446 31.413 16.6666 29.2934 16.6666 27.0833H33.3333C33.3333 29.2934 32.4553 31.413 30.8925 32.9759C29.3297 34.5387 27.2101 35.4166 25 35.4166C22.7898 35.4166 20.6702 34.5387 19.1074 32.9759ZM33.1431 17.252C33.2029 17.0678 33.4636 17.0678 33.5235 17.252L34.2239 19.4075C34.2506 19.4899 34.3274 19.5457 34.4141 19.5457H36.6805C36.8742 19.5457 36.9548 19.7936 36.798 19.9075L34.9645 21.2397C34.8944 21.2906 34.865 21.3809 34.8918 21.4633L35.5922 23.6188C35.6521 23.803 35.4412 23.9563 35.2844 23.8424L33.4508 22.5102C33.3807 22.4593 33.2858 22.4593 33.2157 22.5102L31.3822 23.8424C31.2254 23.9563 31.0145 23.803 31.0744 23.6188L31.7748 21.4633C31.8015 21.3809 31.7722 21.2906 31.7021 21.2397L29.8685 19.9075C29.7118 19.7936 29.7923 19.5457 29.9861 19.5457H32.2525C32.3392 19.5457 32.4159 19.4899 32.4427 19.4075L33.1431 17.252ZM16.4764 17.252C16.5363 17.0678 16.797 17.0678 16.8569 17.252L17.5572 19.4075C17.584 19.4899 17.6608 19.5457 17.7474 19.5457H20.0139C20.2076 19.5457 20.2882 19.7936 20.1314 19.9075L18.2978 21.2397C18.2277 21.2906 18.1984 21.3809 18.2252 21.4633L18.9255 23.6188C18.9854 23.803 18.7745 23.9563 18.6178 23.8424L16.7842 22.5102C16.7141 22.4593 16.6192 22.4593 16.5491 22.5102L14.7155 23.8424C14.5588 23.9563 14.3479 23.803 14.4078 23.6188L15.1081 21.4633C15.1349 21.3809 15.1056 21.2906 15.0355 21.2397L13.2019 19.9075C13.0452 19.7936 13.1257 19.5457 13.3195 19.5457H15.5859C15.6725 19.5457 15.7493 19.4899 15.7761 19.4075L16.4764 17.252Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "profile.history_awesome",
    Icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M34.0666 19.7833L34.0692 19.7888L30.3726 21.7174L28.444 18.0207L28.4493 18.0177C28.2424 17.5343 28.2258 16.9905 28.4029 16.4953C28.5799 16.0001 28.9376 15.5902 29.4042 15.3476C29.8707 15.105 30.4117 15.0477 30.9188 15.1871C31.4258 15.3265 31.8615 15.6524 32.1384 16.0995C32.6212 15.8913 33.165 15.8732 33.6606 16.0489C34.1563 16.2246 34.5672 16.5812 34.8111 17.0471C35.055 17.513 35.1138 18.0538 34.9757 18.5613C34.8376 19.0687 34.5129 19.5052 34.0666 19.7833Z"
          fill="currentColor"
        />
        <path
          d="M21.647 18.2201L21.6522 18.2233L19.5675 21.8342L15.9566 19.7495L15.9594 19.7441C15.5254 19.4471 15.2196 18.9972 15.1034 18.4843C14.9871 17.9714 15.069 17.4336 15.3326 16.9785C15.5961 16.5235 16.0219 16.1848 16.5246 16.0304C17.0273 15.876 17.5698 15.9173 18.0433 16.146C18.3391 15.7112 18.7882 15.4042 19.3008 15.2866C19.8133 15.1689 20.3514 15.2493 20.8072 15.5116C21.2629 15.7739 21.6027 16.1988 21.7585 16.7011C21.9142 17.2033 21.8744 17.7459 21.647 18.2201Z"
          fill="currentColor"
        />
        <path
          d="M25 4.16663C36.5062 4.16663 45.8333 13.4937 45.8333 25C45.8333 36.5062 36.5062 45.8333 25 45.8333C13.4937 45.8333 4.16663 36.5062 4.16663 25C4.16663 13.4937 13.4937 4.16663 25 4.16663ZM25 8.33329C20.5797 8.33329 16.3405 10.0892 13.2148 13.2148C10.0892 16.3405 8.33329 20.5797 8.33329 25C8.33329 29.4202 10.0892 33.6595 13.2148 36.7851C16.3405 39.9107 20.5797 41.6666 25 41.6666C29.4202 41.6666 33.6595 39.9107 36.7851 36.7851C39.9107 33.6595 41.6666 29.4202 41.6666 25C41.6666 20.5797 39.9107 16.3405 36.7851 13.2148C33.6595 10.0892 29.4202 8.33329 25 8.33329ZM25 22.9166C29.1666 22.9166 32.6395 23.6104 35.4166 25C35.4166 27.7626 34.3192 30.4122 32.3657 32.3657C30.4122 34.3192 27.7626 35.4166 25 35.4166C22.2373 35.4166 19.5878 34.3192 17.6343 32.3657C15.6808 30.4122 14.5833 27.7626 14.5833 25C17.3604 23.6104 20.8333 22.9166 25 22.9166Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];
const Rate = ({ rate, selectAble }) => {
  const [current, setCurrent] = useState(rate);
  return (
    <RateWrapper>
      {rates.map(({ label, Icon }, index) => (
        <RateItem key={index} active={index === current} onClick={() => selectAble && setCurrent(index)}>
          {Icon}
          <p>
            <FormattedMessage id={label} />
          </p>
        </RateItem>
      ))}
    </RateWrapper>
  );
};

export default Rate;

import { FC } from "react";
import classNames from "clsx";

type ControlIconProps = {
  isActive?: boolean;
  className?: string;
};

const ControlIcon: FC<ControlIconProps> = ({ isActive = false, className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_2866_31955)">
      <path
        d="M20.0002 16.4H12.7969V14.8H20.0002V16.4Z"
        fill="#F8FCFD"
        className={classNames(
          "transition-transform",
          isActive && "translate-x-1",
        )}
      />
      <path
        d="M6 16.4H-1V14.8H6V16.4Z"
        fill="#F8FCFD"
        className={classNames(
          "transition-transform",
          isActive && "translate-x-[.3125rem]",
        )}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.99775 17.1512C6.55144 18.151 7.61397 18.8007 8.79805 18.8004C10.4609 18.8 11.8463 17.5261 11.9859 15.8691C12.1255 14.2121 10.9728 12.7243 9.33347 12.4457C7.96677 12.2134 6.6416 12.886 5.99775 14.0491V14.0533C5.78591 14.4366 5.65 14.8691 5.61105 15.3314C5.5561 15.9836 5.70138 16.6096 5.99775 17.1459V17.1512ZM7.19983 15.5775C7.21236 14.7035 7.92396 14.0013 8.79805 14.0004C9.6817 14.0004 10.398 14.7168 10.398 15.6004V15.6724C10.3587 16.5456 9.6259 17.2256 8.7522 17.1997C7.8785 17.1738 7.18731 16.4515 7.19983 15.5775Z"
        fill="#F8FCFD"
        className={classNames(
          "transition-transform",
          isActive && "translate-x-[.4rem]",
        )}
      />
      <path
        d="M10 10.0004H4V8.40039H10V10.0004Z"
        fill="#F8FCFD"
        className={classNames(
          "transition-transform",
          isActive && "-translate-x-1",
        )}
      />
      <path
        d="M23.9998 10.0462H16.7998V8.40039H23.9998V10.0462Z"
        fill="#F8FCFD"
        className={classNames(
          "transition-transform",
          isActive && "-translate-x-1",
        )}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.9997 10.7511C10.5534 11.751 11.6159 12.4007 12.8 12.4004C14.4628 12.4 15.8483 11.126 15.9879 9.46906C16.1275 7.81209 14.9748 6.32429 13.3354 6.04564C11.9687 5.81334 10.6436 6.48598 9.9997 7.64908V7.65332C9.78786 8.03662 9.65195 8.46907 9.613 8.93133C9.55805 9.58355 9.70333 10.2096 9.9997 10.7459V10.7511ZM11.2018 9.17747C11.2143 8.30347 11.9259 7.60128 12.8 7.60039C13.6837 7.60039 14.4 8.31674 14.4 9.20039V9.27239C14.3607 10.1456 13.6279 10.8256 12.7542 10.7997C11.8805 10.7738 11.1893 10.0515 11.2018 9.17747Z"
        fill="#F8FCFD"
        className={classNames(
          "transition-transform",
          isActive && "-translate-x-[.175rem]",
        )}
      />
    </g>
    <defs>
      <clipPath id="clip0_2866_31955">
        <rect
          width="16.0002"
          height="12.8004"
          fill="white"
          transform="translate(4 6)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default ControlIcon;

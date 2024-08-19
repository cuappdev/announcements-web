import { IconProps } from "@/models/IconProps";

export default function ({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 24"
      className={className}
    >
      <path
        d="M15.5 22V20H19.5V10H5.5V14H3.5V6C3.5 5.45 3.696 4.97933 4.088 4.588C4.48 4.19667 4.95067 4.00067 5.5 4H6.5V2H8.5V4H16.5V2H18.5V4H19.5C20.05 4 20.521 4.196 20.913 4.588C21.305 4.98 21.5007 5.45067 21.5 6V20C21.5 20.55 21.3043 21.021 20.913 21.413C20.5217 21.805 20.0507 22.0007 19.5 22H15.5ZM8.5 24L7.1 22.6L9.675 20H1.5V18H9.675L7.1 15.4L8.5 14L13.5 19L8.5 24ZM5.5 8H19.5V6H5.5V8Z"
      />
    </svg>
  );
}

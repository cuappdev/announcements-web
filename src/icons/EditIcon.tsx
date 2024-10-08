import { IconProps } from "@/models/IconProps";

export default function ({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={className}
    >
      <path
        d="M8 2H3.33333C2.97971 2 2.64057 2.14048 2.39052 2.39052C2.14048 2.64057 2 2.97971 2 3.33333V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H12.6667C13.0203 14 13.3594 13.8595 13.6095 13.6095C13.8595 13.3594 14 13.0203 14 12.6667V8"
        fill="none"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2502 1.75003C12.5154 1.48481 12.8751 1.33582 13.2502 1.33582C13.6252 1.33582 13.9849 1.48481 14.2502 1.75003C14.5154 2.01525 14.6644 2.37496 14.6644 2.75003C14.6644 3.1251 14.5154 3.48481 14.2502 3.75003L8.00016 10L5.3335 10.6667L6.00016 8.00003L12.2502 1.75003Z"
        fill="none"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

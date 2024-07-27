import { IconProps } from "@/models/IconProps";

export default function ({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 24"
      className={className}
    >
      <path d="M6.07999 5.58003C6.29092 5.36935 6.57686 5.25102 6.87499 5.25102C7.17311 5.25102 7.45905 5.36935 7.66999 5.58003L12.5 10.41L17.33 5.58003C17.4675 5.43194 17.6424 5.32368 17.8363 5.26666C18.0301 5.20964 18.2358 5.20597 18.4316 5.25603C18.6274 5.30609 18.806 5.40803 18.9487 5.55111C19.0915 5.69419 19.1929 5.87311 19.2425 6.06903C19.2924 6.2646 19.2889 6.47001 19.2321 6.66372C19.1754 6.85744 19.0676 7.03232 18.92 7.17003L14.09 12L18.92 16.83C19.0681 16.9675 19.1763 17.1424 19.2334 17.3363C19.2904 17.5302 19.294 17.7358 19.244 17.9316C19.1939 18.1274 19.092 18.3061 18.9489 18.4488C18.8058 18.5915 18.6269 18.693 18.431 18.7425C18.2354 18.7925 18.03 18.7889 17.8363 18.7322C17.6426 18.6754 17.4677 18.5676 17.33 18.42L12.5 13.59L7.66999 18.42C7.45677 18.619 7.17462 18.7274 6.88303 18.7223C6.59144 18.7173 6.31321 18.5992 6.10699 18.393C5.90078 18.1868 5.78271 17.9086 5.77767 17.617C5.77263 17.3254 5.88102 17.0432 6.07999 16.83L10.91 12L6.07999 7.17003C5.86931 6.95909 5.75098 6.67315 5.75098 6.37503C5.75098 6.0769 5.86931 5.79096 6.07999 5.58003Z" />
    </svg>
  );
}

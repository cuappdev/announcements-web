interface Props {
  style: "horizontal" | "vertical";
  className?: string;
}

export default function Divider({ style, className }: Props) {
  if (style === "horizontal") {
    return <div className={`h-[1px] ${className}`} />;
  } else if (style === "vertical") {
    return <div className={`w-[1px] ${className}`} />;
  } else {
    return null;
  }
}

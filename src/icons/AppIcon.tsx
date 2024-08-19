import { AppName } from "@/models/AppName";

interface Props {
  appName: AppName;
}

export default function AppIcon({ appName }: Props) {
  const getAppSrc = (appName: AppName): string => {
    switch (appName) {
      case AppName.TRANSIT:
        return "/app-icons/Transit.png";
      case AppName.EATERY:
        return "/app-icons/Eatery.png";
      case AppName.RESELL:
        return "/app-icons/Resell.png";
      case AppName.COURSEGRAB:
        return "/app-icons/CourseGrab.png";
      case AppName.VOLUME:
        return "/app-icons/Volume.png";
      case AppName.UPLIFT:
        return "/app-icons/Uplift.png";
      case AppName.SCOOPED:
        return "/app-icons/Scooped.png";
      default:
        throw new Error(`No icon found for app name: ${appName}`);
    }
  };

  return (
    <img
      src={getAppSrc(appName)}
      className="rounded-sm w-[32px] h-[32px]"
    ></img>
  );
}

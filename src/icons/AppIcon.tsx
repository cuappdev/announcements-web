import { AppName } from "@/models/appName";
import { IconProps } from "@/models/iconProps";

interface Props extends IconProps {
  appName: AppName;
}

export default function AppIcon({ appName, className }: Props) {
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

  return <img src={getAppSrc(appName)} className={className} />;
}

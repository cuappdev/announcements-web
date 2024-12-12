import AppIcon from "@/icons/appIcon";
import { Announcement } from "@/models/announcement";
import { AppName } from "@/models/enums/appName";
import { DateFormat } from "@/models/enums/dateFormat";
import { formatDate, getAppCountString } from "@/utils/utils";

interface Props {
  announcement: Announcement;
}

export default function PastAnnouncementCell({ announcement }: Props) {
  const renderAppIcons = () => {
    const appLength = announcement.apps.length;

    if (appLength === Object.keys(AppName).length) {
      return <p className="b1 text-neutral-600">All Apps</p>;
    } else if (appLength < 4) {
      return (
        <div className="flex flex-row gap-2 items-center">
          {announcement.apps.map((app) => (
            <AppIcon key={app} appName={app} className="size-[32px] rounded-sm" />
          ))}
        </div>
      );
    } else {
      return (
        <div className="flex flex-row gap-2 items-center">
          {announcement.apps.slice(0, 3).map((app) => (
            <AppIcon key={app} appName={app} className="size-[32px] rounded-sm" />
          ))}
          <p className="b1 text-neutral-600">{`and ${appLength - 3} more`}</p>
        </div>
      );
    }
  };

  return (
    <>
      <div className="max-md:hidden flex flex-row gap-6 items-center">
        <img src={announcement.imageUrl} alt={announcement.title} className="size-[48px] rounded-md" />
        <h5 className="text-neutral-800 max-lg:flex-grow line-clamp-1 lg:w-[164px]">{announcement.title}</h5>
        <p className="b1 text-neutral-600 w-[144px] line-clamp-1">
          {formatDate(new Date(announcement.startDate), DateFormat.SHORT_YEAR)}
        </p>
        <p className="b1 text-neutral-600 w-[144px] line-clamp-1">
          {formatDate(new Date(announcement.endDate), DateFormat.SHORT_YEAR)}
        </p>
        <div className="max-lg:hidden flex flex-row gap-2 items-center w-[164px]">
          <img src={announcement.creator.imageUrl} alt={announcement.creator.name} className="size-[40px] rounded-xl" />
          <p className="b1 text-neutral-600 line-clamp-1">{announcement.creator.name}</p>
        </div>
        <p className="lg:hidden b1 text-neutral-600 w-[144px] line-clamp-1">{getAppCountString(announcement.apps)}</p>
        <div className="max-lg:hidden w-[216px]">{renderAppIcons()}</div>
      </div>
      <div className="p-6 bg-neutral-white rounded-lg flex flex-col gap-6 md:hidden">
        <img src={announcement.imageUrl} alt={announcement.title} className="rounded-lg" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h4 className="text-neutral-800">{announcement.title}</h4>
            <p className="b1 text-neutral-600">
              {`${formatDate(new Date(announcement.startDate), DateFormat.SHORT)} - ${formatDate(
                new Date(announcement.endDate),
                DateFormat.SHORT
              )}`}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <img
              src={announcement.creator.imageUrl}
              alt={announcement.creator.name}
              className="size-[24px] rounded-xl"
            />
            <p className="b1 text-neutral-400">{`Scheduled by ${announcement.creator.name}`}</p>
          </div>
          <div className="flex flex-row gap-2">
            {announcement.apps.map((app) => (
              <AppIcon key={app} appName={app} className="size-[32px] rounded-sm" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import AppIcon from "@/icons/AppIcon";
import EditIcon from "@/icons/EditIcon";
import { Announcement } from "@/models/Announcement";
import { dateInRange, formatDate } from "@/utils/utils";
import { useEffect, useState } from "react";

interface Props {
  announcement: Announcement;
}

export default function ActiveCell({ announcement }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col p-6 items-start md:items-end md:flex-row justify-center gap-6 md:gap-8 self-stretch bg-neutral-white rounded-lg border border-other-stroke relative">
      <img
        src={announcement.imageUrl}
        className="h-[265px] md:w-[108px] md:h-[108px] self-stretch rounded-lg bg-lightgray object-cover bg-center"
      ></img>
      <div className="flex flex-col items-start gap-4 self-stretch md:justify-between md:w-full">
        <div className="flex items-start gap-6 self-stretch w-full md:justify-between">
          <div className="flex flex-col gap-1">
            <h4 className="self-stretch text-neutral-800">
              {announcement.title}
            </h4>
            <p className="b1 self-stretch text-neutral-600">
              {" "}
              {formatDate(announcement.startDate)} -{" "}
              {formatDate(announcement.endDate)}{" "}
            </p>
          </div>
          <button className="flex py-2 px-4 justify-center items-center gap-2 rounded-xl border border-other-stroke bg-neutral-white max-md:hidden">
            <EditIcon className="w-[16px] h-[16px] stroke-neutral-black"></EditIcon>
            <p className="b1 text-neutral-800 text-center">Edit</p>
          </button>
        </div>
        <div className="flex h-[32px] items-center gap-2">
          {announcement.apps.map((app) => (
            <AppIcon appName={app} />
          ))}
        </div>
        <button className="flex py-2 px-4 justify-center items-center gap-2 rounded-xl border border-other-stroke bg-neutral-white md:hidden">
          <EditIcon className="w-[16px] h-[16px] stroke-neutral-black"></EditIcon>
          <p className="b1 text-neutral-800 text-center">Edit</p>
        </button>
      </div>
      {dateInRange(
        currentDate,
        announcement.startDate,
        announcement.endDate
      ) ? (
        <div className="flex h-[32px] py-2 px-3 items-center gap-1 absolute right-[40px] top-[40px] md:bottom-[24px] md:right-[24px] md:top-auto bg-green-100 rounded-xl">
          <div className="w-[10px] h-[10px] bg-green-600 border-2 border-green-300 rounded-xl" />
          <div className="label text-green-600 text-center">LIVE</div>
        </div>
      ) : null}
    </div>
  );
}

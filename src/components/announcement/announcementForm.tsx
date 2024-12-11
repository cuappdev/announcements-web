"use client";

import { useState } from "react";
import SpeakerIcon from "@/icons/SpeakerIcon";
import AnnouncementBanner from "../shared/AnnouncementBanner";
import { Announcement } from "@/models/announcement";
import { AppName } from "@/models/appName";
import { InputText } from "../shared/InputText";
import { InputDropdown } from "../shared/InputDropdown";
import { InputDatePicker } from "../shared/InputDatePicker";
import { InputUpload } from "../shared/InputUpload";
import { User } from "@/models/user";

export default function AnnouncementForm() {
  const creator: User = {
    email: "vdb23@cornell.edu",
    idToken: "idToken",
    imageUrl: "https://lh3.googleusercontent.com/a/ACg8ocLSV3bTsn-XINmiSkt4FbdlzRDV0EJBc_LX-hv7gdo3LGp8cAB_=s96-c",
    isAdmin: true,
    name: "Vin Bui",
  };

  const [announcement, setAnnouncement] = useState<Announcement>({
    id: "0",
    apps: [AppName.EATERY, AppName.RESELL],
    body: "Placeholder",
    creator,
    endDate: "2024-03-16T03:00:00Z",
    imageUrl: "",
    link: "https://www.instagram.com/p/C4ft4SyOaUj/",
    startDate: "2024-03-15T03:00:00Z",
    title: "Placeholder",
  });

  const handleChange = (field: keyof Announcement, value: any) => {
    setAnnouncement((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 gap-6 rounded-lg bg-neutral-white lg:w-[1128px]">
      <div className="flex items-center gap-4 self-stretch">
        <SpeakerIcon className="w-[40px] h-[40px] fill-neutral-800" />
        <div className="flex flex-col gap-1">
          <h4 className="text-neutral-800">Create Announcement</h4>
          <p className="b1 text-neutral-600">Schedule an announcement to our apps with this form.</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row-reverse justify-center items-center gap-8 self-stretch">
        <div className="flex flex-col justify-center items-center self-stretch rounded-md border-[1px] border-other-stroke bg-other-offWhite h-[152px] md:h-[304px]">
          <AnnouncementBanner announcement={announcement}></AnnouncementBanner>
        </div>
        <div className="flex flex-col items-start self-stretch gap-6 lg:w-[401px]">
          <InputText
            name="Title"
            placeholder="Enter the announcement title"
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <InputText
            name="Description"
            placeholder="Enter the announcement description"
            onChange={(e) => handleChange("body", e.target.value)}
          />
          <div className="flex flex-row justify-between gap-6">
            <InputDatePicker name="Start Date" />
            <InputDatePicker name="End Date" />
          </div>
          <InputText
            name="Link"
            placeholder="Enter the announcement link"
            onChange={(e) => handleChange("link", e.target.value)}
          />
          <InputDropdown
            name="Apps"
            placeholder="Select apps"
            options={[
              AppName.COURSEGRAB,
              AppName.EATERY,
              AppName.RESELL,
              AppName.SCOOPED,
              AppName.TRANSIT,
              AppName.UPLIFT,
              AppName.VOLUME,
            ]}
            onChange={(apps) => handleChange("apps", apps)}
          />
          <InputUpload
            name="Upload Image"
            placeholder="Drag your file here"
            onChange={(url) => handleChange("imageUrl", url)}
          />
        </div>
      </div>
    </div>
  );
}

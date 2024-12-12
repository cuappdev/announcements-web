import CrossThinIcon from "@/icons/CrossThinIcon";
import SpeakerIcon from "@/icons/SpeakerIcon";
import AnnouncementBanner from "./announcementBanner";
import { useMemo, useState } from "react";
import { Announcement } from "@/models/announcement";
import InputText from "../system/input/inputText";
import InputDatePicker from "../system/input/inputDatePicker";
import InputMultiSelect from "../system/input/inputMultiselect";
import InputUpload from "../system/input/inputUpload";
import ButtonPrimary1 from "../system/ButtonPrimary1";
import { useUserStore } from "@/stores/useUserStore";

const dummyAnnouncement: Announcement = {
  id: "",
  apps: [],
  body: "",
  creator: {
    email: "",
    idToken: "",
    imageUrl: "",
    isAdmin: true,
    name: "",
  },
  endDate: "",
  imageUrl: "",
  link: "",
  startDate: "",
  title: "",
};

interface Props {
  onClose: () => void;
}

export default function AnnouncementForm({ onClose }: Props) {
  const { user } = useUserStore();

  const [announcement, setAnnouncement] = useState<Announcement>(dummyAnnouncement);
  const handleChange = (field: keyof Announcement, value: any) => {
    setAnnouncement((prev) => ({ ...prev, [field]: value }));
  };

  const canSchedule = useMemo(
    () =>
      announcement.apps.length !== 0 &&
      announcement.body !== "" &&
      announcement.endDate !== "" &&
      announcement.imageUrl !== "" &&
      announcement.link !== "" &&
      announcement.startDate !== "" &&
      announcement.title !== "",
    [announcement]
  );

  // Schedule Announcement
  const scheduleAnnouncement = async () => {
    if (!user) return;

    try {
      console.log("scheduling");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="flex flex-col gap-6 p-6 rounded-lg bg-neutral-white overflow-auto h-4/5 w-full mx-4 md:mx-8 lg:w-[1128px]">
        {/* Header */}
        <div className="flex flex-row justify-between items-start gap-8">
          <div className="flex flex-row items-center gap-4">
            <SpeakerIcon className="size-[40px] fill-neutral-800" />
            <div className="flex flex-col gap-1">
              <h4 className="text-neutral-800">Create Announcement</h4>
              <p className="b1 text-neutral-600">Schedule an announcement to our apps with this form.</p>
            </div>
          </div>
          <button onClick={onClose}>
            <CrossThinIcon className="size-[32px] fill-neutral-400 opacity-hover" />
          </button>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row-reverse">
          {/* Preview */}
          <div className="flex flex-col justify-center items-center rounded-md border-[1px] border-other-stroke bg-other-offWhite p-8 flex-1">
            <AnnouncementBanner announcement={announcement}></AnnouncementBanner>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-6 lg:w-[400px]">
            <InputText
              name="Title"
              placeholder="Enter the announcement title"
              onChange={(event) => handleChange("title", event.target.value)}
            />
            <InputText
              name="Description"
              placeholder="Enter the announcement description"
              onChange={(event) => handleChange("body", event.target.value)}
            />
            <div className="flex flex-col gap-2">
              <h6 className="text-neutral-800">Date</h6>
              <InputDatePicker
                setDateRange={(dateRange) => {
                  handleChange("startDate", dateRange.from);
                  handleChange("endDate", dateRange.to);
                }}
              />
            </div>
            <InputText
              name="Link"
              placeholder="Enter the announcement link"
              onChange={(event) => handleChange("link", event.target.value)}
            />
            <div className="flex flex-col gap-2">
              <h6 className="text-neutral-800">Apps</h6>
              <InputMultiSelect setApps={(apps) => handleChange("apps", apps)} />
            </div>
            <div className="flex flex-col gap-2">
              <h6 className="text-neutral-800">Upload Image</h6>
              <InputUpload setUrl={(url) => handleChange("imageUrl", url)} />
            </div>

            {/* Submit Button */}
            <ButtonPrimary1
              text="Schedule Announcement"
              action={scheduleAnnouncement}
              disabled={!canSchedule}
              className="lg:hidden"
            />
          </div>
        </div>

        {/* Submit Button */}
        <ButtonPrimary1
          text="Schedule Announcement"
          action={scheduleAnnouncement}
          disabled={!canSchedule}
          className="max-lg:hidden w-full"
        />
      </div>
    </div>
  );
}

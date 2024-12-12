import CrossThinIcon from "@/icons/crossThinIcon";
import SpeakerIcon from "@/icons/speakerIcon";
import { Announcement } from "@/models/announcement";
import { useUserStore } from "@/stores/useUserStore";
import { addDays } from "date-fns";
import { useMemo, useState } from "react";
import ButtonPrimary1 from "../system/button/buttonPrimary1";
import errorToast from "../system/errorToast";
import InputDatePicker from "../system/input/inputDatePicker";
import InputMultiSelect from "../system/input/inputMultiselect";
import InputText from "../system/input/inputText";
import InputUpload from "../system/input/inputUpload";
import AnnouncementBanner from "./announcementBanner";

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
  endDate: addDays(new Date(), 1).toDateString(),
  imageUrl: "",
  link: "",
  startDate: new Date().toDateString(),
  title: "",
};

interface Props {
  onClose: () => void;
  editingAnnouncement?: Announcement;
}

export default function AnnouncementForm({ onClose, editingAnnouncement }: Props) {
  const { user } = useUserStore();

  const [announcement, setAnnouncement] = useState<Announcement>(editingAnnouncement ?? dummyAnnouncement);
  const handleChange = (field: keyof Announcement, value: any) => {
    setAnnouncement((prev) => ({ ...prev, [field]: value }));
  };

  const canSchedule = useMemo(
    () =>
      announcement.apps.length !== 0 &&
      announcement.body !== "" &&
      announcement.endDate &&
      announcement.endDate !== "" &&
      announcement.imageUrl !== "" &&
      announcement.link !== "" &&
      announcement.startDate &&
      announcement.startDate !== "" &&
      announcement.title !== "",
    [announcement]
  );

  // Schedule Announcement
  const scheduleAnnouncement = async () => {
    if (!user) return;

    try {
      console.log("Scheduling", announcement);
    } catch (err) {
      console.error(err);
      errorToast();
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
              value={announcement.title}
              onChange={(event) => handleChange("title", event.target.value)}
            />
            <InputText
              name="Description"
              placeholder="Enter the announcement description"
              value={announcement.body}
              onChange={(event) => handleChange("body", event.target.value)}
            />
            <div className="flex flex-col gap-2">
              <h6 className="text-neutral-800">Date</h6>
              <InputDatePicker
                value={{
                  from: new Date(announcement.startDate),
                  to: new Date(announcement.endDate),
                }}
                setDateRange={(dateRange) => {
                  handleChange("startDate", dateRange?.from ?? "");
                  handleChange("endDate", dateRange?.to ?? "");
                }}
              />
            </div>
            <InputText
              name="Link"
              placeholder="Enter the announcement link"
              value={announcement.link}
              onChange={(event) => handleChange("link", event.target.value)}
            />
            <div className="flex flex-col gap-2">
              <h6 className="text-neutral-800">Apps</h6>
              <InputMultiSelect value={announcement.apps} setValues={(apps) => handleChange("apps", apps)} />
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

import SpeakerIcon from "@/icons/SpeakerIcon";
import ButtonPrimary1 from "../shared/ButtonPrimary1";

export default function LandingCreateAnnouncement() {
  return (
    <div className="flex flex-col p-6 items-start gap-6 rounded-lg bg-neutral-white">
      <div className="flex items-center gap-4 self-stretch">
        <SpeakerIcon className="min-w-[32px] w-[32px] h-[32px] md:w-[40px] md:h-[40px] fill-neutral-800" />
        <div className="flex flex-col gap-1">
          <h4 className="text-neutral-800">Have something to say?</h4>
          <p className="b1 text-neutral-600">Schedule an announcement to our apps with this form.</p>
        </div>
      </div>
      <ButtonPrimary1 text="Create Announcement" action={() => console.log("Button clicked")} />
    </div>
  );
}

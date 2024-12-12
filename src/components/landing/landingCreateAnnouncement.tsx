import { Megaphone } from "lucide-react";
import ButtonPrimary1 from "../system/button/buttonPrimary1";

interface Props {
  action: () => void;
}

export default function LandingCreateAnnouncement({ action }: Props) {
  return (
    <div className="flex flex-col p-6 items-start gap-6 rounded-lg bg-neutral-white">
      <div className="flex items-center gap-4 self-stretch">
        <Megaphone className="size-[32px] md:size-[40px] stroke-neutral-800" />
        <div className="flex flex-col gap-1">
          <h4 className="text-neutral-800">Have something to say?</h4>
          <p className="b1 text-neutral-600">Schedule an announcement to our apps with this form.</p>
        </div>
      </div>
      <ButtonPrimary1 text="Create Announcement" action={action} />
    </div>
  );
}

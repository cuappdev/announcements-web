"use client";

import appDevLogoName from "@/../public/images/appdev_logo_name.png";
import googleLogo from "@/../public/images/google_logo.png";
import { useUserStore } from "@/stores/useUserStore";
import { Constants } from "@/utils/constants";
import { useRouter } from "next/navigation";

export default function Default() {
  const { user } = useUserStore();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8 w-screen h-screen items-center max-md:justify-center px-4 md:px-8 md:pt-[128px] bg-other-background">
      <div className="flex flex-col gap-4 items-center">
        <img src={appDevLogoName.src} alt="AppDev logo" className="w-[128px]" />
        <h2 className="text-neutral-800">Announcements</h2>
      </div>
      <button
        onClick={() => router.push(user && user?.name !== "" ? Constants.pagePath.landing : Constants.pagePath.login)}
        className="flex flex-row gap-2 h-[48px] w-full items-center justify-center bg-white rounded-md border border-other-stroke lg:w-[600px] opacity-hover"
      >
        <img src={googleLogo.src} alt="Google logo" className="size-[20px]" />
        <h6 className="text-black">Log in with Google</h6>
      </button>
    </div>
  );
}

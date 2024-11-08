import appDevLogo from "@/../public/images/appdev_logo.png";
import appDevLogoName from "@/../public/images/appdev_logo_name.png";
import ButtonSecondary2 from "./ButtonSecondary2";

export default function NavBar() {
  return (
    <div className="bg-neutral-white">
      <div className="flex flex-row justify-between py-8 px-4 md:p-8 lg:w-[1128px] lg:px-0 lg:mx-auto">
        <a href="/">
          <img src={appDevLogo.src} className="w-[32px] h-[32px] md:hidden" />
          <img src={appDevLogoName.src} className="h-[32px] max-md:hidden" />
        </a>
        <div className="flex flex-row gap-3 items-center">
          {/* TODO: Replace with profile image */}
          <div className="w-[40px] h-[40px] bg-black rounded-xl" />
          <ButtonSecondary2
            text="LOG OUT"
            action={() => console.log("Logging out")}
          />
        </div>
      </div>
    </div>
  );
}

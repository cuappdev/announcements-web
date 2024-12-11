import appDevLogo from "@/../public/images/appdev_logo.png";
import appDevLogoName from "@/../public/images/appdev_logo_name.png";
import ButtonSecondary2 from "./ButtonSecondary2";
import { Constants } from "@/utils/constants";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { user, setUser } = useUserStore();
  const router = useRouter();

  const logoutAction = () => {
    router.push(Constants.pagePath.default);
    setTimeout(() => {
      setUser(undefined);
    }, 1000 * 1); // Delay for 1 second
  };

  return (
    <div className="bg-neutral-white">
      <div className="flex flex-row justify-between py-8 px-4 md:p-8 lg:w-[1128px] lg:px-0 lg:mx-auto">
        <a href={Constants.pagePath.landing} className="opacity-hover">
          <img src={appDevLogo.src} alt="AppDev logo" className="size-[32px] md:hidden" />
          <img src={appDevLogoName.src} alt="AppDev logo with name" className="h-[32px] max-md:hidden" />
        </a>
        <div className="flex flex-row gap-3 items-center">
          <img src={user?.imageUrl} alt="User profile image" className="size-[40px] rounded-xl" />
          <ButtonSecondary2 text="LOG OUT" action={logoutAction} />
        </div>
      </div>
    </div>
  );
}

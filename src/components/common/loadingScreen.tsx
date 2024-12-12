"use client";

import { useLoading } from "@/hooks/useLoading";
import AppdevLogoIcon from "@/icons/appdevLogoIcon";
import { Constants } from "@/utils/constants";
import { motion } from "framer-motion";

interface Props {
  canDismiss: boolean;
}

export default function LoadingScreen({ canDismiss }: Props) {
  const { isLoading, scale } = useLoading(Constants.timer.loadingScreen, canDismiss);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-white z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading || !canDismiss ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ pointerEvents: isLoading || !canDismiss ? "auto" : "none" }}
    >
      <motion.div
        className="size-32 flex items-center justify-center"
        initial={{ scale: 0.5 }}
        animate={{ scale }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <AppdevLogoIcon className="opacity-100" />
      </motion.div>
    </motion.div>
  );
}
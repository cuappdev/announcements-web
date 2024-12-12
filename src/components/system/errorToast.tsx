import { toast } from "@/hooks/use-toast";

export default function errorToast() {
  toast({
    variant: "destructive",
    duration: 5 * 1000,
    title: "Oops! Something went wrong.",
    description: "We're having trouble completing your request. Please try again later.",
  });
}

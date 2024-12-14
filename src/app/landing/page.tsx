import AuthGuard from "@/components/authGuard/authGuard";
import Landing from "@/components/landing/landing";

export default function LandingPage() {
  return (
    <AuthGuard>
      <Landing />
    </AuthGuard>
  );
}

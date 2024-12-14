import AuthGuard from "@/components/authGuard/authGuard";
import Past from "@/components/past/past";

export default function PastPage() {
  return (
    <AuthGuard>
      <Past />
    </AuthGuard>
  );
}

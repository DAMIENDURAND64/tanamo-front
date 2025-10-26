import { useAuth } from "@/providers/AuthProvider";
import Homepage from "../pages/homepage/Homepage";

export default function Team() {
  const { session, loading } = useAuth();

  if (loading || !session) {
    return null;
  }

  return <Homepage />;
}

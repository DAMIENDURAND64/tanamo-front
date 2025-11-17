import { useAuth } from "@/providers/AuthProvider";
import HomePage from "../pages/homePage/HomePage";

export default function Team() {
  const { session, loading } = useAuth();

  if (loading || !session) {
    return null;
  }

  return <HomePage />;
}

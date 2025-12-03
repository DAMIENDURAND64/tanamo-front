import { useAuth } from "@/providers/AuthProvider";
import { Session } from "@supabase/supabase-js";
import { useState } from "react";

interface UseLoginPageReturn {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string | null;
  submitting: boolean;
  handleLogin: () => Promise<void>;
  loading: boolean;
  session: Session | null;
}
export default function useLoginPage(): UseLoginPageReturn {
  const { session, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    setSubmitting(true);
    setError(null);
    const res = await signIn(email.trim(), password);
    if (res && "error" in res && res.error) setError(res.error.message);
    setSubmitting(false);
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    submitting,
    handleLogin,
    loading,
    session,
  };
}

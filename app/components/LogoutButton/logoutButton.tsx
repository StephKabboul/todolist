"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
      return;
    }

    router.push("/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-lg bg-black px-4 py-2 font-medium text-white hover:bg-gray-800"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
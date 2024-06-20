"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const withAuth = (WrappedComponent: any) => {
  const supabase = createClient();

  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkUser = async () => {
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          setAuthenticated(true);
        } else {
          toast.error("Kindly login or sign up", {
            style: {
              background: "red",
              color: "#ffffff",
            },
          });
          router.replace("/login");
        }
        setLoading(false);
      };

      checkUser();
    }, [router]);

    if (loading) {
      return <p className="text-[1.3rem] p-10">Loading...</p>;
    }

    if (!authenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthenticatedComponent;
};

export default withAuth;

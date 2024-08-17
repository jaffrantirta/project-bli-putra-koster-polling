"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isLogin } from "./session";
import { LoaderIcon } from "react-hot-toast";

function PrivateRoute({ children }: { children: any }) {
  const currentRoute = usePathname();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLogin) {
      sessionStorage.setItem("redirect", currentRoute);
      window.location.href = "/login";
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <LoaderIcon />;
  }

  return children;
}

export default PrivateRoute;

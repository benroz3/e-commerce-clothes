"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import PageTransition from "@/components/PageTransition";
import { setIsAuthUser, setUser } from "@/redux/slices/userSlice";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      dispatch(setIsAuthUser(Cookies.get("token") !== undefined));
      dispatch(setUser(JSON.parse(localStorage.getItem("user") || "")));
    }
  }, [Cookies]);

  return (
    <PageTransition>
      <></>
    </PageTransition>
  );
}

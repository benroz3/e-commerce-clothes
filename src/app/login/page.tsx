"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import InputComponent from "@/components/InputComponent";
import Loader from "@/components/Loader";
import PageTransition from "@/components/PageTransition";
import { loginFormControls } from "@/data/formControls";
import { loginUser } from "@/utils/apiCalls";
import { setIsAuthUser, setUser } from "@/redux/slices/userSlice";
import { RootState } from "@/utils/types";

const Login = () => {
  const initialUser: { [key: string]: string } = {
    email: "",
    password: "",
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(initialUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      dispatch(setIsAuthUser(Cookies.get("token") !== undefined));
      dispatch(setUser(JSON.parse(localStorage.getItem("user") || "")));
    }
  }, [Cookies]);

  // preventing user from visiting login page
  const { isAuthUser } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser, router]);

  const isUserValid = () => {
    return (
      userData &&
      userData.email &&
      userData.email.trim() !== "" &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.email) &&
      userData.password &&
      userData.password.trim() !== "" &&
      userData.password.length > 5
    );
  };

  const loginHandler = async () => {
    setLoading(true);
    const data = await loginUser(userData);
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.token.user));
      Cookies.set("token", data.token);

      setUserData(initialUser);
      dispatch(setUser(data.token.user));

      setLoading(false);
      router.push("/");
    } else {
      setLoading(false);
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  console.log(loading)

  return (
    <PageTransition>
      <div className="bg-white relative">
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
          <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
            <div className="w-full mt-20 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative z-10">
                <p className="w-full text-4xl font-medium text-center font-serif">
                  Login
                </p>
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  {loginFormControls.map((controlItem) => (
                    <InputComponent
                      key={controlItem.id}
                      label={controlItem.label}
                      placeholder={controlItem.placeholder}
                      type={controlItem.type}
                      value={userData[controlItem.id]}
                      onChange={(event) => {
                        setUserData({
                          ...userData,
                          [controlItem.id]: event.target.value,
                        });
                      }}
                    />
                  ))}
                  <button
                    disabled={!isUserValid()}
                    onClick={loginHandler}
                    className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                  >
                    {loading ? (
                      <Loader
                        text="Logging in"
                        color="#ffffff"
                        loading={loading}
                        size={10}
                      />
                    ) : (
                      "Login"
                    )}
                  </button>
                  <div className="flex flex-col gap-2">
                    <p>Create new account</p>
                    <button
                      onClick={() => router.push("/register")}
                      className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;

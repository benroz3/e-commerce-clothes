"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import InputComponent from "@/components/formElements/InputComponent";
import Loader from "@/components/style/Loader";
import PageTransition from "@/components/style/PageTransition";
import { loginFormControls } from "@/utils/data/formControls";
import { loginUser } from "@/utils/apiCalls/users";
import { setUser } from "@/redux/slices/userSlice";

const Login = () => {
  const initialUser: { [key: string]: string } = {
    email: "",
    password: "",
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(initialUser);
  const [loading, setLoading] = useState(false);

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
    const res = await loginUser(userData);

    if (res.success) {
      localStorage.setItem("user", JSON.stringify(res.token.user));
      Cookies.set("token", res.token.token, {
        expires: 1,
      });

      setUserData(initialUser);
      dispatch(setUser(res.token.user));
      router.push("/");
    } else
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    setLoading(false);
  };

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
                    className="w-full px-6 py-4 text-lg flex"
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
                      className="w-full px-6 py-4 text-lg"
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

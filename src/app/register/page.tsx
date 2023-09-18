"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import InputComponent from "@/components/InputComponent";
import SelectComponent from "@/components/SelectComponent";
import { registrationFormControls } from "@/data/formControls";
import { registerNewUser } from "@/utils/apiCalls";

const Register = () => {
  const isRegistered = false; //! dummy data

  const initialUser: { [key: string]: string } = {
    username: "",
    email: "",
    password: "",
    role: "customer",
  };

  const router = useRouter();
  const [newUser, setNewUser] = useState(initialUser);

  const isUserValid = () => {
    return (
      newUser &&
      newUser.username &&
      newUser.username.trim() !== "" &&
      newUser.email &&
      newUser.email.trim() !== "" &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newUser.email) &&
      newUser.password &&
      newUser.password.trim() !== "" &&
      newUser.password.length > 5
    );
  };

  const registerHandler = async () => {
    const data = await registerNewUser(newUser);
    if (data.success) router.push("/login");
    else
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
  };

  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                {isRegistered ? "Registration Successful!" : "Sign Up"}
              </p>
              {isRegistered ? (
                <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide">
                  Login
                </button>
              ) : (
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  {registrationFormControls.map((controlItem) =>
                    controlItem.componentType === "input" ? (
                      <InputComponent
                        key={controlItem.id}
                        label={controlItem.label}
                        placeholder={controlItem.placeholder}
                        type={controlItem.type}
                        value={newUser[controlItem.id]}
                        onChange={(event) => {
                          setNewUser({
                            ...newUser,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                      />
                    ) : controlItem.componentType === "select" ? (
                      <SelectComponent
                        key={controlItem.id}
                        label={controlItem.label}
                        options={controlItem.options || []}
                        value={newUser[controlItem.id]}
                        onChange={(event) => {
                          setNewUser({
                            ...newUser,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                      />
                    ) : null
                  )}
                  <button
                    disabled={!isUserValid()}
                    onClick={registerHandler}
                    className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                  >
                    Register
                  </button>
                  <div className="flex flex-col gap-2">
                    <p>Create new account</p>
                    <button
                      onClick={() => router.push("/login")}
                      className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                    >
                      Login
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

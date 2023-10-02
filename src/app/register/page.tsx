"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import InputComponent from "@/components/formElements/InputComponent";
import SelectComponent from "@/components/formElements/SelectComponent";
import PageTransition from "@/components/style/PageTransition";
import Loader from "@/components/style/Loader";
import { registrationFormControls } from "@/utils/data/formControls";
import { registerNewUser } from "@/utils/apiCalls/users";

const Register = () => {
  const initialUser: { [key: string]: string } = {
    username: "",
    email: "",
    password: "",
    role: "customer",
  };

  const router = useRouter();
  const [newUser, setNewUser] = useState(initialUser);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const res = await registerNewUser(newUser);

    if (res.success) {
      setNewUser(initialUser);
      router.push("/login");
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
                  Sign Up
                </p>

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
                    ) : (
                      controlItem.componentType === "select" && (
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
                      )
                    )
                  )}
                  <button
                    disabled={!isUserValid()}
                    onClick={registerHandler}
                    className="px-6 py-4 text-lg w-full flex"
                  >
                    {loading ? (
                      <Loader
                        text="Registering"
                        color="#ffffff"
                        loading={loading}
                        size={10}
                      />
                    ) : (
                      "Register"
                    )}
                  </button>
                  <div className="flex flex-col gap-2">
                    <p>Create new account</p>
                    <button
                      onClick={() => router.push("/login")}
                      className="px-6 py-4 text-lg w-full"
                    >
                      Login
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

export default Register;

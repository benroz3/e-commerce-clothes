"use client";
import { useRouter } from "next/navigation";
import InputComponent from "@/app/components/InputComponent";
import SelectComponent from "@/app/components/SelectComponent";
import { registrationFormControls } from "@/app/data/formControls";

const Register = () => {
  const isRegistered = false; //! dummy data

  const router = useRouter();

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
                        value={""}
                        onChange={() => {}}
                      />
                    ) : controlItem.componentType === "select" ? (
                      <SelectComponent
                        key={controlItem.id}
                        label={controlItem.label}
                        value={""}
                        options={controlItem.options || []}
                        onChange={() => {}}
                      />
                    ) : null
                  )}
                  <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide">
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

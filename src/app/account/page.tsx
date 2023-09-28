"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PageTransition from "@/components/style/PageTransition";
import InputComponent from "@/components/formElements/InputComponent";
import Loader from "@/components/style/Loader";
import { setUpdatedAddress, setAddresses } from "@/redux/slices/addressSlice";
import { AddressType, RootState, UpdateAddressType } from "@/utils/types";
import { addNewAddressFormControls } from "@/utils/data/formControls";
import {
  addNewAddress,
  deleteAddress,
  fetchAllAddresses,
  updateAddress,
} from "@/utils/apiCalls/address";

const Account = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [currentUpdatedAddressId, setCurrentUpdatedAddressId] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const { addresses, updatedAddress } = useSelector(
    (state: RootState) => state.address
  );

  useEffect(() => {
    if (user !== null) getAllAddresses();
  }, [user]);

  const getAllAddresses = async () => {
    if (user?.id) {
      const data = await fetchAllAddresses(user?.id);

      if (data.success) dispatch(setAddresses(data.data));

      setLoadingPage(false);
    }
  };

  const addOrUpdateAddressHandler = async () => {
    setLoading(true);

    if (user?.id) {
      const data =
        currentUpdatedAddressId !== ""
          ? await updateAddress({
              ...updatedAddress,
              _id: currentUpdatedAddressId,
            })
          : await addNewAddress({
              ...updatedAddress,
              userID: user?.id,
            });

      if (data.success)
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      else
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

      setCurrentUpdatedAddressId("");
      dispatch(
        setUpdatedAddress({
          fullName: "",
          city: "",
          country: "",
          postalCode: "",
          address: "",
          userID: "",
        })
      );
    }

    getAllAddresses();
    setShowAddressForm(false);
    setLoading(false);
  };

  const updateAddressHandler = (address: UpdateAddressType) => {
    setShowAddressForm(true);
    setCurrentUpdatedAddressId(address._id);

    dispatch(
      setUpdatedAddress({
        fullName: address.fullName,
        city: address.city,
        country: address.country,
        postalCode: address.postalCode,
        address: address.address,
      })
    );
  };

  const deleteAddressHandler = async (id: string) => {
    setShowAddressForm(false);

    const res = await deleteAddress(id);

    if (res.success) {
      getAllAddresses();
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
  };

  return (
    <>
      {loadingPage ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <Loader text={""} color="#000000" loading={loadingPage} size={30} />
        </div>
      ) : (
        <PageTransition>
          <section>
            <div className="mx-auto bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
              <div className="bg-white shadow">
                <div className="p-6 sm:p-12">
                  <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row"></div>
                  <div className="flex flex-col flex-1">
                    <h4 className="text-lg font-semibold text-center md:text-left">
                      {user?.username}
                    </h4>
                    <p>{user?.email}</p>
                    <p>{user?.role.toUpperCase()}</p>
                  </div>
                  <button
                    onClick={() => router.push("/orders")}
                    className="mt-5"
                  >
                    View Orders
                  </button>
                  <div className="mt-6">
                    <h1 className="font-bold text-lg">Addresses</h1>
                    <div className="mt-4 flex flex-col gap-4">
                      {addresses && addresses.length ? (
                        addresses.map((address) => (
                          <div key={address._id} className="border p-6">
                            <p>Name: {address.fullName}</p>
                            <p>Country: {address.country}</p>
                            <p>City: {address.city}</p>
                            <p>Address: {address.address}</p>
                            <p>Postal Code: {address.postalCode}</p>
                            <button
                              onClick={() => updateAddressHandler(address)}
                              className="mt-5 mr-5"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => deleteAddressHandler(address._id)}
                              className="mt-5"
                            >
                              Delete
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">
                          No addresses registered.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      className="mt-5 w-full"
                      onClick={() => {
                        setShowAddressForm(!showAddressForm);
                        setCurrentUpdatedAddressId("");
                        dispatch(
                          setUpdatedAddress({
                            fullName: "",
                            city: "",
                            country: "",
                            postalCode: "",
                            address: "",
                            userID: "",
                          })
                        );
                      }}
                    >
                      {showAddressForm ? "Hide" : "Add New Address"}
                    </button>
                  </div>
                  {showAddressForm && (
                    <div className="flex flex-col mt-5 justify-center pt-4 items-center">
                      <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                        {addNewAddressFormControls.map((control) => (
                          <InputComponent
                            key={control.id}
                            label={control.label}
                            placeholder={control.placeholder}
                            type={control.type}
                            value={
                              updatedAddress[control.id as keyof AddressType]
                            }
                            onChange={(event) =>
                              dispatch(
                                setUpdatedAddress({
                                  ...updatedAddress,
                                  [control.id]: event.target.value,
                                })
                              )
                            }
                          />
                        ))}
                      </div>
                      <button
                        className="mt-8 w-full disabled:opacity-50 flex justify-center items-center"
                        disabled={
                          updatedAddress.address === "" ||
                          updatedAddress.city === "" ||
                          updatedAddress.country === "" ||
                          updatedAddress.fullName === "" ||
                          updatedAddress.postalCode === ""
                        }
                        onClick={addOrUpdateAddressHandler}
                      >
                        {loading ? (
                          <Loader
                            text={"Saving address"}
                            color="#ffffff"
                            loading={loading}
                            size={10}
                          />
                        ) : (
                          "Save"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </PageTransition>
      )}
    </>
  );
};

export default Account;

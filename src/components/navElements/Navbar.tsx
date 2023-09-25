"use client";
import { Fragment, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import NavItems from "./NavItems";
import CommonModal from "./CommonModal";
import { setShowNavModal } from "@/redux/slices/navModalSlice";
import { removeUser, setIsAuthUser, setUser } from "@/redux/slices/userSlice";
import { RootState } from "@/utils/types";
import CartModal from "../cartElements/CartModal";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { showNavModal } = useSelector((state: RootState) => state.navModal);
  const { showCartModal } = useSelector((state: RootState) => state.cart);
  const { user, isAuthUser } = useSelector((state: RootState) => state.user);
  const isAdminView = pathname.includes("admin-view");

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      dispatch(setIsAuthUser(Cookies.get("token") !== undefined));
      dispatch(setUser(JSON.parse(localStorage.getItem("user") || "")));
    }
  }, [Cookies, pathname]);

  const logoutHandler = () => {
    Cookies.remove("token");
    localStorage.clear();
    dispatch(removeUser());
  };

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div
            onClick={() => {
              router.push("/");
            }}
            className="flex items-center cursor-pointer"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Clothing X
            </span>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button>Account</button>
                <button onClick={() => router.push("/cart")}>Cart</button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <button
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Client View
                </button>
              ) : (
                <button
                  onClick={() => {
                    router.push("/admin-view");
                  }}
                >
                  Admin View
                </button>
              )
            ) : null}
            {isAuthUser ? (
              <button onClick={logoutHandler}>Logout</button>
            ) : (
              <button onClick={() => router.push("/login")}>Login</button>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => dispatch(setShowNavModal())}
            >
              <span className="sr-only">Open Main Menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems
            isModal={false}
            isAdminView={isAdminView}
            setShow={setShowNavModal}
            dispatch={dispatch}
          />
        </div>
      </nav>
      <CommonModal
        modalTitle={"Clothing-X"} //!fix
        mainContent={
          <NavItems
            isModal={true}
            isAdminView={isAdminView}
            setShow={setShowNavModal}
            dispatch={dispatch}
          />
        }
        showModalTitle={true}
        showButtons={true}
        show={showNavModal}
        setShow={setShowNavModal}
        dispatch={dispatch}
        buttonComponent={<></>} //!fix
      />
      {showCartModal && <CartModal />}
    </>
  );
};

export default Navbar;

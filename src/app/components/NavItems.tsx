import { adminNavOptions, navOptions } from "@/app/data/navOptions";

const NavItems: React.FC<{ isModal: boolean }> = ({ isModal }) => {
  const isAdminView = false; //!dummy data

  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModal ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          isModal ? "border-none" : "border border-gray-100 "
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((option) => (
              <li
                key={option.id}
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p0 hover:text-gray-500"
              >
                {option.label}
              </li>
            ))
          : navOptions.map((option) => (
              <li
                key={option.id}
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p0 hover:text-gray-500"
              >
                {option.label}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default NavItems;

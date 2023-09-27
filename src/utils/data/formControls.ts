export const registrationFormControls = [
  {
    id: "username",
    type: "text",
    placeholder: "Enter name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "email",
    type: "email",
    placeholder: "example@example.com",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Strong password",
    label: "Password",
    componentType: "input",
  },
  {
    id: "role",
    type: "",
    placeholder: "",
    label: "Role",
    componentType: "select",
    options: [
      {
        id: "admin",
        label: "Admin",
      },
      {
        id: "customer",
        label: "Customer",
      },
    ],
  },
];

export const loginFormControls = [
  {
    id: "email",
    type: "email",
    placeholder: "example@example.com",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter password",
    label: "Password",
    componentType: "input",
  },
];

export const adminAddProductFormControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter product name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "price",
    type: "number",
    placeholder: "Enter product price",
    label: "Price",
    componentType: "input",
  },
  {
    id: "description",
    type: "text",
    placeholder: "Enter description",
    label: "Description",
    componentType: "input",
  },
  {
    id: "category",
    type: "",
    placeholder: "",
    label: "Category",
    componentType: "select",
    options: [
      {
        id: "men",
        label: "Men",
      },
      {
        id: "women",
        label: "Women",
      },
      {
        id: "kids",
        label: "Kids",
      },
    ],
  },
  {
    id: "deliveryInfo",
    type: "text",
    placeholder: "Enter delivery info",
    label: "Delivery Info",
    componentType: "input",
  },
  {
    id: "onSale",
    type: "",
    placeholder: "",
    label: "On Sale",
    componentType: "select",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      {
        id: "no",
        label: "No",
      },
    ],
  },
  {
    id: "priceDrop",
    type: "number",
    placeholder: "Enter price drop",
    label: "Price Drop",
    componentType: "input",
  },
];

export const addNewAddressFormControls = [
  {
    id: "fullName",
    type: "input",
    placeholder: "Enter full name",
    label: "Full Name",
    componentType: "input",
  },
  {
    id: "address",
    type: "input",
    placeholder: "Enter your full address",
    label: "Address",
    componentType: "input",
  },
  {
    id: "city",
    type: "input",
    placeholder: "Enter your city",
    label: "City",
    componentType: "input",
  },
  {
    id: "country",
    type: "input",
    placeholder: "Enter your country",
    label: "Country",
    componentType: "input",
  },
  {
    id: "postalCode",
    type: "input",
    placeholder: "Enter postal code",
    label: "Postal Code",
    componentType: "input",
  },
];
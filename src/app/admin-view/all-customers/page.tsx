import UserRows from "@/components/userElements/UserRows";
import { fetchAllUsers } from "@/utils/apiCalls";

const page = async () => {
  const res = await fetchAllUsers();
  const customers = res.data;

  return <UserRows users={customers} />;
};

export default page;

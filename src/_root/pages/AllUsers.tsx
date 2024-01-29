import UserCard from "@/components/global/UserCard";
import { useGetUsers } from "@/lib/reactQuery/queryMutation"
import { Loader } from "lucide-react";

const AllUsers = () => {

  const { data: users, isPending } = useGetUsers();

  console.log(users);
  

  return (
    <div className="common-container overflow-auto custom-scrollbar">
      <div className="w-full flex flex-col gap-4">
        <h2 className="h2-bold">All Users</h2>
        <div className="grid grid-cols-auto sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 p-8 sm:p-4">
          {
            isPending ? <Loader className="animate-spin" /> : 
              users?.map(user => <UserCard user={user} key={user.$id} />)
          }
        </div>
      </div>
    </div>
  )
}

export default AllUsers

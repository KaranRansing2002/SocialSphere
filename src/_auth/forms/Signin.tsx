import { useSigninAccount } from "@/lib/reactQuery/queryMutation"
import FormFields from "./FormFields";
import { useForm } from "react-hook-form";
import { Fields, FormValues } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinValdtn } from "@/lib/validation";
import * as z from "zod"
import { toast } from "@/components/ui/use-toast";
import { useUserContext } from "@/contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const fields: Array<Fields> = ["email", "password"];

const Signin = () => {

  const { mutateAsync: siginUser, isPending, isError } = useSigninAccount();
  const { checkAuthUser, isLoading,user } = useUserContext();
  const navigate = useNavigate();


  const form = useForm<FormValues>({
    resolver: zodResolver(signinValdtn),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const handleDemo = () => {
    form.setValue("email", "demo@gmail.com");
    form.setValue("password", import.meta.env.VITE_DEMO_PASSWORD);
  }

  async function onSubmit(values: z.infer<typeof signinValdtn>) {
    const session = await siginUser({ email: values.email, password: values.password });
    console.log(session);
    if (isError || !session) {
      toast({
        className:'bg-red-800',
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Signin Failed Please try again. ",
      })
      return;
    }

    const isLoggedin = await checkAuthUser();
    if (isLoggedin) {
      form.reset();
      toast({
        className: 'text-green-400 bg-black',
        title: "Successfully Signed-in",
        description: `Welcome ${user.name}`,
      })
      navigate('/');
    }
  }

  return (
    <div className="flex-col flex-center gap-2">
      <FormFields {...{ form, onSubmit, fields }} isPending={isLoading || isPending} key="signin" />
      <p className="text-sm text-light-3 pt-2">or use <span className="underline cursor-pointer hover:text-primary-500" onClick={handleDemo}>Demo Account</span></p>
    </div>
  )
}

export default Signin

import { signupValdtn } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Fields, FormValues } from "@/types"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUser, useSigninAccount } from "@/lib/reactQuery/queryMutation"
import FormFields from "./FormFields"
import { useUserContext } from "@/contexts/AuthProvider"
import { useNavigate } from "react-router-dom"

const fields: Array<Fields> = ["name", "username", "email", "password"]

const Signup = () => {
  
  const { mutateAsync: createUser, isPending, isError } = useCreateUser();
  const { mutateAsync: signinUser} = useSigninAccount();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(signupValdtn),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  const { toast } = useToast()
  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof signupValdtn>) {
    const newUser = await createUser(values);
    if (isError || !newUser) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with Account creation",
      })
      return;
    }
    toast({
      className: 'text-green-400 bg-black',
      title: "Account Successfully Created",
      description: `Welcome ${values.name}`,
    })

    const session = await signinUser({ email: values.email, password: values.password });
    if (!session) {
      console.log("there")
      navigate('/signin')
    }
    const isLoggedin = await checkAuthUser();

    console.log(isLoggedin,session)

    if (isLoggedin) {
      navigate('/');
      form.reset();
    }

    // console.log(newUser);
  }

  return (
    <FormFields {...{ form, onSubmit, fields, isPending }} key="signup" />
  )
}

export default Signup

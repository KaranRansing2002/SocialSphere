import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import logo from '../../assets/logo.png'
import { Fields, FormValues, NewUser } from "@/types"
import {  SubmitHandler, UseFormReturn } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"


interface props{
  form: UseFormReturn<FormValues>;
  onSubmit: (values: NewUser) => Promise<void>,
  fields: Array<Fields>,
  isPending:boolean
}

const FormFields: React.FC<props> = ({ form, onSubmit, fields, isPending }) => {
  
  const [isSignupPage, setIsSignupPage] = useState<boolean>(false);

  useEffect(() => {
    setIsSignupPage(fields.length > 2 ? true : false);  
  }, [fields])
  
  return (
    <div className="flex flex-col gap-4 flex-center">
      <div className="flex-center flex-col gap-1">
        <span className="gap-1 flex-center mb-2">
          <img src={logo} className="h-8" />
          <h2 className="font-bold text-xl">Social Sphere</h2 >
        </span>
        <h2 className="text-lg text-light-3 ">{isSignupPage ? "Create a new account" : "Signin to your account" }</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit as SubmitHandler<FormValues>)} className="space-y-8">
          {
            fields.map((obj) => (
              <FormField
                key={obj}
                control={form.control}
                name={obj}
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>{obj}</FormLabel> */}
                    <FormControl >
                      <Input placeholder={obj} {...field} className="shad-input " type={obj.toLowerCase()} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))
          }
          <div className="text-center flex flex-col gap-2" >
            <Button disabled={isPending} type="submit" className="bg-primary-500 " >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSignupPage ? "Sign-up" : "Sign-in"}
            </Button>
            <p>{isSignupPage ? "Already have an account" : "Don't have an account"} <Link to={isSignupPage ? '/signin' : '/signup'} className="text-primary-500 underline">{isSignupPage ? "Login" : "Signup"} here</Link></p>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default FormFields

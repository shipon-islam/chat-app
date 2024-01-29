import { loginAction } from "@/actions/userAction";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/zod/usersSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
export default function Login() {
  const navigate = useNavigate();
  const [errorArea, setErrorArea] = useState("");
  const { mutateAsync, isLoading } = useMutation(loginAction);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (value: z.infer<typeof loginSchema>) => {
    const data = await mutateAsync(value);
    if (data.success) {
      localStorage.setItem("session", JSON.stringify(data.data));
      navigate("/");
      location.reload();
    }
    if (data.error) {
      setErrorArea(data.error);
    }
  };

  return (
    <div className="bg-black/80  min-h-screen pt-10">
      <div className="max-w-[450px] border-2 p-6 rounded-md mx-auto w-[90%]  bg-background">
        <h1 className="capitalize font-bold text-xl mt-4 mb-6">
          login with creadentials
        </h1>
        {errorArea && (
          <p className="py-2 text-center bg-violet-600/20 my-4 font-medium rounded-lg text-red-600 capitalize">
            {errorArea}
          </p>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="new-password"
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="ml-auto w-fit block" type="submit">
              {isLoading ? "Logging.." : "Login"}
            </Button>
            <p className="pb-2 text-center">
              Don't have an account?{" "}
              <Link className="text-primary" to="/register">
                Register
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}

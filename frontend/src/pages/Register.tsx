import { registerAction } from "@/actions/userAction";
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
import { UserRegisterType } from "@/types/user";
import { registerSchema } from "@/zod/usersSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

export default function Register() {
  const { mutateAsync, isLoading } = useMutation(registerAction);
  const [errorArea, setErrorArea] = useState("");
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
      avatar: undefined,
    },
  });
  const onSubmit = async (value: z.infer<typeof registerSchema>) => {
    const { username, avatar, password, email } = value as UserRegisterType;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (typeof avatar !== "undefined" && avatar.length > 0) {
      formData.append("avatar", avatar[0]);
    }
    const data = await mutateAsync(formData);
    if (data.success) {
      setErrorArea("");
      navigate("/login");
    }
    // form.reset();
    if (data?.error) {
      if (data.error.toString().includes("duplicate key error")) {
        setErrorArea("Email already exist");
      } else {
        setErrorArea(data.error);
      }
    }
  };

  return (
    <div className="bg-black/80  min-h-screen pt-10">
      <div className="max-w-[500px] border-2 p-6 rounded-md mx-auto w-[90%]  bg-background">
        <h1 className="capitalize font-bold text-xl">register your account</h1>
        {errorArea && (
          <p className="py-2 text-center bg-violet-600/20 mt-4 font-medium rounded-lg text-red-600">
            {errorArea}
          </p>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 grid grid-cols-2 items-end justify-start gap-x-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="username"
                      type="text"
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="cpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      placeholder="Enter confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>
                Profile picture <span>(optional)</span>
              </FormLabel>
              <FormControl className="text-white">
                <Input
                  className="file:dark:text-white text-gray-700"
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    form.setValue("avatar", e.target.files)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <Button type="submit">
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
          <p className="pt-8 text-center">
            If you have an account?{" "}
            <Link className="text-primary" to="/login">
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

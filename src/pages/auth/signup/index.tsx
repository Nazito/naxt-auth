import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { styles } from "./styles";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import Link from "next/link";

const Signup: NextPage = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const status = await signIn("credentials", {
      redirect: false,
      type: 'register',
      email: data.email,
      name: data.name,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <Box style={styles.container}>
      <div style={styles.formWrap}>
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} />
          <input {...register("email", { required: true })} />
          {errors.email && <p>email is required.</p>}
          <input
            {...register("password", { required: true })}
            type={"password"}
            placeholder={"...password"}
          />
          {errors.password && <p>password is required.</p>}
          <input type="submit" />
        </form>
        <Link href="/auth/signin">Sign In</Link>
      </div>
    </Box>
  );
};
export default Signup;

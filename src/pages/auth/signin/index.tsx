import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { styles } from "./styles";
import Link from "next/link";

interface Props {}

const Signin: NextPage = (props): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const status = await signIn("credentials", {
      redirect: true,
      type: "login",
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  };
  return (
    <div style={styles.container}>
      <div style={styles.formWrap}>
        <h3>sign in</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
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
        <Link href="/auth/signup">Sign Up</Link>
      </div>
    </div>
  );
};
export default Signin;

import { useSession, signIn, signOut } from "next-auth/react";

const AuthBtn = () => {
  const { data: session } = useSession();

  console.log(111, session);

  if (session) {
    return (
      <>
        Signed in {session?.user?.email} <br />
        <button
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        onClick={() => {
          signIn();
        }}
      >
        Sign In
      </button>
    </>
  );
};
export default AuthBtn;

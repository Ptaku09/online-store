import { getSession, signOut, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

export default function User() {
  const { data: session } = useSession();

  return (
    <div className="w-screen h-mobile-screen lg:h-screen flex items-center justify-center flex-col font-['Outfit'] text-2xl">
      <h1>hello</h1>
      {session ? <button onClick={() => signOut()}>logout</button> : null}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

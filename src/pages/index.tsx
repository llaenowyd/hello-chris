import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const Main: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hello-Chris</title>
        <meta
          name="description"
          content="A custom application by Collin Monahan"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Hello Chris
    </div>
  );
};

export default Main;

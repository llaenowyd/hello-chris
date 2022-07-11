import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import Header from '../components/Header';

const MainView = dynamic(() => import('../components/MainView'), {
  ssr: false,
});

const Main: NextPage = () => {
  return (
    <>
      <Header />
      {MainView ? <MainView /> : null}
    </>
  );
};

export default Main;

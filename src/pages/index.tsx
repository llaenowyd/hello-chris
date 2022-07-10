import type { NextPage } from 'next';
import Head from 'next/head';

import Header from '../components/Header';
import ViewMaster from '../components/ViewMaster';

import classes from './index.module.css';

const Main: NextPage = () => {
  return (
    <>
      <Head>
        <title>Hello-Chris</title>
        <meta
          name="description"
          content="A custom application by Collin Monahan"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <ViewMaster className={classes.flexChild} />
    </>
  );
};

export default Main;

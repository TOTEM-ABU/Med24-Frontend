import { NextPage } from 'next';
import Head from 'next/head';
import Kliniki from '../../app/Kliniki';

const KlinikiPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Klinikalar - Med24</title>
        <meta name="description" content="Eng yaxshi tibbiy xizmatlar ko'rsatadigan klinikalar bilan tanishing" />
        <meta name="keywords" content="klinikalar, tibbiy xizmatlar, davlat klinikalar, xususiy klinikalar" />
      </Head>
      <Kliniki />
    </>
  );
};

export default KlinikiPage;
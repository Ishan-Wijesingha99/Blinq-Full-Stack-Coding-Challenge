import type { NextPage } from "next";
import Head from "next/head";
import IntegrationsDashboard from '../components/IntegrationsDashboard';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Blinq • Integrations</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <IntegrationsDashboard />
    </div>
  );
};

export default Home;
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { useAccount } from "wagmi";

import Card from "./../components/Card";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();

  return (
    <div>
      <Head>
        <title>SolidFundr</title>
        <meta
          content="Welcome to SolidFundr, the platform revolutionizing fundraising with
          blockchain technology."
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <header className="flex justify-end p-4">
        <ConnectButton />
      </header>
      <main className="px-8">
        <h1 className="text-4xl text-center font-semibold mb-4">SolidFundr</h1>
        <p className="text-center text-lg mb-8">
          Welcome to SolidFundr, the platform revolutionizing fundraising with
          blockchain technology.
          <br />
          SolidFundr leverages the power of blockchain to ensure all campaign
          information is publicly accessible and tamper-proof. <br />
          With no intermediaries involved, smart contracts automatically
          transfer funds to the designated recipient once the budget is reached.
        </p>

        <section className="mb-8">
          <h2 className="text-lg text-center font-semibold mb-4">
            Last Three Campaigns
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card />
            <Card />
            <Card />
            {/* Aggiungi altre istanze del componente Card per le altre raccolte fondi */}
          </div>
          <p className="text-center mt-4">
            <a href="#" className="text-blue-500 font-semibold hover:underline">
              View Full Campaign List
            </a>
          </p>
        </section>

        <section className="mb-8 text-center">
          <p className="text-lg mb-4">
            Anyone can open their own fundraising campaign and make a
            difference.
          </p>
          <button className="bg-orange-400 hover:bg-orange-600 py-3 px-8 rounded text-sm font-semibold">
            Create New Campaign
          </button>
        </section>
      </main>
      <footer className="text-center p-4 mt-4 bg-orange-400">
        <p>
          &copy; 2023 SolidFundr - Created by{" "}
          <a
            className="underline font-bold"
            href="https://linktr.ee/falconandrea"
            title=""
            target="_blank"
            rel="noreferrer"
          >
            Falcon Andrea
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;

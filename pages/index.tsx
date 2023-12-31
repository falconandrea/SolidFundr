"use client";

import Card from "./../components/Card";
import { ReactElement, useEffect, useState } from "react";

import Link from "next/link";
import { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import { Campaign } from "../utils/interfaces-types";
import LoadingSpinner from "../components/LoadingSpinner";
import { getCampaigns } from "../utils/functions";
import NewCampaignWrapper from "../components/NewCampaignWrapper";

const Home: NextPageWithLayout = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    /**
     * Fetches data asynchronously.
     *
     * @return {Promise<void>} Promise that resolves when data is fetched.
     */
    const fetchData = async () => {
      const result: Campaign[] = await getCampaigns("DESC", false, 3);
      setCampaigns(result);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <main>
      {isLoading && <LoadingSpinner />}
      <section className="px-8 pt-8">
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
      </section>
      <section className="mb-8 px-8">
        <h2 className="text-lg text-center font-semibold mb-4">
          Last three open Campaigns
        </h2>
        {campaigns.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign, index) => (
                <Card key={index} campaign={campaign} />
              ))}
            </div>
            <p className="text-center mt-4">
              <Link
                href="/list"
                title="View full campaign list"
                className="text-blue-500 font-semibold hover:underline"
              >
                View Full Campaign List
              </Link>
            </p>
          </div>
        ) : (
          <p className="text-center italic py-8">No campaigns yet</p>
        )}
      </section>

      <NewCampaignWrapper />
    </main>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;

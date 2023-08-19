"use client";

import { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import { ReactElement, useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Campaign } from "../utils/interfaces-types";
import Card from "../components/Card";
import Link from "next/link";
import { getCampaigns } from "../utils/functions";

const List: NextPageWithLayout = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const result: Campaign[] = await getCampaigns();
      setCampaigns(result);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <main>
      {isLoading && <LoadingSpinner />}
      <section className="px-8 py-8">
        <h1 className="text-4xl text-center font-semibold mb-8">
          List of campaigns
        </h1>
        {campaigns.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign, index) => (
                <Card key={index} campaign={campaign} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center italic py-8">No campaigns yet</p>
        )}
      </section>

      <section className="text-center p-8 bg-orange-100">
        <p className="text-lg mb-8">
          Anyone can open their own fundraising campaign and make a difference.
        </p>
        <Link
          href="/new"
          title="Create new campaign"
          className="bg-orange-400 hover:bg-orange-600 py-4 px-8 rounded text-sm font-semibold"
        >
          Create New Campaign
        </Link>
      </section>
    </main>
  );
};

List.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default List;

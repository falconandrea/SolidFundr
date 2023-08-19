"use client";

import { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import { ReactElement, useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Campaign } from "../utils/interfaces-types";
import { readContract } from "@wagmi/core";
import solidFundr from "../abi/SolidFundr.json";
import Card from "../components/Card";

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

  const getCampaigns = async (): Promise<Campaign[]> => {
    const data = await readContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi: solidFundr.abi,
      functionName: "getFunds",
    });
    return data as Campaign[];
  };

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
    </main>
  );
};

List.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default List;

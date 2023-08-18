"use client";

import { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import { ReactElement, useEffect, useState } from "react";
import solidFundr from "../abi/SolidFundr.json";
import { getAccount, prepareWriteContract, writeContract } from "@wagmi/core";
import { parseEther } from "viem";
import LoadingSpinner from "../components/LoadingSpinner";

const NewCampaign: NextPageWithLayout = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [target, setTarget] = useState("");
  const [canCreate, setCanCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const account = getAccount();
    setCanCreate(account.isConnected);
    setIsLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    const config = await prepareWriteContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi: solidFundr.abi,
      functionName: "createFund",
      args: [parseEther(amount), target, title, description],
    });
    const hash = await writeContract(config);
    console.log(hash);
    setIsLoading(false);
  };

  return (
    <main>
      {isLoading && <LoadingSpinner />}
      <section className="px-8 py-8">
        <h1 className="text-4xl text-center font-semibold mb-8">
          Create New Campaign
        </h1>
        {canCreate ? (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-semibold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={2}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="target"
                className="block text-gray-700 font-semibold mb-2"
              >
                Target Address (0x....)
              </label>
              <input
                type="text"
                id="target"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                required
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="amount"
                className="block text-gray-700 font-semibold mb-2"
              >
                Amount (ETH)
              </label>
              <input
                type="number"
                step="0.01"
                id="amount"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-orange-400 hover:bg-orange-600 py-3 px-8 rounded text-sm font-semibold"
            >
              Create Campaign
            </button>
          </form>
        ) : (
          <p className="text-center italic py-8">
            Connect your wallet to be able to create a campaign
          </p>
        )}
      </section>
    </main>
  );
};

NewCampaign.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NewCampaign;

import { Campaign, Donation } from "./interfaces-types";
import solidFundr from "../abi/SolidFundr.json";
import { prepareWriteContract, readContract, writeContract } from "@wagmi/core";
import { parseEther } from "viem";

/**
 * Format a timestamp into a human-readable date string.
 *
 * @param timestamp - The timestamp to format.
 * @returns The formatted date string.
 */
export const formatTimestamp = (timestamp: bigint): string => {
  const value = Number(timestamp) * 1000;
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(value).toLocaleDateString("en-US", options);
};

/**
 * Retrieves a list of campaigns from the contract.
 *
 * @return {Promise<Campaign[]>} A promise that resolves to an array of Campaign objects.
 */
export const getCampaigns = async (): Promise<Campaign[]> => {
  const data = await readContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: solidFundr.abi,
    functionName: "getFunds",
  });
  return data as Campaign[];
};

/**
 * Retrieves a campaign by its ID.
 *
 * @param {number} id - The ID of the campaign to retrieve.
 * @return {Promise<Campaign | null>} A Promise that resolves to the retrieved campaign, or null if no campaign was found.
 */
export const getCampaign = async (id: number): Promise<Campaign | null> => {
  const data = (await readContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: solidFundr.abi,
    functionName: "getFunds",
  })) as Campaign[];
  const campaign = data.find(
    (campaign: Campaign) => Number(campaign.id) === id
  );
  return campaign || null;
};

/**
 * Retrieves donations for a given Campaign ID from the contract.
 *
 * @param {number} id - The ID of the campaign to retrieve donations for.
 * @return {Donation[] | null} An array of donations or null if no donations are found.
 */
export const getDonations = async (id: number) => {
  const donations = (await readContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: solidFundr.abi,
    functionName: "getDonations",
    args: [id],
  })) as Donation[];
  return donations || null;
};

/**
 * Creates a campaign with the specified amount, target, title, and description.
 *
 * @param {string} amount - The amount of the campaign.
 * @param {string} target - The target address of the campaign.
 * @param {string} title - The title of the campaign.
 * @param {string} description - The description of the campaign.
 * @return {string} The hash of the transaction that created the campaign.
 */
export const createCampaign = async (
  amount: string,
  target: string,
  title: string,
  description: string
) => {
  const config = await prepareWriteContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: solidFundr.abi,
    functionName: "createFund",
    args: [parseEther(amount), target, title, description],
  });
  const { hash } = await writeContract(config);
  return hash;
};

export const makeDonation = async (id: number, amount: string) => {
  const config = await prepareWriteContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: solidFundr.abi,
    functionName: "donate",
    args: [id],
    value: parseEther(amount),
  });
  const { hash } = await writeContract(config);
  return hash;
};

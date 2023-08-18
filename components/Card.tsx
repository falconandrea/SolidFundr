import { NextComponentType } from "next";
import ProgressBar from "./ProgressBar";
import { useState } from "react";
import { CardProps } from "../utils/interfaces-types";

const Card: NextComponentType<CardProps> = ({ campaign }: CardProps) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const creatorAddress = campaign.creator;
  const targetAddress = campaign.targetAddress;
  const creationDate = Number(campaign.creationDate) * 1000;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(creatorAddress);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  /**
   * Format a timestamp into a human-readable date string.
   *
   * @param timestamp - The timestamp to format.
   * @returns The formatted date string.
   */
  const formatTimestamp = (timestamp: number): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(timestamp).toLocaleDateString("en-US", options);
  };

  return (
    <div className="bg-white p-10 rounded-lg border border-gray-300">
      <div>
        <h1 className="text-xl font-bold text-ellipsis overflow-hidden truncate">
          {campaign.title}
        </h1>
        <p className="text-xs line-clamp-3">{campaign.description}</p>
        <div className="mt-4 mb-6">
          <div className="flex items-center space-x-2">
            <p className="text-gray-500 text-xs">Creator:</p>
            <button
              className="text-blue-500 text-xs font-semibold hover:underline"
              onClick={copyToClipboard}
            >
              {copySuccess
                ? "Copied!"
                : `${creatorAddress.slice(0, 6)}...${creatorAddress.slice(-4)}`}
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-gray-500 text-xs">Target:</p>
            <button
              className="text-blue-500 text-xs font-semibold hover:underline"
              onClick={copyToClipboard}
            >
              {copySuccess
                ? "Copied!"
                : `${targetAddress.slice(0, 6)}...${targetAddress.slice(-4)}`}
            </button>
          </div>
          <p className="text-gray-500 text-xs" suppressHydrationWarning>
            Created: {formatTimestamp(creationDate)}
          </p>
        </div>
        <ProgressBar amount={campaign.amount} target={campaign.targetAmount} />
        <button className="bg-orange-400 hover:bg-orange-600 py-3 px-8 mt-4 rounded text-sm font-semibold">
          View Campaign
        </button>
      </div>
    </div>
  );
};

export default Card;

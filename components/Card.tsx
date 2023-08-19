import ProgressBar from "./ProgressBar";
import { CardProps } from "../utils/interfaces-types";
import Link from "next/link";
import { formatTimestamp } from "../utils/functions";
import CopyAddress from "./CopyAddress";

const Card = ({ campaign }: CardProps) => {
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
            <CopyAddress address={campaign.creator} />
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-gray-500 text-xs">Target:</p>
            <CopyAddress address={campaign.targetAddress} />
          </div>
          <p className="text-gray-500 text-xs" suppressHydrationWarning>
            Created: {formatTimestamp(campaign.creationDate)}
          </p>
        </div>
        <ProgressBar amount={campaign.amount} target={campaign.targetAmount} />
        <p className="mt-4">
          <Link
            href={`/detail/${campaign.id}`}
            passHref
            title="View campaign"
            className="bg-orange-400 hover:bg-orange-600 py-3 px-8 rounded text-sm font-semibold"
          >
            View Campaign
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Card;

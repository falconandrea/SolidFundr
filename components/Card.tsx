import { NextComponentType } from "next";
import ProgressBar from "./ProgressBar";
import { useState } from "react";

const Card: NextComponentType = () => {
  const [copySuccess, setCopySuccess] = useState(false);

  // Esempio di indirizzo del wallet del creatore
  const creatorAddress = "0x1234567890123456789012345678901234567890";
  const creationDate = "August 16, 2023"; // Esempio di data di creazione

  const copyToClipboard = () => {
    navigator.clipboard.writeText(creatorAddress);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="bg-white p-10 rounded-lg border border-gray-300">
      <div>
        <h1 className="text-xl font-bold text-ellipsis overflow-hidden truncate">
          Acquisto nuovo computer per lavoro
        </h1>
        <p className="text-xs line-clamp-3">
          Ho bisogno di comprare un nuovo computer per lavorare online, deve
          essere performante, con una buona quantità di ram e di harddisk. Se
          possibile sarebbe figo prendere anche monitor, tastiera e mouse.
        </p>
        <div className="mt-4 mb-6">
          <p className="text-gray-600">1.5 ETH / 2 ETH (75%)</p>
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
          <p className="text-gray-500 text-xs">Created: {creationDate}</p>
        </div>
        <ProgressBar />
        <button className="bg-orange-400 hover:bg-orange-600 py-3 px-8 mt-4 rounded text-sm font-semibold">
          View Campaign
        </button>
      </div>
    </div>
  );
};

export default Card;

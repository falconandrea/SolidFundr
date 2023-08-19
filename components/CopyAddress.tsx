import { useState } from "react";

const CopyAddress = ({ address }: { address: string }) => {
  const [copyAddress, setCopyAddress] = useState("");

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopyAddress(address);
    setTimeout(() => setCopyAddress(""), 2000);
  };

  return (
    <button
      className="text-blue-500 text-xs font-semibold hover:underline"
      onClick={() => copyToClipboard(address)}
    >
      {copyAddress
        ? "Copied!"
        : `${address.slice(0, 6)}...${address.slice(-4)}`}
    </button>
  );
};

export default CopyAddress;

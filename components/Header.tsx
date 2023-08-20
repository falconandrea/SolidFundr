import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getContributions } from "../utils/functions";
import { formatEther } from "viem";

const Header = () => {
  const { isConnected, address } = useAccount();
  const [showDonations, setShowDonations] = useState(false);
  const [contributionAmount, setContributionAmount] = useState("");

  useEffect(() => {
    setShowDonations(isConnected);

    const getDonationsAmount = async () => {
      const value = await getContributions(address as `0x${string}`);
      setContributionAmount(formatEther(value));
    };

    if (isConnected) getDonationsAmount();
  }, [isConnected, address]);

  return (
    <header className="flex justify-between items-center p-4 border-b-2 align border-gray-300">
      <Link
        href="/"
        title="Home"
        className="text-2xl pointer text-center font-semibold"
      >
        SolidFundr
      </Link>
      <div className="flex items-center space-x-4">
        {showDonations && (
          <p className="bg-orange-400 py-2 px-4 rounded text-xs text-white hidden sm:block">
            You donated: {contributionAmount} ETH
          </p>
        )}
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;

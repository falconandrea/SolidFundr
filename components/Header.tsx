import { NextComponentType } from "next";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const Header: NextComponentType = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b-2 align border-gray-300">
      <Link
        href="/"
        title="Home"
        className="text-2xl pointer text-center font-semibold"
      >
        SolidFundr
      </Link>
      <ConnectButton />
    </header>
  );
};

export default Header;

import { useState } from "react";
import { makeDonation } from "../utils/functions";
import { parseErrors } from "../utils/parseErrors";

const DonateForm = ({
  campaignId,
  setIsLoading,
  setMessageAlert,
  setMessageStatus,
}: {
  campaignId: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMessageAlert: React.Dispatch<React.SetStateAction<string>>;
  setMessageStatus: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [donationAmount, setDonationAmount] = useState("");
  const [hash, setHash] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessageAlert("");
    setMessageStatus("success");
    setIsLoading(true);

    try {
      const hash = await makeDonation(campaignId, donationAmount);
      setHash(hash);

      setMessageAlert("Transaction sent");

      // Reset form
      setDonationAmount("");
    } catch (error: any) {
      setMessageStatus("error");
      setMessageAlert(parseErrors(error.toString()));
    }

    setIsLoading(false);
  };

  return (
    <form className="bg-gray-100 p-4 rounded-md" onSubmit={handleSubmit}>
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
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-orange-400 hover:bg-orange-600 py-3 px-8 rounded text-sm font-semibold"
      >
        Send
      </button>
      {hash && (
        <p className="text-center mt-8">
          <a
            target="_blank"
            href={`https://sepolia.etherscan.io/tx/${hash}`}
            title="View full campaign list"
            className="text-blue-500 font-semibold hover:underline"
          >
            View Transaction
          </a>
        </p>
      )}
    </form>
  );
};

export default DonateForm;

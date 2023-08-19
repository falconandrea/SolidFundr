import { ReactElement, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { NextPageWithLayout } from "../_app";
import { Campaign, Donation } from "../../utils/interfaces-types";
import LoadingSpinner from "../../components/LoadingSpinner";
import MessageAlert from "../../components/MessageAlert";
import { useRouter } from "next/router";
import ProgressBar from "../../components/ProgressBar";
import { getCampaign, getDonations } from "../../utils/functions";

const DetailPage: NextPageWithLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [messageStatus, setMessageStatus] = useState("");
  const [campaign, setCampaign] = useState<Campaign>();
  const [donationAmount, setDonationAmount] = useState("");
  const [copyAddress, setCopyAddress] = useState("");
  const [hash, setHash] = useState("");
  const [listDonations, setListDonations] = useState<Donation[]>([]);

  const router = useRouter();

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopyAddress(address);
    setTimeout(() => setCopyAddress(""), 2000);
  };

  useEffect(() => {
    if (router.isReady) {
      const id = parseInt(router.query.id as string);

      setIsLoading(true);
      const fetchData = async () => {
        // Get campaign data
        const result: Campaign | null = await getCampaign(id);
        if (result) {
          setCampaign(result);

          // Get list of donatiions
          const donations = await getDonations(id);
          setListDonations(donations);
        } else {
          setMessageAlert("Campaign not found");
          setMessageStatus("error");
        }

        setIsLoading(false);
      };

      fetchData();
    }
  }, [router.isReady]);

  return (
    <main>
      {isLoading && <LoadingSpinner />}
      <MessageAlert message={messageAlert} messageStatus={messageStatus} />
      <section className="px-8 py-8">
        <div className="max-w-lg mx-auto">
          {campaign ? (
            <div>
              <h1 className="text-4xl text-center font-semibold mb-8">
                {campaign.title}
              </h1>
              <p className="mb-4">{campaign.description}</p>
              <div className="mb-4">
                <p className="text-gray-500 text-xs">Creator:</p>
                <button
                  className="text-blue-500 text-xs font-semibold hover:underline"
                  onClick={() => copyToClipboard(campaign.creator)}
                >
                  {copyAddress && copyAddress == campaign.creator
                    ? "Copied!"
                    : `${campaign.creator.slice(
                        0,
                        6
                      )}...${campaign.creator.slice(-4)}`}
                </button>
              </div>
              <div className="mb-4">
                <p className="text-gray-500 text-xs">Target:</p>
                <button
                  className="text-blue-500 text-xs font-semibold hover:underline"
                  onClick={() => copyToClipboard(campaign.targetAddress)}
                >
                  {copyAddress && copyAddress == campaign.targetAddress
                    ? "Copied!"
                    : `${campaign.targetAddress.slice(
                        0,
                        6
                      )}...${campaign.targetAddress.slice(-4)}`}
                </button>
              </div>
              <ProgressBar
                amount={campaign.amount}
                target={campaign.targetAmount}
              />
              <h2 className="mt-8 text-center font-semibold text-lg">
                Donations List
              </h2>
              <ul className="list-none pl-8 text-right">
                <li>5 ETH from 0x0000</li>
                <li>2.3 ETH from 0x0001</li>
              </ul>

              <div className="mt-8">
                <h2 className="text-center font-semibold text-lg">
                  Make a Donation
                </h2>
                <form className="bg-gray-100 p-4 rounded-md">
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
                        href={`https://sepolia.etherscan.io/tx/${hash}`}
                        title="View full campaign list"
                        className="text-blue-500 font-semibold hover:underline"
                      >
                        View Transaction
                      </a>
                    </p>
                  )}
                </form>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </main>
  );
};

DetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default DetailPage;
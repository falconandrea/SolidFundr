import { ReactElement, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { NextPageWithLayout } from "../_app";
import { Campaign, Donation } from "../../utils/interfaces-types";
import LoadingSpinner from "../../components/LoadingSpinner";
import MessageAlert from "../../components/MessageAlert";
import { useRouter } from "next/router";
import ProgressBar from "../../components/ProgressBar";
import { getCampaign, getDonations } from "../../utils/functions";
import { parseErrors } from "../../utils/parseErrors";
import { formatEther } from "viem";
import { getAccount, watchAccount } from "@wagmi/core";
import DonateForm from "../../components/DonateForm";

const DetailPage: NextPageWithLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [messageStatus, setMessageStatus] = useState("");
  const [campaign, setCampaign] = useState<Campaign>();
  const [copyAddress, setCopyAddress] = useState("");
  const [listDonations, setListDonations] = useState<Donation[]>([]);
  const [campaignId, setCampaignId] = useState(-1);
  const [canDonate, setCanDonate] = useState(false);

  const router = useRouter();

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopyAddress(address);
    setTimeout(() => setCopyAddress(""), 2000);
  };

  const checkAccount = watchAccount((account) => {
    setIsLoading(true);
    setMessageAlert("");
    setCanDonate(account.isConnected);
    setIsLoading(false);
  });

  useEffect(() => {
    if (router.isReady) {
      const account = getAccount();
      setCanDonate(account.isConnected);

      setIsLoading(true);
      const id = parseInt(router.query.id as string);
      setCampaignId(id);

      const fetchData = async () => {
        // Get campaign data
        const result: Campaign | null = await getCampaign(id);
        if (result) {
          setCampaign(result);

          // Get list of donations
          try {
            const donations = await getDonations(id);
            setListDonations(donations);
          } catch (error: any) {
            setMessageStatus("error");
            setMessageAlert(parseErrors(error.toString()));
          }
        } else {
          setMessageAlert(parseErrors("FundDoesNotExist"));
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
              {listDonations && listDonations.length > 0 ? (
                <ul className="list-none pl-8 text-right">
                  {listDonations.map((donation, index) => (
                    <li key={index}>
                      {formatEther(donation.amount)} ETH from {donation.author}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center italic py-8">
                  No donations yet, be the first!
                </p>
              )}
              <div className="mt-8">
                <h2 className="text-center font-semibold text-lg mb-4">
                  Make a Donation
                </h2>
                {canDonate ? (
                  <DonateForm
                    campaignId={campaignId}
                    setIsLoading={setIsLoading}
                    setMessageAlert={setMessageAlert}
                    setMessageStatus={setMessageStatus}
                  />
                ) : (
                  <p className="text-center italic py-8">
                    You need to connect your wallet
                  </p>
                )}
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

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
import CopyAddress from "../../components/CopyAddress";

const DetailPage: NextPageWithLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [messageStatus, setMessageStatus] = useState("");
  const [campaign, setCampaign] = useState<Campaign>();
  const [listDonations, setListDonations] = useState<Donation[]>([]);
  const [campaignId, setCampaignId] = useState(-1);
  const [canDonate, setCanDonate] = useState(false);

  const router = useRouter();

  const checkAccount = watchAccount((account) => {
    setIsLoading(true);
    setMessageAlert("");
    setCanDonate(account.isConnected);
    setIsLoading(false);
  });

  const getCampaignData = async (id: number) => {
    const result: Campaign | null = await getCampaign(id);
    if (result) {
      setCampaign(result);

      const donations = await getDonations(id);
      setListDonations(donations);
    } else {
      setMessageAlert(parseErrors("FundDoesNotExist"));
      setMessageStatus("error");
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const account = getAccount();
      setCanDonate(account.isConnected);

      setIsLoading(true);
      const id = parseInt(router.query.id as string);
      setCampaignId(id);

      getCampaignData(id);
      setIsLoading(false);
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
                <CopyAddress address={campaign.creator} />
              </div>
              <div className="mb-4">
                <p className="text-gray-500 text-xs">Target:</p>
                <CopyAddress address={campaign.targetAddress} />
              </div>
              <ProgressBar
                amount={campaign.amount}
                target={campaign.targetAmount}
              />
              <h2 className="mt-8 text-center font-semibold text-lg">
                Donations List
              </h2>
              {listDonations && listDonations.length > 0 ? (
                <table className="list-none pl-8 mt-4 w-1/2 mx-auto">
                  {listDonations.map((donation, index) => (
                    <tr key={index}>
                      <td className="text-right">
                        {formatEther(donation.amount)} ETH
                      </td>
                      <td className="text-right">
                        <CopyAddress address={donation.author} />
                      </td>
                    </tr>
                  ))}
                </table>
              ) : (
                <p className="text-center italic py-8">
                  No donations yet, be the first!
                </p>
              )}
              <hr className="mt-8" />
              <div className="mt-8">
                <h2 className="text-center font-semibold text-lg ">
                  Make a Donation
                </h2>
                {!campaign.completed ? (
                  canDonate ? (
                    <DonateForm
                      campaignId={campaignId}
                      setIsLoading={setIsLoading}
                      setMessageAlert={setMessageAlert}
                      setMessageStatus={setMessageStatus}
                      getCampaignData={getCampaignData}
                    />
                  ) : (
                    <p className="text-center italic py-8">
                      You need to connect your wallet
                    </p>
                  )
                ) : (
                  <p className="text-center italic py-8">
                    Campaign has been completed
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

import Link from "next/link";

const NewCampaignWrapper = () => {
  return (
    <section className="text-center p-8 bg-orange-100">
      <p className="text-lg mb-8">
        Anyone can open their own fundraising campaign and make a difference.
      </p>
      <Link
        href="/new"
        title="Create new campaign"
        className="bg-orange-400 hover:bg-orange-600 py-4 px-8 rounded text-sm font-semibold"
      >
        Create New Campaign
      </Link>
    </section>
  );
};

export default NewCampaignWrapper;

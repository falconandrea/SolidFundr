/**
 * Renders a link to view a transaction.
 *
 * @param {string} hash - The hash of the transaction.
 * @return {JSX.Element | null} - The rendered transaction link.
 */
const TransactionLink = ({ hash }: { hash: string }) => {
  if (!hash) return null;

  return (
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
  );
};

export default TransactionLink;

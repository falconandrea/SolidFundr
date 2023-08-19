import { formatEther } from "viem";
import { ProgressBarProps } from "../utils/interfaces-types";

const ProgressBar = ({ amount, target }: ProgressBarProps) => {
  const amountValue = formatEther(amount);
  const targetValue = formatEther(target);
  let percentage =
    parseFloat(targetValue) > 0
      ? (parseFloat(amountValue) / parseFloat(targetValue)) * 100
      : 0;
  percentage = percentage < 100 ? percentage : 100;
  const widthStyle = { width: `${percentage}%` };

  return (
    <div>
      <p className="text-gray-600 pb-1">
        {amountValue} ETH / {targetValue} ETH ({percentage}%)
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={widthStyle}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;

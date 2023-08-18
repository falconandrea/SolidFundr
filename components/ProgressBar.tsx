import { FunctionComponent } from "react";
import { formatEther } from "viem";
import { ProgressBarProps } from "../utils/interfaces-types";

const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  amount,
  target,
}) => {
  const amountValue = formatEther(amount);
  const targetValue = formatEther(target);
  const percentage =
    parseFloat(targetValue) > 0
      ? (parseFloat(amountValue) / parseFloat(targetValue)) * 100
      : 0;
  const widthStyle = { width: `${percentage < 100 ? percentage : 100}%` };

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

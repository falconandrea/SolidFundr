import { formatEther } from "viem";
import { ProgressBarProps } from "../utils/interfaces-types";

/**
 * Renders a progress bar component based on the provided amount and target values.
 *
 * @param {ProgressBarProps} amount - The amount value to be displayed on the progress bar.
 * @param {ProgressBarProps} target - The target value to define the maximum progress of the bar.
 * @return {JSX.Element} The rendered progress bar component.
 */
const ProgressBar = ({ amount, target }: ProgressBarProps) => {
  const amountValue = formatEther(amount);
  const targetValue = formatEther(target);
  const percentage =
    parseFloat(targetValue) > 0
      ? (parseFloat(amountValue) / parseFloat(targetValue)) * 100
      : 0;
  const widthStyle = { width: `${percentage}%` };

  return (
    <div>
      <p className="text-gray-600 pb-1">
        {amountValue} ETH / {targetValue} ETH ({percentage.toFixed(2)}%)
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

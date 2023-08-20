import { useEffect, useState } from "react";

/**
 * Renders a message alert component based on the provided message and message status.
 *
 * @param {string} message - The message to display in the alert.
 * @param {string} messageStatus - The status of the message (e.g., "error" or "success").
 * @returns {JSX.Element | null} The rendered message alert component, or null if the alert is not visible.
 */
const MessageAlert = ({
  message,
  messageStatus,
}: {
  message: string;
  messageStatus: "error" | "success";
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      // Hide alert after 5 seconds
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-4 right-4 ${
        messageStatus === "error" ? "bg-red-500" : "bg-green-500"
      } text-white p-4 rounded shadow-md`}
    >
      {message}
    </div>
  );
};

export default MessageAlert;

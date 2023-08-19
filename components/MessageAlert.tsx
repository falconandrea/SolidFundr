import { useEffect, useState } from "react";

const MessageAlert = ({
  message,
  messageStatus,
}: {
  message: string;
  messageStatus: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      // Nascondi l'avviso dopo 5 secondi
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

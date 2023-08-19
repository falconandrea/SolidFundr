export const parseErrors = (err: string) => {
  console.log(err);
  if (err.includes("InvalidAddressError")) {
    return "Invalid target address";
  } else if (err.includes("IntegerOutOfRangeError")) {
    return "Wrong amount in ETH";
  } else if (err.includes("User rejected the request")) {
    return "User rejected the request";
  } else {
    return "Error during transaction";
  }
};

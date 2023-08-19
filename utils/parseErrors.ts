export const parseErrors = (err: string) => {
  console.log(err);
  if (err.includes("InvalidAddressError")) {
    return "Invalid target address";
  } else if (
    err.includes("IntegerOutOfRangeError") ||
    err.includes("is not in safe integer range") ||
    err.includes("AmountLessThanZero")
  ) {
    return "Wrong amount in ETH";
  } else if (err.includes("User rejected the request")) {
    return "User rejected the request";
  } else if (err.includes("FundDoesNotExist")) {
    return "Campaign not found";
  } else {
    return "Error during transaction";
  }
};

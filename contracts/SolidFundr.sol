// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SolidFundr {
    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}

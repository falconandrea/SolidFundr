// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SolidFundr {
    // Fund structure
    struct Fund {
        uint256 id;
        address creator;
        uint creationDate;
        uint256 amount;
        uint256 targetAmount;
        address targetAddress;
        string title;
        string description;
        bool completed;
    }
    // Donation structure
    struct Donation {
        uint256 amount;
        address author;
    }
    // List of funds
    Fund[] public listFunds;
    // Counter to keep track of funds
    uint public fundCounter;
    // List of donations for each fund
    mapping(uint256 => Donation[]) public contributionFunds;
    // List of contributions for each author
    mapping(address => uint256) public contributionAuthors;

    // Events
    event FundCreated(uint256 id);
    event DonationCreated(uint256 amount, address author);
    event FundCompleted(uint256 id);

    // Custom errors
    error FundDoesNotExist();
    error AmountLessThanZero();
    error AddressNotValid();
    error FundAlreadyCompleted();
    error SendAmountFailed();

    // Function to create a new Fund
    function createFund(
        uint256 targetAmount,
        address targetAddress,
        string calldata title,
        string calldata description
    ) public {
        if (targetAmount <= 0) revert AmountLessThanZero();
        if (targetAddress == address(0)) revert AddressNotValid();

        // Create new fund
        Fund memory newFund = Fund(
            fundCounter,
            msg.sender,
            block.timestamp,
            0,
            targetAmount,
            targetAddress,
            title,
            description,
            false
        );
        listFunds.push(newFund);

        emit FundCreated(fundCounter);
        fundCounter++;
    }

    // Function to create a donation to a fund
    function donate(uint256 fundId) public payable {
        uint256 amount = msg.value;

        // Checks
        if (amount <= 0) revert AmountLessThanZero();
        if (fundId >= fundCounter) revert FundDoesNotExist();
        if (listFunds[fundId].completed == true) revert FundAlreadyCompleted();

        // Update amount of contribution for author
        contributionAuthors[msg.sender] =
            contributionAuthors[msg.sender] +
            amount;

        // Update amount of fund
        listFunds[fundId].amount = listFunds[fundId].amount + amount;

        // Check if Fund is completed
        if (listFunds[fundId].amount >= listFunds[fundId].targetAmount) {
            sendFund(fundId);
        }

        // Create new donation
        Donation memory donation = Donation(amount, msg.sender);
        contributionFunds[fundId].push(donation);

        emit DonationCreated(amount, msg.sender);
    }

    // Internal function to send amount of fund if it is completed
    function sendFund(uint256 fundId) internal {
        if (fundId >= fundCounter) revert FundDoesNotExist();
        if (listFunds[fundId].completed == true) revert FundAlreadyCompleted();

        // Send amount of fund to the target address
        (bool result, ) = payable(listFunds[fundId].targetAddress).call{
            value: listFunds[fundId].amount
        }("");
        if (result == false) revert SendAmountFailed();

        // Set completed the fund
        listFunds[fundId].completed = true;

        emit FundCompleted(fundId);
    }

    // Function to return list of funds
    function getFunds() public view returns (Fund[] memory) {
        return listFunds;
    }

    // Function to return list of donations of a fund
    function getDonations(
        uint256 fundId
    ) public view returns (Donation[] memory) {
        if (fundId >= fundCounter) revert FundDoesNotExist();
        return contributionFunds[fundId];
    }

    // Function to return total amount of contributions of an author
    function getContributions(address author) public view returns (uint256) {
        return contributionAuthors[author];
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}

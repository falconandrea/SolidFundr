const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const hre = require("hardhat");
require("dotenv").config();

describe("SolidFundr", function () {
  async function deployFixture() {
    const [owner, otherAccount, otherAccount2] = await hre.ethers.getSigners();

    const Contract = await hre.ethers.getContractFactory("SolidFundr");
    const contract = await Contract.deploy();
    await contract.waitForDeployment();

    return { contract, owner, otherAccount, otherAccount2 };
  }

  async function createNewFund(contract, creator, targetAddress, amount = "1") {
    const tx = await contract
      .connect(creator)
      .createFund(
        hre.ethers.parseEther(amount),
        targetAddress,
        "Example fund",
        "Description of fund"
      );

    // Get fund
    const funds = await contract.getFunds();
    return funds[funds.length - 1];
  }

  describe("Tests", function () {
    it("Should deploy", async function () {
      const { contract } = await loadFixture(deployFixture);
      expect(contract.target).to.be.a("string");
    });
  });

  describe("Create fund", function () {
    it("Should create fund", async function () {
      const { contract, otherAccount, otherAccount2 } = await loadFixture(
        deployFixture
      );

      const tx = await contract
        .connect(otherAccount)
        .createFund(
          hre.ethers.parseEther("1"),
          otherAccount2.address,
          "First test",
          "First fund created"
        );

      // Check tx is not reverted
      expect(tx).to.not.be.not.reverted;

      // Get fund
      const funds = await contract.getFunds();
      const fund = funds[0];

      // Check fields
      expect(Number(fund.id)).to.be.eq(0);
      expect(fund.creator).to.be.eq(otherAccount.address);
      expect(Number(fund.amount)).to.be.eq(0);
      expect(fund.targetAmount).to.be.eq(hre.ethers.parseEther("1"));
      expect(fund.targetAddress).to.be.eq(otherAccount2.address);

      // Check emit event
      expect(tx).to.emit(contract, "FundCreated").withArgs(0);
    });
  });

  describe("Donations", function () {
    it("Should be able to donate to open fund", async function () {
      const { contract, otherAccount, otherAccount2 } = await loadFixture(
        deployFixture
      );

      // Create a fund
      const fund = await createNewFund(
        contract,
        otherAccount,
        otherAccount2.address
      );

      const amount = hre.ethers.parseEther("0.1");

      // Do the donation
      const tx = await contract.connect(otherAccount2).donate(fund.id, {
        value: amount,
      });

      // Get fund
      const funds = await contract.getFunds();
      const updatedFund = funds[fund.id];

      // Get donations
      const donations = await contract.getDonations(0);
      const donation = donations[0];

      // Get amount of donation of the user
      const amountDonations = await contract.getContributions(
        otherAccount2.address
      );
      expect(amountDonations).to.be.eq(amount);

      // Check tx is not reverted
      expect(tx).to.be.not.reverted;

      // Check emit event
      expect(tx)
        .to.emit(contract, "DonationCreated")
        .withArgs(hre.ethers.parseEther("0.1"), otherAccount2.address);

      // Check fund amount updated
      expect(updatedFund.amount).to.be.eq(hre.ethers.parseEther("0.1"));

      // Check donation is saved
      expect(donation[0]).to.be.eq(amount);
      expect(donation[1]).to.be.eq(otherAccount2.address);
    });
  });
});

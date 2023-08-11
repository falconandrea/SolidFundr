require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const config = {
  solidity: "0.8.18",
  networks: {},
};

// Check network to use
if (process.env.GOERLI_URL_PROVIDER && process.env.GOERLI_URL_PROVIDER != "")
  config.networks.goerli = {
    url: process.env.GOERLI_URL_PROVIDER,
    accounts: [process.env.PRIVATE_KEY],
  };
if (process.env.SEPOLIA_URL_PROVIDER && process.env.SEPOLIA_URL_PROVIDER != "")
  config.networks.sepolia = {
    url: process.env.SEPOLIA_URL_PROVIDER,
    accounts: [process.env.PRIVATE_KEY],
  };
if (process.env.MAINNET_URL_PROVIDER && process.env.MAINNET_URL_PROVIDER != "")
  config.networks.mainnet = {
    url: process.env.MAINNET_URL_PROVIDER,
  };

// Etherscan apikey
if (process.env.ETHERSCAN_API_KEY && process.env.ETHERSCAN_API_KEY) {
  config.etherscan = {};
  config.etherscan.apiKey = process.env.ETHERSCAN_API_KEY;
}

module.exports = config;

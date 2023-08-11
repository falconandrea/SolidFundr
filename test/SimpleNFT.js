const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { expect } = require('chai')
const hre = require('hardhat')
require('dotenv').config()

describe('NFT', function () {
  async function deployFixture () {
    const [owner, otherAccount] = await hre.ethers.getSigners()

    const SimpleNFT = await hre.ethers.getContractFactory('SimpleNFT')
    const simpleNFT = await SimpleNFT.deploy('https://example.url')

    await simpleNFT.waitForDeployment()

    return { simpleNFT, owner, otherAccount }
  }

  describe('Tests', function () {
    it('Should deploy', async function () {
      const { simpleNFT } = await loadFixture(deployFixture)

      expect(simpleNFT.target).to.be.a('string')
    })

    it('Check mint with wrong value', async function () {
      const { simpleNFT, owner } = await loadFixture(deployFixture)

      // Mint first NFT
      await expect(simpleNFT.connect(owner).mint({
        value: hre.ethers.parseEther('0.009')
      })).to.be.revertedWith('Ether sent is not correct')
    })

    it('Check updates on total supply', async function () {
      const { simpleNFT, owner } = await loadFixture(deployFixture)

      // Cannot set total supply = 0
      await expect(simpleNFT.connect(owner).updateTotalSupply(0)).to.be.revertedWith('New value must be greater than 0')

      // Mint first NFT
      await expect(simpleNFT.connect(owner).mint({
        value: hre.ethers.parseEther('0.01')
      })).to.be.not.reverted

      // Cannot set total supply < total of NFTs minted
      await expect(simpleNFT.connect(owner).updateTotalSupply(1)).to.be.revertedWith('New value must be greater than the number of NFTs already minted')
    })

    it('Check mint over total supply', async function () {
      const { simpleNFT, owner, otherAccount } = await loadFixture(deployFixture)

      // Change total supply to 1
      await expect(simpleNFT.connect(owner).updateTotalSupply(1)).to.be.not.reverted

      // Mint first NFT
      await expect(simpleNFT.connect(owner).mint({
        value: hre.ethers.parseEther('0.01')
      })).to.be.not.reverted

      // Block second mint
      await expect(simpleNFT.connect(otherAccount).mint({
        value: hre.ethers.parseEther('0.01')
      })).to.be.revertedWith('Exceed maximum supply')
    })

    it('Check public mint', async function () {
      const { simpleNFT, owner } = await loadFixture(deployFixture)

      // Mint first NFT
      await expect(simpleNFT.connect(owner).mint({
        value: hre.ethers.parseEther('0.01')
      })).to.be.not.reverted
    })
  })
})

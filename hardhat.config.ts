import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-vyper";
import "@nomicfoundation/hardhat-verify";
import "@typechain/hardhat";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-vyper";
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-verify";
import "@matterlabs/hardhat-zksync-verify-vyper";

dotenv.config();

const config: HardhatUserConfig = {
  paths: {
    sources: "./contracts/vyper",
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
    },
  },
  vyper: {
    version: "0.3.9",
  },
  zksolc: {
    version: "1.3.14",
    compilerSource: "binary",
    settings: {
      isSystem: false,
      forceEvmla: false,
      optimizer: {
        enabled: true,
        mode: "3",
      },
    },
  },
  zkvyper: {
    version: "1.3.11",
    settings: {
      libraries: {},
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
      hardfork: "shanghai",
      zksync: true,
    },
    zkSyncLocal: {
      chainId: 270,
      url: process.env.ZKSYNC_LOCAL_TESTNET_URL || "",
      ethNetwork: process.env.ETH_LOCAL_TESTNET_URL || "",
      zksync: true,
    },
    goerli: {
      chainId: 5,
      url: process.env.ETH_GOERLI_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    sepolia: {
      chainId: 11155111,
      url: process.env.ETH_SEPOLIA_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    zkSyncTestnet: {
      chainId: 280,
      url: process.env.ZKSYNC_TESTNET_URL || "",
      ethNetwork: process.env.ETH_GOERLI_TESTNET_URL || "",
      zksync: true,
      verifyURL:
        "https://zksync2-testnet-explorer.zksync.dev/contract_verification",
    },
    zkSyncMain: {
      chainId: 324,
      url: process.env.ZKSYNC_MAINNET_URL || "",
      ethNetwork: process.env.ETH_MAINNET_URL || "",
      zksync: true,
      verifyURL:
        "https://zksync2-mainnet-explorer.zksync.io/contract_verification",
    },
  },
  etherscan: {
    apiKey: {
      // For Ethereum testnets
      goerli: process.env.ETHERSCAN_API_KEY || "",
      sepolia: process.env.ETHERSCAN_API_KEY || "",
    },
  },
};

export default config;

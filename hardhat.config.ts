import { HardhatUserConfig, vars } from "hardhat/config";

import "@nomicfoundation/hardhat-ethers";
import "@nomiclabs/hardhat-vyper";
import "@nomicfoundation/hardhat-verify";
import "@typechain/hardhat";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-vyper";
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-verify";
import "@matterlabs/hardhat-zksync-verify-vyper";
import "@matterlabs/hardhat-zksync-ethers";

const accounts = [
  vars.get(
    "PRIVATE_KEY",
    // `keccak256("DEFAULT_VALUE")`
    "0x0d1706281056b7de64efd2088195fa8224c39103f578c9b84f951721df3fa71c",
  ),
];

const config: HardhatUserConfig = {
  paths: {
    sources: "./contracts/vyper",
  },
  solidity: {
    // Only use Solidity default versions `>=0.8.20` for EVM networks that support the opcode `PUSH0`
    // Otherwise, use the versions `<=0.8.19`
    version: "0.8.23",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
      evmVersion: "paris", // prevent using the `PUSH0` opcode
    },
  },
  vyper: {
    version: "0.3.10",
  },
  zksolc: {
    version: "1.3.18",
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
    version: "1.3.13",
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
      url: vars.get("ZKSYNC_LOCAL_TESTNET_URL", "http://localhost:3050"),
      ethNetwork: "localhost",
      zksync: true,
    },
    goerli: {
      chainId: 5,
      url: vars.get(
        "ETH_GOERLI_TESTNET_URL",
        "https://rpc.ankr.com/eth_goerli",
      ),
      accounts,
    },
    sepolia: {
      chainId: 11155111,
      url: vars.get("ETH_SEPOLIA_TESTNET_URL", "https://rpc.sepolia.org"),
      accounts,
    },
    zkSyncTestnet: {
      chainId: 300,
      url: vars.get("ZKSYNC_TESTNET_URL", "https://sepolia.era.zksync.dev"),
      ethNetwork: "sepolia",
      zksync: true,
      verifyURL:
        "https://explorer.sepolia.era.zksync.dev/contract_verification",
      accounts,
    },
    zkSyncMain: {
      chainId: 324,
      url: vars.get("ZKSYNC_MAINNET_URL", "https://mainnet.era.zksync.io"),
      ethNetwork: "mainnet",
      zksync: true,
      verifyURL:
        "https://zksync2-mainnet-explorer.zksync.io/contract_verification",
      accounts,
    },
  },
  sourcify: {
    // Disable Sourcify verification by default
    enabled: false,
  },
  etherscan: {
    apiKey: {
      // For Ethereum testnets
      goerli: vars.get("ETHERSCAN_API_KEY", ""),
      sepolia: vars.get("ETHERSCAN_API_KEY", ""),
    },
  },
};

export default config;

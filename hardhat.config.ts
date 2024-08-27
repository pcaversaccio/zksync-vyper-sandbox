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
    // Only use Solidity default versions `>=0.8.25` for EVM networks that support the new `cancun` opcodes:
    // https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md
    // Only use Solidity default versions `>=0.8.20` for EVM networks that support the opcode `PUSH0`
    // Otherwise, use the versions `<=0.8.19`
    version: "0.8.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999_999,
      },
      evmVersion: "paris", // prevent using the `PUSH0` and `cancun` opcodes
    },
  },
  vyper: {
    version: "0.4.0",
    settings: {
      evmVersion: "paris",
      optimize: "gas",
    },
  },
  zksolc: {
    version: "1.5.3",
    compilerSource: "binary",
    settings: {
      enableEraVMExtensions: false,
      forceEVMLA: false,
      optimizer: {
        enabled: true,
        mode: "3",
        fallback_to_optimizing_for_size: false,
      },
    },
  },
  zkvyper: {
    version: "1.5.4",
    settings: {
      libraries: {},
      optimizer: {
        mode: "3",
        fallback_to_optimizing_for_size: false,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
      hardfork: "cancun",
      zksync: true,
    },
    zkSyncLocal: {
      chainId: 270,
      url: vars.get("ZKSYNC_LOCAL_TESTNET_URL", "http://localhost:3050"),
      ethNetwork: "localhost",
      zksync: true,
    },
    sepolia: {
      chainId: 11155111,
      url: vars.get("ETH_SEPOLIA_TESTNET_URL", "https://rpc.sepolia.org"),
      accounts,
    },
    holesky: {
      chainId: 17000,
      url: vars.get(
        "ETH_HOLESKY_TESTNET_URL",
        "https://holesky.rpc.thirdweb.com",
      ),
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
    apiUrl: "https://sourcify.dev/server",
    browserUrl: "https://repo.sourcify.dev",
  },
  etherscan: {
    apiKey: {
      // For Ethereum testnets & mainnet
      mainnet: vars.get("ETHERSCAN_API_KEY", ""),
      sepolia: vars.get("ETHERSCAN_API_KEY", ""),
      holesky: vars.get("ETHERSCAN_API_KEY", ""),
    },
  },
};

export default config;

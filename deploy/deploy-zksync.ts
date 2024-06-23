// Note that the deployment scripts must be placed in the `deploy` folder for `hardhat deploy-zksync`
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Wallet } from "zksync-ethers";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// Colour codes for terminal prints
const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function main(hre: HardhatRuntimeEnvironment) {
  // Get the ZKsync-specific private key (if any preconfigured)
  const accounts = hre.network.config.accounts;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ZKSYNC_PRIVATE_KEY: any;
  // Set the flag for local testing
  const localFlag = true;
  if (localFlag) {
    // rich wallets: https://github.com/matter-labs/local-setup/blob/main/rich-wallets.json
    ZKSYNC_PRIVATE_KEY =
      "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110";
  } else {
    // Only called for live test and production networks (i.e. if `localFlag = false`)
    if (!Array.isArray(accounts)) {
      throw new Error(
        `No private key configured for network ${hre.network.name}`,
      );
    }
    ZKSYNC_PRIVATE_KEY = accounts[0];
    if (typeof ZKSYNC_PRIVATE_KEY !== "string") {
      throw new Error(
        `No private key configured for network ${hre.network.name}`,
      );
    }
  }

  const wallet = new Wallet(ZKSYNC_PRIVATE_KEY);
  const deployer = new Deployer(hre, wallet);

  const artifact = await deployer.loadArtifact("Foo");
  const contract = await deployer.deploy(artifact);

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log("Foo deployed to: " + `${GREEN}${contractAddress}${RESET}\n`);

  if (!localFlag) {
    console.log(
      "Waiting 30 seconds before beginning the contract verification to allow the block explorer to index the contract...\n",
    );
    await delay(30000); // Wait for 30 seconds before verifying the contract

    await hre.run("verify:verify:vyper", {
      address: contractAddress,
    });
  }
}

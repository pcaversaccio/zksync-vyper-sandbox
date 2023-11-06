// Note that the deployment scripts must be placed in the `deploy` folder for `hardhat deploy-zksync`
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Wallet } from "zksync2-js";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

export default async function main(hre: HardhatRuntimeEnvironment) {
  // Get the zkSync-specific private key (if any preconfigured)
  const accounts = hre.network.config.accounts;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ZKSYNC_PRIVATE_KEY: any;
  // Set the flag for local testing
  const localFlag = true;
  if (localFlag) {
    // rich wallets: https://github.com/matter-labs/local-setup/blob/main/rich-wallets.json
    ZKSYNC_PRIVATE_KEY =
      "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110";
  } else if (!Array.isArray(accounts)) {
    // Only called for live test and production networks (i.e. if `localFlag = false`)
    if (!Array.isArray(accounts)) {
      throw new Error(
        `No private key configured for network ${hre.network.name}`,
      );
    }
    const ZKSYNC_PRIVATE_KEY = accounts[0];
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

  console.log("Foo deployed to:", await contract.getAddress());
}

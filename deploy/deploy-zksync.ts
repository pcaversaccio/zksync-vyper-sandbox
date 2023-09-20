// Note that the deployment scripts must be placed in the `deploy` folder for `hardhat deploy-zksync`
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Wallet } from "zksync-web3";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// rich wallets: https://github.com/matter-labs/local-setup/blob/main/rich-wallets.json
const PRIVATE_KEY =
  "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110";
// const PRIVATE_KEY: string = process.env.PRIVATE_KEY || "";

export default async function main(hre: HardhatRuntimeEnvironment) {
  const wallet = new Wallet(PRIVATE_KEY);
  const deployer = new Deployer(hre, wallet);

  const artifact = await deployer.loadArtifact("Foo");
  const contract = await deployer.deploy(artifact);

  await contract.deployed();

  console.log("Foo deployed to:", contract.address);
}

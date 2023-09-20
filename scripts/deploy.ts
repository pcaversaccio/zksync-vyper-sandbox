import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.deployContract("Greeter", ["Hello, Hardhat!"]);

  await contract.deployed();

  console.log("Greeter deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

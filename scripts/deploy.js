
const hre = require("hardhat");

async function main() {
  
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const InvoiceData = await hre.ethers.getContractFactory("InvoiceData");
  const invoicedata = await InvoiceData.deploy();

  await invoicedata.deployed();

  console.log("InvoiceData deployed to:", invoicedata.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

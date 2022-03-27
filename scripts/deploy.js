async function trial(){
	const [deployer] = await ethers.getSigners();
	console.log(
	"Deploying the contracts with the account:",
	await deployer.getAddress()
	);

	console.log("Account balance:", (await deployer.getBalance()).toString());

	const ERC721Mock =  await ethers.getContractFactory("ERC721Mock");
    erc721 = await ERC721Mock.deploy("NFT", "NFT");
	await erc721.deployed();

	console.log("NFT address:", erc721.address);
}

trial()
//main().then(() => process.exit(0)).catch((error) => {console.error(error);process.exit(1);});

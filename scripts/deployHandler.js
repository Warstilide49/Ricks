async function main(){
	const [deployer] = await ethers.getSigners();
	console.log(
	"Deploying the contracts with the account:",
	await deployer.getAddress()
	);

	console.log("Account balance:", (await deployer.getBalance()).toString());

	const Handler =  await ethers.getContractFactory("Handler");
    let handler = await Handler.deploy();
	await handler.deployed();

	console.log("Contract address:", handler.address);
}

main()
const ricksData = require('./artifacts/RICKS.json');

import { ethers } from "ethers";
import {clearContentBody} from "./index.js"

export function createDOM(){
	let content=document.getElementById("content");
	let footer=document.getElementById("footer");

	clearContentBody()

	let container=document.createElement("div")
    container.append(mintDOM())

	content.insertBefore(container, footer)
}

function mintDOM(){
	let mint=document.createElement("div");
	mint.id='mintDOM'

	mint.innerHTML=`<h1>Initialise a Vault!</h1>
					<form id="mint-form">
						<input id="mint-title" type="text" placeholder="Title for Token">
                      	<input id="mint-symbol" type="text" placeholder="Symbol for Token">
                      	<input id="mint-contract" type="text" placeholder="Token Contract Address">
                      	<input id="mint-id" type="number" min=0 placeholder="Id of Token">
                      	<input id="mint-supply" type="number" min=1 placeholder="Total Supply for Token">
                      	<input id="mint-inflation-rate" type="number" min=1 placeholder="Daily Inflation Rate (3 decimals)">
					</form>
					<button id="mint-submit">Submit!</button>`

	let button=mint.querySelector('button')
	button.addEventListener('click',mintListener)

	return mint
}

async function mintListener(){
	let title=document.getElementById('mint-title').value;
	let symbol=document.getElementById('mint-symbol').value;
	let contractAddress=document.getElementById('mint-contract').value;
	let id=parseInt( document.getElementById('mint-id').value);
	let supply= parseInt( document.getElementById('mint-supply').value);
	let inflation_rate= parseInt( document.getElementById('mint-inflation-rate').value);

	let error=checkInputs()
	if(error)
		return;
	
	//Deploy new Ricks contract
	const factory = new ethers.ContractFactory(ricksData["abi"], ricksData["bytecode"], window.signer);
	const contract = await factory.deploy(title, symbol, contractAddress, id, supply, inflation_rate);

	await contract.deployed();

	//Add it to our handler
	console.log("Now adding in vault...")
	let tx=await window.handlerContract.addVault(contract.address, window.signer.getAddress());
	await tx.wait()
	console.log(parseInt(await window.handlerContract.getTotalVaults()));
	alert("Mint has been successful!");
}

function checkInputs(){
	let error=false;
	
	let contractAddress=document.getElementById('mint-contract').value;
	if(!ethers.utils.isAddress(contractAddress)){
		alert('Not valid address');
		error=true;
	}

	return error
}
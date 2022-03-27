const ricksData = require('./artifacts/RICKS.json');
import * as actions from "./actions.js"

import { ethers } from "ethers";
import {clearContentBody} from "./index.js"

export async function createDOM(){
	let content=document.getElementById("content");
	let footer=document.getElementById("footer");

	clearContentBody()

	let container=document.createElement("div")
	container.id="tokens_tab"
	container.innerHTML=`<h1>My Ricks</h1>`

	let items_container=document.createElement('div');
	items_container.id="items"
    tokensDOM(items_container)

    container.append(items_container)
	content.insertBefore(container, footer)
}

async function tokensDOM(container){
	//Shows a maximum of 10 tokens for now. Note this
	let result= await window.handlerContract.showVaultIndividual(window.signer.getAddress(), 0,10);

	let vaultArray=result[0];
	
	for (let i=0; i<vaultArray.length; i++)
		container.append(await tokenFromContract(vaultArray[i]));

}

export async function tokenFromContract(contractAddress){

	let contract= new ethers.Contract(contractAddress, ricksData["abi"], window.signer);
	let name= await contract.name();
	let symbol= await contract.symbol();
	let initialSupply= parseInt(await contract.initialSupply());
	let auctionState= parseInt(await contract.auctionState());
	let dailyInflationRate= parseInt(await contract.dailyInflationRate());
	let auctionEndTIme=parseInt(await contract.auctionEndTime());

	let token=document.createElement('div');
	token.id='token'

	token.innerHTML=`<div class='token_title'>${name}</div>
					<div id="token_info">
						<div>Symbol:         	 ${symbol}</div>
						<div>Initial Supply: 	 ${initialSupply}</div>
						<div>Daily Inflation Rate: ${dailyInflationRate}</div>
					</div>
					<div id='buttons'> 
						<button id='activate' style='display:none'>Activate</button>
						<button id='start_auction' style='display:none'>Start Auction</button>
						<button id='end_auction' style='display:none'>End Auction</button>
						<button id='bid' style='display:none'>Bid</button>
						<button id='buyout' style='display:none'>Buyout</button>
						<button id='redeem' style='display:none'>Redeem</button>
					</div>`
	
	token.querySelector('#buttons').contract=contract;	//Contract is kept in the main div so that everyone can access

	const activate_button=token.querySelector('#activate');
	activate_button.addEventListener('click', actions.activate)

	const start_auction_button=token.querySelector('#start_auction');
	start_auction_button.addEventListener('click', actions.start_auction);

	const end_auction_button=token.querySelector('#end_auction');
	end_auction_button.addEventListener('click', actions.end_auction);

	const bid_button=token.querySelector('#bid');
	bid_button.addEventListener('click', actions.bid)

	const buyout_button=token.querySelector('#buyout');
	buyout_button.addEventListener('click', actions.buyout)	

	const redeem_button=token.querySelector('#redeem');
	redeem_button.addEventListener('click', actions.redeem)

	viewButtons(activate_button, start_auction_button, end_auction_button, bid_button, buyout_button, redeem_button, auctionState);
	return token;
}

function viewButtons(activate_button, start_auction_button, end_auction_button, bid_button, buyout_button, redeem_button, auctionState){
	if (auctionState==0){
		activate_button.style.display='block';
	}
	else if (auctionState==1){
		activate_button.style.display='none';
		start_auction_button.style.display='block';
		end_auction_button.style.display='none';
		buyout_button.style.display='block';
	}
	else if (auctionState==2){
		bid_button.style.display='block';
		start_auction_button.style.display='none';
		end_auction_button.style.display='block'
		buyout_button.style.display='none';
	}
	else if (auctionState==3){
		activate_button.style.display='none';
		bid_button.style.display='none';
		start_auction_button.style.display='none';
		end_auction_button.style.display='none';
		buyout_button.style.display='none';
		redeem_button.style.display='block';
	}
	else{
		console.log(auctionState);
	}
}

const handlerData = require('./artifacts/Handler.json');
const handlerAddress= "0x40f857296C309b3b7Bd6cEB5a207F130Be86E9b8"
//Token address: 0xa39f492F4A6c72c69853e79286b04f720b1Edaf4

import { ethers } from "ethers";
import * as mint from "./mint.js"
import * as token from "./tokensTab.js"
import {fillPublicContainer} from "./public.js"

async function init(){

	if (window.ethereum){
		window.provider = new ethers.providers.Web3Provider(
			window.ethereum,
			"rinkeby"
		);
		await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x4' }], // chainId must be in hexadecimal numbers
        });	
		await provider.send("eth_requestAccounts", []);
		window.signer = provider.getSigner();
		window.handlerContract= new ethers.Contract(handlerAddress, handlerData["abi"], window.signer);
		initialSite()
	}
	else{
		alert("No eth wallet found. Please install the extension in your browser to access the website.")
	}

	
}

function createHeader(){
	const header=document.createElement("div");
	header.id='header';
	
	header.innerHTML=`	<div id='name'>Ricks!</div>
						<div id="tabs">
							<div class="cursor" id="home_redirect">Home</div>
							<div class="cursor" id="mint_redirect">Create</div>
							<div class="cursor" id="token_redirect">My Tokens</div>
						</div>`


	let homeButton=header.querySelector('#home_redirect');
	homeButton.addEventListener('click', home);
	
	let mintButton=header.querySelector('#mint_redirect');
	mintButton.addEventListener('click', mint.createDOM);

	let tokensTitle=header.querySelector('#token_redirect')
	tokensTitle.addEventListener('click', token.createDOM);


	return header;
}

function createBody(){
	const container=document.createElement("div");
	container.id="body_container";

	container.innerHTML+=`<div id="body_title">Latest Vaults!</div>
						<div id="vault_container"></div>`

	fillPublicContainer(container.querySelector('#vault_container'));
	return container;
}

function footer(){
	const footer=document.createElement("footer");
	footer.id='footer';
	footer.innerHTML=`<div id="footer_content">Made by team ojha for Ethernals!</div>`;
	return footer;
}

function home(){
	clearContentBody()
	let content=document.getElementById("content");
	let footer=document.getElementById("footer");

	content.insertBefore(createBody(), footer);
}

export function clearContentBody(){
  let content=document.getElementById("content");

  let essential=["header", "footer"]
  let toBeDeleted=[];

  for(let i=0; i<content.childNodes.length; i++){
    if (!essential.includes(content.childNodes[i].id))
      toBeDeleted.push(content.childNodes[i])
  }

  for(let i=0; i<toBeDeleted.length; i++)
    content.removeChild(toBeDeleted[i])
}

function initialSite(){
	const content=document.getElementById("content")
	content.appendChild(createHeader());
	content.appendChild(createBody());
	content.appendChild(footer());
}

init()
import { ethers } from "ethers";
import {tokenFromContract} from "./tokensTab.js"
const ricksData = require('./artifacts/RICKS.json');

export async function fillPublicContainer(container){
	container.id='items';

	let result= await window.handlerContract.showVaultsPublic(0,10);
	let vaultArray=result[0];
	
	for (let i=0; i<vaultArray.length; i++)
		container.append(await tokenFromContract(vaultArray[i][0]));

}
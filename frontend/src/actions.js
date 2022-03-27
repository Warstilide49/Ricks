import { ethers } from "ethers";

export async function activate(e){
	const contract= e.target.parentNode.contract;
	alert(`Make sure this contract is approved to transfer your nft. This vault's address is ${contract.address}`)
	let tx= await contract.activate()
	await tx.wait()
	window.location.reload()
}

export async function start_auction(e){
	const contract= e.target.parentNode.contract;
	
	let timeLimit=parseInt(await contract.auctionEndTime()) + parseInt(await contract.auctionInterval());
	let currentDate=new Date();
	if(currentDate.getTime() /1000<= timeLimit){
		alert(`Cant start the auction now, try again at ${new Date(timeLimit*1000)}`)
		return;
	}

	let amount=checkAmount()
	let tx=contract.startAuction({value: amount})
	await tx.wait()
	window.location.reload()
}

export async function end_auction(e){
	const contract= e.target.parentNode.contract;

	let currentDate=new Date();
	let timeLimit=parseInt(await contract.auctionEndTime());
	if (currentDate.getTime()/1000<= timeLimit ){
		alert(`Cant end auction now, try again at ${new Date(timeLimit*1000)}`)
		return;
	}
	let tx=contract.endAuction()
	await tx.wait()
	window.location.reload()

}

export async function bid(e){
	const contract= e.target.parentNode.contract;

	let currentDate=new Date();
	let timeLimit=parseInt(await contract.auctionEndTime());
	if (currentDate.getTime()/1000> timeLimit ){
		alert(`Auction timed out at ${new Date(timeLimit*1000)}`)
		return;
	}


	let amount=checkAmount()
	
	let price=parseInt(await contract.currentPrice());
	if(amount< 1.05*price){
		alert(`Please try to bid 5% more than current price: ${price}`);
		return;
	}

	let tx=contract.bid({value:amount});
	await tx.wait()
	window.location.reload()
}

export async function buyout(e){
	const contract= e.target.parentNode.contract;

	if(parseInt(await contract.numberOfAuctions())<5){
		alert('Need a minimum of 5 auctions');
		return;
	}

	let amount=checkAmount()
	let tx=contract.buyout({value:amount});
	await tx.wait();
	window.location.reload()

}

export async function redeem(e){
	const contract= e.target.parentNode.contract;

	let balance=parseInt(await contract.balanceOf())
	if(balance==0){
		alert('No tokens');
		return;
	}

	let tx=contract.redeemTokensForWeth({value:amount});
	await tx.wait();
	window.location.reload()
}

function checkAmount(){
	let amount=prompt("Enter amount in ether.")
	
	if(amount<0){
		alert('Please enter a positive bid')
		return;
	}
	amount=ethers.utils.parseEther(amount);
	return amount;
}
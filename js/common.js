var auctionAddr = "0x6D38299e02Bd2884e43D59030a7Eab9fb1907EE7";
var tokenAddr = "0x4195E850A8504ef0Cc184Ac1FC22B5Ee5AF0321B";
var actionInstance;

var account = web3.eth.accounts[0];
var accountInterval = setInterval(function() {
  if (web3.eth.accounts[0] !== account) {
    account = web3.eth.accounts[0];
  }
}, 100);

function initContractDanDan(danAbi){
	var MyContract = web3.eth.contract(danAbi);
	actionInstance = MyContract.at(tokenAddr);
	return actionInstance;
}

function initContractAuction(salesAbi){
	console.log("initContractAuction:"+auctionAddr);
	var MyContract = web3.eth.contract(salesAbi);
	actionInstance = MyContract.at(auctionAddr);
	return actionInstance;
}

window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    console.log("into net web3");
    window.web3 = new Web3(web3.currentProvider);
	  web3.version.getNetwork(function(err, netId){
	      switch (netId) {
	      case "1":
	          console.log('This is mainnet')
	          break
	      case "2":
	          console.log('This is the deprecated Morden test network.')
	          break
	      case "3":
	          console.log('This is the ropsten test network.')
	          break
	      case "4":
	          console.log('This is the Rinkeby test network.')
	          break
	      case "42":
	          console.log('This is the Kovan test network.')
	          break
	      default:
	          console.log('This is an unknown network.')
	      }
     });
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    console.log("intall matemask");
    location.href = "./../sign.html";
  }
});
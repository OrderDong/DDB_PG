var auctionAddr = "0x3Dd8EE7E706Ce70c976B79193F04261Cb1D70767";
var tokenAddr = "0x4195E850A8504ef0Cc184Ac1FC22B5Ee5AF0321B";
var eggCardAddr = "0xe007E924e6E3641AB9CE0b8a4bf0c9F2F59BB83E";
var cardAuctionAddr = "0x98A4D97c897C5FF0FD3d7aFD1547992D5aa88350";
var actionInstance;

var account = web3.eth.accounts[0];
var accountInterval = setInterval(function() {
  if (web3.eth.accounts[0] !== account) {
    account = web3.eth.accounts[0];
  }
}, 100);
//ERC20合约
function initContractDanDan(danAbi){
	var MyContract = web3.eth.contract(danAbi);
	actionInstance = MyContract.at(tokenAddr);
	return actionInstance;
}
//蛋蛋销售合约
function initContractAuction(salesAbi){
	console.log("initContractAuction:"+auctionAddr);
	var MyContract = web3.eth.contract(salesAbi);
	actionInstance = MyContract.at(auctionAddr);
	return actionInstance;
}
//卡牌721合约
function initContractEggCard(abi){
    console.log("initContractEggCard:"+eggCardAddr);
    var MyContract = web3.eth.contract(abi);
    actionInstance = MyContract.at(eggCardAddr);
    return actionInstance;
}
//卡牌拍卖合约
function initContractCardAuction(abi){
    console.log("initContractCardAuction:"+cardAuctionAddr);
    var MyContract = web3.eth.contract(abi);
    actionInstance = MyContract.at(cardAuctionAddr);
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
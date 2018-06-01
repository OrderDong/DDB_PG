var auctionAddr = "0x09b4685F46e44194fBf23f251ba9Ca653EbB5425";
var tokenAddr = "0x4195E850A8504ef0Cc184Ac1FC22B5Ee5AF0321B";
var eggCardAddr = "0xf02F2421678A129CD22E4799954eaB73CB338555";
var cardAuctionAddr = "0x88e5C51dBF8A289B05f33394D8879441352855A0";

var ceAccount = "0x339177a6a2b21a8b7CE76811C86D3a2C99301355";
var token20;

var account = web3.eth.accounts[0];
var accountInterval = setInterval(function() {
  if (web3.eth.accounts[0] !== account) {
    account = web3.eth.accounts[0];
  }
}, 100);
//ERC20合约
function initContractDanDan(danAbi){
	console.log("initContractDanDan:"+tokenAddr);
	var MyContract = web3.eth.contract(danAbi);
	token20 = MyContract.at(tokenAddr);
	return token20;
}
//蛋蛋销售合约
function initContractAuction(salesAbi){
	console.log("initddcAuctionContract:"+auctionAddr);
	var MyContract = web3.eth.contract(salesAbi);
	var ddcAuction = MyContract.at(auctionAddr);
	return ddcAuction;
}
//卡牌721合约
function initContractEggCard(abi){
    console.log("initContractEggCard:"+eggCardAddr);
    var MyContract = web3.eth.contract(abi);
    var actionInstance = MyContract.at(eggCardAddr);
    return actionInstance;
}
//卡牌拍卖合约
function initContractCardAuction(abi){
    console.log("initContractCardAuction:"+cardAuctionAddr);
    var MyContract = web3.eth.contract(abi);
    var actionInstance = MyContract.at(cardAuctionAddr);
    return actionInstance;
}
//20token授权
function approveToken(dandanInstance){
	token20.balanceOf(account, function (error, result) {
	  var resEther = web3.fromWei(result.toString(), 'ether');
	  token20.approve(auctionAddr,web3.toWei(40,"ether"),function (err,res){
				if(err != null){
					console.log(err);
					return false;
				}
				console.log(res.toString());
			});
	});
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
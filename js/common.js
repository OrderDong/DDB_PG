var auctionAddr = "0xB7182506B47A8713F95051e5D21b30f5015AB8dc";
var tokenAddr = "0x4195E850A8504ef0Cc184Ac1FC22B5Ee5AF0321B";
var eggCardAddr = "0xe007E924e6E3641AB9CE0b8a4bf0c9F2F59BB83E";
var cardAuctionAddr = "0x7A1b2716c3bbb411877CC782fA4Bfdf80538589c";
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
	  token20.approve(auctionAddr,web3.toWei(resEther,"ether"),function (err,res){
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
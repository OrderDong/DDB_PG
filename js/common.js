var auctionAddr = "0x30F3998A63d1c268456CFB22ce81B6e35D8cc6d8";
var tokenAddr = "0x4195E850A8504ef0Cc184Ac1FC22B5Ee5AF0321B";
var eggCardAddr = "0xf02F2421678A129CD22E4799954eaB73CB338555";
var cardAuctionAddr = "0x9Ba6FD4103CB221bc62B0F75a862ad3315d5a74C";

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
	  token20.approve(auctionAddr,web3.toWei(100,"ether"),function (err,res){
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

var cardMapping = new Array();
cardMapping[0] = "白羊座";
cardMapping[1] = "金牛座";
cardMapping[2] = "双子座";
cardMapping[3] = "巨蟹座";
cardMapping[4] = "狮子座";
cardMapping[5] = "处女座";
cardMapping[6] = "天秤座";
cardMapping[7] = "天蝎座";
cardMapping[8] = "射手座";
cardMapping[9] = "摩羯座";
cardMapping[10] = "水瓶座";
cardMapping[11] = "双鱼座";

cardMapping[12] = "";
cardMapping[13] = "";
cardMapping[14] = "";
cardMapping[15] = "";
cardMapping[16] = "";
cardMapping[17] = "";
cardMapping[18] = "";
cardMapping[19] = "";
cardMapping[20] = "";
cardMapping[21] = "";
cardMapping[22] = "";
cardMapping[23] = "";
cardMapping[24] = "";
cardMapping[25] = "";
cardMapping[26] = "";
cardMapping[27] = "";
cardMapping[28] = "";
cardMapping[29] = "";
cardMapping[30] = "";
cardMapping[31] = "";


/**************************************时间格式化处理************************************/
function dateFtt(fmt,date)
{ //author: meizz
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
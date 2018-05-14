
var accounts;
var account;
window.App = {
	start: function() {
		web3.eth.getAccounts(function(err, accs) {
				if(err != null) {
					alert("There was an error fetching your accounts.");
					return;
				}
				if(accs.length == 0) {
					var installId = document.getElementById("installId");
					var htmlContent = '<p style="font-size: 20px;">您的MetaMask被锁住了</p><br>'+
								'<p style="font-size: 12px;color: #545151;">只需打开MetaMask并按照说明进行解锁即可。</p>'+
								'<img src="./img/locked-out.svg">';
								
					installId.innerHTML = htmlContent;
					return;
				}
				account = accs[0];
				web3.eth.defaultAccount=account;
				accounts = accs;
				location.href = 'login.html'
			});
	},
	getAccount: function() {
		if(account != null) {
			return account;
		}else{
			web3.eth.getAccounts(function(err, accs) {
				if(err != null) {
					alert("There was an error fetching your accounts.");
					return;
				}
				if(accs.length == 0) {
					alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
					var installId = document.getElementById("installId");
					var htmlContent = '<p style="font-size: 20px;">您的MetaMask被锁住了</p><br>'+
								'<p style="font-size: 12px;color: #545151;">只需打开MetaMask并按照说明进行解锁即可。</p>'+
								'<img src="./img/locked-out.svg">';
								
					installId.innerHTML = htmlContent;
					return;
				}
				account = accs[0];
				web3.eth.defaultAccount=account;
				accounts = accs;
			});
		}
		return account;
	}
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
      })
  } else {
    console.log("intall matemask");
    var installId = document.getElementById("installId");
	var htmlContent = '<p style="font-size: 14px;color: #545151;">'+
				'您将需要一个安全的地方来储存您强悍的蛋蛋！'+
				'像MetaMask这样的安全钱包即是完美之地。同时您也'+
				'可以通过钱包进入游戏（无需另设密码）</p>'+
				'<a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"><img src="./img/insmask.png"></a>';
				
	installId.innerHTML = htmlContent;
  }
});

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
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    console.log("into net web3");
    window.web3 = new Web3(web3.currentProvider);
    //window.web3 = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws"));
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    console.log("intall matemask");
    //window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
    var installId = document.getElementById("installId");
	var htmlContent = '<p style="font-size: 14px;color: #545151;">'+
				'您将需要一个安全的地方来储存您强悍的蛋蛋！'+
				'像MetaMask这样的安全钱包即是完美之地。同时您也'+
				'可以通过钱包进入游戏（无需另设密码）</p>'+
				'<a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"><img src="./img/insmask.png"></a>';
				
	installId.innerHTML = htmlContent;
  }
});
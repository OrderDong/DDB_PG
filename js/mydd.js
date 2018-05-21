var eggCardInstance = initContractEggCard(EggCardABI);
var eggCardAuctionInstance = initContractEggCard(eggCardAuction);

eggCardInstance.tokensOfOwner(account, function (error, result) {
    // console.log(result);
    var myCardArr = new Array();
    var j = 0;
    for (var i = 0; i < result.length; i++) {
        var tokenId = result[i].toString();
        eggCardInstance.getCard(tokenId, function (error, res) {
            // console.log(res);

            var cardObj = new Object();
            cardObj.time = res[0].toString();
            cardObj.cardId = res[1].toString();
            cardObj.coolIndex = res[2].toString();
            cardObj.siringWithId = res[3].toString();
            cardObj.level = res[4].toString();
            cardObj.eType = res[5].toString();
            cardObj.attrId = res[6].toString();
            cardObj.count = 1;
            // console.log(cardObj);
            console.log(j);

            // var cardObjTemp = new Object();
            // for (var x = 0; x < myCardArr.length; x++) {
            //     cardObjTemp = myCardArr[x];
            //     if(cardObjTemp.eType == cardObj.eType) {
            //
            //         cardObjTemp.count = cardObjTemp.count+1;
            //     }
            // }

            myCardArr[j] = cardObj;
            j++;

        });
    }
    console.log(myCardArr);

});

// createCardAuction("3",0.06);

function createCardAuction(tokenId, price) {
    var price = web3.toWei(price, 'ether');
    var expiresAt = new Date().getTime() * 2;
    eggCardAuctionInstance.createCardAuction.sendTransaction(tokenId, price, expiresAt, function (error, result) {

    });
}









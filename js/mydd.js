var eggCardInstance = initContractEggCard(EggCardABI);
var eggCardAuctionInstance = initContractCardAuction(eggCardAuction);

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
            // console.log(j);

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

            $("#eggCardAuction").append('<div onclick="sellBB(' + cardObj.cardId + ')" class="mydd-dd-box">\n' +
                '                            <div class="mydd-baby-img"><img src="http://t.cn/RCzsdCq"></div>\n' +
                '                            <p class="">宝贝名称--' + cardObj.cardId + '</p>\n' +
                '                        </div>')


        });
    }
    // console.log(myCardArr);

});

// createCardAuction("3",0.06);

// 取消卡牌拍卖
// eggCardAuctionInstance.cancelCardAuction.sendTransaction("2", function (error, result) {
//
// });

function sellBB(cardId) {
    layer.open({
        title: '卖出宝贝',
        type: 1,
        skin: 'layui-layer-demo', //样式类名
        closeBtn: 1, //不显示关闭按钮
        anim: 2,
        area: ['315px', '240px'],
        shadeClose: true, //开启遮罩关闭
        content: '<div class="dandan-modal1">'
        + '<div class="layui-form-item"><img src="http://t.cn/RCzsdCq" class="dandan-img">'
        + '    <p style="padding: 3px;"><label class="layui-form-label1">售出价格</label>'
        + '      <input type="text" name="title" id="bb_price" placeholder="请输入价格" class="layui-input1"> DDC</p>'
        + '    <p style="padding: 3px;">高出均价：+2.3%</p>'
        + '    <p style="padding: 3px;">现市场平均价：0.025ETH</p>'
        + '  </div></div>'
        , btn: ['确定出售', '取消']
        , yes: function (index, layero) {
            var _price = $("#bb_price").val();
            if (!_price) {
                layer.msg('请输入价格');
                return;
            }
            var price = web3.toWei(_price, 'ether');
            var expiresAt = new Date().getTime() * 2;
            console.log(cardId + "," + price + "," + expiresAt);
            eggCardInstance.approve.sendTransaction(cardAuctionAddr, cardId, function (err, res) {
                console.log(res);
            });
            eggCardAuctionInstance.createCardAuction.sendTransaction(cardId, price, expiresAt, function (error, result) {

            });
        }
    });
}









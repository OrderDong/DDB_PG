pragma solidity ^0.4.23;

library SafeMath {
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a * b;
        assert(a == 0 || c / a == b);
        return c;
    }
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a / b;
        return c;
    }
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}
//权限控制
contract Ownable {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    function transferOwnership(address newOwner) public onlyOwner {
        if (newOwner != address(0)) {
            owner = newOwner;
        }
    }
}
contract Destructible is Ownable {
    constructor() public payable { }
    function destroy() onlyOwner public {
        selfdestruct(owner);
    }
    function destroyAndSend(address _recipient) onlyOwner public {
        selfdestruct(_recipient);
    }
}
contract Pausable is Ownable {
    event Pause();
    event Unpause();

    bool public paused = false;
    modifier whenNotPaused() {
        require(!paused);
        _;
    }
    modifier whenPaused() {
        require(paused);
        _;
    }
    function pause() onlyOwner whenNotPaused public {
        paused = true;
        emit Pause();
    }
    function unpause() onlyOwner whenPaused public {
        paused = false;
        emit Unpause();
    }
}
contract ERC20Interface {
    function transferFrom(address from, address to, uint tokens) public returns (bool success);
    function balanceOf(address _owner) public view returns (uint256 balance);
    function totalSupply() public view returns (uint256 total);
}

contract ERC721Interface {
    function ownerOf(uint256 tokenId) public view returns (address);
    function safeTransferFrom(address from, address to, uint256 tokenId) public;
    function approve(address _to, uint256 _tokenId) external;
}

contract Market20 is Ownable,Pausable {
    using SafeMath for uint256;
    using SafeMath for uint8;

    event EggMkCreated(uint8 _level,uint8 _eType,uint256 _count,address indexed _owner);
    event TransferEggMk(address indexed _from,address indexed _to,uint256 _count,uint8 _eType,uint8 _level);
    event EggMkUpdated(uint8 _level,uint8 _eType,uint256 _count,address indexed _owner);

    struct EggMk {
        address owner;
        uint256 mkCount;
        uint8 eType;
        uint8 level;
    }
    EggMk[] eggs;
    mapping (address => uint256[]) public mappEggMk;

    function _createEggMk(uint8 _level,uint8 _eType,uint256 _count,address _owner) internal returns (uint){
        require(_eType <= 20);
        uint i;
        bool flag = false;
        if(mappEggMk[_owner].length >0 ){
            for(i=0;i<mappEggMk[_owner].length;i++){
                if(eggs[i].eType == _eType){
                    eggs[i].mkCount = eggs[i].mkCount.add(_count);
                    emit EggMkUpdated(_level,_eType,_count,_owner);
                    flag = true;
                }
            }
        }
        if(!flag){
            EggMk memory curEggMak = EggMk(_owner,_count,_eType,_level);
            uint256 auctionId = eggs.push(curEggMak).sub(1);
            mappEggMk[_owner].push(auctionId);
            emit EggMkCreated(_level,_eType,_count,_owner);
        }
        return curEggMak.mkCount;
    }

    function _transferEggMk(address _from,address _to,uint256 _count,uint8 _eType,uint8 _level) internal returns (bool){
        require(_eType <= 20);
        require(_count >= 1);
        uint i;
        bool flag = false;
        if(mappEggMk[_from].length >0 ){
            for(i=0;i<mappEggMk[_from].length;i++){
                if(eggs[mappEggMk[_from][i]].eType == _eType){
                    if(eggs[mappEggMk[_from][i]].mkCount == _count){
                        delete eggs[mappEggMk[_from][i]];
                        delete mappEggMk[_from][i];
                    }else{
                        eggs[mappEggMk[_from][i]].mkCount = eggs[mappEggMk[_from][i]].mkCount.sub(_count);
                    }
                    //TODO need to for find _to exist
                    _createEggMk(_level,_eType,_count,_to);
                }
            }
        }
        return flag;
    }
}

contract MarketUse is Market20 {
    ERC20Interface public acceptedToken;
    ERC721Interface public nonFungibleRegistry;

    uint256 public constant CREATION_LIMIT = 500000;
    uint256 public constant TRANSFER_STAND = 10;
    uint256 public totalCount;
    uint256 public createdCount;

    function createInitEgg( address _owner) external onlyOwner {
        require(createdCount < CREATION_LIMIT);
        require(acceptedToken.balanceOf(_owner).mul(TRANSFER_STAND) > CREATION_LIMIT );
        _createEggMk(0, 0,CREATION_LIMIT,_owner);
        createdCount = CREATION_LIMIT;
    }
    function createEgg(uint8 _level,uint8 _eType,uint256 _count, address _owner) external onlyOwner {
        require(acceptedToken.balanceOf(_owner).mul(TRANSFER_STAND) > _count);
        _createEggMk(_level, _eType,_count,_owner);
    }
    function transferEggMk(address _from,address _to,uint256 _count,uint8 _eType,uint8 _level) external onlyOwner returns (bool){
        require(_eType <= 20);
        require(_count >= 1);
        _transferEggMk(_from,_to,_count,_eType,_level);
    }
    function getEggList(address _address) external view returns (uint256[]) {
        return mappEggMk[_address];
    }
    function getEggByType(uint256 _index) external view returns (
        address owner,
        uint256 mkCount,
        uint8 eType,
        uint8 level
    ) {
        EggMk storage mk = eggs[_index];
        return (mk.owner,mk.mkCount,mk.eType,mk.level);
    }
}

contract EggAuction is MarketUse {
    struct Auction {
        uint256 id;// Auction ID
        address seller;// Owner of the NFT
        uint256 price;// Price (in wei) for the published item
        uint256 expiresAt;// Time when this sale ends
        uint256 salesCount;
        uint8 eType;
    }
    struct War {
        uint256 id;// war ID
        address seller;// Owner of the NFT
        uint256 random;// random number
        uint256 startTime;// Time when this war start
        uint256 expiresAt;// Time when this war ends
        uint8 eType;//war type
    }

    Auction[] public auctions;
    mapping (address => uint256[]) public auctionByTokenId;

    uint256 public ownerCutPercentage;
    uint256 public publicationFeeInWei = 10 ether;

    /* EVENTS */
    event AuctionCreated(
        uint256 id,
        address indexed seller,
        uint256 priceInWei,
        uint256 expiresAt,
        uint256 salesCount,
        uint8 eType);
    event AuctionSuccessful(
        uint256 id,
        address indexed seller,
        uint256 totalPrice,
        address indexed winner,
        uint256 salesCount,
        uint8 eType);
    event AuctionCancelled(
        uint256 id,
        uint256 count,
        address indexed seller);

    event ChangedPublicationFee(uint256 publicationFee);
    event ChangedOwnerCut(uint256 ownerCut);

    constructor(address _acceptedToken, address _nonFungibleRegistry) public {
        acceptedToken = ERC20Interface(_acceptedToken);
        nonFungibleRegistry = ERC721Interface(_nonFungibleRegistry);
    }

    function _getAuctionIndex(uint256 _auctionId,address _owner) view internal returns (uint256) {
        uint256 i;
        for(i=0;i<auctionByTokenId[_owner].length;i++){
            if(auctionByTokenId[_owner][i] == _auctionId){
                break;
            }
        }
        return i;
    }

    function createEggAuction(uint256 priceInWei, uint256 expiresAt,uint256 _count,uint8 _eType) public payable whenNotPaused {
        require(msg.sender != address(0));
        require(_eType <= 20);
        require(_count >= 1);
        uint tokenCount = acceptedToken.balanceOf(msg.sender).mul(TRANSFER_STAND);
        require(_count <= tokenCount );
        require(priceInWei > 0);
        uint256 auctionId = auctions.length;
        auctions.push(Auction({id: auctionId,seller: msg.sender,
            price: priceInWei,expiresAt: expiresAt,salesCount: _count,eType: _eType}));
        auctionByTokenId[msg.sender].push(auctionId);
        /**
        if(owner != msg.sender){
            require(_transferEggMk(msg.sender,owner,_count,_eType,_level));

            require(acceptedToken.transferFrom(
                    msg.sender,
                    owner,
                    publicationFeeInWei.mul(_count)
                ));
        }*/
        emit AuctionCreated(auctionId,msg.sender,priceInWei,expiresAt,_count,_eType);
    }
    function cancelEggAuction(uint256 _auctionId) public whenNotPaused {
        uint256 i = _getAuctionIndex(_auctionId,msg.sender);
        uint256 salesCount = auctions[_auctionId].salesCount;
        require(i>=0 || msg.sender == owner);
        /**
        if(msg.sender != owner){
            require(acceptedToken.transferFrom(
                    owner,
                    msg.sender,
                    publicationFeeInWei.mul(salesCount)
                ));
        }*/
        delete auctionByTokenId[msg.sender][i];
        delete auctions[_auctionId];

        emit AuctionCancelled(_auctionId, salesCount, msg.sender);
    }

    function executeEggAuction(uint256 _auctionId,uint256 _count) public payable whenNotPaused {
        address seller = auctions[_auctionId].seller;
        //require(seller != address(0));
        require(seller != msg.sender);
        require(auctions[_auctionId].salesCount > 0);
        require(auctions[_auctionId].price == msg.value);

        uint8 eType = auctions[_auctionId].eType;
        uint price = msg.value;
        uint saleFeeAmount = price.div(100);
        uint256 sellerProceeds = price - saleFeeAmount;
        if(seller != owner){
            seller.transfer(sellerProceeds);
        }
        _transferEggMk(seller,msg.sender,_count,eType,0);
        uint256 i = _getAuctionIndex(_auctionId,msg.sender);
        delete auctionByTokenId[owner][i];
        //TODO 需要数量的判断，如果为全部，则删除，如果一部分，则修改
        if(auctions[_auctionId].salesCount <= _count ){
            delete auctions[_auctionId];
        }else{
            auctions[_auctionId].salesCount = auctions[_auctionId].salesCount.sub(_count);
        }

        emit AuctionSuccessful(_auctionId,seller, price, msg.sender,_count,eType);
    }
    function getAuctions() external view returns (uint256,uint256[]) {
        uint256[] memory result = new uint256[](auctions.length);
        uint256 i;
        for(i=0;i<auctions.length;i++){
            result[i] = auctions[i].id;
        }
        return (auctions.length,result);
    }

    function getAuction(uint256 _id) external view returns (
        uint256 id,
        address seller,
        uint256 price,
        uint256 expiresAt,
        uint256 salesCount,
        uint8 eType
    ) {
        Auction storage auction = auctions[_id];
        id =auction.id;
        seller = auction.seller;
        price = auction.price;
        expiresAt = auction.expiresAt;
        salesCount = auction.salesCount;
        eType = auction.eType;
    }
}
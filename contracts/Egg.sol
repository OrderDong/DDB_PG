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
//721接口
contract ERC721 {
    function totalSupply() public view returns (uint256 total);
    function balanceOf(address _owner) public view returns (uint256 balance);
    function ownerOf(uint256 _tokenId) external view returns (address owner);
    function approve(address _to, uint256 _tokenId) external;
    function transfer(address _to, uint256 _tokenId) external;
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external;

    event Transfer(address from, address to, uint256 tokenId);
    event Approval(address owner, address approved, uint256 tokenId);
    // Optional
    // function name() public view returns (string name);
    // function symbol() public view returns (string symbol);
    // function tokensOfOwner(address _owner) external view returns (uint256[] tokenIds);
    // function tokenMetadata(uint256 _tokenId, string _preferredTransport) public view returns (string infoUrl);
}
// @title:管理特殊访问权限的EggAccessControl的一个方面。
contract EggAccessControl {
    address public ceoAddress;
    address public cfoAddress;
    bool public paused = false;

    modifier onlyCEO() {
        require(msg.sender == ceoAddress);
        _;
    }
    modifier onlyCFO() {
        require(msg.sender == cfoAddress);
        _;
    }
    modifier onlyCLevel() {
        require(msg.sender == ceoAddress || msg.sender == cfoAddress);
        _;
    }
    function setCEO(address _newCEO) external onlyCEO {
        require(_newCEO != address(0));
        ceoAddress = _newCEO;
    }
    function setCFO(address _newCFO) external onlyCEO {
        require(_newCFO != address(0));
        cfoAddress = _newCFO;
    }
    modifier whenNotPaused() {
        require(!paused);
        _;
    }
    modifier whenPaused {
        require(paused);
        _;
    }
    function pause() external onlyCLevel whenNotPaused {
        paused = true;
    }
    function unpause() public onlyCEO whenPaused {
        paused = false;
    }
}

//对象基础
contract EggBase is EggAccessControl{
    using SafeMath for uint256;
    using SafeMath for uint64;
    using SafeMath for uint16;
    using SafeMath for uint8;
    event Birth(address owner, uint256 eggId, uint16 coolIndex, uint8 etype, uint8 level);
    event Transfer(address from, address to, uint256 tokenId);

    struct Egg {
        uint64 birthTime;
        uint64 eggId;
        uint16 coolIndex;
        uint16 siringWithId;
        uint8 level;
        uint8 etype;
    }

    uint256 public secondsPerBlock = 15;// 生成一个区块的时间
    Egg[] eggs;
    mapping (uint256 => address) public eggIndexToOwner;// 蛋蛋的id到蛋蛋地址的映射
    mapping (address => uint256) ownershipTokenCount;// 拥有者到拥有者蛋蛋个数的映射
    mapping (uint256 => address) public eggSalesToApproved;// 准备出售的蛋蛋id到拥有者地址的映射
    mapping (uint256 => address) public warAllowedToAddress;// 准备战斗蛋蛋id到拥有者地址的映射

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        ownershipTokenCount[_to] = ownershipTokenCount[_to].add(1);
        eggIndexToOwner[_tokenId] = _to;
        if (_from != address(0)) {
            ownershipTokenCount[_from] = ownershipTokenCount[_from].sub(1);
            delete warAllowedToAddress[_tokenId];
            delete eggSalesToApproved[_tokenId];
        }
        emit Transfer(_from, _to, _tokenId);
    }
    // 创建蛋蛋
    function _createEgg(uint8 _level,uint8 _type,address _owner) internal returns (uint){
        require(_level == uint256(uint8(_level)));
        require(_type == uint256(uint8(_type)));

        Egg memory _egg = Egg({
            birthTime: uint64(now),
            coolIndex: 0,
            eggId: uint64(now),
            siringWithId: 0,
            etype: _type,
            level: _level
            });
        uint256 newEggId = eggs.push(_egg) - 1;
        emit Birth(_owner,newEggId, uint16(_egg.coolIndex),uint8(_egg.etype),uint8(_egg.level));
        _transfer(0, _owner, newEggId);
        return newEggId;
    }
    function setSecondsBlock(uint256 secs) external onlyCLevel {
        require(secs < uint32(10 minutes));
        secondsPerBlock = secs;
    }
}
//721共有方法
contract EggOwnership is EggBase, ERC721 {
    event ContractUpgrade(address newContract);
    string public constant name = "Egg's War";
    string public constant symbol = "EGW";

    bytes4 constant InterfaceSignature_ERC721 =
    bytes4(keccak256('name()')) ^
    bytes4(keccak256('symbol()')) ^
    bytes4(keccak256('totalSupply()')) ^
    bytes4(keccak256('balanceOf(address)')) ^
    bytes4(keccak256('ownerOf(uint256)')) ^
    bytes4(keccak256('approve(address,uint256)')) ^
    bytes4(keccak256('transfer(address,uint256)')) ^
    bytes4(keccak256('transferFrom(address,address,uint256)')) ^
    bytes4(keccak256('tokensOfOwner(address)'));

    function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return eggIndexToOwner[_tokenId] == _claimant;
    }
    function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return eggSalesToApproved[_tokenId] == _claimant;
    }
    function _approve(uint256 _tokenId, address _approved) internal {
        eggSalesToApproved[_tokenId] = _approved;
    }
    function balanceOf(address _owner) public view returns (uint256 count) {
        return ownershipTokenCount[_owner];
    }
    function transfer( address _to, uint256 _tokenId) external whenNotPaused {
        require(_to != address(0));
        require(_to != address(this));
        require(_owns(msg.sender, _tokenId));
        _transfer(msg.sender, _to, _tokenId);
    }
    function approve(address _to,uint256 _tokenId) external whenNotPaused{
        require(_owns(msg.sender, _tokenId));
        _approve(_tokenId, _to);
        emit Approval(msg.sender, _to, _tokenId);
    }
    function safeTransferFrom( address _from, address _to, uint256 _tokenId) external whenNotPaused{
        require(_to != address(0));
        require(_to != address(this));
        require(_approvedFor(msg.sender, _tokenId));
        require(_owns(_from, _tokenId));
        _transfer(_from, _to, _tokenId);
    }
    function totalSupply() public view returns (uint) {
        return eggs.length.sub(1);
    }
    function ownerOf(uint256 _tokenId) external view returns (address owner){
        owner = eggIndexToOwner[_tokenId];
        require(owner != address(0));
    }
    function tokensOfOwner(address _owner) external view returns(uint256[] ownerTokens) {
        uint tokenCount = balanceOf(_owner);
        if (tokenCount == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 totalEggs = totalSupply();
            uint256 resultIndex = 0;
            uint256 eggId;
            for (eggId = 1; eggId <= totalEggs; eggId++) {
                if (eggIndexToOwner[eggId] == _owner) {
                    result[resultIndex] = eggId;
                    resultIndex++;
                }
            }
            return result;
        }
    }
}

contract EggCore is EggOwnership {
    address public newContractAddress;
    uint256 public constant CREATION_LIMIT = 50000;
    uint256 public createdCount;

    constructor (address _cfoAddress) public {
        paused = false;
        ceoAddress = msg.sender;
        cfoAddress = _cfoAddress;
    }
    function setNewAddress(address _newAddress) external onlyCEO whenPaused {
        newContractAddress = _newAddress;
        emit ContractUpgrade(_newAddress);
    }

    function createInitEgg( address _owner) external onlyCEO {
        address eggOwner = _owner;
        if (eggOwner == address(0)) {
            eggOwner = ceoAddress;
        }
        require(createdCount < CREATION_LIMIT);
        createdCount++;
        _createEgg(0, 1,eggOwner);
    }
    function createEgg(uint8 _level,uint8 _type, address _owner) external onlyCEO {
        address eggOwner = _owner;
        if (eggOwner == address(0)) {
            eggOwner = ceoAddress;
        }
        _createEgg(_type,_level,eggOwner);
    }
    function unpause() public onlyCEO whenPaused {
        require(newContractAddress == address(0));
        super.unpause();
    }
    function getEgg(uint256 _id) external view returns (
        uint256 birthTime,
        uint256 eggId,
        uint256 coolIndex,
        uint256 siringWithId,
        uint256 level,
        uint256 etype
    ) {
        Egg storage egg = eggs[_id];
        coolIndex = uint256(egg.coolIndex);
        birthTime = uint256(egg.birthTime);
        etype = uint256(egg.etype);
        level = uint256(egg.level);
        siringWithId = uint256(egg.siringWithId);
        eggId = uint256(egg.eggId);
    }
}
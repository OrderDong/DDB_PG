var SalesAndPlayABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_auctionId",
                "type": "uint256"
            },
            {
                "name": "_count",
                "type": "uint256"
            }
        ],
        "name": "executeEggAuction",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_eType",
                "type": "uint8"
            }
        ],
        "name": "getEggCount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "mappEggMk",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "nonFungibleRegistry",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalCount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "auctionByTokenId",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "acceptedToken",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "createInitEgg",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "auctions",
        "outputs": [
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "seller",
                "type": "address"
            },
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "price",
                "type": "uint256"
            },
            {
                "name": "expiresAt",
                "type": "uint256"
            },
            {
                "name": "salesCount",
                "type": "uint256"
            },
            {
                "name": "eType",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_eType",
                "type": "uint8"
            }
        ],
        "name": "getAuctionByType",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "getEggByType",
        "outputs": [
            {
                "name": "owner",
                "type": "address"
            },
            {
                "name": "mkCount",
                "type": "uint256"
            },
            {
                "name": "eType",
                "type": "uint8"
            },
            {
                "name": "level",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_level",
                "type": "uint8"
            },
            {
                "name": "_eType",
                "type": "uint8"
            },
            {
                "name": "_count",
                "type": "uint256"
            },
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "createEgg",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "priceInWei",
                "type": "uint256"
            },
            {
                "name": "expiresAt",
                "type": "uint256"
            },
            {
                "name": "_count",
                "type": "uint256"
            },
            {
                "name": "_eType",
                "type": "uint8"
            },
            {
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "createEggAuction",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getAuction",
        "outputs": [
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "seller",
                "type": "address"
            },
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "price",
                "type": "uint256"
            },
            {
                "name": "expiresAt",
                "type": "uint256"
            },
            {
                "name": "salesCount",
                "type": "uint256"
            },
            {
                "name": "eType",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "publicationFeeInWei",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "createdCount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_count",
                "type": "uint256"
            },
            {
                "name": "_eType",
                "type": "uint8"
            },
            {
                "name": "_level",
                "type": "uint8"
            }
        ],
        "name": "transferEggMk",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "CREATION_LIMIT",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getAuctions",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawBalance",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_auctionId",
                "type": "uint256"
            }
        ],
        "name": "cancelEggAuction",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "TRANSFER_STAND",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "getEggList",
        "outputs": [
            {
                "name": "",
                "type": "uint256[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_acceptedToken",
                "type": "address"
            },
            {
                "name": "_nonFungibleRegistry",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "priceInWei",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "time",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "count",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "eType",
                "type": "uint8"
            }
        ],
        "name": "ExchangeCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "priceInWei",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "expiresAt",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "salesCount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "eType",
                "type": "uint8"
            }
        ],
        "name": "AuctionCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "totalPrice",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "winner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "salesCount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "time",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "eType",
                "type": "uint8"
            }
        ],
        "name": "AuctionSuccessful",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "count",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "time",
                "type": "uint256"
            }
        ],
        "name": "AuctionCancelled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_level",
                "type": "uint8"
            },
            {
                "indexed": false,
                "name": "_eType",
                "type": "uint8"
            },
            {
                "indexed": false,
                "name": "_count",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "EggMkCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_count",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_eType",
                "type": "uint8"
            },
            {
                "indexed": false,
                "name": "_level",
                "type": "uint8"
            }
        ],
        "name": "TransferEggMk",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_level",
                "type": "uint8"
            },
            {
                "indexed": false,
                "name": "_eType",
                "type": "uint8"
            },
            {
                "indexed": false,
                "name": "_count",
                "type": "uint256"
            },
            {
                "indexed": true,
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "EggMkUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "Pause",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "Unpause",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_auctionId",
                "type": "uint256"
            },
            {
                "name": "_count",
                "type": "uint256"
            },
            {
                "name": "_eType",
                "type": "uint8"
            },
            {
                "name": "_level",
                "type": "uint8"
            }
        ],
        "name": "exchangeEggToDDC",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_count",
                "type": "uint256"
            },
            {
                "name": "_eType",
                "type": "uint8"
            },
            {
                "name": "_level",
                "type": "uint8"
            }
        ],
        "name": "exchangeDDCToEgg",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }
]

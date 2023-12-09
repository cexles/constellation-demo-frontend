export const ACCOUNT_CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "destinationChainSelector",
        "type": "uint64"
      }
    ],
    "name": "DestinationChainNotAllowed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ErrorCase",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "result",
        "type": "bytes"
      }
    ],
    "name": "ErrorInCall",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "target",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "FailedToWithdrawEth",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "messageId",
        "type": "bytes32"
      }
    ],
    "name": "MessageNotFailed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "currentBalance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "calculatedFees",
        "type": "uint256"
      }
    ],
    "name": "NotEnoughBalance",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NothingToWithdraw",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "OnlySelf",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "SenderNotAllowed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "sourceChainSelector",
        "type": "uint64"
      }
    ],
    "name": "SourceChainNotAllowed",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "indexed": false,
        "internalType": "struct ITransshipmentStructures.CallData",
        "name": "calldataStruct",
        "type": "tuple"
      }
    ],
    "name": "Executed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "messageId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "reason",
        "type": "bytes"
      }
    ],
    "name": "MessageFailed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "messageId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "uint64",
        "name": "sourceChainSelector",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "text",
        "type": "bytes"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "indexed": false,
        "internalType": "struct Client.EVMTokenAmount[]",
        "name": "tokenAmounts",
        "type": "tuple[]"
      }
    ],
    "name": "MessageReceived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "messageId",
        "type": "bytes32"
      }
    ],
    "name": "MessageRecovered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "messageId",
        "type": "bytes32"
      },
      {
        "components": [
          {
            "internalType": "uint64",
            "name": "destinationChainSelector",
            "type": "uint64"
          },
          {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "dataToSend",
            "type": "bytes"
          },
          {
            "internalType": "address",
            "name": "addressToExecute",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "valueToExecute",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "dataToExecute",
            "type": "bytes"
          },
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "feeToken",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "gasLimit",
            "type": "uint256"
          }
        ],
        "indexed": false,
        "internalType": "struct ITransshipmentStructures.MassageParam",
        "name": "massageParam",
        "type": "tuple"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fees",
        "type": "uint256"
      }
    ],
    "name": "MessageSent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "messageId",
        "type": "bytes32"
      }
    ],
    "name": "MessageSucceeds",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "accountType",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "srcTokenAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "dstTokenAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "dstTokenAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "dstReceiver",
        "type": "address"
      },
      {
        "internalType": "uint64",
        "name": "dstChainSelector",
        "type": "uint64"
      },
      {
        "internalType": "address",
        "name": "feeToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "gasLimit",
        "type": "uint256"
      }
    ],
    "name": "bridge",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "execute",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "result",
        "type": "bytes"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_transshipment",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "_accountType",
        "type": "uint8"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "state",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "transshipment",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];

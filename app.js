var express = require('express');
var app = express();

const Web3 = require("web3")
const abi = require('human-standard-token-abi')
const rs = require('readline-sync');

const defaultTokenAddress = '0x42dbfc482bb07c304a8fe2b20f51215f0b867a48'
const defaultNetwork = 'ropsten' // after launch, switch to mainnet


// Fill in the ERC20 Token Address below.
const network = defaultNetwork


// Setting up the connection to infura.io for Ethereum blockchain data...
web3 = new Web3(new Web3.providers.HttpProvider(`https://${network}.infura.io`));
const currentBlockInfo = web3.eth.getBlock("latest")
const blockTime = block => new Date(block.timestamp * 1000)


const tokenAddress = defaultTokenAddress

const blockNumber = currentBlockInfo.number

const token = web3.eth.contract(abi).at(tokenAddress)
const blockHex = web3.fromDecimal(blockNumber)
const blockInfo = web3.eth.getBlock(blockNumber)
const decimals = token.decimals.call()
const totalSupply = token.totalSupply.call(blockHex).shift(-decimals);

app.get('/', function (req, res) {
  res.send(`At block #${blockInfo.number} from ${blockTime(currentBlockInfo)}, the total supply is $${totalSupply.toFixed(2)}.\n`);
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
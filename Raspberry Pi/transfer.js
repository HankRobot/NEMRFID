const nem2Sdk = require("nem2-sdk");
const node = 'https://jp5.nemesis.land:3001/';

function checkvalidity(hashstring)
{
    const request = require('request');
    var url = node + '/transaction/' + hashstring + '/status';
    console.log(url);
    request(url, function (error, response, body) {
        const user = JSON.parse(body);
        if ( (response && response.statusCode) == 200 || user["status"] == "Success") {
            console.log("Transaction Success!");
        }
        else{
            console.log("Transaction failed");
        }
    });
}

const Account = nem2Sdk.Account,
    Address = nem2Sdk.Address,
    Deadline = nem2Sdk.Deadline,
    Mosaic = nem2Sdk.Mosaic,
    MosaicId = nem2Sdk.MosaicId,
    NetworkType = nem2Sdk.NetworkType,
    PlainMessage = nem2Sdk.PlainMessage,
    TransactionHttp = nem2Sdk.TransactionHttp,
    TransferTransaction = nem2Sdk.TransferTransaction,
    UInt64 = nem2Sdk.UInt64;

//Retrieve shell 
var privateKey = "";

for (var i = 2; i < process.argv.length; i++) {
    privateKey += process.argv[i];
}

/* start block 01 */
const mosaicId = "77a1969932d987d7";     						        //your mosaic mosaicId
const address = "SC7ZQDFH36M7RJDXAMX2A3MRBXRRW2YY4SVGCLAF";		//the person's address you want to send to, I sent mine back because I wanna save cat.currency

const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    Address.createFromRawAddress(address),
    [new Mosaic(new MosaicId(mosaicId), UInt64.fromUint(1))],
    PlainMessage.create('enjoy your ticket!'),
    NetworkType.MIJIN_TEST
);

console.log(transferTransaction.serialize());
transferTransaction.maxFee = UInt64.fromUint(parseInt(transferTransaction.serialize().substring(0,2),16)*100); //Max Fees are now required on elephant v2
console.log(transferTransaction.maxFee);
/* end block 01 */

/* start block 02 get the meta generation hash at https://jp5.nemesis.land:3001/block/1 */
const networkGenerationHash = "9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7"; 
const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
const signedTransaction = account.sign(transferTransaction, networkGenerationHash);
console.log(signedTransaction.hash)
/* end block 02 */

/* start block 03 */
const transactionHttp = new TransactionHttp(node);    //your node, both sender and receiver have to be on the same node

transactionHttp.announce(signedTransaction).subscribe(function (x) { return console.log(x); }, function (err) { return console.error(err); });
/* end block 03 */

setTimeout(function(){checkvalidity(signedTransaction.hash.toString())},2000);



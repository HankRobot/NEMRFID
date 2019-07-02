const nem2Sdk = require("nem2-sdk");

function checkvalidity(hashstring){
    /* begin validating hash */
    var Curl = require('node-libcurl').Curl;

    var curl = new Curl();
    var url = 'http://40.90.163.184:3000/transaction/' + hashstring + '/status';
    console.info(url);

    //'http://40.90.163.184:3000/transaction/FC1881E0B2F55866C7BB85B40420E40D1D90C2B624A18EA4851D8FA96D940555/status'
    curl.setOpt( 'URL', url);
    curl.setOpt( 'FOLLOWLOCATION', true );

    curl.on( 'end', function( statusCode, body, headers ) {
        const user = JSON.parse(body);
        if (statusCode==200 && user['status']=='Success') {
            console.info("Success!");
        }
        else{
            console.info("Transaction Failed");
        }
        this.close();
    });

    curl.on( 'error', function ( err, errCode ) {
        this.close();
    });

    curl.perform();
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

//console.log("Your private key is:")
//console.log(privateKey)

/* start block 01 */
const mosaicId = "77a1969932d987d7";     						//your mosaic mosaicId
const address = "SADR23O6XLZXVHUKI4BLBFXY2Z7BPRZEUW5ESAQ6";		//the person's address you want to send to

const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    Address.createFromRawAddress(address),
    [new Mosaic(new MosaicId(mosaicId), UInt64.fromUint(1))],
    PlainMessage.create('enjoy your ticket!'),
    NetworkType.MIJIN_TEST
);
/* end block 01 */

/* start block 02 */
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH;

const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
const signedTransaction = account.sign(transferTransaction, networkGenerationHash);
/* end block 02 */

/* start block 03 */
const transactionHttp = new TransactionHttp('http://40.90.163.184:3000');    //your node, both sender and receiver have to be on the same node

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
/* end block 03 */

setTimeout(function(){checkvalidity(signedTransaction.hash.toString())},500);



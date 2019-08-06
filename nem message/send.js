"use strict";
/*
 *
 * Copyright 2019 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
exports.__esModule = true;
var nem2_sdk_1 = require("nem2-sdk");

/* start block 01 */
var privateKey = "75938334DAFA7EF743FB2A9694C8025648959DC8FDE61678AC99281826BED7A3"; //sender
var account = nem2_sdk_1.Account.createFromPrivateKey(privateKey, nem2_sdk_1.NetworkType.MIJIN_TEST); //retrieve sender account

var republicKey = "B8CFB04B8B3BE478C0FC53D14203F45325A50556BF8C92189C6741A38484030D"; //receiver
var republicAccount = nem2_sdk_1.PublicAccount.createFromPublicKey(republicKey, nem2_sdk_1.NetworkType.MIJIN_TEST); //receiver
var encryptedMessage = account.encryptMessage('Hello Hank Bot Here!', republicAccount); //sender's message + receiver's public key merged to form an encryption
/* end block 01 */

/* start block 02 */
var transferTransaction = nem2_sdk_1.TransferTransaction.create(
    nem2_sdk_1.Deadline.create(),
    republicAccount.address, 
    [], 
    encryptedMessage, 
    nem2_sdk_1.NetworkType.MIJIN_TEST
    )
//begin code calculation
console.log(transferTransaction.serialize());
transferTransaction.maxFee = nem2_sdk_1.UInt64.fromUint(parseInt(transferTransaction.serialize().substring(0,2),16)*100);
console.log(transferTransaction.maxFee);
/* end block 02 */
/* start block 03 */
var networkGenerationHash = "F669FE7D1FBAC0823334E5C01BD6D54E4F8B4D25AC8FEB24D15266FE6F1569CB";
var signedTransaction = account.sign(transferTransaction, networkGenerationHash);
/* end block 03 */
console.log(signedTransaction.hash);
/* start block 04 */
var transactionHttp = new nem2_sdk_1.TransactionHttp('https://api.nf.catapult.luxtag.io');
transactionHttp
    .announce(signedTransaction)
    .subscribe(function (x) { return console.log(x); }, function (err) { return console.error(err); });
/* end block 04 */ 

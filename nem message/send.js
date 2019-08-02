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
var privateKey = "9FF05B6E961CCFA34ED4868E0AE701BCED40876EBCB09891FF57587AF866E303"; //sender
var account = nem2_sdk_1.Account.createFromPrivateKey(privateKey, nem2_sdk_1.NetworkType.MIJIN_TEST); //retrieve sender account

var republicKey = "D76D847DA7DBFE8885CC4937B8C1E4BB48AC0F20FE06BC9C3B8917F47975C94A"; //receiver
var republicAccount = nem2_sdk_1.PublicAccount.createFromPublicKey(republicKey, nem2_sdk_1.NetworkType.MIJIN_TEST); //receiver
var encryptedMessage = account.encryptMessage('Hello Hank Bot Here!', republicAccount); //sender's message + receiver's public key merged to form an encryption
/* end block 01 */

/* start block 02 */
var transferTransaction = nem2_sdk_1.TransferTransaction.create(nem2_sdk_1.Deadline.create(), republicAccount.address, [], encryptedMessage, nem2_sdk_1.NetworkType.MIJIN_TEST);
/* end block 02 */

/* start block 03 */
var networkGenerationHash = "2824938729EE889487E3280D65D86CB316E3A9BE6DB7D561B3AFFF951A90E4CE";
var signedTransaction = account.sign(transferTransaction, networkGenerationHash);
console.log(signedTransaction.hash);
/* end block 03 */

/* start block 04 */
var transactionHttp = new nem2_sdk_1.TransactionHttp('http://54.169.58.18:3000');
transactionHttp
    .announce(signedTransaction)
    .subscribe(function (x) { return console.log(x); }, function (err) { return console.error(err); });
/* end block 04 */ 

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
var privateKey = "5D7E87DF82EB6986646B7DBB38CE792117BD106D5179ADC2E1CE0DDE8DBAEE78"; //sender
var account = nem2_sdk_1.Account.createFromPrivateKey(privateKey, nem2_sdk_1.NetworkType.MIJIN_TEST); //retrieve sender account

var republicKey = "E88C07D9A56CED190526464D995919BAD2F38253C191B8259512B26117854018"; //receiver
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
transferTransaction.maxFee = nem2_sdk_1.UInt64.fromUint(parseInt(transferTransaction.serialize().substring(0,8),16)*100);
console.log(transferTransaction.maxFee);
/* end block 02 */
/* start block 03 */
var networkGenerationHash = "9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7";
var signedTransaction = account.sign(transferTransaction, networkGenerationHash);
/* end block 03 */
console.log(signedTransaction.hash);
/* start block 04 */
var transactionHttp = new nem2_sdk_1.TransactionHttp('http://3.1.202.148:3000');
transactionHttp
    .announce(signedTransaction)
    .subscribe(function (x) { return console.log(x); }, function (err) { return console.error(err); });
/* end block 04 */ 

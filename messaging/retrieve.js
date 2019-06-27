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
var operators_1 = require("rxjs/operators");

/* start block 01 */
var certificatePrivateAccount = "F7903153811C81FD52019EABD2ABC709E96E81364CD049D88878784D2AB6525A"; //receiver
var certificateAccount = nem2_sdk_1.Account.createFromPrivateKey(certificatePrivateAccount, nem2_sdk_1.NetworkType.MIJIN_TEST);

var alicePublicKey = "58908D0758292DBAC944AAE6C76DBB50069C1CC11EC063F1870861DCCD1CA7BC"; //sender
var alicePublicAccount = nem2_sdk_1.PublicAccount.createFromPublicKey(alicePublicKey, nem2_sdk_1.NetworkType.MIJIN_TEST);

var transactionHttp = new nem2_sdk_1.TransactionHttp('http://40.90.163.184:3000');
var transactionHash = "C25BF57DFBF08593AD18339C75ADBCE3CBE06AE17F6B6C3227C7734BB87CB312";

transactionHttp
    .getTransaction(transactionHash)
    .pipe(operators_1.map(function (x) { return x; }))
    .subscribe(function (transaction) {
    console.log("Raw message: ", transaction.message.payload);
    console.log("Message: ", certificateAccount.decryptMessage(transaction.message, alicePublicAccount).payload);
}, (function (err) { return console.log(err); }));
/* end block 01 */ 

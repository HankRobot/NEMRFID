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

import {Account, Deadline, NetworkType, PublicAccount, TransactionHttp, TransferTransaction,} from 'nem2-sdk';

/* start block 01 */
const privateKey = "694106D8410D6BD1AAEEC1A468D47BA940130CC7DF774100B6DE3B9CBDE26BC7" as string;            //sender
const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);  //sender

const republicKey = "CE674B3EC2645EE7EB65902A6CC4C84BE531F90BA3AFE06E010A74B6E5766D39" as string;          //receiver
const republicAccount = PublicAccount.createFromPublicKey(republicKey, NetworkType.MIJIN_TEST);       //receiver

const encryptedMessage = account.encryptMessage('This message is secret', republicAccount);
/* end block 01 */

/* start block 02 */
const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    republicAccount.address,
    [],
    encryptedMessage,
    NetworkType.MIJIN_TEST);
/* end block 02 */

/* start block 03 */
const networkGenerationHash = process.env.NETWORK_GENERATION_HASH as string;

const signedTransaction = account.sign(transferTransaction, networkGenerationHash);
console.log(signedTransaction.hash);
/* end block 03 */

/* start block 04 */
const transactionHttp = new TransactionHttp('http://40.90.163.184:3000');

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
/* end block 04 */
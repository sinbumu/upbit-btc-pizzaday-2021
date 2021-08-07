const request = require('request')
const uuidv4 = require("uuid/v4")
const crypto = require('crypto')
const sign = require('jsonwebtoken').sign
const queryEncode = require("querystring").encode

require('dotenv').config();

var cron = require('node-cron');

const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY
const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY
const server_url = process.env.UPBIT_OPEN_API_SERVER_URL


const body = {
    currency: 'BTC',
    amount: '0.0001',
    address: 'btc-pizzaday-2021',//event address!!!!!!!
    transaction_type: 'internal',//바로 출금(일반출금은 수수료 있음)
}

const query = queryEncode(body)

const hash = crypto.createHash('sha512')
const queryHash = hash.update(query, 'utf-8').digest('hex')

const payload = {
    access_key: access_key,
    nonce: uuidv4(),
    query_hash: queryHash,
    query_hash_alg: 'SHA512',
}

const token = sign(payload, secret_key)

const options = {
    method: "POST",
    url: server_url + "/v1/withdraws/coin",
    headers: {Authorization: `Bearer ${token}`},
    json: body
}

request(options, (error, response, body) => {
    if (error) throw new Error(error)
    console.log(body)
})

// const body = {
//     currency: 'BTC'
// }

// const query = queryEncode(body)

// const hash = crypto.createHash('sha512')
// const queryHash = hash.update(query, 'utf-8').digest('hex')

// const payload = {
//     access_key: access_key,
//     nonce: uuidv4(),
//     query_hash: queryHash,
//     query_hash_alg: 'SHA512',
// }

// const token = sign(payload, secret_key)

// const options = {
//     method: "GET",
//     url: server_url + "/v1/withdraws/chance?" + query,
//     headers: {Authorization: `Bearer ${token}`},
//     json: body
// }

// request(options, (error, response, body) => {
//     if (error) throw new Error(error)
//     // console.log(body)
//     if(response.statusCode != 200){
//         console.log('status code is ', response.statusCode);
//         return;
//     }
//     const btcBalance = body.account.balance;
//     console.log("your btc balance = ", btcBalance)
//     if(btcBalance >= 0.0001){
//         console.log("이벤트에 응모 대기를 시작.")
//         //// cron job start
//         cron.schedule('0 12 * * *', () => {
//             const body = {
//                 currency: 'BTC',
//                 amount: '0.0001',
//                 address: 'btc-pizzaday-2021',//event address!!!!!!!
//                 transaction_type: 'internal',//바로 출금(일반출금은 수수료 있음)
//             }
            
//             const query = queryEncode(body)
            
//             const hash = crypto.createHash('sha512')
//             const queryHash = hash.update(query, 'utf-8').digest('hex')
            
//             const payload = {
//                 access_key: access_key,
//                 nonce: uuidv4(),
//                 query_hash: queryHash,
//                 query_hash_alg: 'SHA512',
//             }
            
//             const token = sign(payload, secret_key)
            
//             const options = {
//                 method: "POST",
//                 url: server_url + "/v1/withdraws/coin",
//                 headers: {Authorization: `Bearer ${token}`},
//                 json: body
//             }
            
//             request(options, (error, response, body) => {
//                 if (error) throw new Error(error)
//                 console.log(body)
//             })
//         });
//     }else{
//         console.log("이벤트에 응모할 btc가 부족합니다.")
//     }
// })

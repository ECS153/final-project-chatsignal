/* global BigInt */
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
// var forge = require('node-forge');
// var bits = 256;

require('./patch.js');


let send = undefined;
let conId = undefined;

function init(event) {
    console.log(event)
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
    });

    send = async(msgType,connectionId, senderID, publicKey, N)  => {
        await apigwManagementApi.postToConnection({
            ConnectionID: connectionId,
            Data: `${msgType}+=+${senderID}+=+${publicKey}+=+${N}`
        }).promise();
    }
}


exports.handler = (event, context, callback) => {
    init(event);
    let n = parseInt(JSON.parse(event.body).n);
    let newN = (n-1).toString();
    let pKey = JSON.parse(event.body).publicKey;
    console.log("key: " + pKey);
    conId = event.requestContext.connectionId;
    console.log("ID: " + conId);
    getConnections().then((data) => {
        let currentIndex = getCurrentIndex(data.Items);
        let rIndex = getIdRight(data.Items, currentIndex);
        console.log("Sending Key to: " + data.Items[rIndex].ConnectionID);
        send("keyExchange", data.Items[rIndex].ConnectionID, conId, pKey, newN).then((data)=>{
                    callback(null, {"statusCode": 200, "body": "This response came from keySharing"});
                });
        // console.log("Data Items: " + data.Items);
        // data.Items.forEach(function(connection) {
        //     console.log("Connection " + connection.ConnectionID);
        //     console.log("Connection " + conId);
        //     if(connection.ConnectionID.localeCompare(conId) !== 0) {
        //         console.log("sent to: " + connection.ConnectionID );
        //         send("keyExchange", connection.ConnectionID, conId, pKey).then((data)=>{
        //             callback(null, {"statusCode": 200, "body": "This response came from keySharing"});
        //         });
        //     }
        // });
    });
    return {}
};

function getConnections() {
    return ddb.scan({
        TableName: 'ChatroomDB',
    }).promise();
}

function getCurrentIndex(Items) {
    for(let curId = 0; curId < Items.length; curId++) {
        if(conId.localeCompare(Items[curId].ConnectionID) === 0) return curId;
    }
    return -1;
}

function getIdRight(Items, id) {
    let rId = id+1;
    if(rId === Items.length) rId = 0;
    return rId;
}
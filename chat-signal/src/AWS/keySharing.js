/* global BigInt */
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
// var forge = require('node-forge');
// var bits = 256;

require('./patch.js');


let send = undefined;
let n = 1;

function init(event) {
    console.log(event)
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
    });

    send = async(msgType,connectionId,prime,gen,num) => {
        await apigwManagementApi.postToConnection({
            ConnectionID: connectionId,
            Data: `${msgType}+=+${connectionId}+=+${prime}+=+${gen}+=+${num}`
        }).promise();
    }
}


exports.handler = (event, context, callback) => {
    init(event);
    let prime = "4C25BF715B29AA79778954366B6AB32CD1AE2C8CD99C9C702747AC27556E827B";
    let gen = "2";
    getConnections().then((data) => {
        console.log("Data Items: " + data.Items);
        n = data.Items.length;
        console.log(data.Items[0].ConnectionID);
        data.Items.forEach(function(connection) {
            console.log("Connection " + connection.ConnectionID);
            send("keyGen", connection.ConnectionID, prime,gen, n).then((data)=>{
                callback(null, {"statusCode": 200, "body": "This response came from keySharing"});
            });
        });
    });
    return {}
};

function getConnections() {
    return ddb.scan({
        TableName: 'ChatroomDB',
    }).promise();
}

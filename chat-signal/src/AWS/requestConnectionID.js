const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
require('./patch.js');


let send = undefined;

function init(event) {
    console.log(event)
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
    });

    send = async(messageType,connectionId) => {
        await apigwManagementApi.postToConnection({
            ConnectionID: connectionId,
            Data: `${messageType}+=+${connectionId}`
        }).promise();
    }
}

exports.handler = (event, context, callback) => {
    init(event);
    const connectionId = event.requestContext.connectionId;
    send("id",connectionId).then((data)=>{
        callback(null, {"statusCode": 200, "body": "This response came from requestID"});
    });
};

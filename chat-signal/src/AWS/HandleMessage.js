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

    send = async(connectionId, senderID, data) => {
        await apigwManagementApi.postToConnection({
            ConnectionID: connectionId,
            Data: `${senderID}+=+${data}`
        }).promise();
    }
}


exports.handler = (event, context, callback) => {
    init(event);
    let message = JSON.parse(event.body).message
    getConnections().then((data) => {
        console.log("Data Items: " + data.Items);
        data.Items.forEach(function(connection) {
            console.log("Connection " + connection.ConnectionID);
            send(connection.ConnectionID, event.requestContext.connectionId, message).then((data)=>{
                callback(null, {"statusCode": 200, "body": "This response came from HandleMessage"});
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
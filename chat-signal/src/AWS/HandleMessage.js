// const https = require('https');

// /**
//  * Pass the data to send as `event.data`, and the request options as
//  * `event.options`. For more information see the HTTPS module documentation
//  * at https://nodejs.org/api/https.html.
//  *
//  * Will succeed with the response body.
//  */
// exports.handler = (event, context, callback) => {
//     const req = https.request(event.options, (res) => {
//         let body = '';
//         console.log('Status:', res.statusCode);
//         console.log('Headers:', JSON.stringify(res.headers));
//         res.setEncoding('utf8');
//         res.on('data', (chunk) => body += chunk);
//         res.on('end', () => {
//             console.log('Successfully processed HTTPS response');
//             // If we know it's JSON, parse it
//             if (res.headers['content-type'] === 'application/json') {
//                 body = JSON.parse(body);
//             }
//             callback(null, body);
//         });
//     });
//     req.on('error', callback);
//     req.write(JSON.stringify(event.data));
//     req.end();
// };

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

    send = async(msgType,connectionId, senderID, userName, data) => {
        await apigwManagementApi.postToConnection({
            ConnectionID: connectionId,
            Data: `${msgType}+=+${senderID}+=+${userName}+=+${data}`
        }).promise();
    }
}


exports.handler = (event, context, callback) => {
    init(event);
    let message = JSON.parse(event.body).message
    let userName = JSON.parse(event.body).userID
    getConnections().then((data) => {
        console.log("Data Items: " + data.Items);
        data.Items.forEach(function(connection) {
            console.log("Connection " + connection.ConnectionID);
            send("txtMsg",connection.ConnectionID, event.requestContext.connectionId, userName, message).then((data)=>{
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
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

exports.handler = (event, context, callback) => {
    const connectionId = event.requestContext.connectionId;
    addConnectionId(connectionId).then(() => { callback(null, { statusCode: 200,}) });
    
}


function addConnectionId(connectionId) { 
    console.log(connectionId);
    return dynamodb.putItem({ 
        "TableName": 'ChatroomDB', 
        "Item": { 
            "ConnectionID": {
                "S": connectionId 
            }
        }, 
        
    }).promise(); 
    
}
const AWS = require("aws-sdk");

exports.handler = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters;

    let data;
    let statusCode = 0;

    const params ={
        TableName: 'Tasks',
        Key: {id}
    };

    try{
        const results = await dynamoDB.delete(params).promise();

        statusCode = 200;
        data = {
            'msg': 'Task deleted.',
        };
    } catch (e){
        statusCode = 400;
        data = {
            'msg': 'Fail to get all Tasks.',
            'description': e,
            'debug': {
                'event': event,
                'params': params
            }
        }
    };

    const response ={
        'statusCode': statusCode,
        'body': JSON.stringify({
            'data': data
        })
    };

    return response;

}

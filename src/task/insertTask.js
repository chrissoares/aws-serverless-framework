const AWS = require("aws-sdk");

exports.handler = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const {description} = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const id = AWS.util.uuid.v4();

    let data;
    let statusCode = 0;

    const newTask = {
        id,
        description,
        createdAt,
        done: false
    };

    const params ={
        TableName: 'Tasks',
        Item: newTask
    };

    try{
        await dynamoDB.put(params).promise();

        statusCode = 200;
        data = {
            'msg': 'New task add.',
            'task': newTask
        };
    } catch (e){
        statusCode = 400;
        data = {
            'msg': 'Fail in Task creation.',
            'description': e,
            'debug': {
                'event': event,
                'newTask': newTask,
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

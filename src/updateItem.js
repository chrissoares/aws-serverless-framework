"use strict"
const AWS = require("aws-sdk");

const updateItem = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters;
    const {itemStatus} = JSON.parse(event.body);


    let data;
    let statusCode = 0;

    // let item;

    try {
        await dynamoDB.update(
            {
                TableName: "ItemTableNew",
                Key: {id},
                UpdateExpression: 'set itemStatus = :itemStatus',
                ExpressionAttributeValues: {
                    ':itemStatus': itemStatus
                },
                ReturnValues: "ALL_NEW"
            }
        ).promise();

        // items = results.Items;
        statusCode = 200;
        // data = JSON.stringify(items);
        data = JSON.stringify({
            msg: 'Item updated.'
        });
    } catch (err) {
        data = err;
        statusCode = 400;
    }

    return {
        'statusCode': statusCode,
        'body': data
    }
}

module.exports = {
    handler: updateItem
}

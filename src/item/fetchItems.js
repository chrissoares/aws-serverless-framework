"use strict"
const AWS = require("aws-sdk");

const fetchItems = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    let data;
    let statusCode = 0;

    try{
        const results = await dynamoDB.scan(
            {
                TableName: "ItemTableNew",
            }
        ).promise();

        statusCode = 200;
        data = JSON.stringify(results.Items);
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
    handler: fetchItems
}

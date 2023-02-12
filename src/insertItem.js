"use strict"

const AWS = require("aws-sdk");
const {v4} = require("uuid");

const insertItem = async(event) => {
    const {item} = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const id = v4(); //AWS.util.uuid.v4();

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    var data;
    var statusCode = 0;

    const newItem = {
        id,
        item,
        createdAt,
        itemStatus: false
    }

    try{
        await dynamoDB.put(
            {
                TableName: "ItemTableNew",
                Item:  newItem
            }
        );
        statusCode = 200;
        data = JSON.stringify(newItem);
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
    handle: insertItem
}

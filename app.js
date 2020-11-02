const express = require('express')
const fs = require('fs')

const app = express()

//this line is required to parse the request body
app.use(express.json())

//get the user data from json file
const getUserDataFromFileOne = () => {
    const jsonData = fs.readFileSync('./data/f1.json')
    return JSON.parse(jsonData)    
}

const getUserDataFromFileTwo = () => {
    const jsonData = fs.readFileSync('./data/f2.json')
    return JSON.parse(jsonData)    
}

/* Read - GET method */
app.get('/list', (req, res) => {
    
    var result = [];
    var newVal = [];
    var jsonArray;
    const dataOne = getUserDataFromFileOne()
    const dataTwo = getUserDataFromFileTwo()

    console.log("dataone.length", dataOne.length)
    console.log("datatwo.length", dataTwo.length)

    // For Each for File 1
    dataOne.forEach(element1 => {
        jsonArray = {
            groupNo: element1.group_no,
            groupId: element1.group_id,
            group_usage: element1.group_usage,
            group_version: element1.group_version,
        }
        var newNum = "associated_items";
        jsonArray[newNum] = newVal;        

        dataTwo.forEach(element2 => {

            var fetchedJson = element2

            var jsonArray2 = {
                item_description: element2.item_description,
                item_id: element2.item_id
            }
            var newNum2 = "item_usage";
            var newVal2;
            jsonArray2[newNum2] = newVal2;

            newVal.push(jsonArray2)
        })
    });
    console.log('result', result)

    
    // Created response JSON
    result.push(jsonArray);
    res.send(result)
})

//configure the server port
app.listen(3000, () => {
    console.log('Server runs on port 3000')
})
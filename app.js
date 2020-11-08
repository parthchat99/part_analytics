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
    
    let result = [];
    let newVal = [];
    let jsonArray;
    const dataOne = getUserDataFromFileOne()
    const dataTwo = getUserDataFromFileTwo()

    console.log("dataone.length", dataOne.length)
    console.log("datatwo.length", dataTwo.length)

    // For Each for File 1
    jsonArray = dataOne.map(element1 => {
        let eachEl = {...element1, ...{ associated_items: []}};

        if(eachEl.group_usage == 0) {
            return;
        }

        eachEl.group_no = eachEl.group_no == null ? eachEl.group_id: eachEl.group_no;

        let associated_items = dataTwo.map(e => {
            if( eachEl.group_no in e ) {
                if(e[eachEl.group_no] > 0) {
                    let a = {item_description: e.item_description, item_id: e.item_id, item_usage: e[eachEl.group_no]};

                    return a;
                } else {
                    return null;
                }
            }
            // else if( eachEl.group_id in e ) {
            //     if(e[eachEl.group_id] > 0) {
            //         let a = {item_description: e.item_description, item_id: e.item_id, item_usage: e[eachEl.group_id]};

            //         return a;
            //     } else {
            //         return null;
            //     }
            // }
            else {
                return null;
            }
        }).filter(e => !!e);

        eachEl.associated_items = associated_items;
        console.log('EACHEL: ',eachEl);
        return eachEl;
    });

    res.send(jsonArray.filter(e => !!e));
})

//configure the server port
app.listen(3000, () => {
    console.log('Server runs on port 3000')
})
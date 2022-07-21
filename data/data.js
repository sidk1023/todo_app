import { v4 as uuidv4 } from 'uuid';
    let collectionData=[

        {collectionName: "collection 2",
        collectionId: uuidv4(),
        tasks:[
            {
                text: "task 1",
                taskId:uuidv4(),
                date:" Wed Jul 20 2022 17:10:24 GMT+0530 (India Standard Time)",
            },
            {
                text: "task 2",
                taskId:uuidv4(),
                date:" Wed Jul 20 2022 17:10:24 GMT+0530 (India Standard Time)",
            },
            {
                text: "task 3",
                taskId:uuidv4(),
                date: " Wed Jul 20 2022 17:10:24 GMT+0530 (India Standard Time)",
            }

        ]
    },

        {collectionName: "collection 1",
        collectionId: uuidv4(),
        tasks:[
            {
                text: "task 1",
                taskId:uuidv4(),
                date:" Wed Jul 20 2022 17:10:24 GMT+0530 (India Standard Time)",
            },
            {
                text: "task 2",
                taskId:uuidv4(),
                date: " Wed Jul 20 2022 17:10:24 GMT+0530 (India Standard Time)",
            },
            {
                text: "task 3",
                taskId:uuidv4(),
                date: " Wed Jul 20 2022 17:10:24 GMT+0530 (India Standard Time)",
            }

        ]
    }
  

]



module.exports = {collectionData}
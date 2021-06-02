const dotenv = require('dotenv').config()
const { Client } = require("@notionhq/client")
const { makeConsoleLogger } = require('@notionhq/client/build/src/logging')

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

// const listDatabases = async () => {
//     const dbRes = await notion.databases.list()
//     console.log(dbRes)
// }
// const  listUsers = async () => {
//     const userRes = await notion.users.list()
//     console.log(userRes)
// }

// listDatabases()
// listUsers()

const database_id = process.env.NOTION_DATABASE_ID

const getTasks = async () => {
    const payLoad = {
        path: `databases/${database_id}/query` ,
        method: 'POST'
    }
    
    const { results } = await notion.request(payLoad)
    // console.log(results)
    //  
    const tasks = results.map((page) => {
        console.log(page.properties.Name.title[0].text.content)
        // console.log(page.properties.Status.select.name)
        return {
            id: page.id,
            title: page.properties.Name.title[0].textcontent
        }
    })
    return tasks
}

const notionTasks = getTasks()
console.log(notionTasks)
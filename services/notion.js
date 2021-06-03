const dotenv = require("dotenv").config();
const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID;

module.exports = async function getTasks() {
  const payLoad = {
    path: `databases/${database_id}/query`,
    method: "POST",
  };

  const { results } = await notion.request(payLoad);
  const tasks = results.map((page) => {
    return {
      id: page.id,
      title: page.properties.Name.title[0].text.content,
      // For Later
      // date: page.properties.Date.date.start,
      status: page.properties.Status.select.name,
      property: page.properties.Property.select.name,
    };
  });
  return tasks;
};

const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

let types = [
  // "information-technology",
  // "automobiles",
  // "aviation",
  // "cement",
  // "chemicals",
  // "construction-and-real-estate",
  // "consumer-durables",
  // "engineering",
  // "finance-and-banking",
  // "media-and-advertising",
  // "petrochemicals",
  // "pharmaceuticals",
  // "power",
  // "retail",
  // "telecom",
];

types.forEach(async (type, index) => {
  await request(
    {
      method: "GET",
      url: `http://www.a-zcompanies.com/${type}-${index + 1}.html`,
    },
    async (err, res, body) => {
      if (err) return console.error(err);
      let $ = cheerio.load(body);
      let anchors = [];
      $("a").each(function (i, e) {
        anchors.push($(this).text());
      });

      await anchors.forEach(async (company) => {
        if (company[0] == "»")
          await fs.appendFile(`${type}.txt`, company.slice(1) + "\n", () => {});
      });
    }
  );
});

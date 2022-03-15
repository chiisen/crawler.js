const request = require("request")
const cheerio = require("cheerio")

const pttCrawler = () => {
  request(
    {
      url: "https://www.ptt.cc/bbs/Stock/index.html",
      method: "GET",
    },
    (error, res, body) => {
      // 如果有錯誤訊息，或沒有 body(內容)，就 return
      if (error || !body) {
        return
      }

      const data = []
      const $ = cheerio.load(body) // 載入 body
      const list = $(".r-list-container .r-ent")
      for (let i = 0; i < list.length; i++) {
        const title = list.eq(i).find(".title a").text()
        const author = list.eq(i).find(".meta .author").text()
        const date = list.eq(i).find(".meta .date").text()
        const link = list.eq(i).find(".title a").attr("href")

        data.push({ title, author, date, link })
      }

      console.log(data)
    }
  )
}

pttCrawler()

/* routes/util.js */
const cheerio = require('cheerio');

class Utility {
  constructor() {
    this.noPost = "/images/nopost.png";
    this.playIcon = "/images/playicon.png";
  }

  getThumbUrl(content){
    const $ = cheerio.load(content);
    if($('img').length > 0)
      return $("img").first().attr("src");
    else
      return (this.noPost); 
  }
  
}//End of class

module.exports = Utility;
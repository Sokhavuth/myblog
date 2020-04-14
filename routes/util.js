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
      if($('div').hasClass('__video-id__')){
        const vidThumb = $("img").first().attr("src");
        const imgs = '<img src="'+vidThumb+'" />'+'<img class="play-icon" src="'+this.playIcon+'" />';
        return imgs;
      }else{
        const url = $("img").first().attr("src");
        const thumbUrl = '<img src="'+url+'" />';
        return (thumbUrl);
      }
    else
      return (this.noPost); 
  }
  
}//End of class

module.exports = Utility;
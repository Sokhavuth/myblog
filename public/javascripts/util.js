/* javascripts/util.js */
class Utility{
  constructor(){
    this.paginateObj = {page:0, pageSize:5};
  }

  resize(idClass){
    $(window).resize(function(){
      const width = $(idClass).css("width");
      const height = parseInt(width)/16*9;
      $(idClass).css("height", height);
    });
  }

  getPage(){
    $('.pagination img').attr('src', '/images/loading.gif');
    this.paginateObj.page += 1;
    $.ajax({
      type: 'POST',
      data: JSON.stringify(this.paginateObj),
      contentType: 'application/json',
      url: '/pagination',
      success: function(postObj){
        const postList = postObj.postList;
        var html = '';

        for(var i=0; i<postList.length; i++){
          html += '<div class="post-outer">';
            html += '<div class="thumb">';
              html += '<div class="img-outer">';
                html += '<a href="'+postList[i].url+'"><img src="'+postList[i].thumbUrl+'" /></a>';
              html += '</div><!--img-outer-->';
            html += '</div><!--thumb-->';
            html += '<div class="post-entry">';
              html += '<div class="post-title"><a href="'+postList[i].url+'">'+postList[i].title+'</a></div>';
              html += '<div class="post-date">'+postList[i].date+'</div>';
            html += '</div><!--post-entry-->';
          html += '</div><!--post-outer-->'
        }

        $('#index').append(html);
        $('.pagination img').attr('src', '/images/more.png');

      }
    });
  }

}//End of class
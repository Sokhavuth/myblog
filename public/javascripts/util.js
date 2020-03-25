/* public/javascripts/util.js */
class Utility{
  constructor(){
    this.paginateObj = {page:0, pageSize:5, category:''};
  }

  resize(idClass){
    $(window).resize(function(){
      const width = $(idClass).css("width");
      const height = parseInt(width)/16*9;
      $(idClass).css("height", height);
    });
  }

  setMobileMenu(){
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
      $('#menu').css('align-items', 'start');
    } else {
      x.className = "topnav";
      $('#menu').css('align-items', 'center');
    }
  }

  setActiveMenu(){
    const pathName = window.location.pathname;
    $("#myTopnav a").each(function(){
      if($(this).attr("href") === pathName)
        $( this ).addClass( "active" );
    });
  }

  paginateIndex(){
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

  paginateCategory(category){
    $('.pagination img').attr('src', '/images/loading.gif');
    this.paginateObj.page += 1;
    this.paginateObj.pageSize = 8;
    this.paginateObj.catetory = category;
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
              html += '<div class="post-date">'+postList[i].date+'</div>';
            html += '</div><!--thumb-->';
            html += '<div class="post-entry">';
              html += '<div class="post-title"><a href="'+postList[i].url+'">'+postList[i].title+'</a></div>';
            html += '</div><!--post-entry-->';
          html += '</div><!--post-outer-->'
        }

        $('#category').append(html);
        $('.pagination img').attr('src', '/images/more.png');

      }
    });
  }
    
}//End of class
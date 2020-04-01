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

  paginateIndex(pageSize){
    $('.pagination img').attr('src', '/images/loading.gif');
    this.paginateObj.pageSize = pageSize;
    this.paginateObj.page += 1;
    $.ajax({
      type: 'POST',
      data: JSON.stringify(this.paginateObj),
      contentType: 'application/json',
      url: '/pagination',
      success: function(postObj){
        const postList = postObj.itemList;
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

  paginateCategory(category, pageSize){
    $('.pagination img').attr('src', '/images/loading.gif');
    this.paginateObj.page += 1;
    this.paginateObj.pageSize = pageSize;
    this.paginateObj.catetory = category;
    $.ajax({
      type: 'POST',
      data: JSON.stringify(this.paginateObj),
      contentType: 'application/json',
      url: '/pagination',
      success: function(postObj){
        const postList = postObj.itemList;
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

  paginatePosts(pageNumber, event, pageSize){
    this.paginateObj.page = pageNumber;
    this.paginateObj.pageSize = pageSize;
    $('#post-list').append('<img class="loading" src="/images/loading.gif" />');
    $.ajax({
      type: 'POST',
      data: JSON.stringify(this.paginateObj),
      contentType: 'application/json',
      url: '/pagination',
      success: function(postObj){
        const postList = postObj.itemList;
        var html = '';

        for(var i=0; i<postList.length; i++){
          html += '<div id="post-title" class="post-title">';
            html += '<div class="title-wrapper">';
              html += '<a href="'+postList[i].url+'">'+postList[i].title+'</a>';
              html += '<a class="delete-edit" href="/login/delete/'+postList[i].id+'/post">delete | </a>';
              html += '<a class="delete-edit" href="/login/edit/'+postList[i].id+'">edit</a>'; 
            html += '</div><!--title-wrapper-->';
            html += '<span>'+postList[i].author+'</span>';
            html += '<span>'+postList[i].date+'</span>';
          html += '</div>';
        }

        $('#post-list').html(html);

      }
    });
  }

  paginateCategories(pageNumber, event, pageSize){
    this.paginateObj.page = pageNumber;
    this.paginateObj.pageSize = pageSize;
    this.paginateObj.type = 'categories';
    $('#category-list').append('<img class="loading" src="/images/loading.gif" />');
    $.ajax({
      type: 'POST',
      data: JSON.stringify(this.paginateObj),
      contentType: 'application/json',
      url: '/pagination',
      success: function(categoryObj){
        const categoryList = categoryObj.itemList;
        var html = '';

        for(var i=0; i < categoryList.length; i++){
          html += '<div id="category-title" class="category-title">';
            html += '<div class="title-wrapper">';
              html += '<a href="'+categoryList[i].url+'">'+categoryList[i].category+'</a>';
              html += '<a class="delete-edit" href="/login/delete/'+categoryList[i].category+'/category">delete | </a>';
              html += '<a class="delete-edit" href="/login/edit/'+categoryList[i].category+'">edit</a>'; 
            html += '</div><!--title-wrapper-->';
            html += '<span>'+categoryList[i].author+'</span>';
            html += '<span>'+categoryList[i].date+'</span>';
          html += '</div>';
        }

        $('#category-list').html(html);

      }
    });
  }
    
}//End of class
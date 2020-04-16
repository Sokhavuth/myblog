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
    this.paginateObj.type = "post";
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
                html += '<a href="'+postList[i].url+'">'+postList[i].thumbUrl+'</a>';
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
    this.paginateObj.category = category;
    this.paginateObj.type = "category";
    
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
                html += '<a href="'+postList[i].url+'">'+postList[i].thumbUrl+'</a>';
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
    this.paginateObj.type = "post";
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
              html += '<a class="delete-edit" href="/login/edit/'+postList[i].id+'/post">edit</a>'; 
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

  paginatePages(pageNumber, event, pageSize){
    this.paginateObj.page = pageNumber;
    this.paginateObj.pageSize = pageSize;
    this.paginateObj.type = 'page';
    $('#page-list').append('<img class="loading" src="/images/loading.gif" />');
    $.ajax({
      type: 'POST',
      data: JSON.stringify(this.paginateObj),
      contentType: 'application/json',
      url: '/pagination',
      success: function(pageObj){
        const pageList = pageObj.itemList;
        var html = '';

        for(var i=0; i < pageList.length; i++){
          html += '<div id="page-title" class="page-title">';
            html += '<div class="title-wrapper">';
              html += '<a href="'+pageList[i].url+'">'+pageList[i].title+'</a>';
              html += '<a class="delete-edit" href="/login/delete/'+pageList[i].id+'/page">delete | </a>';
              html += '<a class="delete-edit" href="/login/edit/'+pageList[i].id+'/page">edit</a>'; 
            html += '</div><!--title-wrapper-->';
            html += '<span>'+pageList[i].author+'</span>';
          html += '</div>';
        }

        $('#page-list').html(html);

      }
    });
  }

  setPlaylist(playlist,postId){
    $.ajax({
      type: 'POST',
      data: JSON.stringify({playlist:playlist}),
      contentType: 'application/json',
      url: '/playlist',
      success: function(postObj){
        const postList = postObj.itemList;
        var html = '';
        
        html = ('<div id="relatedPosts" >');
        for(var i=0; i<postList.length; i++){
          
          html += ('<a href="'+postList[i].url+'">');
          if(postList[i].id === postId)
            html += ('<div class="div-part active" id="Part'+i+'" >');
          else
            html += ('<div class="div-part" id="Part'+i+'" >');
          html += (postList[i].thumbUrl);
          html += ('<div class="episode">'+(postList.length-i)+'</div>');
          html += ('</div>');
          html += ('</a>');
        }  
        html += ('</div>');

        $('#KBPlayer').append(html);

        $(document).ready(function(){
          $('#relatedPosts').css({'display':'grid', 'grid-template-columns':'calc(33.333% - 4px) calc(33.333% - 4px) calc(33.333% - 4px)','grid-gap':'3px 6px'});
          $('#relatedPosts .div-part').css({'position':'relative'});
          $('#relatedPosts img').css({'width':'100%'});
          //$('#relatedPosts a').css({'display':'block'});
          $('#relatedPosts .episode').css({'position':'absolute','top':'5px','right':'5px','color':'white','background':'#00b3b3','padding':5,'border-radius':'50%'});
          $('#relatedPosts .play-icon').css({'position':'absolute','top':'50%','left':'50%','transform':'translate(-50%,-50%)','width':'25%'});
          $('#relatedPosts .active img').css('opacity', '.5');
          $('#relatedPosts').css({'height':'440px','overflow-y':'scroll'});
          $(".active")[0].scrollIntoView();

        });
        
      }
    });
  }

  setPostVid(postId,id){
    var playlist = document.createElement( 'div' );
    var description = document.createElement( 'div');
    var post = document.getElementById(postId);
    var kbplayer = document.getElementById("KBPlayer");
    var Playlistt = [];
    
    var str = post.getElementsByClassName("__video-id__")[0].getAttribute("data-id");
    playlist.innerHTML = post.getElementsByClassName("__playlist__")[0].getAttribute("data-pl");
    description.innerHTML = post.getElementsByClassName("__description__")[0].innerHTML;
    
    kbplayer.parentElement.insertBefore(description, kbplayer.nextSibling);
    var startIndex = str.indexOf('{');
    var endIndex = str.indexOf('}');
    var vidId = str.slice(startIndex+1,endIndex);
  
    
    if(str.indexOf('googledrive') != -1){
      var iframeSrc = 'https://docs.google.com/file/d/'+vidId+'/preview';
  
    }
    
    else if(str.indexOf('youtube') != -1){
      var iframeSrc = '//www.youtube.com/embed/'+vidId;
  
    }
  
    else if(str.indexOf('dailymotion') != -1){
      var iframeSrc = '//www.dailymotion.com/embed/video/'+vidId+'?logo=0&info=0';
  
    }
  
    else if(str.indexOf('vimeo') != -1){
      var iframeSrc = '//player.vimeo.com/video/'+vidId;
  
    }
  
    else if(str.indexOf('facebookvid') != -1){
      var iframeSrc = 'https://www.facebook.com/video.php?v='+vidId;
    }
     
    if(str.indexOf('facebookvid') != -1){
      var postContent = '<p width="100%" id="fb-outer">';
      postContent += '<div class="fb-video" data-width="500" data-autoplay="false" data-allowfullscreen="true" data-href="'+iframeSrc+'"></div>';
      postContent += '</p>'; 
     }
      
    else{
      var postContent = '<iframe id="player" src="'+iframeSrc+'" width="100%" heigh="150" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen SCROLLING=NO ></iframe>';
     }
     
    post.innerHTML = postContent;
  
    var Player = post.getElementsByTagName('iframe');
     
    if(str.indexOf('facebookvid') != -1){
      var vidWidth = post.getElementsByTagName('p');
      var Player = post.getElementsByTagName('div');
      Player[0].setAttribute("data-width", vidWidth[0].clientWidth);
    }
    else{
     var vidWidth = Player[0].clientWidth;
     Player[0].height = vidWidth / 16 * 9;
    } 
     
    str = playlist.innerHTML;
     if(str.indexOf('pl') != -1){
      var startIndex = str.indexOf('[');
      var endIndex = str.indexOf(']');
      const pl = str.slice(startIndex+1,endIndex);
      this.setPlaylist(pl,id);
     }   
  }
    
}//End of class
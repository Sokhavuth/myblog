function __KBclass__(){
  this.today = this.srvTime();
  this.playIcon = "https://2.bp.blogspot.com/-HLyhNtKqSak/XbbZU8DHlzI/AAAAAAABkhE/aNM25cGV9UEVi3F1fXgNAhaRR24nMzC6ACLcBGAsYHQ/s1600/play.png";
  this.noPost = "https://4.bp.blogspot.com/-c_UbOIQDU7Q/XOiSfafoaGI/AAAAAAABino/CO8QB6urSIIGrp5t0JuQIyXwJJtjmV9uQCLcBGAs/s1600/no_post.png";
}

__KBclass__.prototype.toKhNum = function (number) {
  this.khNum = {'0':'០', '1':'១', '2':'២', '3':'៣', '4':'៤', '5':'៥', '6':'៦', '7':'៧', '8':'៨', '9':'៩'};
  var stringNum = number.toString();
  var khString = '';
 
  for(var i in stringNum){
    var char = stringNum.charAt(i);
    khString += this.khNum[char];
  }
 
  return khString;
}

__KBclass__.prototype.getKhDate = function (rawDate){
  this.KhmerDays = ['អាទិត្យ', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];
  this.KhmerMonths = ['មករា', 'កុម្ភៈ', 'មិនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];
  var date = new Date(rawDate);
  this.month = date.getMonth();
  this.day = date.getDay();
  this.daym = this.toKhNum(date.getDate());
  this.year = this.toKhNum(date.getFullYear());
  this.time = date.toLocaleTimeString();
  return ('ថ្ងៃ '+this.KhmerDays[this.day]+' ទី '+this.daym+' '+this.KhmerMonths[this.month]+' '+this.year)
}

__KBclass__.prototype.srvTime = function(){
  var xmlHttp;
  try {
    //FF, Opera, Safari, Chrome
    xmlHttp = new XMLHttpRequest();
  }
  catch (err1) {
    //IE
    try {
      xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
    }
    catch (err2) {
      try {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
      }
      catch (eerr3) {
        //AJAX not supported, use CPU time.
        alert("AJAX not supported");
      }
    }
  }
  xmlHttp.open('HEAD',window.location.href.toString(),false);
  xmlHttp.setRequestHeader("Content-Type", "text/html");
  xmlHttp.send();
  return xmlHttp.getResponseHeader("Date");
}

__KBclass__.prototype.elapTime = function(rawDate){
  var seconds = 1000;
  var minutes = seconds * 60;
  var hours = minutes * 60;
  var days = hours * 24;
  var weeks = days * 7;
  var months = days * 30.5;
  var years = days * 365;
  var todayDate = new Date(this.today);
  var t = todayDate.getTime();

  var publishedDate = new Date(rawDate);
  var pt = publishedDate.getTime();
  var time = t - pt;
      
  if((time / years)>1){
    var ptime = Math.round(time / years);
    ptime = __KBobject__.toKhNum(ptime)+' '+'ឆ្នាំ​មុន';
  }else if((time / months)>1){
    var ptime = Math.round(time / months);
    ptime = __KBobject__.toKhNum(ptime)+' '+'ខែ​មុន';
  }else if((time / weeks)>1){
    var ptime = Math.round(time / weeks);
    ptime = __KBobject__.toKhNum(ptime)+' '+'សប្តាហ៍​មុន';
  }else if((time / days)>1){
    var ptime = Math.round(time / days);
    ptime = __KBobject__.toKhNum(ptime)+' '+'ថ្ងៃមុន';
  }else if((time / hours)>1){
    var ptime = Math.round(time / hours);
    ptime = __KBobject__.toKhNum(ptime)+' '+'ម៉ោង​មុន';
  }else if((time / minutes)>1){
    var ptime = Math.round(time / minutes);
    ptime = __KBobject__.toKhNum(ptime)+' '+'នាទី​មុន';
  }else{
    var ptime = Math.round(time / seconds);
    ptime = __KBobject__.toKhNum(ptime)+' '+'វិនាទី​មុន';
  }
  return ptime;
}

__KBclass__.prototype.createSummaryAndThumb = function (pID,postLink,postTitle,postDate,postType){
  var div = document.getElementById(pID);
  var str = $('#'+pID).html();  
  var imgtag = "";
  var img = div.getElementsByTagName("img");

  if(img.length>=1) {
    if(str.indexOf('__video-id__') != -1){ 
      imgtag = '<a class="img-frame" href="'+postLink+'">';
      imgtag += '<img src="'+img[0].src+'" class="vid-img" />';
      imgtag += '<img class="play-icon" src="'+this.playIcon+'" />';
      imgtag += '</a>';

    }else{
      imgtag = '<a class="img-frame" href="'+postLink+'"><img src="'+img[0].src+'" class="post-sum-img vid-img" /></a>';
    } 
  }else{
    img = this.noPost;
    imgtag = '<a class="img-frame" href="'+postLink+'"><img src="'+img+'" class="post-sum-img" /></a>';  
  }
  if(postType == "list"){
    this.summary = '<div>';
    this.summary += '<div class="post-title"><a href="'+postLink+'">'+postTitle+'</a></div>';
    this.summary += '<div class="post-date-sum">'+postDate+'</div>';
    this.summary += '</div>';
  }else{
    this.summary = '<div>';
    this.summary += '<div class="post-date-sum">'+postDate+'</div>';
    this.summary += '<div class="post-title"><a href="'+postLink+'">'+postTitle+'</a></div>';
    this.summary += '</div>';
  }

  div.innerHTML = imgtag+this.summary;
}

__KBclass__.prototype.createThumb = function (postContent){
  var div = document.createElement( 'div' );
  div.innerHTML = postContent;
  var img = div.getElementsByTagName("img");
  
  if(img.length>=1) {
    return img[0].src;
  }else{
    return (this.noPost);
  }
    
}

__KBclass__.prototype.getPost =  function (json){
  this.postUrl = [];
  this.postTitle = [];
  this.postThumb = [];
  this.postDate = [];
  this.postIdList = [];
  this.postData = [];

  var postList = json;

  this.postList = postList;
  for(var i =0; i<postList.length; i++){
    this.postUrl.push(postList[i].link);
    var postContent = postList[i].content.rendered;
    this.postData.push(postContent);
    this.postIdList.push(this.postList[i].id);
    this.postTitle.push(postList[i].title.rendered);
    this.postThumb.push(this.createThumb(postContent));
    this.postDate.push(postList[i].date);
  }
}

__KBclass__.prototype.setPostCategory = function(wrapper){
  var html = '<div class="grid-container">';
  for (var i=0; i<this.postData.length; i++){
    var str = this.postData[i];
    
      if(str.indexOf('__video-id__') != -1){ 
        html += '<a class="img-frame" href="'+this.postUrl[i]+'">';
        html += '<img src="'+this.postThumb[i]+'" class="vid-img" />';
        html += '<img class="play-icon" src='+this.playIcon+' />';
        html += '<div class="post-date">'+__KBobject__.elapTime(this.postDate[i])+'</div>';
        html += '<div class="post-title">'+this.postTitle[i]+'</div>';
        html += '</a>';
      }else{
        html += '<a class="img-frame" href="'+this.postUrl[i]+'">';
        html += '<img src="'+this.postThumb[i]+'" class="vid-img" />';
        html += '<div class="post-date">'+__KBobject__.elapTime(this.postDate[i])+'</div>';
        html += '<div class="post-title">'+this.postTitle[i]+'</div>';
        html += '</a>';
      }
    
  }
  html += '</div>';
  
  if(wrapper=='.latest .container')
    $(wrapper).html(html);
  else{
    $(wrapper).append(html);
    $('.load-more img').attr('src', 'https://1.bp.blogspot.com/-BkwcAY5Tx1k/XPKljLQVjGI/AAAAAAABivI/V51q279ZeBM0ImjosNk78A9AbN_FZIHMQCLcBGAs/s1600/load_more.png');
  }

  var width = $(wrapper+' .grid-container:last-child .img-frame:first-child').css('width');
  this.categoryHeight = parseInt(width)/16*9;
  if(wrapper=='.latest .container'){
    if(window.innerWidth>768){
      $(wrapper+' .img-frame:first-child').css({'grid-column':'1 / span 2','grid-row':'1 / span 2'});
      var width = $(wrapper+' .img-frame:first-child').css('width');
      this.bigHeight = parseInt(width)/16*9-2;
    }else{
      var width = $(wrapper+' .img-frame:first-child').css('width');
      this.bigHeight = parseInt(width)/16*9;
    }
  }
  
}

__KBclass__.prototype.adjustFrames = function(wrapper){
  $(wrapper+' .grid-container:last-child  .img-frame').css('height',this.categoryHeight);
  if(wrapper=='.latest .container')
    $(wrapper+' .img-frame:first-child').css('height',this.bigHeight+4);
}

__KBclass__.prototype.getPostsByCategory = function(options){
  var rootDir = options.rootDir || __rootDir__;
  var category = options.category || '';
  var posts = options.posts || 9;
  var page = options.page || 1;
  var wrapper = options.wrapper;

  $.ajax({url: rootDir+"/wp-json/wp/v2/posts?per_page="+posts+"&categories="+category+"&page="+page, success: function(json){
    __KBobject__.getPost(json);
    __KBobject__.setPostCategory(wrapper);
    __KBobject__.adjustFrames(wrapper);
    if(!options.posts)
      __KBobject__.currentPage = page;

  }});
}

__KBclass__.prototype.setPostVid = function (postId,rootDir){
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
    fbLink = 'https://www.facebook.com/video.php?v='+vidId;
    fbVid = true;
    
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
     this.pl = str.slice(startIndex+1,endIndex);

     $.ajax({url: rootDir+"/wp-json/wp/v2/posts?order=asc&tags="+this.pl, success: function(json){
      __KBobject__.getRelatedPost(json);    
     }});
   }   
}

__KBclass__.prototype.getRelatedPost  = function (json){
  var partTitle = document.getElementsByTagName('title');
  partTitle = partTitle[0].innerHTML;
  
  this.getPost(json);

  var html = '';
  var focusPart = '';

  html = ('<div id="relatedPosts" >');
  for(var i=this.postList.length-1;i>-1; i--){
    html += ('<a href="'+this.postUrl[i]+'">');
    html += ('<div class="div-part" id="Part'+i+'" >');
    html += ('<img class="thumb-part" src="'+this.postThumb[i]+'" />');
    html += (this.postTitle[i]);
    html += ('</div>');
    html += ('</a>');
    if(partTitle.indexOf(this.postTitle[i]) != -1){
     focusPart = 'Part'+i;
    } 
  }  
  html += ('</div>');
  
    $('#KBPlayer').append(html);

    $('#'+focusPart).css('background-color', '#282828');
    $('#'+focusPart).css('color', 'orange');

    var Player = $("#relatedPosts  img").css("width");
    var playerHeight = parseInt(Player)/16*9;
    $("#relatedPosts  .thumb-part").css("height",playerHeight);
    $("#relatedPosts  .div-part").css("height",playerHeight+11);

    var container = $('#relatedPosts');
    var element = $('#'+focusPart);

    container.animate({
      scrollTop: container.scrollTop = container.scrollTop() + element.offset().top - container.offset().top
    }, {
      duration: 1000,
      specialEasing: {
        width: 'linear',
        height: 'easeOutBounce'
      },
      complete: function (e) {
        //console.log("animation completed");
      }
    });
    
}

__KBclass__.prototype.adjustHeight = function (idClass){
  var width = $(idClass).css('width');
  var height = parseInt(width)/16*9;
  $(idClass).css('height',height);
}

var __KBobject__ = new __KBclass__();


/**
 * jQuery.marquee - scrolling text like old marquee element
 * @author Aamir Afridi - aamirafridi(at)gmail(dot)com / http://aamirafridi.com/jquery/jquery-marquee-plugin
 */
(function($){$.fn.marquee=function(options){return this.each(function(){var o=$.extend({},$.fn.marquee.defaults,options),$this=$(this),$marqueeWrapper,containerWidth,animationCss,verticalDir,elWidth,loopCount=3,playState='animation-play-state',css3AnimationIsSupported=!1,_prefixedEvent=function(element,type,callback){var pfx=["webkit","moz","MS","o",""];for(var p=0;p<pfx.length;p++){if(!pfx[p])type=type.toLowerCase();element.addEventListener(pfx[p]+type,callback,!1)}},_objToString=function(obj){var tabjson=[];for(var p in obj){if(obj.hasOwnProperty(p)){tabjson.push(p+':'+obj[p])}}
tabjson.push();return'{'+tabjson.join(',')+'}'},_startAnimationWithDelay=function(){$this.timer=setTimeout(animate,o.delayBeforeStart)},methods={pause:function(){if(css3AnimationIsSupported&&o.allowCss3Support){$marqueeWrapper.css(playState,'paused')}else{if($.fn.pause){$marqueeWrapper.pause()}}
$this.data('runningStatus','paused');$this.trigger('paused')},resume:function(){if(css3AnimationIsSupported&&o.allowCss3Support){$marqueeWrapper.css(playState,'running')}else{if($.fn.resume){$marqueeWrapper.resume()}}
$this.data('runningStatus','resumed');$this.trigger('resumed')},toggle:function(){methods[$this.data('runningStatus')=='resumed'?'pause':'resume']()},destroy:function(){clearTimeout($this.timer);$this.find("*").addBack().off();$this.html($this.find('.js-marquee:first').html())}};if(typeof options==='string'){if($.isFunction(methods[options])){if(!$marqueeWrapper){$marqueeWrapper=$this.find('.js-marquee-wrapper')}
if($this.data('css3AnimationIsSupported')===!0){css3AnimationIsSupported=!0}
methods[options]()}
return}
var dataAttributes={},attr;$.each(o,function(key,value){attr=$this.attr('data-'+key);if(typeof attr!=='undefined'){switch(attr){case 'true':attr=!0;break;case 'false':attr=!1;break}
o[key]=attr}});if(o.speed){o.duration=parseInt($this.width(),10)/o.speed*1000}
verticalDir=o.direction=='up'||o.direction=='down';o.gap=o.duplicated?parseInt(o.gap):0;$this.wrapInner('<div class="js-marquee"></div>');var $el=$this.find('.js-marquee').css({'margin-right':o.gap,'float':'left'});if(o.duplicated){$el.clone(!0).appendTo($this)}
$this.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');$marqueeWrapper=$this.find('.js-marquee-wrapper');if(verticalDir){var containerHeight=$this.height();$marqueeWrapper.removeAttr('style');$this.height(containerHeight);$this.find('.js-marquee').css({'float':'none','margin-bottom':o.gap,'margin-right':0});if(o.duplicated)$this.find('.js-marquee:last').css({'margin-bottom':0});var elHeight=$this.find('.js-marquee:first').height()+o.gap;if(o.startVisible&&!o.duplicated){o._completeDuration=((parseInt(elHeight,10)+parseInt(containerHeight,10))/parseInt(containerHeight,10))*o.duration;o.duration=(parseInt(elHeight,10)/parseInt(containerHeight,10))*o.duration}else{o.duration=((parseInt(elHeight,10)+parseInt(containerHeight,10))/parseInt(containerHeight,10))*o.duration}}else{elWidth=$this.find('.js-marquee:first').width()+o.gap;containerWidth=$this.width();if(o.startVisible&&!o.duplicated){o._completeDuration=((parseInt(elWidth,10)+parseInt(containerWidth,10))/parseInt(containerWidth,10))*o.duration;o.duration=(parseInt(elWidth,10)/parseInt(containerWidth,10))*o.duration}else{o.duration=((parseInt(elWidth,10)+parseInt(containerWidth,10))/parseInt(containerWidth,10))*o.duration}}
if(o.duplicated){o.duration=o.duration/2}
if(o.allowCss3Support){var
elm=document.body||document.createElement('div'),animationName='marqueeAnimation-'+Math.floor(Math.random()*10000000),domPrefixes='Webkit Moz O ms Khtml'.split(' '),animationString='animation',animationCss3Str='',keyframeString='';if(elm.style.animation!==undefined){keyframeString='@keyframes '+animationName+' ';css3AnimationIsSupported=!0}
if(css3AnimationIsSupported===!1){for(var i=0;i<domPrefixes.length;i++){if(elm.style[domPrefixes[i]+'AnimationName']!==undefined){var prefix='-'+domPrefixes[i].toLowerCase()+'-';animationString=prefix+animationString;playState=prefix+playState;keyframeString='@'+prefix+'keyframes '+animationName+' ';css3AnimationIsSupported=!0;break}}}
if(css3AnimationIsSupported){animationCss3Str=animationName+' '+o.duration/1000+'s '+o.delayBeforeStart/1000+'s infinite '+o.css3easing;$this.data('css3AnimationIsSupported',!0)}}
var _rePositionVertically=function(){$marqueeWrapper.css('transform','translateY('+(o.direction=='up'?containerHeight+'px':'-'+elHeight+'px')+')')},_rePositionHorizontally=function(){$marqueeWrapper.css('transform','translateX('+(o.direction=='left'?containerWidth+'px':'-'+elWidth+'px')+')')};if(o.duplicated){if(verticalDir){if(o.startVisible){$marqueeWrapper.css('transform','translateY(0)')}else{$marqueeWrapper.css('transform','translateY('+(o.direction=='up'?containerHeight+'px':'-'+((elHeight*2)-o.gap)+'px')+')')}}else{if(o.startVisible){$marqueeWrapper.css('transform','translateX(0)')}else{$marqueeWrapper.css('transform','translateX('+(o.direction=='left'?containerWidth+'px':'-'+((elWidth*2)-o.gap)+'px')+')')}}
if(!o.startVisible){loopCount=1}}else if(o.startVisible){loopCount=2}else{if(verticalDir){_rePositionVertically()}else{_rePositionHorizontally()}}
var animate=function(){if(o.duplicated){if(loopCount===1){o._originalDuration=o.duration;if(verticalDir){o.duration=o.direction=='up'?o.duration+(containerHeight/((elHeight)/o.duration)):o.duration*2}else{o.duration=o.direction=='left'?o.duration+(containerWidth/((elWidth)/o.duration)):o.duration*2}
if(animationCss3Str){animationCss3Str=animationName+' '+o.duration/1000+'s '+o.delayBeforeStart/1000+'s '+o.css3easing}
loopCount++}
else if(loopCount===2){o.duration=o._originalDuration;if(animationCss3Str){animationName=animationName+'0';keyframeString=$.trim(keyframeString)+'0 ';animationCss3Str=animationName+' '+o.duration/1000+'s 0s infinite '+o.css3easing}
loopCount++}}
if(verticalDir){if(o.duplicated){if(loopCount>2){$marqueeWrapper.css('transform','translateY('+(o.direction=='up'?0:'-'+elHeight+'px')+')')}
animationCss={'transform':'translateY('+(o.direction=='up'?'-'+elHeight+'px':0)+')'}}else if(o.startVisible){if(loopCount===2){if(animationCss3Str){animationCss3Str=animationName+' '+o.duration/1000+'s '+o.delayBeforeStart/1000+'s '+o.css3easing}
animationCss={'transform':'translateY('+(o.direction=='up'?'-'+elHeight+'px':containerHeight+'px')+')'};loopCount++}else if(loopCount===3){o.duration=o._completeDuration;if(animationCss3Str){animationName=animationName+'0';keyframeString=$.trim(keyframeString)+'0 ';animationCss3Str=animationName+' '+o.duration/1000+'s 0s infinite '+o.css3easing}
_rePositionVertically()}}else{_rePositionVertically();animationCss={'transform':'translateY('+(o.direction=='up'?'-'+($marqueeWrapper.height())+'px':containerHeight+'px')+')'}}}else{if(o.duplicated){if(loopCount>2){$marqueeWrapper.css('transform','translateX('+(o.direction=='left'?0:'-'+elWidth+'px')+')')}
animationCss={'transform':'translateX('+(o.direction=='left'?'-'+elWidth+'px':0)+')'}}else if(o.startVisible){if(loopCount===2){if(animationCss3Str){animationCss3Str=animationName+' '+o.duration/1000+'s '+o.delayBeforeStart/1000+'s '+o.css3easing}
animationCss={'transform':'translateX('+(o.direction=='left'?'-'+elWidth+'px':containerWidth+'px')+')'};loopCount++}else if(loopCount===3){o.duration=o._completeDuration;if(animationCss3Str){animationName=animationName+'0';keyframeString=$.trim(keyframeString)+'0 ';animationCss3Str=animationName+' '+o.duration/1000+'s 0s infinite '+o.css3easing}
_rePositionHorizontally()}}else{_rePositionHorizontally();animationCss={'transform':'translateX('+(o.direction=='left'?'-'+elWidth+'px':containerWidth+'px')+')'}}}
$this.trigger('beforeStarting');if(css3AnimationIsSupported){$marqueeWrapper.css(animationString,animationCss3Str);var keyframeCss=keyframeString+' { 100%  '+_objToString(animationCss)+'}',$styles=$marqueeWrapper.find('style');if($styles.length!==0){$styles.filter(":last").html(keyframeCss)}else{$('head').append('<style>'+keyframeCss+'</style>')}
_prefixedEvent($marqueeWrapper[0],"AnimationIteration",function(){$this.trigger('finished')});_prefixedEvent($marqueeWrapper[0],"AnimationEnd",function(){animate();$this.trigger('finished')})}else{$marqueeWrapper.animate(animationCss,o.duration,o.easing,function(){$this.trigger('finished');if(o.pauseOnCycle){_startAnimationWithDelay()}else{animate()}})}
$this.data('runningStatus','resumed')};$this.on('pause',methods.pause);$this.on('resume',methods.resume);if(o.pauseOnHover){$this.on('mouseenter',methods.pause);$this.on('mouseleave',methods.resume)}
if(css3AnimationIsSupported&&o.allowCss3Support){animate()}else{_startAnimationWithDelay()}})};$.fn.marquee.defaults={allowCss3Support:!0,css3easing:'linear',easing:'linear',delayBeforeStart:1000,direction:'left',duplicated:!1,duration:5000,speed:0,gap:20,pauseOnCycle:!1,pauseOnHover:!1,startVisible:!1}})(jQuery);

$(function() {

  /**
   * Declare variables.
   */
  /* Gallery mode. "small" or "expanded" according to the picture size. */
  var mode = 'small';
  /* Index of the last clicked image. */
  var current = 0;
  /* Total number of images. */
  var numberOfImages = 0;

  /* Recurrent variable */
  var $magnifier = $('.magnifier');

  /**
   * Initialize modules.
   */
  buildThumbs();

  /**
   * Load images by clicking on a thumbnail.
   * The image's path is on the thumb's alt attribute.
   */
  $('#thumbsContainer img').on('click', function() {
    loadPhoto($(this), 'cursorPlus');
  }).on('mouseover', function() {
    var $this   = $(this);
    $this.stop().animate({'opacity':'1.0'}, 200);
  }).on('mouseout', function() {
     var $this   = $(this);
    $this.stop().animate({'opacity':'0.4'}, 200);
  });

  $(window).bind('resize', function() {
    resize($('#displayed'),0);
  });

  /**
   * Build the thumbs container.
   */
  function buildThumbs(){
    current=1;
    $('#imageWrapper').empty();
    $('#loading').show();

    var count = 0;
    var countImages = $('#thumbsContainer img').size();
    $('#thumbsContainer img').each(function(){
        numberOfImages++;
        var $this = $(this);
        ++count;
        if(count==1){
          /* load 1 image into container*/
          $('<img id="displayed" class="cursorPlus" style="display:block;"/>').load(function(){
            var $first = $(this);
            $('#loading').hide();
            resize($first,0);
            $('#imageWrapper').append($first);
          }).attr('src',$this.attr('alt'));
        }
        if(count == countImages){
          thumbsDim($('#thumbsContainer'));
          if($('#thumbsWrapper').width() > $(window).width()) {

                makeScrollable($('#thumbsWrapper'),$('#thumbsContainer'),15);

              } else {

                $('#thumbsWrapper').unbind('mousemove');
                $('#thumbsWrapper').css('left', $(window).width()/2 - $('#thumbsWrapper').width()/2);

              }
        }
    });
  };


  function thumbsDim($elem){
    var finalW = 0;
    finalW += numberOfImages*(80+4);
    finalW += 1;
    $elem.css('width',finalW+'px').css('visibility','visible');
    $('#thumbsWrapper').css('width',finalW+'px').css('visibility','visible');
  }


  function loadPhoto($thumb, cursorClass) {
    current = $thumb.index()+1;
    $('#imageWrapper').empty();
    $('#descriptionWrapper').hide();
    $('#credits p').html($thumb.attr('title'))
    var img = $('<img id="displayed" class="cursorClass" style="display:none;" title="'+$thumb.attr('title')+'"/>').load(function(){
      var $this = $(this);
      resize($this,0);
      if(!$('#imageWrapper').find('img').length){
                            $('#imageWrapper').append($this.fadeIn(1000));
                            $('.album-credits p').html($this.attr('title'));
                        }
    }).attr('src',$thumb.attr('alt'));

    return img
  }

  //Get our elements for faster access and set overlay width
  function makeScrollable($wrapper, $container, contPadding){
    //Get menu width
    /*var divWidth = $wrapper.width();

    //Remove scrollbars
    $wrapper.css({overflow: 'hidden'});

    //Find last image container
    var lastLi = $container.find('img:last-child');
    $wrapper.scrollLeft(0);
    //When user move mouse over menu
    $wrapper.unbind('mousemove').bind('mousemove',function(e){

      //As images are loaded ul width increases,
      //so we recalculate it each time
      var ulWidth = lastLi[0].offsetLeft + lastLi.outerWidth() + contPadding;

      var left = (e.pageX - $wrapper.offset().left) * (ulWidth-divWidth) / divWidth;
      $wrapper.scrollLeft(left);
    });*/

    var rectangleWidth = $(window).width() - 40;
    var containerWidth = $container.width();

    $wrapper.unbind('mousemove').bind('mousemove',function(e){

      var left = ((containerWidth-rectangleWidth)/rectangleWidth) * (e.pageX - 20);
      $wrapper.css('left', 20-left);

    });

  }

  function resize($image, type){

    var widthMargin   = 10
    var heightMargin  = 0;
    if(mode=='expanded')
      heightMargin = 110;
    else if(mode=='small')
      heightMargin = 200;
    //type 1 is animate, type 0 is normal
    var windowH      = $(window).height()-heightMargin;
    var windowW      = $(window).width()-widthMargin;
    var theImage     = new Image();
    theImage.src     = $image.attr("src");
    var imgwidth     = theImage.width;
    var imgheight    = theImage.height;

    if((imgwidth > windowW)||(imgheight > windowH)){
      if(imgwidth > imgheight){
        var newwidth = windowW;
        var ratio = imgwidth / windowW;
        var newheight = imgheight / ratio;
        theImage.height = newheight;
        theImage.width= newwidth;
        if(newheight>windowH){
          var newnewheight = windowH;
          var newratio = newheight/windowH;
          var newnewwidth =newwidth/newratio;
          theImage.width = newnewwidth;
          theImage.height= newnewheight;
        }
      }
      else{
        var newheight = windowH;
        var ratio = imgheight / windowH;
        var newwidth = imgwidth / ratio;
        theImage.height = newheight;
        theImage.width= newwidth;
        if(newwidth>windowW){
          var newnewwidth = windowW;
          var newratio = newwidth/windowW;
          var newnewheight =newheight/newratio;
          theImage.height = newnewheight;
          theImage.width= newnewwidth;
        }
      }
    }
        if((type==1)&&(!$.browser.msie))
            $image.stop(true).animate({
                'width':theImage.width+'px',
                'height':theImage.height+'px'
            },1000);
    else
            $image.css({
                'width':theImage.width+'px',
                'height':theImage.height+'px'
            });

        if($('#thumbsWrapper').width() > $(window).width()) {

          makeScrollable($('#thumbsWrapper'),$('#thumbsContainer'),15);

        } else {

          $('#thumbsWrapper').unbind('mousemove');
          $('#thumbsWrapper').css('left', $(window).width()/2 - $('#thumbsWrapper').width()/2);

        }
  }

  $('#menu').animate({left:"-390px"});

  /*$('#menu').hover(function () {
      $(this).animate({left:"0"});
    }, function () {
      $(this).animate({left:"-390px"});
    });*/

    function makeLarge() {

      $('#menu').animate({left:"0"});

    }

    function makeShort() {

      $('#menu').animate({left:"-390px"});

    }

  $("#menu")
        .hover(function() {
            $(this).stop().animate({ left: 0 }, 'normal');
        }, function() {
            $(this).stop().animate({ left: "-390px" }, 'normal');
    });

    $('#header').hover(function () {
      $('#home').show();
    }, function () {
      $('#home').hide();
    });

    if($('#thumbsWrapper').width() > $(window).width()) {

      $('#thumbsWrapper').css('left', 20);
      makeScrollable($('#thumbsWrapper'),$('#thumbsContainer'),15);

    } else {

      $('#thumbsWrapper').unbind('mousemove');
      $('#thumbsWrapper').css('left', $(window).width()/2 - $('#thumbsWrapper').width()/2);

    }


  function appendImageToMagnifier ($img) {
    $img.clone().appendTo($magnifier).css({
      'width' : 'auto',
      'height': '100%',
      'display': 'inline',
      'opacity': 1
    });

    $magnifier.css('display', 'table-cell');
  }

  // Hide "next" if last image. Hide "prev" if first.
  function updateDirButtonsVisibility(){
    $magnifier.find('.button').show();
    if (current === 1 ){
      $magnifier.find('.button[data-dir="prev"]').hide();
    } else if (current === numberOfImages){
      $magnifier.find('.button[data-dir="next"]').hide();
    }
  }

  $('#preview').click(function() {
    var image = $(this).find('img'),
        imageRatio = image.width() / image.height(),
        containerRatio = $magnifier.width() / $magnifier.height();

    updateDirButtonsVisibility();
    appendImageToMagnifier(image);

  });

  $magnifier.click(function() {
    $(this).hide();
    $(this).find('img').remove();
  });

  $magnifier.find('.button').on('click', function(e){
    // Prevent hiding div.magnifier when one of the buttons is clicked
    e.stopPropagation();
    var dir = $(this).data('dir');
    // Move to previous or next image. The modulo operation allows skipping to the first
    // image when reaching the last image and the dir="next". The false action doesn't need
    // it since when arriving to the first image and hitting the dir="prev" the current
    // variable will be set to -1 which the .get() method will interpret as the last element
    // from the thumbs set.
    var newThumbPosition = (dir === 'next') ? (current + 1) % numberOfImages : current - 1;
    var newThumb = $('#thumbsContainer img').get(newThumbPosition - 1); // -1 since get is zero-based
    var newImg = loadPhoto($(newThumb), 'cursorPlus');

    $magnifier.find('img').remove();
    updateDirButtonsVisibility();
    appendImageToMagnifier($(newImg));
  });
});

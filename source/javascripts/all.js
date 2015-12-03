//= require_tree .

$(document).ready(function() {

  // Recurring variables.
  var background = $('.cover-background')

  // Resize cover images.
  function resize() {

    var images = background.children('img');
    var imageRatio = 0.75;
    var browserWidth = $(window).width();
    var browserHeight = $(window).height();
    var browserRatio = browserHeight / browserWidth;

    if (browserRatio > imageRatio){
      images.height(Math.ceil(browserHeight - imageRatio));
      images.width(Math.ceil(browserHeight / imageRatio));
    } else {
      images.width(Math.ceil(browserWidth - imageRatio));
      images.height(Math.ceil(browserWidth * imageRatio));
    };

    images.css('left', (browserWidth - images.width())/2);
    images.css('top', (browserHeight - images.height())/2);
  };
  resize();

  // Swap cover images.
  function changeImage() {
    // Define variables.
    var images = background.children('img');
    var speed = 800;
    var interval = 7000;
    var current = Math.floor(Math.random() * (images.length));

    images.hide();
    images.eq(current).fadeIn(speed);

    function swap() {
      // Store old random figure.
      previous = current;

      // Find different random figure.
      while(previous == current) {
        current = Math.floor(Math.random() * (images.length));
      };

      // Fade the new background in.
      images.eq(previous).css('z-index', 0);
      images.eq(current).css('z-index', 1).fadeIn(speed, function() {
        images.eq(previous).hide();
      });
    }

    var timeout = window.setInterval(swap, interval);
  };

  function navAnimations() {
    var nav = $('.nav');
    var sectionTitles = nav.find('h4');
    var albums = sectionTitles.siblings('ul');

    nav.find('.expanded').children('ul').show();

    sectionTitles.click(function() {
      if (!$(this).parent().hasClass('expanded')) {
        albums.slideUp(120).parent().removeClass('expanded');
        $(this).siblings('ul').slideDown(120).end().parent().addClass('expanded');
      }
    })
  };
  navAnimations();

  function albumDescription() {
    var descriptionThumbnail = $('*[data-action="show-album-description"');
    var description = $('#albumDescriptionWrapper');

    descriptionThumbnail.click(function() {
      $('#imageWrapper').empty();
      description.fadeIn(400);
    })
  };
  albumDescription();

  function pictureDescription() {
    var descriptionLink = $('*[data-action="show-picture-description"');
    var description = $('#pictureDescriptionWrapper');

    descriptionLink.click(function(event) {
      event.preventDefault();
      description.show();
    });

    description.click(function(event) {
      event.preventDefault();
      description.hide();
    });
  };
  pictureDescription();

  $(window).load(function() {

    if ($('body').hasClass('cover-page')) {
      // Animate the nav.
      $('.nav').animate({left: '0'});
      // Start playing the cover slideshow.
      changeImage();
    } else {
      $('.nav').animate({left: '-320px'});
      $('.nav').hover(
        function () {
          $(this).stop().animate({left: '0'});
        },
        function () {
          $(this).stop().animate({left: '-320px'});
        }
      );
    };
  });

  $(window).resize(function() {
    resize();
  });
});

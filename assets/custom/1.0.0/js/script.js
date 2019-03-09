(function ($) {
  'use strict';

  /** Document ready handler **/
  $(function () {

    $('[data-toggle="collapse-width"]').on('click', function () {
      var $collapsedElement = $($(this).attr("data-target"));

      if (!$collapsedElement.hasClass("collapsed-width")) {
        $collapsedElement.attr('style', 'overflow-x: hidden!important; width: 0');
        $collapsedElement.addClass("collapsed-width");
      }
      else {
        $collapsedElement.width($($collapsedElement.children()).width());
        $collapsedElement.removeClass("collapsed-width");
        setTimeout(function() {
          $collapsedElement.css('overflowX', 'visible');
        }, 500 );
      }
    });

    $('[data-toggle="slide-right"]').on('click', function () {
      var $slidedElement = $($(this).attr("data-target"));

      if (!$slidedElement.hasClass("slided")) {
        $slidedElement.css("right", "0");
        $slidedElement.addClass("slided");
      }
      else {
        $slidedElement.css("right", "");
        $slidedElement.removeClass("slided");
      }
    });

    if (window.toastr !== undefined) {
      toastr.options = {
        "closeButton": true,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
      };
      toastr["info"]("Non-blocking notifications available!", "Info");
    }

  });


})(jQuery);


(function($) {

  $.fn.menumaker = function(options) {
      
      var cssmenu = $(this), settings = $.extend({
        title: "Menu",
        format: "dropdown",
        sticky: false
      }, options);

      return this.each(function() {
        cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
        $(this).find("#menu-button").on('click', function(){
          $(this).toggleClass('menu-opened');
          var mainmenu = $(this).next('ul');
          if (mainmenu.hasClass('open')) { 
            mainmenu.hide().removeClass('open');
          }
          else {
            mainmenu.show().addClass('open');
            if (settings.format === "dropdown") {
              mainmenu.find('ul').show();
            }
          }
        });

        cssmenu.find('li ul').parent().addClass('has-sub');

        multiTg = function() {
          cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
          cssmenu.find('.submenu-button').on('click', function() {
            $(this).toggleClass('submenu-opened');
            if ($(this).siblings('ul').hasClass('open')) {
              $(this).siblings('ul').removeClass('open').hide();
            }
            else {
              $(this).siblings('ul').addClass('open').show();
            }
          });
        };

        if (settings.format === 'multitoggle') multiTg();
        else cssmenu.addClass('dropdown');

        if (settings.sticky === true) cssmenu.css('position', 'fixed');

        resizeFix = function() {
          if ($( window ).width() > 768) {
            cssmenu.find('ul').show();
          }

          if ($(window).width() <= 768) {
            cssmenu.find('ul').hide().removeClass('open');
          }
        };
        resizeFix();
        return $(window).on('resize', resizeFix);

      });
  };
})(jQuery);

(function($){
$(document).ready(function(){

$("#cssmenu").menumaker({
   title: "Menu",
   format: "multitoggle"
});

});
})(jQuery);

$(document).ready(function(){
   var body = $('body');

   body.on('click', 'button#btnToggleSidePanel', function () {
       var container = $('div.side-panel');
       if (!container.is(':animated')) {
           if (container.css('left') == '-300px') {
               container.animate({left:'0'});
           } else {
               container.animate({left:'-300px'});
           }
       }
       $(this).blur();
   });
});

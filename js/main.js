$(document).ready(function(){
   var body = $('body'),
       _URL = window.URL || window.webkitURL,
       isRealImageParam = false;
   body.on('click', 'button#btnToggleSidePanel', function () {
       var container = $('div.side-panel');
       if (!container.is(':animated')) {
           if (container.css('left') == '-300px') {
               container.animate({left:'0'});
               $('div.main-content').animate({marginLeft: '300px'});
           } else {
               container.animate({left:'-300px'});
               $('div.main-content').animate({marginLeft: '0'});
           }
       }
       $(this).blur();
   });

   function isRealImage(file) {
       var image = new Image(),
           options = {
               extensions: ['jpg', 'png'],
               mimeTypes: ['image/jpeg', 'image/png']
           };
       if ($.inArray(file.type, options.mimeTypes) >= 0) {
           image.onload = function() {
               isRealImageParam = true;
           };
           image.onerror = function() {
               isRealImageParam = false;
           };
           image.src = _URL.createObjectURL(file);
       } else {
           isRealImageParam = false;
       }
   }

    function renderImage(file) {
        var reader = new FileReader(),
            containerForImagesPreviews = $('div#wrapperForUploadAvatar');
        reader.onload = function(event) {
            containerForImagesPreviews.html(
                '<div id="containerForUploadAvatar">' +
                    '<img src="' + event.target.result + '" class="imagePreviewCssStyle">' +
                '</div>'
            );
        };
        reader.readAsDataURL(file);
    }

   body.on('change', 'input#fileUpload', function () {
       var file = $(this)[0].files[0];
       if (file != undefined) {
           isRealImage(file);
           setTimeout(function () {
               if (isRealImageParam) {
                   renderImage(file);
                   $('div#validateImage').removeClass('has-error');
                   $('div#validateImage span.help-block').addClass('displayNone');
               } else {
                   $('input#avatarUpload').val(null);
                   $('div#wrapperForUploadAvatar').html('');
                   $('div#validateImage').addClass('has-error');
                   $('div#validateImage span.help-block').removeClass('displayNone');
               }
           }, 10);
       } else {
           $('input#avatarUpload').val(null);
           $('div#wrapperForUploadAvatar').html('');
           $('div#validateImage').addClass('has-error');
           $('div#validateImage span.help-block').removeClass('displayNone');
       }

   })
});

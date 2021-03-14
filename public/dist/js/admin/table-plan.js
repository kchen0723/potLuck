$(document).ready(function() {
    $(".square-tables").draggable({
         drag: function(){
            var offset = $(this).offset();
            var xPos = offset.left;
            var yPos = offset.top;
            $('.floor').text('x: ' + xPos + " y: " + yPos).css('color', 'white');
        },
        containment: ".floor"
        // revert: false
    }); // use a clone for the visual effect

    $(".floor").on("dropout", function(event, ui) {
    	droppable({
        accept: "article",
        drop: function(event, ui) {
            //you might want to reset the css using attr("style","")
            ui.helper.clone().appendTo(this); // actually append a clone of helper to the droppable
        }
    });

});

var $ = require('jquery');
document.$ = $;

// Scrollto animation
$(document).ready(function() {
    $('a.scrollto').on('click', function(e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body')
            .stop()
            .animate(
                {
                    scrollTop: $target.offset().top,
                },
                500,
                'swing',
                function() {
                    window.location.hash = target;
                }
            );
    });
});
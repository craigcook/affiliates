(function($) {
    // Handle submission of the account linking form.
    $(document).on('submit', '#link-account', function(e) {
        e.preventDefault();

        var $form = $(this);
        var url = $form.attr('action');

        $.ajax({
            type: 'POST',
            url: url,
            data: $form.serialize()
        }).done(function() {
            $form.find('.form').fadeOut(500, function() {
                $form.find('.success-msg').fadeIn(500);
            });
        });
    });

    // Show/hide the account linking form
    $(".not-linked a").click(function(e){
        e.preventDefault();
        $("#link-account").slideToggle('fast');
        $(this).blur();
    });

    // Common startup options.
    $(document).ready(function() {
        // Hide newsletter options
        $("#newsletter .options").hide();
        FAQ.init();
    });

    // Show newsletter options
    $("#news-email").focus(function(){
        $("#newsletter .options").slideDown('fast');
    });
    
})($);

/**
 * FAQ Page Class
 */
var FAQ = {
    init: function(){
        FAQ.addEventListeners();
    },

    addEventListeners: function(){
        if ($(".js_accordion").length) {
            $(".js_accordion").each(function(index, elem){
                FAQ.initAccordion(elem);
            });
        }
    },

    initAccordion : function(elem){
        var ulAccordion = $(elem),
            lnkAction = $("h4 a", ulAccordion),
            liElement, answerElement;

        ulAccordion.children().removeClass().addClass('collapsed');
        lnkAction.each(function(){
            $(this).click(function(e){
                e.preventDefault();
                liElement = $(this).parents('li');
                answerElement = $('.answer', liElement);
                if (liElement.hasClass('collapsed')) {
                    answerElement.slideDown('fast', function() {
                        liElement.removeClass().addClass('expanded');
                    });
                } else {
                    answerElement.slideUp('fast', function() {
                        liElement.removeClass().addClass('collapsed');
                    });
                }
            });
        });
    }

};
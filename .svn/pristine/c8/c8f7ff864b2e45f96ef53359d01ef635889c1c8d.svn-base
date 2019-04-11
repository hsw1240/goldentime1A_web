/*!
 * jQuery ClassyPopup
 * www.class.pm
 *
 * Written by Marius Stanciu - Sergiu <marius@class.pm>
 * Licensed under the MIT license www.class.pm/LICENSE-MIT
 * Version 1.3.0
 *
 */
var ClassyPopup = {
    skeleton: '<div class="ClassyPopupOverlay opaque">' +
            '<div class="ClassyPopup shadow top bottom">' +
            '<div class="pheader top"></div>' +
            '<div class="pcontent"></div>' +
            '<div class="pfooter bottom"></div>' +
            '</div>' +
            '</div>',
    settings: {},
    init: function(opts) {
        ClassyPopup.settings = opts;
        $('body').append(ClassyPopup.skeleton);
        if (ClassyPopup.settings.override === true) {
            $('<script />').attr({
                type: 'text/javascript'
            }).html("function alert(val) { ClassyPopup.alert({ title: 'Alert', text: val, rightButtons: ['OK'] }); }").appendTo('head');
            if (ClassyPopup.settings.background !== "none" && (ClassyPopup.settings.background === 'white' || ClassyPopup.settings.background === 'black')) {
                $('.ClassyPopupOverlay').addClass(ClassyPopup.settings.background);
            }
            else {
                $('.ClassyPopupOverlay').addClass('none');
            }
        }
        if (ClassyPopup.settings.centerOnResize === true) {
            $(window).bind('resize', function() {
                ClassyPopup.resize();
            });
        }
    },
    alert: function(options) {
        if (ClassyPopup.isOpen()) {
            return false;
        }
        $('.ClassyPopup').css({
            width: options.width
        });
        ClassyPopup.resize();
        $('.ClassyPopup #pheader').html('<header>' + options.title + '</header>');
        var buttons = '';
        var lb = options.leftButtons;
        var rb = options.rightButtons;
        if (typeof lb !== 'undefined' && typeof lb === 'object' && lb.length > 0) {
            for (var i = lb.length - 1; i >= 0; i--) {
                buttons += '<input type="button" class="flat" value="' + options.leftButtons[i] + '">';
            }
        }
        if (typeof rb !== 'undefined' && typeof rb === 'object' && rb.length > 0) {
            for (var i = rb.length - 1; i >= 0; i--) {
                buttons += '<input type="button" class="flat floatRight" value="' + options.rightButtons[i] + '">';
            }
        }
        if (typeof lb === 'undefined' && typeof rb === 'undefined') {
            buttons += '<input type="button" class="flat floatRight" value="OK">';
        }
        $('.ClassyPopup .pfooter').html(buttons);
        $('.ClassyPopup .pcontent').html(options.text);
        ClassyPopup.listen();
        if (ClassyPopup.settings.fade === true) {
            $('.ClassyPopupOverlay').fadeIn();
        }
        else {
            $('.ClassyPopupOverlay').show();
        }
        if (!!window.jQuery.ui) {
            $('.ClassyPopup').draggable({
                handle: '.pheader',
                containment: 'parent'
            }).show();
        }
        else {
            $('.ClassyPopup').show();
        }
        if (typeof options.onOpen === 'function') {
            options.onOpen.call(this);
        }
        if (typeof options.onClick === 'function') {
            ClassyPopup.onClick = options.onClick;
        }
    },
    isOpen: function() {
        return $('.ClassyPopup').css('display') === "block";
    },
    clear: function() {
        $('.ClassyPopupOverlay').remove();
        if (ClassyPopup.settings.fade === true) {
            $('.ClassyPopupOverlay').fadeOut();
        }
        else {
            $('.ClassyPopupOverlay').hide();
        }
        $('body').append(ClassyPopup.skeleton);
        ClassyPopup.resize();
    },
    listen: function() {
        $('.ClassyPopup .pfooter input').each(function() {
            $(this).attr({
                'id': this.value
            });
        });
        $('.ClassyPopup .pfooter input').click(function() {
            ClassyPopup.action($(this).val());
        });
    },
    action: function(key) {
        if (key === "Cancel" || key === "Close" || key === "Quit" || key === "Back" || key === "OK") {
            ClassyPopup.clear();
        }
        ClassyPopup.onClick(key);
    },
    resize: function() {
        var lbox = $('.ClassyPopup');
        var height = parseInt((lbox.css('height')).replace('px', ''));
        var width = parseInt((lbox.css('width')).replace('px', ''));
        lbox.css({
            top: ($(window).height() / 2) - 100 + 'px',
            left: ($(window).width() - width) / 2 + 'px'
        });
    },
    onClick: function() {

    },
    destroy: function() {
        $('.ClassyPopupOverlay').remove();
        $(window).unbind('resize');
    }
};
( function ($) {

	$.fn.bounce = function () {

		var header = this;
		var usermenu = $('#usermenu');
		var toggleButton = this.find('.toggle-button');
		var dropdownButton = this.find('.dropdown');
		
		toggleButton.click( function () {
			if (header.hasClass('expanded')) {
				header.removeClass('expanded').addClass('collapsed');
				usermenu.hide();
			} else if (header.hasClass('collapsed')) {
				header.removeClass('collapsed').addClass('expanded');	
				usermenu.show();
				dropdownButton.off('mouseleave');
				usermenu.off('mouseleave');
			}
		});

		dropdownButton.click( function () {
			if (!usermenu.is(':visible')) {
				usermenu.fadeIn();

				dropdownButton.mouseleave( function () {
					if (usermenu.is(':visible') && !usermenu.is(':hover')) {
						usermenu.fadeOut();
					}
				});

				usermenu.mouseleave( function () {
					if (usermenu.is(':visible') && !dropdownButton.is(':hover')) {
						usermenu.fadeOut();
					}
				});
			} else {
				usermenu.fadeOut();
			}
		});

	}

} (jQuery));

function resizeSecondColumn () {

	var viewportWidth = jQuery(window).width();
	var firstColumnWidth = jQuery('.first-column').outerWidth(true);
	var secondColumnMargin = jQuery('.second-column').outerWidth(true) - jQuery('.second-column').outerWidth();
	var secondColumnWidth = viewportWidth - firstColumnWidth - secondColumnMargin;

	// at morning i became slowpoke))
	jQuery('.second-column').each(function (index, value) {

		if (index == 1) {
			secondColumnWidth += 30;
		}

		jQuery(value).width(secondColumnWidth);
	});

	// a litle magic for webkit
	// webkit calls the resize event many times at one second
	jQuery(window).resize( function () {
		if (window['resizeSecondColumnTimeout'] != undefined) {
			clearTimeout(window['resizeSecondColumnTimeout']);
		}
		window['resizeSecondColumnTimeout'] = setTimeout(function () {
			resizeSecondColumn();	
		}, 100);
	})
}
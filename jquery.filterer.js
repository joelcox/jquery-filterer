/**
 * Filterer
 *
 * Poor man's filtering.
 * @author Joël Cox
 */
(function($) {

	$.fn.filterer = function(items, fields, options) {

		var defaults = {};
		options = $.extend(defaults, options);

		return this.each(function() {

			$(this).on('keyup', function(e) {
				var searchVal = $(this).val().toLowerCase();

				// Make sure everything is visible if the search
				// term is empty
				if (searchVal === '') {
					$(items).css('display', 'block');
					return false;
				}

				// Loop over all elements and see whether it contains the
				// search value
				$.each($(items), function(index, record) {
					var showRecord = false;
					var recordEl = $(record);

					// See if the search val is found in one of the
					// data elements
					$.each(fields, function(index, el) {
						var text = $(record).find(el).text().toLowerCase();

						if (text.indexOf(searchVal) >= 0) {
							showRecord = true;
							return false;
						}
					});

					if (showRecord) recordEl.css('display', 'block');
					else recordEl.css('display', 'none');

				});
			});

		});

	};

})(jQuery);
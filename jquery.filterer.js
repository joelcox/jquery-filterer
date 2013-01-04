/**
 * Filterer
 *
 * Poor man's filtering.
 * @author Joël Cox
 */
(function($) {

	$.fn.filterer = function(items, fields, options) {

		var defaults = {
			'highlight': false
		};

		options = $.extend(defaults, options);

		return this.each(function() {

			$(this).on('keyup', function(e) {
				var searchTerm = $(this).val();

				// Make sure everything is visible if the search
				// term is empty
				if (searchTerm === '') {
					if (options.highlight) removeStrongWrap(items, fields);
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
						var text = $(record).find(el).text();

						// Set up the regular expresion, case-insensitive
						var regexp = new RegExp(searchTerm, 'gi');
						var matches = text.match(regexp);
						if (matches) showRecord = true;

						// Highlight search terms if required
						if (matches && options.highlight) {
							var highlightedText = highlightSearchTerm(text, matches);
							$(record).find(el).html(highlightedText);
						}

					});

					if (showRecord) recordEl.css('display', 'block');
					else recordEl.css('display', 'none');

				});
			});

		});

		/**
		 * Wraps the search term in a strong element
		 */
		function highlightSearchTerm(text, matches) {
			$.each(matches, function(index, match) {
				text = text.replace(match, '<strong>' + match + '</strong>');
			});

			return text;
		}

		/**
		 * Remove strong element from items
		 */
		function removeStrongWrap(items, fields)
		{
			$.each($(items), function(index, record) {
				var $record = $(record);

				// Loop over the fields, turn the HTML into plaintext
				// and then replace the HTML for the plaintext.
				$.each(fields, function(index, field) {
					$field = $record.find(field);

					var plainText = $field.text();
					$field.html(plainText);
				});

			});

		}

	};

})(jQuery);
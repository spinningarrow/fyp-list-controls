$(function () {

	$('center table tr').each(function () {

		// Find the first table row of each project
		var matches = $(this).find('b').text().match(/(\d{1,4})\)\sProj No./)

		if (matches) {
			// Tag the row by the serial number
			$(this).data('cfnfyp-index', matches[1])

			// Add buttons
			var $td = $(this).find('td').last()

			$('<button class="cfnfyp-hide">Hide</button>').appendTo($td)
			$('<button class="cfnfyp-show">Show</button>').appendTo($td).hide()
		}

		// Find the table rows containing <hr>s and tag them
		if ($(this).find('hr').length) {
			$(this).addClass('cfnfyp-separator')
		}
	})

	// Access local storage
	var data = localStorage.getItem('cfnfyp')
	data = data ? $.parseJSON(data) : { hidden: {} }

	// Hide items hidden in localStorage
	for (var index in data.hidden) {

		if (data.hidden.hasOwnProperty(index)) {

			var $element = $('[data-cfnfyp-index=' + index + ']')
			$element.find('.cfnfyp-hide').hide().siblings().show()

			$element.nextUntil('.cfnfyp-separator')
				.addClass('cfnfyp-hidden')
				.hide()
		}
	}

	// Bind events
	$('body').on('click', '.cfnfyp-hide', function () {

		$(this).hide().siblings().show()

		$(this).parents('tr').nextUntil('.cfnfyp-separator')
			.addClass('cfnfyp-hidden')
			.hide('fast')

		data.hidden[$(this).parents('tr').data('cfnfyp-index')] = true
		localStorage.setItem('cfnfyp', JSON.stringify(data))
	})

	$('body').on('click', '.cfnfyp-show', function () {

		$(this).hide().siblings().show()

		$(this).parents('tr').nextUntil('.cfnfyp-separator')
			.removeClass('cfnfyp-hidden')
			.show()

		delete data.hidden[$(this).parents('tr').data('cfnfyp-index')]
		localStorage.setItem('cfnfyp', JSON.stringify(data))
	})
})
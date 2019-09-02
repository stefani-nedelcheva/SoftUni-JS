function attachEvents() {
	$('#items li').click(selectTown);
	let towns = [];

	function selectTown() {
		let currentListItem = $(this);

		if (currentListItem.attr('data-selected') === 'true') {
			currentListItem.attr('data-selected', 'false');
			towns.splice(towns.indexOf(currentListItem.text()), 1);
			currentListItem.css('background', '');
		} else {
			currentListItem.attr('data-selected', 'true');
			towns.push(currentListItem.text());		
			currentListItem.css('background', '#DDD');
		}		
	}

	$('#showTownsButton').click(showTowns);

	function showTowns() {
		$('#selectedTowns').text(towns.join(', '));
	}
}

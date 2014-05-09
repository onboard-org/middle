var View = {

	init: function(){
		this.updateGravatarImages()
		this.setAddresses()
		this.makeSymbolsClickable()
		this.updateAddress()
	},

	makeSymbolsClickable: function(){
		var symbols = document.getElementsByClassName('symbol')
		for (var i=0; i<symbols.length; i++){
			symbols[i].addEventListener('click',this.toggleActive)
		}
	},

	updateAddress: function() {
		var updateButtons = document.getElementsByClassName('update-button')
		for (var i=0; i < updateButtons.length; i++) {
			updateButtons[i].addEventListener('click', function() {
				Map.updateMap()
			})
		}
	},

	displaySteps: function(human, steps) {
		var container = document.getElementById('directions' + (human+1))
		container.innerHTML = ''
		steps.forEach(function(step) {
			console.log(step.maneuver.type)
			var direction = document.createElement('div')
			var icon
			var rightRegExp = /right/g
			var leftRegExp = /left/g
			if (step.maneuver.type === 'continue') {
				icon = '<i class="fa fa-arrows-v"></i> '
			} else if (step.maneuver.type === 'depart') {
				icon = '<i class="fa fa-road"></i> '
			} else if (step.maneuver.type === 'arrive') {
				icon = '<i class="fa fa-bullseye"></i> '
			} else if (step.maneuver.type === 'u-turn') {
				icon = '<i class="fa fa-repeat"></i> '
			} else if (step.maneuver.type === 'enter roundabout') {
				icon = '<i class="fa fa-spinner"></i> '
			} else if (rightRegExp.test(step.maneuver.type)) {
				icon = '<i class="fa fa-share"></i> '
			} else if (leftRegExp.test(step.maneuver.type)) {
				icon = '<i class="fa fa-reply"></i> '
			} else {
				icon = '<i class="fa fa-tachometer"></i> '
			}

			direction.innerHTML = icon + step.maneuver.instruction + '<br>'
			container.appendChild(direction)
		})
	},

	setInitialVenue: function(type) {
		var button = document.getElementById(type)
		button.classList.add('symbol-active')
	},

	toggleActive: function(e){
		if (e.target.classList.contains('fa')) {
			e.target.parentElement.classList.toggle('symbol-active')
			var locationType = e.target.parentElement.dataset.id
		} else {
			e.target.classList.toggle('symbol-active')
			var locationType = e.target.dataset.id
		}
		if (e.target.classList.contains('symbol-active') ||
			e.target.parentElement.classList.contains('symbol-active')){
			Map.locationTypes.push(locationType)
			Map.populateTheMiddle()
		} else {
			var i = Map.locationTypes.indexOf(locationType)
			Map.locationTypes.splice(i,1)
			Map.populateTheMiddle()
		}
	},

	updateGravatarImages: function(){
		var leftGravatar = document.getElementById('gravatar-left')
		var rightGravatar = document.getElementById('gravatar-right')

		var oldLefty = leftGravatar.src
		leftGravatar.src = oldLefty.replace('00000000000000000000000000000000', this.hash(App.user.email[1]))
		var oldRighty = rightGravatar.src
		rightGravatar.src = oldRighty.replace('00000000000000000000000000000000', this.hash(App.user.email[2]))
	},

	setAddresses: function(){
		document.getElementById('address1').value = App.user.address[1]
		document.getElementById('address2').value = App.user.address[2]
	},

	hash: function(email){
		return calcMD5(email)
	}
}
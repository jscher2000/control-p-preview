/* 
  Copyright 2018. Jefferson "jscher2000" Scher. License: MPL-2.0.
*/
var blnPreview = true;

// Handle Ctrl+p
browser.commands.onCommand.addListener(function(command) {
	console.log('Command listener fired!'); // NO OUTPUT WITH CTRL+P -- WTF
	if (command == 'print-or-preview') {
		console.log('Running print-or-preview');
		if (blnPreview) {
			browser.tabs.printPreview();
		} else {
			browser.tabs.print();
		}
	}
});

// Handle click on toggle button
function toggleControlP() {
	if (blnPreview) {
		blnPreview = false;
	} else {
		blnPreview = true;
	}
	// console.log('blnPreview = ' + blnPreview);
	updateIcon();
}
function updateIcon() {
/*
	browser.browserAction.setIcon({
		path: blnPreview ? {
			19: TBD
		} : {
			19: TBD
		}
	});
*/
	browser.browserAction.setTitle({
		title: blnPreview ? 'Control-P Previews (click to change to Print)' : 'Control-P Prints (click to change to Preview)'
	}); 
}
browser.browserAction.onClicked.addListener(toggleControlP);

// TODO: store preference for between sessions

// Confirm command was created
var cmds = browser.commands.getAll();
cmds.then(function(result) {
	for (var i=0; i<result.length; i++){
		console.log('Command Registered: ' + JSON.stringify(result[i]));
	}
});

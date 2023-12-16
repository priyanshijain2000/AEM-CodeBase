window.addEventListener('load', (event) => {
	var isSocialCmpUsed = document.querySelector(".sociallinks");
    if(isSocialCmpUsed) {
        var footerSeparator=window.$('#footer-separator');
        footerSeparator.addClass('d-none');
    }
});
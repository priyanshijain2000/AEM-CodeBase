window.addEventListener('load', (event) => {
	var adobeData=window.$('#adobe-data-layer');
    if(adobeData) {
        var adobeJson=adobeData.data("adobe-json");
        var pageID=adobeData.data("adobe-page-id");
        window.adobeDataLayer = window.adobeDataLayer || [];
		adobeDataLayer.push({
			page: adobeJson,
			event:'cmp:show',
			eventInfo: {
				path: 'page.'+pageID
			}
		});
    }
});
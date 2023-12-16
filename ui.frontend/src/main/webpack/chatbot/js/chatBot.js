window.addEventListener('load', (event) => {
	var chatbotDynamicData = document.querySelector(".chatbot-dynamic-data");
	var chatbotProgramName = chatbotDynamicData.getAttribute('data-chatbot-program-name');
    var chatbotEnable = chatbotDynamicData.getAttribute('data-chatbot-is-enable');
    if(chatbotDynamicData && chatbotEnable == 'true') {
        initSdk('Bots', chatbotProgramName);
    }
});
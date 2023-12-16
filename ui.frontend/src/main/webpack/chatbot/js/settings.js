'use strict';

// Set client auth mode - true to enable client auth, false to disable it
const isClientAuthEnabled = false;
const etsConfig = getETSConfig();
const _TIMEOUT_TO_SEND_CHATLOG_MINUTES_ = 15; // in minutes
const _GREETING_INTENT_ = "start over"
const _SUB_HEADER_TITLE_ = " "

let botId = '';
let sessionExpiring = null;
let chatLogSent = false;
let beforeUnloadChatLogSent = false;
let hasConversationWithBot = false;

//let chatLogSentDueToInactivity = false;
//let isChatLogSentCompletedConvo = false;  
let isChatLogSentTimeOutSession = false;
let timerChannelSession = null;
let isSessionTimedOut = false // tracking if session timed-out
let isAgentWaitTimeActive = false
let isTransferAgent = false
let ignoreOnBeforeUnload = false

//Variables to be used for Web Forms
let webFormBotId = null;
let webFormSubmitState = null;
let Bots;
let conversation;
let messageType; // webview, text, card
const transcriptGeneralOption = { targetState: 'sendChatLogx', targetAction: 'sendTranscript', variable: "str_ChatTranscript" }

var gidx = 0;

const textToAudio = (currentBotResponse) => {
    Bots.speakTTS(currentBotResponse)
}

const create_custom_dropdowns = () => {

    $('select.praxis-states-dropdown').each(function (i, select) {
        if (!$(this).next().hasClass('dropdown-select')) {
            $(this).after('<div class="ets-custom-ui dropdownState dropdown-select wide ' + ($(this).attr('class') || '') + '" tabindex="0"><span class="ets-dropdown-current-value"></span><div class="ets-dropdown-list"><ul></ul></div></div>');
            var dropdown = $(this).next();
            var options = $(select).find('option');
            var selected = $(this).find('option:selected');
            dropdown.find('.ets-dropdown-current-value').html("Select an option");
            options.each(function (j, o) {
                var display = $(o).data('display-text') || '';
                dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
            });

            $('.dropdown-select ul').before('<div class="dd-search"><input placeholder="Search"  autocomplete="off" onkeyup="filter()" class="dd-searchbox txtSearchValue" type="text"></div>');
            $('.ets-custom-submit').attr('disabled', 'disabled')
            $('.dropdown-select:not(.disabled)').on('click', function (event) {
                $('.dropdown-select').not($(this)).removeClass('open');
                $(this).toggleClass('open');
                if ($(this).hasClass('open')) {

                    let dropdownList = $('.ets-dropdown-list')
                    dropdownList.addClass('open')
                    dropdownList.last().find('.option').attr('tabindex', 0);
                    //dropdownList.last().find('.selected').trigger('focus');

                    dropdownList.last().find('.txtSearchValue').trigger('focus');

                    dropdownList.css({
                        'position': 'fixed',
                        'top': ($(this).offset().top - $(document).scrollTop()) + $(this).height() + 5 + 'px',
                        'left': $(this).offset().left - $(document).scrollLeft(),
                        'z-index': 120000,
                        'min-width': $(this).width(),
                        'height': '200px'
                    })

                    dropdownList.appendTo($('body'))

                } else {
                    $('.ets-dropdown-list').removeClass('open');
                    $(this).find('.option').removeAttr('tabindex');
                    $(this).trigger('focus');
                }
            });

        }
    });


    $('.ets-custom-ui').on('DisableETSCustomUI', () => {
        $('.dropdown-select').off('click')
        $('.ets-dropdown-list').last().remove()
        $('.ets-custom-submit').attr('disabled', 'disabled')
    })

    // Hide dropdown when 
    $(window).on("resize", function () {

        let ds = $('.dropdown-select')

        $('.ets-dropdown-list').css({
            'position': 'fixed',
            'top': ($(ds).offset().top - $(document).scrollTop()) + $(ds).height() + 5 + 'px',
            'left': $(ds).offset().left - $(document).scrollLeft(),
            'z-index': 120000,
            'min-width': $(ds).width(),
            'height': '200px'
        })
        /*
        $('.ets-dropdown-list').removeClass('open')
        $('.dropdown-select').removeClass('open');
            $('.ets-dropdown-list .option').removeAttr('tabindex');
            */
    })

    // Close when clicking outside
    $(document).on('click', function (event) {
        if ($(event.target).hasClass('dd-searchbox') || $(event.target).hasClass('ets-dropdown-list')) {
            return;
        }
        if ($(event.target).closest('.dropdown-select').length === 0) {
            $('.dropdown-select').removeClass('open');
            $('.ets-dropdown-list').removeClass('open')
            $('.ets-dropdown-list .option').removeAttr('tabindex');
        }
        event.stopPropagation();
    });


    // Option click
    $(document).on('click', '.ets-dropdown-list .option', function (event) {
        $(this).closest('.ets-dropdown-list').find('.selected').removeClass('selected');
        //$(this).addClass('selected');
        var text = $(this).data('display-text') || $(this).text();
        $('.ets-dropdown-current-value').last().text(text);
        $('.dropdown-select').last().prev('select').val($(this).data('value')).trigger('change');

        $('.ets-custom-submit').removeAttr('disabled')
    });


    // Keyboard events
    $(document).on('keydown', '.dropdown-select, .ets-dropdown-list', function (event) {
        var focused_option = $($('.ets-dropdown-list .option:focus')[0] || $('.ets-dropdown-list .option.selected')[0]);

        // Space or Enter
        //if (event.keyCode == 32 || event.keyCode == 13) {
        if (event.keyCode == 13) {
            if ($(this).hasClass('open')) {
                focused_option.trigger('click');
            } else {
                $(this).trigger('click');
            }
            return false;
            // Down
        } else if (event.keyCode == 40) {
            if (!$(this).hasClass('open')) {
                $(this).trigger('click');
            } else {
                focused_option.next().focus();
            }
            return false;
            // Up
        } else if (event.keyCode == 38) {
            if (!$(this).hasClass('open')) {
                $(this).trigger('click');
            } else {
                var focused_option = $($('.ets-dropdown-list .option:focus')[0] || $('.ets-dropdown-list .option.selected')[0]);
                focused_option.prev().focus();
            }
            return false;
            // Esc
        } else if (event.keyCode == 27) {
            if ($(this).hasClass('open')) {
                $(this).trigger('click');
            }
            return false;
        }
    });

}


const filter = () => {

    var valThis = $('.ets-dropdown-list:last-of-type .txtSearchValue').val();
    $('.ets-dropdown-list:last-of-type ul > li').each(function () {
        var text = $(this).text();
        (text.toLowerCase().indexOf(valThis.toLowerCase()) > -1) ? $(this).show() : $(this).hide();
    });
};


/**
 * BCCCB-149â€‹ - Chat storage in OSCâ€‹
 * @description Return the Formatted Chat Log
 */
const getChatLogFormatted = () => {
    let _chatLog = '';
    let _cards = [];
    let _isAskingFeedback = false
    const _feedback = {
        '👍': 'Thumbs up',
        '👎': 'Thumbs down'
    }
    const _messages = Bots.getConversationHistory().messages;
    _messages.forEach((message) => {
        _chatLog += `[${(new Date(message.date)).toLocaleString("en-US", { timeZone: "America/New_York" }) || ''}] ${message.source || 'USER'} :`;

        if (message.messagePayload.text) {
            let _msgText = `${message.messagePayload.text.replace(/(<([^>]+)>)/gi, '')}`
            _msgText = ((_isAskingFeedback && _feedback[_msgText]) || _msgText) + '\n'
            _isAskingFeedback = false
            _chatLog += _msgText
            //_chatLog += `${message.messagePayload.text.replace(/(<([^>]+)>)/gi, '')}\n`;
            let _actions = [];
            if (message.messagePayload.actions) {
                message.messagePayload.actions.forEach((action) => {

                    let _label = _feedback[action.label] || action.label
                    _isAskingFeedback = (_feedback[action.label] && true)

                    _actions.push(_label);
                });
                _chatLog += `[${_actions.join()}]\n`;
            }
        } else if (message.messagePayload.cards) {
            message.messagePayload.cards.forEach((card) => {

                if (card.actions && card.actions.length > 0 && card.actions[0].label) {
                    _cards.push(card.actions[0].label);
                } else {
                    _cards.push(card.title);
                }

            });
            _chatLog += `[${_cards.join()}]\n`;
        }
    });
    // console.log(_chatLog)
    return _chatLog;
};

/**
 * BCCCB-149â€‹ - Chat storage in OSCâ€‹ 
 * @description Fire Send to chatlog
 * @param {string} botId The bot id to trigger for the current session
 */
const sendChatHistoryPostback = (_botId, _options) => {
    // checking for multiple firing of unload
    let chatTranscript = getChatLogFormatted();

    Bots.sendMessage(
        {
            messagePayload: {
                postback: {
                    variables: { [_options.variable]: chatTranscript }, //str_ChatTranscript
                    'system.botId': _botId,
                    'system.state': _options.targetState, //'sendChatLogx',
                    action: _options.targetAction //"sendTranscript"
                },
                //text: chatTranscript,
                type: 'postback'
            }
        },
        { hidden: true }
    );
    console.log('Chat log sent');
};

/**
 * BCCCB-1342 - IVR Links
 * @description Set initial message when loading depends on the URL
 * 
 */
const getInitialBotMessage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const intentSearch = urlParams.get("chatbot-intent")
    if (intentSearch && etsConfig.ivrIntents[intentSearch]) {
        return { botDefaultMsg: etsConfig.ivrIntents[intentSearch], isIVR: true }
    } else {
        return { botDefaultMsg: _GREETING_INTENT_, isIVR: false }
    }

}


/**
 * @description Convert greeting menu Carousel card to Expandable card
 * @param {*} message The greeting message that will be tranformed to a expandable cards
 */

/**
 * Initializes the SDK and sets a global field with passed name for it the can
 * be referred later
 * @param {string} name Name by which the chat widget should be referred
 */
const initSdk = (name, etsProgram) => {
    if (!name) {
        name = 'Bots'; // Set default reference name to 'Bots'

    }

    setTimeout(() => {
        const FAIcon = etsConfig.programs[etsProgram].ImageURL
        etsProgram;
        const { botDefaultMsg, isIVR } = getInitialBotMessage()
        let chatWidgetSettings = {
            enableAutocomplete: true,
            initUserHiddenMessage: botDefaultMsg, //'hi',
            initMessageOptions: {
                sendAt: 'expand'
            },
            URI: etsConfig.odaURI,
            openChatOnLoad: isIVR,
            clientAuthEnabled: isClientAuthEnabled,
            channelId: etsConfig.programs[etsProgram].webChannelId,
            //userId: '001',
            enableAutocomplete: true,
            enableClearMessage: false,
            speechLocale: WebSDK.SPEECH_LOCALE.EN_US,
            enableSpeech: true,
            enableBotAudioResponse: true,
            showTypingIndicator: true,
            typingIndicatorTimeout: 55,
            showConnectionStatus: false,
            enableEndConversation: false,
            enableTimestamp: true,
            timestampMode: 'relative',
            timestampFormat: 'MMMM D, YYYY, hh:mm a',
            i18n: {
                en: {
                    chatTitle: 'Anita',
                    inputPlaceholder: 'Type your question here',
                    cardNavNext: 'Next',
                    cardNavPrevious: 'Previous',
                    skillMessage: 'ETS reply'
                }
            },
            colors: {
                branding: '#3072BE',
                typingIndicator: '#595959'
            },
            // displayActionsAsPills : true,
            position: { right: "65px" },
            enableAttachment: false,
            keyboardIcon: `${etsConfig.programs[etsProgram].ImageURL}/ets-new-keyboard.svg`,
            micIcon: `${etsConfig.programs[etsProgram].ImageURL}/ets-new-microphone-logo.svg`,
            sendIcon: `${etsConfig.programs[etsProgram].ImageURL}/ets-new-send-logo.svg`,
            botButtonIcon: `${etsConfig.programs[etsProgram].ImageURL}/${etsProgram}_help_icon.svg`,
            logoIcon: `${etsConfig.programs[etsProgram].ImageURL}/ets-new-header-icon.svg`,
            botIcon: `${etsConfig.programs[etsProgram].ImageURL}/ets-new-logo.svg`,
            closeIcon: `${etsConfig.programs[etsProgram].ImageURL}/ets-close-chat-btn-white.svg`,
            audioResponseOffIcon: `${etsConfig.programs[etsProgram].ImageURL}/ets-new-audio-response-off.svg`,
            audioResponseOnIcon: `${etsConfig.programs[etsProgram].ImageURL}/ets-new-audio-response-on.svg`,

            width: "400px",
            skillVoices: [
                {
                    lang: 'en-GB',
                    name: 'Google UK English Female'
                },
                {
                    lang: 'en-US',
                    name: 'Google US English'
                }
            ]
        };

        var etsSelectedProgram = etsConfig.programs[etsProgram].programName
        var chatICon = etsConfig.programs[etsProgram].ImageURL
            setTimeout(
                function()
                {
                    $(".oda-chat-button-icon").replaceWith('<img src="'+ chatICon+'/ets-new-header-icon.svg" role="img" alt="Anita Chabtbot" class="new-chat-button"/><p class="program">'+"Need "+ etsSelectedProgram +" Help?"+ '</p>').addClass("selectedProgram");
                }, 10)

        // Initialize SDK
        if (isClientAuthEnabled) {
            Bots = new WebSDK(chatWidgetSettings, generateToken);
        } else {
            Bots = new WebSDK(chatWidgetSettings);
        }

        // BCCCB-1755 - start 
        if (typeof (sessionStorage.BotIconMessageDisplayed) === "undefined") {
            document.body.insertAdjacentHTML("beforeend", `<div class="cb-boticon-message-container"><div class="cb-boticon-message"><div class="cb-boticon-message-close" onclick="javascript:document.querySelectorAll('.cb-boticon-message-container').forEach(el=>{el.style.animation = 'slide-out 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.1s both'}) "><button><img src="${etsConfig.programs[etsProgram].ImageURL}/circle-close.svg" role="img" alt="Close Anita Chatbot" /></button></div><p><strong>Hi, I'm Anita your virtual assistant</strong>. How can I help you today?</p></div><div class="cb-boticon-message-pointer"></div></div>`)
            document.body.insertAdjacentHTML("beforeend", `<div class="cb-boticon-message-container blurred"><div class="cb-boticon-message-pointer blurred"></div></div>`)
            sessionStorage.BotIconMessageDisplayed = true
        }
        // BCCCB-1755 - end

        // Optional event listeners
        // All event listeners should preferably added before the connect() call, otherwise they may not be fired correctly
        function textToAudio(currentBotResponse) {

            let text = currentBotResponse
            var msg = new SpeechSynthesisUtterance();
            var voices = window.speechSynthesis.getVoices();
            msg.voice = voices[2];
            msg.text = text;
            speechSynthesis.speak(msg);

        }

        const showGreetingMenu = (message) => {

        
            let d = document
            let chatCards = $(".oda-chat-card-message-content").last().find(".oda-chat-card")
        
            $('.oda-chat-card-message-content').last().children().css({ "display": "none" })
        
            let accGreetings = d.createElement("div")
            accGreetings.className = "accordion-greetings"
        
            for (let _card of chatCards) {
        
                let _jcard = $(_card)
                let _title = _jcard.find(".oda-chat-card-title").text()
                let _descr = _jcard.find(".oda-chat-card-description").text()
        
                let _accH3 = d.createElement("h3")
                _accH3.insertAdjacentHTML("beforeend", `<div class="acc-icon"></div><div>${_title}</div>`)
        
                let accContent = d.createElement("div")
                let _actions = _jcard.find(".oda-chat-card-actions")[0]
                if (_actions) {
        
                    accContent.insertAdjacentElement("afterbegin", _actions)
                } else if (_descr) {
                    accContent.insertAdjacentHTML("afterbegin", ` <p class="greeting-type-question">${_descr}</p>`)
                }
        
                accGreetings.insertAdjacentElement("beforeend", _accH3)
                accGreetings.insertAdjacentElement("beforeend", accContent)
            }
        
        
            let msgContents = d.querySelectorAll('.oda-chat-card-message-content')
            msgContents[msgContents.length - 1].insertAdjacentElement("afterbegin", accGreetings)
        
        
            $('.accordion-greetings').last().accordion({
                collapsible: true,
                active: false,
                heightStyle: "content",
                icons: null,
                create: function (event, ui) {
                    $('.oda-chat-wrapper .ui-accordion').last().find('.ui-accordion-header').append('<div><span><img src="'+FAIcon+'/plus.svg" role="img" alt="Expand Card" style="display: block;height: 20px;width: 20px;margin-left: 18px;"></span></div>')
        
                },
                activate: function (event, ui) {
        
                    $(ui.newHeader).find("div:last-of-type").remove();
                    $(ui.newHeader).append('<div><span><img src="'+FAIcon +'/minus.svg" role="img" alt="Close Card" style="display: block;height: 20px;width: 20px;margin-left: 18px;"></span></div>')
        
                    $(ui.oldHeader).find("div:last-of-type").remove();
                    $(ui.oldHeader).append('<div><span><img src="'+FAIcon+'/plus.svg" role="img" alt="Expand Card" style="display: block;height: 20px;width: 20px;margin-left: 18px;"></span></div>')
        
                }
        
            });
        }
        const changeFeedbackIcon = (message) =>{


        }

        Bots.on('click:audiotoggle', function (status) {
            if (status === true) {
                console.log('Audio response is turned on.');
                let currentBotResponse = "";
                let lastElement = "";
                let cardNumberExpandable = 1
                let cardNumberWithActions = 1
                let convoHistory = Bots.getConversationHistory();

                Bots.setTTSVoice([{
                    lang: 'en-US',
                    name: 'Microsoft Zira - English (United States)'                   
                },])

                for (var i = convoHistory.messages.length - 1; i >= 0; i--) {
                    if (convoHistory.messages[i].source == "BOT") {
                        if ('text' in convoHistory.messages[i].messagePayload && 'actions' in convoHistory.messages[i].messagePayload !== true) {
                            lastElement = convoHistory.messages[i].messagePayload.text + ". " + lastElement + ". "
                        }
                        if ('cards' in convoHistory.messages[i].messagePayload) {
                            let cardslength = convoHistory.messages[i].messagePayload.cards.length - 1;
                            for (let k = 0; k < convoHistory.messages[i].messagePayload.cards.length; k++) {
                                if ('actions' in convoHistory.messages[i].messagePayload.cards[k]) {
                                    lastElement += "Card "+ cardNumberExpandable++ + ". " + convoHistory.messages[i].messagePayload.cards[k].title + ". "
                                    for (let l = 0; l < convoHistory.messages[i].messagePayload.cards[k].actions.length; l++) {
                                        if(etsConfig.programs[etsProgram].programName == "GRE")  {
                                            if (convoHistory.messages[i].messagePayload.cards[0].title != "<b>My ETS Account</b>") {
                                                lastElement += ". " + convoHistory.messages[i].messagePayload.cards[k].actions[l].label + ". "
                                            }
                                        }
                                        if(etsConfig.programs[etsProgram].programName == "TOEFL")  {
                                            if (convoHistory.messages[i].messagePayload.cards[0].title != "<b>My ETS Account</b>") {
                                                lastElement += ". " + convoHistory.messages[i].messagePayload.cards[k].actions[l].label + ". "
                                            }
                                        }
                                        if(etsConfig.programs[etsProgram].programName == "PRAXIS")  {
                                            if (convoHistory.messages[i].messagePayload.cards[0].title != "My Praxis Account") {
                                                lastElement += ". " + convoHistory.messages[i].messagePayload.cards[k].actions[l].label + ". "
                                            }
                                        }
                                        if(etsConfig.programs[etsProgram].programName == "HiSET")  {
                                            if (convoHistory.messages[i].messagePayload.cards[0].title != "MyHiSET Account") {
                                                lastElement += ". " + convoHistory.messages[i].messagePayload.cards[k].actions[l].label + ". "
                                            }
                                        }
                                    }
                                } else {
                                    lastElement =  "Card "+ cardNumberWithActions++ + ". " + convoHistory.messages[i].messagePayload.cards[cardslength].title + ". " + lastElement
                                    cardslength--
                                }

                            }
                        }
                        if ('text' in convoHistory.messages[i].messagePayload && 'actions' in convoHistory.messages[i].messagePayload) {
                            lastElement = convoHistory.messages[i].messagePayload.text + ". "
                            for (let j = 0; j < convoHistory.messages[i].messagePayload.actions.length; j++) {
                                lastElement += ". " + convoHistory.messages[i].messagePayload.actions[j].label
                            }
                        }
                        if (i == 0) {
                            currentBotResponse = lastElement
                            var skillMessage = {
                                messagePayload: {
                                    type: 'text',
                                    text: currentBotResponse
                                }
                            };
                            return Bots.speakTTS(skillMessage);                        
                        }
                    } else {
                        currentBotResponse = lastElement
                        var skillMessage = {
                            messagePayload: {
                                type: 'text',
                                text: currentBotResponse
                            }
                        };
                        return Bots.speakTTS(skillMessage);                    
                    }
                }
            } else {
                console.log('Audio response is turned off.');
            }
        })

           // BCCCB-538 Accessibility - Button State Hover

           Bots.on('message:sent', function (message) {

            if (message.messagePayload.type == 'postback' || message.messagePayload.type == 'text' || message.messagePayload.type == 'card') {
                $('.oda-chat-wrapper .oda-chat-left .oda-chat-message-bubble.ets-chat-message-bubble-condensed .oda-chat-action-postback[disabled]').attr('aria-hidden', 'true')
                $('.ui-accordion-header').attr({'aria-hidden': 'true', 'aria-label': ' '})
                $('.ui-accordion-content-active').attr({'aria-hidden': 'true', 'aria-label': ' '})
                $('.oda-chat-card-title').attr({'aria-hidden': 'true', 'aria-label': ' '})
                $('.oda-chat-message-content').attr({'aria-hidden': 'true', 'aria-label': ' '})
                $('.oda-chat-card-actions').attr({'aria-hidden': 'true', 'aria-label': ' '})
                $('.oda-chat-screen-reader-only').attr({'aria-hidden': 'true', 'aria-label': ' '})
                $('.oda-chat-message-actions').attr({'aria-hidden': 'true', 'aria-label': ' '})
            }

            $('.oda-chat-action-postback').prop('disabled', true);
        
         });


    Bots.on('message:received', function(message) {

        if(Bots.getConversationHistory().messages.length == 3)   {
            $('.oda-chat-message-content').attr({'aria-hidden': 'true', 'aria-label': ' '})
        }

        if(message.messagePayload.type == 'text'){
            $('.oda-chat-message-content').attr({'aria-hidden': 'true', 'aria-label': ' '})
            $('.oda-chat-action-postback').attr({'aria-hidden': 'true', 'aria-label': ' '})
            $('.oda-chat-message-actions').attr({'aria-hidden': 'true', 'aria-label': ' '})
            $('.oda-chat-card-actions').attr({'aria-hidden': 'true', 'aria-label': ' '})
        }

        if (message.source == "BOT") {
            if (message.messagePayload.text == ".") {
                $('.oda-chat-action-postback').prop('disabled', true);
            }
            if (message.messagePayload.text == "<span class='agentWaitMessage'>Live chat session established. Waiting for a customer service representative to join.</span>") {
                $('.oda-chat-action-postback').prop('disabled', true);
            }
            if (message.messagePayload.text == "Is there anything else I can help you with?") {
                $('.oda-chat-action-postback').prop('disabled', true);
            }
            if(message.messagePayload.hasOwnProperty("cards"))  {
                if (message.messagePayload.cards[0].actions[0].type == "webview") {
                    var delayInMilliseconds = 10; 

                    setTimeout(function() {
                        $('.oda-chat-wrapper .oda-chat-card .oda-chat-action-postback').css({"font-weight": "700"});
                    }, delayInMilliseconds);
                }
            }
            $('.oda-chat-wrapper .oda-chat-card .oda-chat-action-postback').prop('disabled', true);
        }

        if(message == false){
            $('.oda-chat-wrapper .oda-chat-card .oda-chat-card-actions .oda-chat-action-postback').prop('disabled', true);
            $('.oda-chat-action-postback').prop('disabled', true);
        }
        
    });

        const connectFn = () => {
            console.log('Widget is opened');

            // BCCCB-3279 Accessibility - Text to Speech voice of the chatbot widget was set to male instead of female voice.

            Bots.setTTSVoice([{
                lang: 'en-US',
                name: 'Microsoft Zira - English (United States)'
            },])

            if (document.querySelector(".cb-boticon-message-container")) {
                document.querySelectorAll(".cb-boticon-message-container").forEach(el => { el.remove() })
            }

            $(".oda-chat-conversation-container").attr('role', 'list')
            // $(".oda-chat-button-narration").focus(); //BCCCB-481  // BCCCB - 625		
            $(".oda-chat-title").focus(); //BCCCB - 625
            // document.querySelector('.oda-chat-button').classList.remove('bounce');
            // Connect to the ODA
            Bots.connect().then(
                function () {
                    Bots.setDelegate({
                        beforeDisplay(message) {
                            messageType = undefined
                            isTransferAgent = false
                            // BCCCB-147- Contact ETS  - start
                            // Assign variables that will be needed on web forms
                            if (message.messagePayload.channelExtensions) {
                                if (message.messagePayload.channelExtensions.webFormBotId) {
                                    webFormBotId = message.messagePayload.channelExtensions.webFormBotId;
                                    webFormSubmitState = message.messagePayload.channelExtensions.webFormSubmitState;
                                }
                            }
                            // BCCCB-147- Contact ETS  - end

                            // BCCCB-149â€‹ - Chat storage in OSCâ€‹ - start
                            if (
                                message.messagePayload.channelExtensions &&
                                message.messagePayload.channelExtensions.sendChatLogSuccess === 'true'
                            ) {
                                if (sessionExpiring) clearTimeout(sessionExpiring);
                                return false;
                            }
                            // BCCCB-149â€‹ - Chat storage in OSCâ€‹ - end

                            // BCCCB-188 - Agent wait time message repeated - start
                            if (isAgentWaitTimeActive) {

                                $('.agentWaitTimeMessage').last().closest(".oda-chat-left").remove()
                                let msgmodified = message
                                msgmodified.isAgentWaitTime = true

                                return msgmodified
                            }
                            // check for Agent Wait Time Message
                            isAgentWaitTimeActive = (message.messagePayload.text && message.messagePayload.text.indexOf('agentWaitTimeMessage') > 0)
                            // BCCCB-188 - Agent wait time message repeated - end

                            // BCCCB -515 ODA Live Agent Chat - end user 'disconnect' trigger - start
                            isTransferAgent = isAgentWaitTimeActive || (message.messagePayload.text && message.messagePayload.text.indexOf('agentWaitMessage') > 0)
                            // BCCCB -515 ODA Live Agent Chat - end user 'disconnect' trigger - end

                            /*
                             * BCCCB-149 - Email ETS Flow - start
                             * Note: make sure in webview component label is 'emailForm'
                             * Snippet for opening webview in JQuery UI Dialog 
                            */
                            if (message.messagePayload.cards && message.messagePayload.cards[0].actions) {
                                if (message.messagePayload.cards[0].actions[0].label == 'emailForm'
                                    || message.messagePayload.cards[0].actions[0].label == 'authForm'
                                    || message.messagePayload.cards[0].actions[0].label == 'secureBrowserForm') {

                                    let url = message.messagePayload.cards[0].actions[0].url;
                                    let title = $(".oda-chat-button-narration").attr('title');
                                    
                                    if (title === 'Turn audio response off') {
                                        url += "&narration=on";
                                    }

                                    $('#webform').attr('src', url);

                                    $('#dialog').dialog('option', 'title', '<img id="form-logo" src="' + `${etsConfig.programs[etsProgram].ImageURL}/ets-logo-black.svg` + '" alt="ETS Logo"> ' + message.messagePayload.cards[0].title);

                                    $('#dialog').dialog('open');

                                    return false;
                                } else if (message.messagePayload.cards[0].actions[0].label == 'Provide information'
                                        || message.messagePayload.cards[0].actions[0].label == 'Fill out email form'
                                        || message.messagePayload.cards[0].actions[0].label == 'Fill out form' ) {
                                
                                    messageType = "webview";
                                    message.messagePayload.cards[0].actions[0].type = 'webview';
                                    Bots.setWebViewConfig({
                                        title: "Provide Information",
                                        size: "full"
                                    })
                                }
                            }

                            

                            // Snippet for closing the Jquery UI Dialog
                            if (message.messagePayload.channelExtensions) {
                                if (
                                    message.messagePayload.channelExtensions.showForm &&
                                    message.messagePayload.channelExtensions.showForm == 'false'
                                ) {

                                    $(".oda-chat-webview-container").removeClass("oda-chat-webview-container-open").addClass("oda-chat-webview-container-close")
                                    $('#dialog').dialog('close');

                                    if (message.messagePayload.channelExtensions.sendTranscript &&
                                        message.messagePayload.channelExtensions.sendTranscript == 'true'
                                        && message.messagePayload.channelExtensions.sourceState
                                    ) {
                                        sendChatHistoryPostback(botId, { targetState: message.messagePayload.channelExtensions.sourceState, targetAction: 'sendTranscript', variable: "str_ChatTranscript" });
                                    }

                                    return false;
                                }
                            }
                            // BCCCB-149 - Email ETS Flow - end

                            return message;
                        },
                        beforeSend(message) {
                            // BCCCB-189: Adding variations of cancel to exit the live agent queue
                            if (
                                message.messagePayload.text.toLowerCase() == `"cancel"` ||
                                message.messagePayload.text.toLowerCase() == `'cancel'`
                            ) {
                                message.messagePayload.text = 'cancel';
                            }
                            // BCCCB-189 - end
                            hasConversationWithBot = true;
                            isChatLogSentTimeOutSession = false;
                            $('.ets-custom-ui').addClass('disabled').trigger('DisableETSCustomUI')
                            return message;
                        },
                        beforePostbackSend(postback) {
                            isChatLogSentTimeOutSession = false
                            hasConversationWithBot = true;
                            $('.ets-custom-ui').addClass('disabled').trigger('DisableETSCustomUI')
                            return postback;
                        }
                    });

                    // Message Incicator CSS
                        if  ($(".oda-chat-messages-wrapper").find("oda-chat-typing-cue"))   {
                                $(".oda-chat-wrapper .oda-chat-message-bubble").css({"width": "62px", "height": "46px", "padding": "12px", "line-height": "24px"})
                        }
                },
                function (error) {
                    // Something went wrong during connection
                    cantConnectToServer();
                }
            );

            try {
                Bots.off(WebSDK.EVENT.WIDGET_OPENED, connectFn);
            } catch (error) {
               
            }

        }


        if (isIVR) {
            connectFn()
        } else {
            Bots.on(WebSDK.EVENT.WIDGET_OPENED, connectFn);
        }

        Bots.on(WebSDK.EVENT.WIDGET_CLOSED, () => {
            console.log('Widget is closed');
            //sendChatHistoryPostback(botId, transcriptGeneralOption);
            //console.log(JSON.stringify(Bots.getConversationHistory(), null, 4));
        });

        /***********************************************************************************************
         * EVENT : NETWORKCHAGE
         ***********************************************************************************************/
        let connectRetry = 0;
        Bots.on('networkstatuschange', (status) => {

            switch (status) {
                case 0: // Connecting
                    console.log('Network status Connecting');
                case 1: // Open
                    console.log('Network status Open');
                    //document.querySelector('.oda-chat-footer').style.display = 'flex';
                    break;
                case 2: // Closing
                case 3: // Closed
                    console.log('Network status is Closed');
            }
            setTimeout(() => {
                document.querySelector(".oda-chat-connection-status").innerHTML = _SUB_HEADER_TITLE_
            }, (0));
        });

        /***********************************************************************************************
         * EVENT : MESSAGE RECEIVE
         ***********************************************************************************************/
        Bots.on('message:received', function (message) {

            $(function () {
                $("input.c-ui").checkboxradio();
            });

            // BCCCB - BCCCB-1730
            if (!isChatLogSentTimeOutSession) {
                timerChannelSession && clearTimeout(timerChannelSession);
                timerChannelSession = setTimeout(() => {
                    sendChatHistoryPostback(botId, transcriptGeneralOption);
                    isChatLogSentTimeOutSession = true
                }, (_TIMEOUT_TO_SEND_CHATLOG_MINUTES_ * 1000 * 60) - 5000)
            }

            setTimeout(() => {

                create_custom_dropdowns();

                if (messageType === "webview"){
                    $(".oda-chat-card").last().addClass("ets-custom-webview");
                }
                /*
                * BCCCB-538	Accessibility - Button State Hover
               *  Hide all disabled items from Screen readers
               */
                $('.oda-chat-wrapper *[disabled]').attr({ 'aria-hidden': true })
                $('.oda-chat-action-postback').attr({ 'aria-label': ' ' })

                /*
                * BCCCB-3143 - Email Hyperlink fix
                * Note: Overhaul Greeting look and feel
                */
                ignoreOnBeforeUnload = false
                $('a[href^=mailto]').on('click', function () {
                    ignoreOnBeforeUnload = true;
                });
                /*
               * BCCCB-2759 - TOEFL - Greeting Enhancement
               * Note: Overhaul Greeting look and feel
               */
                if (message.messagePayload.channelExtensions
                    && message.messagePayload.channelExtensions.crcType) {

                    showGreetingMenu(message)
                }


                // BCCCB-575 - Condensed List - start
                // Check if message is a postback and payload is > 1
                if (message.messagePayload.actions) {
                    $('.oda-chat-left .oda-chat-message-bubble:last-of-type()').addClass('ets-chat-message-bubble-condensed')
                }
                // BCCCB-575 - Condensed List - End
                $(".appointment-card-title").closest(".oda-chat-card").addClass("ets-chat-card-condensed")

                // BCCCB- 595- Reschedule Test - Change background of appointment cards 
                $('.appointment-inactive').closest(".oda-chat-card").css("backgroundColor", "#F2F2F2")
                $('.appointment-active').closest(".oda-chat-card").css("backgroundColor", "#D8EAFF")

                // BCCCB- 689- Hide decorative images 
                $('.oda-chat-left img').attr('aria-hidden', true)

                // BCCCB-499 - Hypercare R1 Accessibility - Carousel Icons and Navigation Buttons
                const prevNextAccessiblitySetttings = { "tabindex": -1, "aria-hidden": true }
                $('.oda-chat-next').attr({ "tabindex": -1, "aria-hidden": true })
                    .click(() => {
                        $('.oda-chat-previous').attr(prevNextAccessiblitySetttings)
                    })
                $('.oda-chat-card-actions .oda-chat-action-postback').keydown((e) => {
                    setTimeout(() => {
                        e.which === 9 && $('.oda-chat-previous').attr(prevNextAccessiblitySetttings)
                    }
                        , 500)
                })

                                        /**
                 * BCCCB-187_Apply Voucher - start
                 * Show accordion for "Apply for Voucher" use case
                 */
                                         $('.oda-chat-wrapper .accordion').accordion({
                                            collapsible: true,
                                            active: false,
                                            heightStyle: "content",
                                            icons: null,
                                            create: function (event, ui) {
                                                let latestUIAccordion = $('.oda-chat-wrapper .ui-accordion').last()
                        
                                                latestUIAccordion.find('.ui-accordion-header').append('<div><span><img src="'+FAIcon+'/plus.svg" role="img" alt="Expand Card" style="display: block;height: 20px;width: 20px; margin-left: 18px;"></span> </div>')
                        
                                                let latesMsgContent = latestUIAccordion.closest(".oda-chat-message-content")
                                                let latestWrapper = latestUIAccordion.closest(".oda-chat-content-wrapper")
                                                let latestMessageBubble = latestUIAccordion.closest(".oda-chat-message-bubble")
                                                latesMsgContent.appendTo(latestWrapper)
                                               // latestMessageBubble.remove()
                                            },
                                            activate: function (event, ui) {
                        
                                                $(ui.newHeader).find("div:last-of-type").remove();
                                                $(ui.newHeader).append('<div><span><img src="'+FAIcon+'/minus.svg" role="img" alt="Close Card" style="display: block;height: 20px;width: 20px;margin-left: 18px;"></span></div>')
                        
                                                $(ui.oldHeader).find("div:last-of-type").remove();
                                                $(ui.oldHeader).append('<div><span><img src="'+FAIcon+'/plus.svg" role="img" alt="Expand Card" style="display: block;height: 20px;width: 20px;margin-left: 18px;"></span></div>')
                        
                                            }
                        
                                        });




                // BCCCB-187 Voucher - end
                // Change icons of thumbs up and thumbs down to fontawesome
                let buttonsUp = document.querySelectorAll('button[title=👍]');
                let buttonsDown = document.querySelectorAll('button[title=👎]');
                buttonsUp.forEach((button) => {
                    //button.parentElement.style.flexDirection = 'unset';
                    button.innerHTML = '<div><span><img src="'+FAIcon+'/thumbs-up.svg" class="feedback-buttons" role="img" alt="Thumbs up"></span> </div>';
                });
                buttonsDown.forEach((button) => {
                    //button.parentElement.style.flexDirection = 'unset';
                    button.innerHTML = '<div><span><img src="'+FAIcon+'/thumbs-down.svg" class="feedback-buttons" role="img" alt="Thumbs down"></span> </div>';
                });

                // BCCCB-479 - Accessibility - ETS Logo Graphic
                $('.oda-chat-left').find('.oda-chat-message-icon').attr('alt', "Anita Chatbot Logo")

                /*
                * BCCCB - 626 and 627
                $(".oda-chat-left").length > 1 && $(".oda-chat-message-icon")
                                                    .last()
                                                    .attr('tabindex', 0)
                                                    .focus()
                                                    .css('outline', 'none')
                                                    .blur(()=>{ $(".oda-chat-message-icon").attr('tabindex', -1) })
                */

                //BCCCB-417 - Carousel Card enhancements
                $('.oda-chat-wrapper .ui-accordion').closest(".oda-chat-message-bubble").css("backgroundColor", "white")

                if (message.source === 'AGENT') {
                    isTransferAgent = true
                    $('.oda-chat-left').eq(-2)
                        .find('.oda-chat-message-icon')
                        .attr('src', `${etsConfig.programs[etsProgram].ImageURL}/ets-logo-black.svg`)
                        .css('cssText', ' width: 32px !important ;height: 32px !important; margin:0 !important;')
                    $('.oda-chat-left').eq(-2)
                        .find('.oda-chat-message-bubble')
                        .css('backgroundColor', '#D7FAED')
                }
                // BCCCB-149â€‹ - Chat storage in OSCâ€‹ - start
                // Get botId from any of the postback messages. Primarily from "doGreetings" state
                if (
                    !botId &&
                    message.messagePayload.actions &&
                    message.messagePayload.actions[0].postback['system.botId']
                ) {
                    botId = message.messagePayload.actions[0].postback['system.botId'];
                }
                /* Make sure that botId is not empty otherwise chatlog will not be sent
                *  TRIGGER : trigger chatlog send at the end of the conversation defined by the channelExtension.endConversataion property
                *           so ensure to define channelExtension.endConversation = true. 
                */

                // REMOVE to address BCCCB-513

                /* 
                * REMOVE -- BCCCB 1730
                 if (
                     botId &&
                     message.messagePayload.channelExtensions &&
                     message.messagePayload.channelExtensions.endConversation === 'true'
                 ) {
                     sendChatHistoryPostback(botId, transcriptGeneralOption);
                     isChatLogSentCompletedConvo = true;
                 }
                 */
                //accessiblity
                $(".oda-chat-message").not("[role='listitem']").attr('role', 'listitem')

            }, 1);
        });

        /***********************************************************************************************
         * EVENT : WINDOW BEFORE UNLOAD
         ***********************************************************************************************/
        $(window).on('focus', function () {
            ignoreOnBeforeUnload = false;
        });

        $(window).on('beforeunload', function () {
            if (!ignoreOnBeforeUnload) {
                if (isTransferAgent) {
                    Bots.sendMessage({
                        text: '## User left the conversation ##',
                        type: 'text'
                    }, { hidden: true });
                }

                // if (!isChatLogSentCompletedConvo) {
                if (!isChatLogSentTimeOutSession) {
                    sendChatHistoryPostback(botId, transcriptGeneralOption);
                    beforeUnloadChatLogSent = true;
                }
            }
        });

        // Create global object to refer Bots
        window[name] = Bots;
        //if (!isIVR) {
        //document.querySelector('.oda-chat-button').classList.add('bounce');
        //}

        //initModalComponent
        initModalComponent({ logoUrl: `${etsConfig.programs[etsProgram].ImageURL}/ets-logo-black.svg` })
    }, 0);

    /**
     * @description Show Cannot Connect to server message
     */
    const cantConnectToServer = () => {
        const now = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        const timeStamp = `${now.toLocaleDateString('en-US', options)}, ${now.toLocaleTimeString('en-US')}`;
        document.querySelector(
            '.oda-chat-conversation-container'
        ).innerHTML = `<div class="oda-chat-message oda-chat-left" lang="en"><span class="oda-chat-screen-reader-only">Skill says</span><div class="oda-chat-message-wrapper"><div class="oda-chat-icon-wrapper"><img src="${etsConfig
            .programs[etsProgram]
            .ImageURL}/ets-logo-black.svg" role="img" alt="ETS Logo" class="oda-chat-message-icon"></div><div class="oda-chat-content-wrapper"><div class="oda-chat-message-bubble"><div class="oda-chat-message-content"><div>I'm sorry, our system is currently unavailable, please check again later.</div></div><div class="oda-chat-message-date" aria-live="off" aria-hidden="true">${timeStamp} âœ“</div></div></div></div></div>
        <div class="oda-chat-message oda-chat-left" lang="en"><span class="oda-chat-screen-reader-only">Skill says</span><div class="oda-chat-message-wrapper"><div class="oda-chat-icon-wrapper"><img src="${etsConfig
                .programs[etsProgram]
                .ImageURL}/ets-logo-black.svg" role="img" alt="ETS Logo" class="oda-chat-message-icon"></div><div class="oda-chat-content-wrapper"><div class="oda-chat-message-bubble"><div class="oda-chat-message-content"><div>For immediate assistance, please check the <a target = "_blank" href="${etsConfig
                    .programs[etsProgram].helpLink}">${etsConfig.programs[etsProgram]
                        .programName} contact </a> options.</div></div><div class="oda-chat-message-date" aria-live="off" aria-hidden="true">${timeStamp} âœ“</div></div></div></div></div>`;
        document.querySelector('.oda-chat-connection-status').innerHTML = 'DISCONNECTED';
    };
};
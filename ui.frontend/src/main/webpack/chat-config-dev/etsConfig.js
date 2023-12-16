"use strict";
const Five9urlParams = new URLSearchParams(window.location.search),
    sessionId = Five9urlParams.get("sessionid");
sessionId && $.ajax({
    url: "https://ets.custhelp.com/cgi-bin/ets.cfg/php/custom/chatbot.five9.php?sessionid=" + sessionId
});
const getETSConfig = () => ({
    odaURI: 'oda-e40b50f987234cd9917401d2041ee2c6-da2.data.digitalassistant.oci.oraclecloud.com',
    programs: {
        GRE: {
            programName: "GRE",
            webChannelId: '339e8513-9e4f-4b9b-a766-1cb8a03a4bfd', //'ec24fa55-8270-4739-bd1c-a953a491b24a', 
            helpLink: "https://www.ets.org/gre/contact/?chatbot=/gre/contact/",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        },
        TOEFL: {
            programName: "TOEFL",
            webChannelId: 'e3f47b00-b3c6-4dab-92c2-635a76bd869d', //'a37f31e5-5fc3-4c42-b267-0420088217e3', 
            helpLink: "https://www.ets.org/toefl/contact/?chatbot=/toefl/contact/",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        },
        HiSET: {
            programName: "HiSET",
            webChannelId:  '4f64eb64-b29b-426a-af4f-be1b1da60d83', 
            helpLink: "https://hiset.ets.org/contact/?chatbot=/contact/",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        },
        PRAXIS: {
            programName: "PRAXIS",
            webChannelId:  '0f295e39-5707-4036-bbd8-9b7c52ade889',
            helpLink: "https://www.ets.org/praxis/contact/?chatbot=/contact/",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        },
        ParaPro: {
            programName: "ParaPro",
            webChannelId:  '0f295e39-5707-4036-bbd8-9b7c52ade889',
            helpLink: "https://www.ets.org/parapro/contact/?chatbot=/contact/",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        },
        SLS: {
            programName: "SLS",
            webChannelId:  '0f295e39-5707-4036-bbd8-9b7c52ade889',
            helpLink: "https://www.ets.org/sls/contact/?chatbot=/contact/",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        },
        AP: {
            programName: "AP",
            webChannelId: '49c99c9d-7038-46d0-ac39-12a8eaf229ce',
            helpLink: "https://www.ets.org/contact",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        }
    },
    ivrIntents: {
        "a31625cb-4cba-42d6-bb36-ab8f76299df5": "Start over",
        "85bee9c5-52a3-4ec2-9883-adbf4d06665b": "Know my username",
        "f1e5f983-326e-41a8-9c45-74d7abeb400f": "Scoring or score report",
        "b16466ca-b03e-4353-9568-fa61f3560c41": "Register for a test flow",
        "55ddea39-696c-41d7-bf93-7a98ef97bca2": "Test preparation"
    }
});
"use strict";
const Five9urlParams = new URLSearchParams(window.location.search),
    sessionId = Five9urlParams.get("sessionid");
sessionId && $.ajax({
    url: "https://ets.custhelp.com/cgi-bin/ets.cfg/php/custom/chatbot.five9.php?sessionid=" + sessionId
});
const getETSConfig = () => ({
    odaURI: 'oda-b5675d826e074d05b3305135c81c2162-da2.data.digitalassistant.oci.oraclecloud.com',
    programs: {
        GRE: {
            programName: "GRE",
            webChannelId: 'c85b6f79-d176-4af3-9994-721887eb5a03',
            helpLink: "https://www.ets.org/gre/contact/?chatbot=/gre/contact/",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        },
        TOEFL: {
            programName: "TOEFL",
            webChannelId: 'd2bb3269-9e34-447c-9096-e8433d3b73e7',
            helpLink: "https://www.ets.org/toefl/contact/?chatbot=/toefl/contact/",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        },
        HiSET: {
            programName: "HiSET",
            webChannelId: 'd36bc8ed-efc3-424c-b35e-a8408a568603',
            helpLink: "https://hiset.ets.org/contact/?chatbot=/contact/",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        },
        PRAXIS: {
            programName: "PRAXIS",
            webChannelId: '1027d6cd-d4b6-4a81-8d39-3fade031884d',
            helpLink: "https://www.ets.org/praxis/contact/?chatbot=/contact/",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        },
        ParaPro: {
            programName: "ParaPro",
            webChannelId:  '1027d6cd-d4b6-4a81-8d39-3fade031884d',
            helpLink: "https://www.ets.org/parapro/contact/?chatbot=/contact/",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        },
        SLS: {
            programName: "SLS",
            webChannelId:  '1027d6cd-d4b6-4a81-8d39-3fade031884d',
            helpLink: "https://www.ets.org/sls/contact/?chatbot=/contact/",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        },
        AP: {
            programName: "AP",
            webChannelId: '4d43c96f-38f1-4227-9461-0b9d6ce289bf',
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
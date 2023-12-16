"use strict";
const Five9urlParams = new URLSearchParams(window.location.search),
    sessionId = Five9urlParams.get("sessionid");
sessionId && $.ajax({
    url: "https://ets.custhelp.com/cgi-bin/ets.cfg/php/custom/chatbot.five9.php?sessionid=" + sessionId
});
const getETSConfig = () => ({
    odaURI: "oda-7d45bc8b07464a85817b482742d79302-da2.data.digitalassistant.oci.oraclecloud.com",
    programs: {
        GRE: {
            programName: "GRE",
            webChannelId: "25db2317-edc2-4758-9c22-b78443f4bc36",
            helpLink: "https://www.ets.org/gre/contact/?chatbot=/gre/contact/",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        },
        TOEFL: {
            programName: "TOEFL",
            webChannelId: "47ee5b7b-32e5-4516-87a9-1868f6ab5862",
            helpLink: "https://www.ets.org/toefl/contact/?chatbot=/toefl/contact/",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        },
        HiSET: {
            programName: "HiSET",
            webChannelId: "8f164929-1307-4308-80df-a6b58371c3d7",
            helpLink: "https://hiset.ets.org/contact/?chatbot=/contact/",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        },
        PRAXIS: {
            programName: "PRAXIS",
            webChannelId: "64e9071b-1f13-46b7-873b-91c05a9af10b",
            helpLink: "https://www.ets.org/praxis/contact/?chatbot=/contact/",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        },
        ParaPro: {
            programName: "ParaPro",
            webChannelId: "64e9071b-1f13-46b7-873b-91c05a9af10b",
            helpLink: "https://www.ets.org/parapro/contact/?chatbot=/contact/",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        },
        SLS: {
            programName: "SLS",
            webChannelId: "64e9071b-1f13-46b7-873b-91c05a9af10b",
            helpLink: "https://www.ets.org/sls/contact/?chatbot=/contact/",
            ImageURL: "/content/dam/ets-org/chat-bot-icons"
        },
        AP: {
            programName: "AP",
            webChannelId: "1ac11384-50a7-468d-bd22-fd100431befd",
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
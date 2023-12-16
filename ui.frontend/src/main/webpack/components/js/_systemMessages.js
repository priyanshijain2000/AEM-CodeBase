var messageIndex = 0;
var containerList = [];
var previousMessageClass = "";
$(window).on('load', function () {
    var systemMessages =document.querySelector('.system-messages');
if(systemMessages){
    var messageContainer= systemMessages.querySelector('.messages');
    if(messageContainer){
        var container =  $(messageContainer).children('div');
         containerList = Array.from(container);
        containerList.forEach((message,index)=>{
            if(index!=0){
                message.setAttribute("hidden", "hidden");
            }
            else{
                $(systemMessages).addClass($(message).data('messagetype'));
                previousMessageClass = $(message).data('messagetype');
            }
        }
    )}
}
});
$('.message-scroll-btn').on('click', function(){
    if(messageIndex == containerList.length-1){
        messageIndex = 0;
    }else{
        messageIndex++;  
    }
    containerList.forEach((message,index)=>{
        if(index!=messageIndex){
            message.setAttribute("hidden", "hidden");
        }
        else{
            message.removeAttribute("hidden");
            var systemMessages =document.querySelector('.system-messages');
            $(systemMessages).removeClass(previousMessageClass);
            $(systemMessages).addClass($(message).data('messagetype'));
                previousMessageClass = $(message).data('messagetype');
        }
    });
});
$('.close-system-message').on('click', function(){
    var systemMessages = document.querySelector('.system-messages');
    if(systemMessages){
        $(systemMessages).addClass('d-none');
    }
});
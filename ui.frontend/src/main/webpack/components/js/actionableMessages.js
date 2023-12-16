$('.close-action-message').on('click', function(){
    var actionableMessages = $(this).parent();
    if(actionableMessages){
        $(actionableMessages).addClass('d-none');
    }
});

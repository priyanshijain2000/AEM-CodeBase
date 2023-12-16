var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
var rootElement = document.documentElement;

function handleScroll() {
  var odaChatButton = document.querySelector('.oda-chat-wrapper');
  // Do something on scroll
  var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if (rootElement.scrollTop / scrollTotal > 0.1) {
    // Show button
    scrollToTopBtn.classList.add("showBtn");
    if(odaChatButton) {
      odaChatButton.classList.add('move-top');
    }
  } else {
    // Hide button
    scrollToTopBtn.classList.remove("showBtn");
    if(odaChatButton) {
      odaChatButton.classList.remove('move-top');
    }
  }

  
}

if(scrollToTopBtn){
	scrollToTopBtn.addEventListener("click", function () {
	  $('html, body').animate({
	    scrollTop: 0
	  }, 'slow');
	});
	document.addEventListener("scroll", handleScroll);
}
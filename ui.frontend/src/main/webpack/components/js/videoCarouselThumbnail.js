
/**
 * Create custom thumbnail from data-attribute provided url
 * @param {string} url
 * @return {string} The HTML containing the <img> tag
 */
function createCustomThumbail(k) {
    return (
        '<img class="carousel-thumbnail" src="' +
        k +
        '" alt="Video Preview" />'
    );
}

/**
 * For each video player, create custom thumbnail or
 * use Youtube max resolution default thumbnail and create
 * iframe video.
 */
 function getVideos() {
    const v = document.getElementsByClassName("videoText");
    for (let n = 0; n < v.length; n++) {
          const k = v[n].children[0].children[0].getAttribute('data-placeholder');
          if(k !== null) {
            const p = document.createElement("div");
            p.className = 'video-container__thumbnail';
            p.innerHTML = createCustomThumbail(k);
            v[n].appendChild(p);
        }   
    }
}

$(".carousel-video-container .videoText").on("click",".video-container__thumbnail", function () {
    $(this).hide();
    const j= $(this)[0].children[0].parentElement.previousElementSibling;
    j.style.display = 'block';
    const l = j.children[0];
    const k = l.getAttribute('src');
    if(k !== null) {
           
                   if (k.indexOf("?") > -1) {
                    l.setAttribute('src',k+'&autoplay=1');
                  }
                else{
                    l.setAttribute('src',k+'?autoplay=1');
       } 
    } 
});
$( document ).ready(function() {
    if(document.querySelector(".carousel-video-container")!==null){
        (function () {
            getVideos();
        })();
    }
    else{
        return false;
    }
});


var $videoframeFlag = 1;
$.fn.videoPlayLitbox = function(e) {
  var $KalturaPlayerPopup = "";
  var $fnVIdeoModal = '';
  var $videoTarget = e.currentTarget.dataset.bsTarget;
  var $videoSrc = e.currentTarget.dataset.src;
  var $videoId = e.currentTarget.dataset.videoId;
  var $uiconfId = e.currentTarget.dataset.uiconfId;
  var $videoType = e.currentTarget.dataset.videoType;
  var $targetId = e.currentTarget.dataset.targetId;
  var $wId = e.currentTarget.dataset.wId;
  var $kalturavideoId = e.currentTarget.dataset.kalturavideoId;
  var $nodeName = e.currentTarget.dataset.nodeName;
    // when the modal is opened autoplay it  
    $fnVIdeoModal = $($videoTarget).on('shown.bs.modal', function (e) {
    // set the video src to autoplay and not to show related video.
    if($videoSrc !=undefined) {
        if ($videoSrc.indexOf("?") > -1) {
          $('#'+$videoId).attr('src',$videoSrc +'&autoplay=1');
          }
        else{
          $('#'+$videoId).attr('src',$videoSrc +'?autoplay=1');
          }
    }
    if($videoType == 'KalturaVideo') {
      if($videoframeFlag == 1){
       try {
           $KalturaPlayerPopup = KalturaPlayer.setup({
              targetId: $targetId,
              provider: {
                  partnerId: $wId,
                  uiConfId: $uiconfId,
              }
          });
          $KalturaPlayerPopup.loadMedia({entryId: $kalturavideoId});
          } catch (e) {
            console.error(e.message);
          }
        $('#modal-video-player_'+$nodeName).css("padding","3rem");
        $videoframeFlag++;
      }
    }
  }).modal('show');
  // stop playing the video on close of the modal
  $($videoTarget).on('hide.bs.modal', function (e) {
    $('#'+$videoId).attr('src','');
    if($KalturaPlayerPopup){
     $KalturaPlayerPopup.destroy($targetId);
    }
  }).modal('hide');
}
$(window).on('load', function () {
  // Gets the video src from the data-src on each button
  $('.videoText__container img').on('click', function(e) {
      $videoframeFlag = 1;
      $.fn.videoPlayLitbox(e);
  });
  $('.videoText__container img').keypress(function(e) {
    var key = e.which;
    if (key == 13){
      $videoframeFlag = 1;
      $.fn.videoPlayLitbox(e);
    }
  });
});

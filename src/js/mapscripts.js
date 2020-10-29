let loadingFrameText = $("<div>").addClass('loading-frame__text').html('Название ресурса');
let loadingFramePic = $("<div>").addClass('loading-frame__pic');
let loadingFrame = $("<div>").addClass('loading-frame').append(loadingFramePic).append(loadingFrameText);
$('body').append(loadingFrame);

loadingFrame.fadeOut(1000, function() {
  this.remove();
});
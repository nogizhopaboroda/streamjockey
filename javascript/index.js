(function(w, d){
  d.querySelector('.buttons-section').addEventListener('click', function(event){
    var target = event.target;
    if(target.tagName === 'I'){
      target.classList.add('animate');
      setTimeout(function(){
        target.classList.remove('animate');
      }, 500);
    }
    if(target.classList.contains('icon-play')){
      target.classList.add('is-playing');
      target.classList.remove('icon-play');
      target.classList.add('icon-pause');
      document.querySelector('.equaliser-section').classList.add('is-playing');
      return;
    }
    if(target.classList.contains('icon-pause')){
      target.classList.remove('is-playing');
      target.classList.remove('icon-pause');
      target.classList.add('icon-play');
      document.querySelector('.equaliser-section').classList.remove('is-playing');
      return;
    }
  });
})(window, document);

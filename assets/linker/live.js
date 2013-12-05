(function(){
  'use strict';
  var host = (location.host || 'localhost').split(':')[0]
    , port = 35729;

  document.write('<script src="http://' + host + ':'+port+'/livereload.js?snipver=1&host='+host+'"></' + 'script>');
})()


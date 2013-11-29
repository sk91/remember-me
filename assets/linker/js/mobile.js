var mobile = {};
(function(window,$, io,socket , undefined){

mobile.init = function (){
  $.body.append(JST.main());
}

mobile.initSlideout = function(menu){
 $().ready(function(){
    $.UISlideout();
    $.UISlideout.populate(menu);
 })
}


mobile.articles = function(){

}


$().ready(mobile.init);

})(window,jQuery,io,socket);
var mobile = {};
(function(window,$, undefined){

  mobile.initialized = $.Deferred();
  mobile.init = function (){
    mobile.data=fixtures;
    mobile.populate();
    mobile.initHandlebars();
    $.body.append(JST.app(mobile.data));
    mobile.initURI();
    mobile.initialized.resolve();
  }


  mobile.populate = function(){
    var cache={}
      , data = mobile.data;
    for(var j=0;j<data.deceased.length;j++){
        cache[data.deceased[j].id] = data.deceased[j];    
    }
    for(var i=0;i<mobile.data.ads.length;i++){
      var current = mobile.data.ads[i];
      if(typeof current.deceased ==='object' ){
        continue;
      }
      if(current.deceased in cache){
        current.deceased = cache[current.deceased];
        continue;
      }
      current.deceased = null;
    }   
  }

  mobile.initHandlebars = function(){
    Handlebars.registerPartial("ad_li",JST.ad_li);
    Handlebars.registerPartial("ad", JST.ad);
    Handlebars.registerPartial('main_article',JST.main);
    Handlebars.registerHelper('data',function(context,options){
      context.data=data;
      return options.fn(context);
    });
  }

  mobile.initURI = function(){
    var id=$('article').eq(0)[0].id;
    $.UISetHashOnUrl(id);
    $.firstArticle = $('#'+id);
    $.UINavigationHistory[0] = '#' + id;
  }

  mobile.initSlideout = function(menu){
   mobile.initialized.then(function(){
      // $.UISlideout($.body);
      // $.UISlideout.populate(menu);
   })
  }


  mobile.articles = function(){

  }


  $().ready(mobile.init);

})(window,jQuery);
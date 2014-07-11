var dependency = {

  _ary:new Array(),
  _hdl:null,
  debug:false,

  load:function(f) {
    var idx = dependency._ary.length;
    dependency._ary[idx] = false;
    $.get(f, function(r) {
      eval(r);
      if (dependency.debug) console.log(f+": ready !" );
      dependency._ary[idx] = true;
    });
  },

  ready:function(cb) {
    dependency._hdl = setInterval( function() {
      var isReady = true;
      for (var i=0; i<dependency._ary.length && isReady; i++) isReady = dependency._ary[i];
      if (isReady) {
        clearInterval(dependency._hdl); dependency._hdl = null;
        if (dependency.debug) console.log("All ready !" );
        cb.call();
      }
    },5);
  },

}
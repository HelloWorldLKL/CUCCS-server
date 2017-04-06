export default {
  getQueryString: function(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) {
    	return unescape(r[2]);
    }
    return null;
  },
  smoothscroll: function() {
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;  
    if (currentScroll > 0) {
      window.requestAnimationFrame(smoothscroll);
      window.scrollTo (0,currentScroll - (currentScroll/5));
    }
  }
}

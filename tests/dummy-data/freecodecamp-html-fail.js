module.exports = `<body class="top-and-bottom-margins"><script>(function(i,s,o,g,r,a,m){ i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-55446531-1', 'auto');
ga('require', 'displayfeatures');
ga('send', 'pageview');</script><!-- Leave the below lines alone!--><script>(function(global) {
  global.main = global.main || {};
  global.main.isLoggedIn = false;
  global.main.userId = false;
}(window))</script><script src="/js/vendor-main-73068f4947.js"></script><script src="/js/main-2cf54b5968.js"></script><nav class="navbar navbar-default navbar-fixed-top nav-height"><div class="navbar-header"><button type="button" data-toggle="collapse" data-target=".navbar-collapse" class="hamburger navbar-toggle"><div class="col-xs-12"><span class="hamburger-text">Menu</span></div></button><a href="/challenges/next-challenge" class="navbar-brand"><img src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg" alt="learn to code javascript at freeCodeCamp logo" class="img-responsive nav-logo"></a></div><div class="collapse navbar-collapse"><ul class="nav navbar-nav navbar-right hamburger-dropdown"><li class="hidden-xs"><a id="nav-map-btn" href="/map" onclick="if (!(event.ctrlKey || event.metaKey)) {return false;}">Map</a></li><li class="visible-xs"><a href="/map">Map</a></li><li><a href="https://forum.freecodecamp.org" target="_blank">Forum</a></li><li><a href="/contribute" target="_blank">Contribute</a></li><li><a href="/about" target="_blank">About</a></li><li><a href="/donate" target="_blank">Donate</a></li><li><a href="/signin">Sign in</a></li></ul></div></nav><div class="container"><div class="row flashMessage negative-30"><div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"></div></div></div><div class="container"><script src="/bower_components/cal-heatmap/cal-heatmap.min.js"></script><script>var challengeName = 'Profile View';</script><h1 class="text-center">fcce3abbd74-b40e-4e5d-96a8-c7e1992dcfe1</h1><hr><div class="row"><div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 text-center"><img src="https://s3.amazonaws.com/freecodecamp/camper-image-placeholder.png" class="img-center img-responsive public-profile-img"><h1 class="text-center negative-5 profile-social-icons"></h1><h1 class="flat-top wrappable"></h1><h1 class="flat-top wrappable"></h1><p class="flat-top bio"></p><h1 class="flat-top text-primary">[ 1 ]</h1><div class="row"><div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2"></div></div></div></div><div class="spacer"></div><div class="col-md-12"><div id="cal-heatmap" class="hidden-xs hidden-sm d3-centered"><script>$(document).ready(function () {
    var cal = new CalHeatMap();
    var calendar = {"1504872838.942":1};
  /*
    var estUTCOffset = -5;
    // moment returns the utc offset in minutes
    var userUTCOffset = moment().utcOffset() / 60;
    var secondsToOffset =
      (estUTCOffset - userUTCOffset) * 3600;
    var offsetCalendar = {};
    for (var prop in calendar) {
      if (calendar.hasOwnProperty(prop)) {
        var offsetProp = prop + secondsToOffset;
        offsetCalendar[offsetProp] = calendar[prop];
      }
    }
    */
    cal.init({
        itemSelector: "#cal-heatmap",
        domain: "month",
        subDomain: "x_day",
        domainGutter: 10,
        data: calendar,
        cellSize: 15,
        align: 'center',
        cellRadius: 3,
        cellPadding: 2,
        tooltip: true,
        range: 6,
        start: new Date().setDate(new Date().getDate() - 150),
        legendColors: ["#cccccc", "#215f1e"],
        legend: [1, 2, 3],
        label: {
            position: "top"
        }
    });
});</script></div><div class="row"><div class="hidden-xs col-sm-12 text-center"><div class="row text-primary"><h4 class="col-sm-6 text-right">Longest Streak: 1  day</h4><h4 class="col-sm-6 text-left">Current Streak: 1  day</h4></div></div></div></div></div><!-- scripts should be moved here--><script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer></script><script src="https://cdn.optimizely.com/js/999692993.js"></script><aside class="map-aside is-collapsed"><div class="map-aside-action-bar"><a href="/map" target="_blank" aria-label="open map in new tab" class="map-aside-action-item map-aside-action-pop-out"></a><button aria-label="close map aside" class="map-aside-action-item map-aside-action-collapse"></button></div></aside></body></html>`;

!function(e,o){"use strict";var s="dev";console.log(window.location.href);var a=o.URL,t="/_res/map/app/",r="1534720433411999";(a.indexOf("lstest.natureserve.org")>-1||a.indexOf("localhost:8080")>-1)&&(r="361869493967321"),a.indexOf("http://shj/")>-1&&(t="http://shj/apps-git/2258-landscope.2/www/app/",r="1494625384129016"),a.indexOf("shj.blueraster.com")>-1&&(t="http://shj.blueraster.com/apps-git/2258-landscope.2/www/app/",r="1494625384129016"),a.indexOf("http://calummac")>-1&&(t="http://calummac/~calumbutler/workspace/landscope/2258-landscope.2/www/app/",r="1494625384129016"),a.indexOf("http://www.cmb.com")>-1&&(t="http://www.cmb.com/~calumbutler/workspace/landscope/2258-landscope.2/www/app/",r="1494625384129016"),a.indexOf("localhost:5000")>-1&&(t="http://localhost:5000/www/app/",r="1494625384129016");var i="1.0",n=t,c={arcgis:{src:"http://js.arcgis.com/3.10/",css:"http://js.arcgis.com/3.10/js/esri/css/esri.css",dojoConfig:{parseOnLoad:!1,isDebug:!1,async:!0,cacheBust:"v="+i,env:s,paths:{Partials:n+"/partials",Images:n+"/images"},packages:[{name:"Libs",location:n+"/libs"},{name:"Main",location:n+"/js/main"},{name:"Utils",location:n+"/js/utils"},{name:"Models",location:n+"/js/models"},{name:"Map",location:n+"/js/map"},{name:"Viewer",location:n+"/js/viewer"},{name:"MapUtils",location:n+"/js/maputils"},{name:"Partials",location:n+"/partials"}],aliases:[["MainController","Main/MainController"],["LayersController","Map/LayersController"],["MainUI","Main/MainUI"],["MainConfig","Main/Config"],["Model","Models/Model"],["PopupModel","Models/PopupModel"],["ModelController","Models/ModelController"],["ViewerModel","Models/ViewerModel"],["ViewerModelController","Models/ViewerModelController"],["ViewerController","Viewer/ViewerController"],["MapController","Map/MapController"],["MapConfig","Map/MapConfig"],["MapUI","MapUtils/MapUI"],["MapTools","MapUtils/MapTools"],["ThemeCustomizer","MapUtils/ThemeCustomizer"],["Loader","Utils/Loader"],["Delegator","Utils/Delegator"],["Messenger","Utils/Messenger"],["MessengerConfig","Utils/MessengerConfig"],["Hasher","Utils/Hasher"],["Builder","Utils/Builder"],["BuilderConfig","Utils/BuilderConfig"],["knockout","Libs/knockout-3.1.0"],["esriRequest","esri/request"],["knockout","Libs/knockout-3.1.0"],["Sortable","Libs/Sortable"],["dom-construct","dojo/dom-construct"],["dom-style","dojo/dom-style"],["dom-class","dojo/dom-class"],["dom","dojo/dom"],["query","dojo/query"],["registry","dijit/registry"],["deferred","dojo/Deferred"],["array","dojo/_base/array"],["topic","dojo/topic"],["all","dojo/promise/all"],["Fx","dojo/_base/fx"],["has","dojo/has"],["on","dojo/on"]],deps:["esri/config","MainController","dom","dom-class","dom-construct","query","dojo/domReady!"],callback:function(e,s,a,t,r,i){console.log("Dojo Callback");var c=i("#container #content");if(!c[0])throw new Error("div#content not defined","landscope.js",64);e.defaults.io.useCors=!0,e.defaults.io.corsEnabledServers.push("lstest.natureserve.org"),e.defaults.io.corsEnabledServers.push("www.landscope.org"),r.create("div",{id:"app"},c[0]),t.add(o.body,"claro"),s.init(n)}}},css:{dev:[{src:n+"/css/base.css",cdn:!1},{src:n+"/css/viewer.css",cdn:!1},{src:"http://js.arcgis.com/3.9/js/dojo/dijit/themes/claro/claro.css",cdn:!0},{src:"http://js.arcgis.com/3.9/js/dojo/dojox/image/resources/image.css",cdn:!0},{src:"//ajax.googleapis.com/ajax/libs/dojo/1.8.5/dojox/mobile/themes/custom/custom.css",cdn:!0},{src:"http://vjs.zencdn.net/c/video-js.css",cdn:!0}],pro:[{src:n+"/css/base.css",cdn:!1},{src:n+"/css/viewer.css",cdn:!1},{src:"http://js.arcgis.com/3.9/js/dojo/dijit/themes/claro/claro.css",cdn:!0},{src:"http://js.arcgis.com/3.9/js/dojo/dojox/image/resources/image.css",cdn:!0},{src:"//ajax.googleapis.com/ajax/libs/dojo/1.8.5/dojox/mobile/themes/custom/custom.css",cdn:!0},{src:"http://vjs.zencdn.net/c/video-js.css",cdn:!0}]}};window.appURL=n;var l=function(e,s){console.log("loading "+e);var a=o.createElement("script");a.setAttribute("src",e);for(var t in s)s.hasOwnProperty(t)&&a.setAttribute(t,s[t]);o.getElementsByTagName("head")[0].appendChild(a)},d=function(e,s){var a=o.createElement("link"),t=s?e:e+"?v="+i;a.setAttribute("rel","stylesheet"),a.setAttribute("type","text/css"),a.setAttribute("href",t),o.getElementsByTagName("head")[0].appendChild(a)},p=function(){e.dojoConfig=c.arcgis.dojoConfig,l(c.arcgis.src),d(c.arcgis.css,!0);var o,a=c.css[s],t=a.length;for(o=0;t>o;o++)d(a[o].src,a[o].cdn)};"loaded"===o.readyState?p():e.onload=p,window.fbAsyncInit=function(){FB.init({appId:r,xfbml:!0,version:"v2.0"})},function(e,o,s){var a,t=e.getElementsByTagName(o)[0];e.getElementById(s)||(a=e.createElement(o),a.id=s,a.src="//connect.facebook.net/en_US/sdk.js",t.parentNode.insertBefore(a,t))}(document,"script","facebook-jssdk"),console.log("fix malformed url");var m=navigator.userAgent.toLowerCase().indexOf("firefox")>-1,w=window.location.href.indexOf("%20&%20")>-1||window.location.href.indexOf(" & ")>-1,g=window.location.href.indexOf("#")>-1;if(m&&g){var f,u=window.location.href.split("#")[1],j=u.indexOf("%2525")<0&&u.indexOf("%25")>-1;j&&(f=u.replace(/%25/g,"%2525"),window.location.hash="#"+f)}if(!m&&g){var f,u=window.location.href.split("#")[1],h=u.indexOf("%2525")>-1;h&&(f=u.replace(/%2525/g,"%25"),window.location.hash="#"+f)}if(w&&g){var f,u=window.location.href.split("#")[1],f=u.replace(/ & /g,"%20%26%20").replace(/%20&%20/g,"%20%26%20");window.location.hash="#"+f}}(window,document);
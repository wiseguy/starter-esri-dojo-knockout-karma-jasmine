define(["dojo/dom","dojo/query","dojo/Deferred","dojo/dom-construct","dojo/_base/lang","dojo/io-query","core/config","dojo/hash"],function(o,e,n,t,r,u,c,i){var a={};return a.getNodeById=function(e){return o.byId(e)},a.getNodeList=function(o){return e(o)},a.loadPartial=function(o){console.log("loading the partial "+o);var e=new n;return require(["dojo/text!"+o],function(o){e.resolve(o)}),e},a.injectHtml=function(o,n,r){e(o).forEach(function(o){t.place(n,o,r)})},a.stringToObject=function(o){return u.queryToObject(o)},a.objectToQuery=function(o){return u.objectToQuery(o)},a.mixin=function(o,e){return r.mixin(o,e)},a.startDetectHashChange=function(){require(["dojo/hash","dojo/topic"],function(o,e){e.subscribe("/dojo/hashchange",function(){})})},a.updateHash=function(o){var e=a.objectToQuery(o);i(e)},a.hashChangeDetect=function(){topic.publish("appStateChange",{type:"x",value:11})},a});
jQuery.atmosphere=function(){jQuery(window).bind("unload.atmosphere",function(){jQuery.atmosphere.unsubscribe()
});
jQuery(window).bind("offline",function(){jQuery.atmosphere.unsubscribe()
});
jQuery(window).keypress(function(b){if(b.keyCode===27){b.preventDefault()
}});
var a=function(c){var b,e=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,d={};
while(b=e.exec(c)){d[b[1]]=b[2]
}return d
};
return{version:"2.0.2-jquery",requests:[],callbacks:[],onError:function(b){},onClose:function(b){},onOpen:function(b){},onMessage:function(b){},onReconnect:function(c,b){},onMessagePublished:function(b){},onTransportFailure:function(c,b){},onLocalMessage:function(b){},onClientTimeout:function(b){},onFailureToReconnect:function(c,b){},AtmosphereRequest:function(G){var I={timeout:300000,method:"GET",headers:{},contentType:"",callback:null,url:"",data:"",suspend:true,maxRequest:-1,reconnect:true,maxStreamingLength:10000000,lastIndex:0,logLevel:"info",requestCount:0,fallbackMethod:"GET",fallbackTransport:"streaming",transport:"long-polling",webSocketImpl:null,webSocketBinaryType:null,dispatchUrl:null,webSocketPathDelimiter:"@@",enableXDR:false,rewriteURL:false,attachHeadersAsQueryString:true,executeCallbackBeforeReconnect:false,readyState:0,lastTimestamp:0,withCredentials:false,trackMessageLength:false,messageDelimiter:"|",connectTimeout:-1,reconnectInterval:0,dropAtmosphereHeaders:true,uuid:0,shared:false,readResponsesHeaders:false,maxReconnectOnClose:5,enableProtocol:true,onError:function(au){},onClose:function(au){},onOpen:function(au){},onMessage:function(au){},onReopen:function(av,au){},onReconnect:function(av,au){},onMessagePublished:function(au){},onTransportFailure:function(av,au){},onLocalMessage:function(au){},onFailureToReconnect:function(av,au){},onClientTimeout:function(au){}};
var Q={status:200,reasonPhrase:"OK",responseBody:"",messages:[],headers:[],state:"messageReceived",transport:"polling",error:null,request:null,partialMessage:"",errorHandled:false,id:0};
var T=null;
var i=null;
var p=null;
var y=null;
var A=null;
var ae=true;
var f=0;
var aq=false;
var U=null;
var al;
var k=null;
var D=jQuery.now();
var E;
at(G);
function am(){ae=true;
aq=false;
f=0;
T=null;
i=null;
p=null;
y=null
}function u(){ag();
am()
}function at(au){u();
I=jQuery.extend(I,au);
I.mrequest=I.reconnect;
if(!I.reconnect){I.reconnect=true
}}function j(){return I.webSocketImpl!=null||window.WebSocket||window.MozWebSocket
}function M(){return window.EventSource
}function n(){if(I.shared){k=ac(I);
if(k!=null){if(I.logLevel==="debug"){jQuery.atmosphere.debug("Storage service available. All communication will be local")
}if(k.open(I)){return
}}if(I.logLevel==="debug"){jQuery.atmosphere.debug("No Storage service available.")
}k=null
}I.firstMessage=true;
I.isOpen=false;
I.ctime=jQuery.now();
if(I.transport!=="websocket"&&I.transport!=="sse"){m(I)
}else{if(I.transport==="websocket"){if(!j()){K("Websocket is not supported, using request.fallbackTransport ("+I.fallbackTransport+")")
}else{af(false)
}}else{if(I.transport==="sse"){if(!M()){K("Server Side Events(SSE) is not supported, using request.fallbackTransport ("+I.fallbackTransport+")")
}else{C(false)
}}}}}function ac(ay){var aB,av,ax,aw="atmosphere-"+ay.url,au={storage:function(){if(!jQuery.atmosphere.supportStorage()){return
}var aE=window.localStorage,aC=function(aF){return jQuery.parseJSON(aE.getItem(aw+"-"+aF))
},aD=function(aF,aG){aE.setItem(aw+"-"+aF,jQuery.stringifyJSON(aG))
};
return{init:function(){aD("children",aC("children").concat([D]));
jQuery(window).on("storage.socket",function(aF){aF=aF.originalEvent;
if(aF.key===aw&&aF.newValue){aA(aF.newValue)
}});
return aC("opened")
},signal:function(aF,aG){aE.setItem(aw,jQuery.stringifyJSON({target:"p",type:aF,data:aG}))
},close:function(){var aF,aG=aC("children");
jQuery(window).off("storage.socket");
if(aG){aF=jQuery.inArray(ay.id,aG);
if(aF>-1){aG.splice(aF,1);
aD("children",aG)
}}}}
},windowref:function(){var aC=window.open("",aw.replace(/\W/g,""));
if(!aC||aC.closed||!aC.callbacks){return
}return{init:function(){aC.callbacks.push(aA);
aC.children.push(D);
return aC.opened
},signal:function(aD,aE){if(!aC.closed&&aC.fire){aC.fire(jQuery.stringifyJSON({target:"p",type:aD,data:aE}))
}},close:function(){function aD(aG,aF){var aE=jQuery.inArray(aF,aG);
if(aE>-1){aG.splice(aE,1)
}}if(!ax){aD(aC.callbacks,aA);
aD(aC.children,D)
}}}
}};
function aA(aC){var aE=jQuery.parseJSON(aC),aD=aE.data;
if(aE.target==="c"){switch(aE.type){case"open":H("opening","local",I);
break;
case"close":if(!ax){ax=true;
if(aD.reason==="aborted"){ai()
}else{if(aD.heir===D){n()
}else{setTimeout(function(){n()
},100)
}}}break;
case"message":z(aD,"messageReceived",200,ay.transport);
break;
case"localMessage":X(aD);
break
}}}function az(){var aC=new RegExp("(?:^|; )("+encodeURIComponent(aw)+")=([^;]*)").exec(document.cookie);
if(aC){return jQuery.parseJSON(decodeURIComponent(aC[2]))
}}aB=az();
if(!aB||jQuery.now()-aB.ts>1000){return
}av=au.storage()||au.windowref();
if(!av){return
}return{open:function(){var aC;
E=setInterval(function(){var aD=aB;
aB=az();
if(!aB||aD.ts===aB.ts){aA(jQuery.stringifyJSON({target:"c",type:"close",data:{reason:"error",heir:aD.heir}}))
}},1000);
aC=av.init();
if(aC){setTimeout(function(){H("opening","local",ay)
},50)
}return aC
},send:function(aC){av.signal("send",aC)
},localSend:function(aC){av.signal("localSend",jQuery.stringifyJSON({id:D,event:aC}))
},close:function(){if(!aq){clearInterval(E);
av.signal("close");
av.close()
}}}
}function Y(){var av,au="atmosphere-"+I.url,az={storage:function(){if(!jQuery.atmosphere.supportStorage()){return
}var aA=window.localStorage;
return{init:function(){jQuery(window).on("storage.socket",function(aB){aB=aB.originalEvent;
if(aB.key===au&&aB.newValue){aw(aB.newValue)
}})
},signal:function(aB,aC){aA.setItem(au,jQuery.stringifyJSON({target:"c",type:aB,data:aC}))
},get:function(aB){return jQuery.parseJSON(aA.getItem(au+"-"+aB))
},set:function(aB,aC){aA.setItem(au+"-"+aB,jQuery.stringifyJSON(aC))
},close:function(){jQuery(window).off("storage.socket");
aA.removeItem(au);
aA.removeItem(au+"-opened");
aA.removeItem(au+"-children")
}}
},windowref:function(){var aA=au.replace(/\W/g,""),aB=(jQuery('iframe[name="'+aA+'"]')[0]||jQuery('<iframe name="'+aA+'" />').hide().appendTo("body")[0]).contentWindow;
return{init:function(){aB.callbacks=[aw];
aB.fire=function(aC){var aD;
for(aD=0;
aD<aB.callbacks.length;
aD++){aB.callbacks[aD](aC)
}}
},signal:function(aC,aD){if(!aB.closed&&aB.fire){aB.fire(jQuery.stringifyJSON({target:"c",type:aC,data:aD}))
}},get:function(aC){return !aB.closed?aB[aC]:null
},set:function(aC,aD){if(!aB.closed){aB[aC]=aD
}},close:function(){}}
}};
function aw(aA){var aC=jQuery.parseJSON(aA),aB=aC.data;
if(aC.target==="p"){switch(aC.type){case"send":ah(aB);
break;
case"localSend":X(aB);
break;
case"close":ai();
break
}}}U=function ay(aA){av.signal("message",aA)
};
function ax(){document.cookie=encodeURIComponent(au)+"="+encodeURIComponent(jQuery.stringifyJSON({ts:jQuery.now()+1,heir:(av.get("children")||[])[0]}))
}av=az.storage()||az.windowref();
av.init();
if(I.logLevel==="debug"){jQuery.atmosphere.debug("Installed StorageService "+av)
}av.set("children",[]);
if(av.get("opened")!=null&&!av.get("opened")){av.set("opened",false)
}ax();
E=setInterval(ax,1000);
al=av
}function H(aw,az,av){if(I.shared&&az!=="local"){Y()
}if(al!=null){al.set("opened",true)
}av.close=function(){ai()
};
if(f>0&&aw==="re-connecting"){av.isReopen=true;
Z(Q)
}else{if(Q.error==null){Q.request=av;
var ax=Q.state;
Q.state=aw;
var au=Q.transport;
Q.transport=az;
var ay=Q.responseBody;
w();
Q.responseBody=ay;
Q.state=ax;
Q.transport=au
}}}function t(aw){aw.transport="jsonp";
var av=I;
if((aw!=null)&&(typeof(aw)!=="undefined")){av=aw
}var au=av.url;
if(av.dispatchUrl!=null){au+=av.dispatchUrl
}var ax=av.data;
if(av.attachHeadersAsQueryString){au=R(av);
if(ax!==""){au+="&X-Atmosphere-Post-Body="+encodeURIComponent(ax)
}ax=""
}A=jQuery.ajax({url:au,type:av.method,dataType:"jsonp",error:function(ay,aA,az){Q.error=true;
if(ay.status<300){L(A,av,0)
}else{aa(ay.status,az)
}},jsonp:"jsonpTransport",success:function(az){if(av.reconnect){if(av.maxRequest===-1||av.requestCount++<av.maxRequest){ab(A,av);
if(!av.executeCallbackBeforeReconnect){L(A,av,0)
}var aB=az.message;
if(aB!=null&&typeof aB!=="string"){try{aB=jQuery.stringifyJSON(aB)
}catch(aA){}}var ay=r(aB,av,Q);
if(!ay){z(Q.responseBody,"messageReceived",200,av.transport)
}if(av.executeCallbackBeforeReconnect){L(A,av,0)
}}else{jQuery.atmosphere.log(I.logLevel,["JSONP reconnect maximum try reached "+I.requestCount]);
aa(0,"maxRequest reached")
}}},data:av.data,beforeSend:function(ay){b(ay,av,false)
}})
}function V(ax){var av=I;
if((ax!=null)&&(typeof(ax)!=="undefined")){av=ax
}var au=av.url;
if(av.dispatchUrl!=null){au+=av.dispatchUrl
}var ay=av.data;
if(av.attachHeadersAsQueryString){au=R(av);
if(ay!==""){au+="&X-Atmosphere-Post-Body="+encodeURIComponent(ay)
}ay=""
}var aw=typeof(av.async)!=="undefined"?av.async:true;
A=jQuery.ajax({url:au,type:av.method,error:function(az,aB,aA){Q.error=true;
if(az.status<300){L(A,av)
}else{aa(az.status,aA)
}},success:function(aB,aC,aA){if(av.reconnect){if(av.maxRequest===-1||av.requestCount++<av.maxRequest){if(!av.executeCallbackBeforeReconnect){L(A,av,0)
}var az=r(aB,av,Q);
if(!az){z(Q.responseBody,"messageReceived",200,av.transport)
}if(av.executeCallbackBeforeReconnect){L(A,av,0)
}}else{jQuery.atmosphere.log(I.logLevel,["AJAX reconnect maximum try reached "+I.requestCount]);
aa(0,"maxRequest reached")
}}},beforeSend:function(az){b(az,av,false)
},crossDomain:av.enableXDR,async:aw})
}function d(au){if(I.webSocketImpl!=null){return I.webSocketImpl
}else{if(window.WebSocket){return new WebSocket(au)
}else{return new MozWebSocket(au)
}}}function e(){var au=R(I);
return decodeURI(jQuery('<a href="'+au+'"/>')[0].href.replace(/^http/,"ws"))
}function ar(){var au=R(I);
return au
}function C(av){Q.transport="sse";
var au=ar(I.url);
if(I.logLevel==="debug"){jQuery.atmosphere.debug("Invoking executeSSE");
jQuery.atmosphere.debug("Using URL: "+au)
}if(I.enableProtocol&&av){var ax=jQuery.now()-I.ctime;
I.lastTimestamp=Number(I.stime)+Number(ax)
}if(av&&!I.reconnect){if(i!=null){ag()
}return
}try{i=new EventSource(au,{withCredentials:I.withCredentials})
}catch(aw){aa(0,aw);
K("SSE failed. Downgrading to fallback transport and resending");
return
}if(I.connectTimeout>0){I.id=setTimeout(function(){if(!av){ag()
}},I.connectTimeout)
}i.onopen=function(ay){s(I);
if(I.logLevel==="debug"){jQuery.atmosphere.debug("SSE successfully opened")
}if(!I.enableProtocol){if(!av){H("opening","sse",I)
}else{H("re-opening","sse",I)
}}av=true;
if(I.method==="POST"){Q.state="messageReceived";
i.send(I.data)
}};
i.onmessage=function(az){s(I);
if(!I.enableXDR&&az.origin!==window.location.protocol+"//"+window.location.host){jQuery.atmosphere.log(I.logLevel,["Origin was not "+window.location.protocol+"//"+window.location.host]);
return
}Q.state="messageReceived";
Q.status=200;
az=az.data;
var ay=r(az,I,Q);
if(!ay){w();
Q.responseBody="";
Q.messages=[]
}};
i.onerror=function(ay){clearTimeout(I.id);
if(Q.state==="closedByClient"){return
}ad(av);
ag();
if(aq){jQuery.atmosphere.log(I.logLevel,["SSE closed normally"])
}else{if(!av){K("SSE failed. Downgrading to fallback transport and resending")
}else{if(I.reconnect&&(Q.transport==="sse")){if(f++<I.maxReconnectOnClose){H("re-connecting",I.transport,I);
if(I.reconnectInterval>0){I.id=setTimeout(function(){C(true)
},I.reconnectInterval)
}else{C(true)
}Q.responseBody="";
Q.messages=[]
}else{jQuery.atmosphere.log(I.logLevel,["SSE reconnect maximum try reached "+f]);
aa(0,"maxReconnectOnClose reached")
}}}}}
}function af(av){Q.transport="websocket";
if(I.enableProtocol&&av){var aw=jQuery.now()-I.ctime;
I.lastTimestamp=Number(I.stime)+Number(aw)
}var au=e(I.url);
if(I.logLevel==="debug"){jQuery.atmosphere.debug("Invoking executeWebSocket");
jQuery.atmosphere.debug("Using URL: "+au)
}if(av&&!I.reconnect){if(T!=null){ag()
}return
}T=d(au);
if(I.webSocketBinaryType!=null){T.binaryType=I.webSocketBinaryType
}if(I.connectTimeout>0){I.id=setTimeout(function(){if(!av){var ax={code:1002,reason:"",wasClean:false};
T.onclose(ax);
try{ag()
}catch(ay){}return
}},I.connectTimeout)
}T.onopen=function(ax){s(I);
if(I.logLevel==="debug"){jQuery.atmosphere.debug("Websocket successfully opened")
}if(!I.enableProtocol){if(!av){H("opening","websocket",I)
}else{H("re-opening","websocket",I)
}}av=true;
if(T!=null){T.webSocketOpened=av;
if(I.method==="POST"){Q.state="messageReceived";
T.send(I.data)
}}};
T.onmessage=function(az){s(I);
Q.state="messageReceived";
Q.status=200;
az=az.data;
var ax=typeof(az)==="string";
if(ax){var ay=r(az,I,Q);
if(!ay){w();
Q.responseBody="";
Q.messages=[]
}}else{if(!o(I,az)){return
}Q.responseBody=az;
w();
Q.responseBody=null
}};
T.onerror=function(ax){clearTimeout(I.id)
};
T.onclose=function(ax){if(Q.state==="closed"){return
}clearTimeout(I.id);
var ay=ax.reason;
if(ay===""){switch(ax.code){case 1000:ay="Normal closure; the connection successfully completed whatever purpose for which it was created.";
break;
case 1001:ay="The endpoint is going away, either because of a server failure or because the browser is navigating away from the page that opened the connection.";
break;
case 1002:ay="The endpoint is terminating the connection due to a protocol error.";
break;
case 1003:ay="The connection is being terminated because the endpoint received data of a type it cannot accept (for example, a text-only endpoint received binary data).";
break;
case 1004:ay="The endpoint is terminating the connection because a data frame was received that is too large.";
break;
case 1005:ay="Unknown: no status code was provided even though one was expected.";
break;
case 1006:ay="Connection was closed abnormally (that is, with no close frame being sent).";
break
}}if(I.logLevel==="warn"){jQuery.atmosphere.warn("Websocket closed, reason: "+ay);
jQuery.atmosphere.warn("Websocket closed, wasClean: "+ax.wasClean)
}if(Q.state==="closedByClient"){return
}ad(av);
Q.state="closed";
if(aq){jQuery.atmosphere.log(I.logLevel,["Websocket closed normally"])
}else{if(!av){K("Websocket failed. Downgrading to Comet and resending")
}else{if(I.reconnect&&Q.transport==="websocket"){ag();
if(f++<I.maxReconnectOnClose){H("re-connecting",I.transport,I);
if(I.reconnectInterval>0){I.id=setTimeout(function(){Q.responseBody="";
Q.messages=[];
af(true)
},I.reconnectInterval)
}else{Q.responseBody="";
Q.messages=[];
af(true)
}}else{jQuery.atmosphere.log(I.logLevel,["Websocket reconnect maximum try reached "+I.requestCount]);
if(I.logLevel==="warn"){jQuery.atmosphere.warn("Websocket error, reason: "+ax.reason)
}aa(0,"maxReconnectOnClose reached")
}}}}};
if(T.url===undefined){T.onclose({reason:"Android 4.1 does not support websockets.",wasClean:false})
}}function o(ax,aw){var au=true;
if(jQuery.trim(aw).length!==0&&ax.enableProtocol&&ax.firstMessage){ax.firstMessage=false;
var av=aw.split(ax.messageDelimiter);
var ay=av.length===2?0:1;
ax.uuid=jQuery.trim(av[ay]);
ax.stime=jQuery.trim(av[ay+1]);
au=false;
if(ax.transport!=="long-polling"){aj(ax)
}}else{aj(ax)
}return au
}function s(au){clearTimeout(au.id);
if(au.timeout>0&&au.transport!=="polling"){au.id=setTimeout(function(){l(au);
x();
ag()
},au.timeout)
}}function l(au){Q.state="closedByClient";
Q.responseBody="";
Q.status=408;
Q.messages=[];
w()
}function aa(au,av){ag();
clearTimeout(I.id);
Q.state="error";
Q.reasonPhrase=av;
Q.responseBody="";
Q.status=au;
Q.messages=[];
w()
}function r(ay,ax,au){if(!o(I,ay)){return true
}if(ay.length===0){return true
}if(ax.trackMessageLength){ay=au.partialMessage+ay;
var aw=[];
var av=ay.indexOf(ax.messageDelimiter);
while(av!==-1){var aA=jQuery.trim(ay.substring(0,av));
var az=parseInt(aA,10);
if(isNaN(az)){throw'message length "'+aA+'" is not a number'
}av+=ax.messageDelimiter.length;
if(av+az>ay.length){av=-1
}else{aw.push(ay.substring(av,av+az));
ay=ay.substring(av+az,ay.length);
av=ay.indexOf(ax.messageDelimiter)
}}au.partialMessage=ay;
if(aw.length!==0){au.responseBody=aw.join(ax.messageDelimiter);
au.messages=aw;
return false
}else{au.responseBody="";
au.messages=[];
return true
}}else{au.responseBody=ay
}return false
}function K(au){jQuery.atmosphere.log(I.logLevel,[au]);
if(typeof(I.onTransportFailure)!=="undefined"){I.onTransportFailure(au,I)
}else{if(typeof(jQuery.atmosphere.onTransportFailure)!=="undefined"){jQuery.atmosphere.onTransportFailure(au,I)
}}I.transport=I.fallbackTransport;
var av=I.connectTimeout===-1?0:I.connectTimeout;
if(I.reconnect&&I.transport!=="none"||I.transport==null){I.method=I.fallbackMethod;
Q.transport=I.fallbackTransport;
I.fallbackTransport="none";
if(av>0){I.id=setTimeout(function(){n()
},av)
}else{n()
}}else{aa(500,"Unable to reconnect with fallback transport")
}}function R(aw,au){var av=I;
if((aw!=null)&&(typeof(aw)!=="undefined")){av=aw
}if(au==null){au=av.url
}if(!av.attachHeadersAsQueryString){return au
}if(au.indexOf("X-Atmosphere-Framework")!==-1){return au
}au+=(au.indexOf("?")!==-1)?"&":"?";
au+="X-Atmosphere-tracking-id="+av.uuid;
au+="&X-Atmosphere-Framework="+jQuery.atmosphere.version;
au+="&X-Atmosphere-Transport="+av.transport;
if(av.trackMessageLength){au+="&X-Atmosphere-TrackMessageSize=true"
}if(av.lastTimestamp!=null){au+="&X-Cache-Date="+av.lastTimestamp
}else{au+="&X-Cache-Date="+0
}if(av.contentType!==""){au+="&Content-Type="+av.contentType
}if(av.enableProtocol){au+="&X-atmo-protocol=true"
}jQuery.each(av.headers,function(ax,az){var ay=jQuery.isFunction(az)?az.call(this,av,aw,Q):az;
if(ay!=null){au+="&"+encodeURIComponent(ax)+"="+encodeURIComponent(ay)
}});
return au
}function aj(au){if(!au.isOpen){au.isOpen=true;
H("opening",au.transport,au)
}else{if(au.isReopen){au.isReopen=false;
H("re-opening",au.transport,au)
}}}function m(aw){var au=I;
if((aw!=null)||(typeof(aw)!=="undefined")){au=aw
}au.lastIndex=0;
au.readyState=0;
if((au.transport==="jsonp")||((au.enableXDR)&&(jQuery.atmosphere.checkCORSSupport()))){t(au);
return
}if(au.transport==="ajax"){V(aw);
return
}if(jQuery.browser.msie&&jQuery.browser.version<10){if((au.transport==="streaming")){if(au.enableXDR&&window.XDomainRequest){J(au)
}else{ap(au)
}return
}if((au.enableXDR)&&(window.XDomainRequest)){J(au);
return
}}var ax=function(){au.lastIndex=0;
if(au.reconnect&&f++<au.maxReconnectOnClose){H("re-connecting",aw.transport,aw);
L(av,au,aw.reconnectInterval)
}else{aa(0,"maxReconnectOnClose reached")
}};
if(au.reconnect&&(au.maxRequest===-1||au.requestCount++<au.maxRequest)){var av=jQuery.ajaxSettings.xhr();
av.hasData=false;
b(av,au,true);
if(au.suspend){p=av
}if(au.transport!=="polling"){Q.transport=au.transport;
av.onabort=function(){ad(true)
};
av.onerror=function(){Q.error=true;
try{Q.status=XMLHttpRequest.status
}catch(ay){Q.status=500
}if(!Q.status){Q.status=500
}ag();
if(!Q.errorHandled){ax()
}}
}av.onreadystatechange=function(){if(aq){return
}Q.error=null;
var az=false;
var aE=false;
if(au.transport==="streaming"&&au.readyState>2&&av.readyState===4){ag();
ax();
return
}au.readyState=av.readyState;
if(au.transport==="streaming"&&av.readyState>=3){aE=true
}else{if(au.transport==="long-polling"&&av.readyState===4){aE=true
}}s(I);
if(au.transport!=="polling"){if((!au.enableProtocol||!aw.firstMessage)&&av.readyState===2){aj(au)
}var ay=0;
if(av.readyState!==0){ay=av.status>1000?0:av.status
}if(ay>=300||ay===0){Q.errorHandled=true;
ag();
ax();
return
}}if(aE){var aC=av.responseText;
if(jQuery.trim(aC.length).length===0&&au.transport==="long-polling"){if(!av.hasData){ax()
}else{av.hasData=false
}return
}av.hasData=true;
ab(av,I);
if(au.transport==="streaming"){if(!jQuery.browser.opera){var aB=aC.substring(au.lastIndex,aC.length);
az=r(aB,au,Q);
au.lastIndex=aC.length;
if(az){return
}}else{jQuery.atmosphere.iterate(function(){if(Q.status!==500&&av.responseText.length>au.lastIndex){try{Q.status=av.status;
Q.headers=a(av.getAllResponseHeaders());
ab(av,I)
}catch(aG){Q.status=404
}s(I);
Q.state="messageReceived";
var aF=av.responseText.substring(au.lastIndex);
au.lastIndex=av.responseText.length;
az=r(aF,au,Q);
if(!az){w()
}F(av,au)
}else{if(Q.status>400){au.lastIndex=av.responseText.length;
return false
}}},0)
}}else{az=r(aC,au,Q)
}try{Q.status=av.status;
Q.headers=a(av.getAllResponseHeaders());
ab(av,au)
}catch(aD){Q.status=404
}if(au.suspend){Q.state=Q.status===0?"closed":"messageReceived"
}else{Q.state="messagePublished"
}var aA=aw.transport!=="streaming";
if(aA&&!au.executeCallbackBeforeReconnect){L(av,au,0)
}if(Q.responseBody.length!==0&&!az){w()
}if(aA&&au.executeCallbackBeforeReconnect){L(av,au,0)
}F(av,au)
}};
av.send(au.data);
ae=true
}else{if(au.logLevel==="debug"){jQuery.atmosphere.log(au.logLevel,["Max re-connection reached."])
}aa(0,"maxRequest reached")
}}function b(aw,ax,av){var au=ax.url;
if(ax.dispatchUrl!=null&&ax.method==="POST"){au+=ax.dispatchUrl
}au=R(ax,au);
au=jQuery.atmosphere.prepareURL(au);
if(av){aw.open(ax.method,au,true);
if(ax.connectTimeout>0){ax.id=setTimeout(function(){if(ax.requestCount===0){ag();
z("Connect timeout","closed",200,ax.transport)
}},ax.connectTimeout)
}}if(I.withCredentials){if("withCredentials" in aw){aw.withCredentials=true
}}if(!I.dropAtmosphereHeaders){aw.setRequestHeader("X-Atmosphere-Framework",jQuery.atmosphere.version);
aw.setRequestHeader("X-Atmosphere-Transport",ax.transport);
if(ax.lastTimestamp!=null){aw.setRequestHeader("X-Cache-Date",ax.lastTimestamp)
}else{aw.setRequestHeader("X-Cache-Date",0)
}if(ax.trackMessageLength){aw.setRequestHeader("X-Atmosphere-TrackMessageSize","true")
}aw.setRequestHeader("X-Atmosphere-tracking-id",ax.uuid)
}if(ax.contentType!==""){aw.setRequestHeader("Content-Type",ax.contentType)
}jQuery.each(ax.headers,function(ay,aA){var az=jQuery.isFunction(aA)?aA.call(this,aw,ax,av,Q):aA;
if(az!=null){aw.setRequestHeader(ay,az)
}})
}function L(av,aw,ax){if(aw.reconnect||(aw.suspend&&ae)){var au=0;
if(av.readyState!==0){au=av.status>1000?0:av.status
}Q.status=au===0?204:au;
Q.reason=au===0?"Server resumed the connection or down.":"OK";
clearTimeout(aw.id);
if(ax>0){aw.id=setTimeout(function(){m(aw)
},ax)
}else{m(aw)
}}}function Z(au){au.state="re-connecting";
W(au)
}function J(au){if(au.transport!=="polling"){y=P(au);
y.open()
}else{P(au).open()
}}function P(aw){var av=I;
if((aw!=null)&&(typeof(aw)!=="undefined")){av=aw
}var aB=av.transport;
var aA=0;
var au=new window.XDomainRequest();
var ay=function(){if(av.transport==="long-polling"&&(av.reconnect&&(av.maxRequest===-1||av.requestCount++<av.maxRequest))){au.status=200;
J(av)
}};
var az=av.rewriteURL||function(aD){var aC=/(?:^|;\s*)(JSESSIONID|PHPSESSID)=([^;]*)/.exec(document.cookie);
switch(aC&&aC[1]){case"JSESSIONID":return aD.replace(/;jsessionid=[^\?]*|(\?)|$/,";jsessionid="+aC[2]+"$1");
case"PHPSESSID":return aD.replace(/\?PHPSESSID=[^&]*&?|\?|$/,"?PHPSESSID="+aC[2]+"&").replace(/&$/,"")
}return aD
};
au.onprogress=function(){ax(au)
};
au.onerror=function(){if(av.transport!=="polling"){ag();
if(f++<av.maxReconnectOnClose){if(av.reconnectInterval>0){av.id=setTimeout(function(){H("re-connecting",aw.transport,aw);
J(av)
},av.reconnectInterval)
}else{H("re-connecting",aw.transport,aw);
J(av)
}}else{aa(0,"maxReconnectOnClose reached")
}}};
au.onload=function(){};
var ax=function(aC){clearTimeout(av.id);
var aE=aC.responseText;
aE=aE.substring(aA);
aA+=aE.length;
if(aB!=="polling"){s(av);
var aD=r(aE,av,Q);
if(aB==="long-polling"&&jQuery.trim(aE).length===0){return
}if(av.executeCallbackBeforeReconnect){ay()
}if(!aD){z(Q.responseBody,"messageReceived",200,aB)
}if(!av.executeCallbackBeforeReconnect){ay()
}}};
return{open:function(){var aC=av.url;
if(av.dispatchUrl!=null){aC+=av.dispatchUrl
}aC=R(av,aC);
au.open(av.method,az(aC));
if(av.method==="GET"){au.send()
}else{au.send(av.data)
}if(av.connectTimeout>0){av.id=setTimeout(function(){if(av.requestCount===0){ag();
z("Connect timeout","closed",200,av.transport)
}},av.connectTimeout)
}},close:function(){au.abort()
}}
}function ap(au){y=q(au);
y.open()
}function q(ax){var aw=I;
if((ax!=null)&&(typeof(ax)!=="undefined")){aw=ax
}var av;
var ay=new window.ActiveXObject("htmlfile");
ay.open();
ay.close();
var au=aw.url;
if(aw.dispatchUrl!=null){au+=aw.dispatchUrl
}if(aw.transport!=="polling"){Q.transport=aw.transport
}return{open:function(){var az=ay.createElement("iframe");
au=R(aw);
if(aw.data!==""){au+="&X-Atmosphere-Post-Body="+encodeURIComponent(aw.data)
}au=jQuery.atmosphere.prepareURL(au);
az.src=au;
ay.body.appendChild(az);
var aA=az.contentDocument||az.contentWindow.document;
av=jQuery.atmosphere.iterate(function(){try{if(!aA.firstChild){return
}if(aA.readyState==="complete"){try{jQuery.noop(aA.fileSize)
}catch(aG){z("Connection Failure","error",500,aw.transport);
return false
}}var aD=aA.body?aA.body.lastChild:aA;
var aF=function(){var aI=aD.cloneNode(true);
aI.appendChild(aA.createTextNode("."));
var aH=aI.innerText;
aH=aH.substring(0,aH.length-1);
return aH
};
if(!jQuery.nodeName(aD,"pre")){var aC=aA.head||aA.getElementsByTagName("head")[0]||aA.documentElement||aA;
var aB=aA.createElement("script");
aB.text="document.write('<plaintext>')";
aC.insertBefore(aB,aC.firstChild);
aC.removeChild(aB);
aD=aA.body.lastChild
}if(aw.closed){aw.isReopen=true
}av=jQuery.atmosphere.iterate(function(){var aI=aF();
if(aI.length>aw.lastIndex){s(I);
Q.status=200;
Q.error=null;
aD.innerText="";
var aH=r(aI,aw,Q);
if(aH){return""
}z(Q.responseBody,"messageReceived",200,aw.transport)
}aw.lastIndex=0;
if(aA.readyState==="complete"){ad(true);
H("re-connecting",aw.transport,aw);
if(aw.reconnectInterval>0){aw.id=setTimeout(function(){ap(aw)
},aw.reconnectInterval)
}else{ap(aw)
}return false
}},null);
return false
}catch(aE){Q.error=true;
H("re-connecting",aw.transport,aw);
if(f++<aw.maxReconnectOnClose){if(aw.reconnectInterval>0){aw.id=setTimeout(function(){ap(aw)
},aw.reconnectInterval)
}else{ap(aw)
}}else{aa(0,"maxReconnectOnClose reached")
}ay.execCommand("Stop");
ay.close();
return false
}})
},close:function(){if(av){av()
}ay.execCommand("Stop");
ad(true)
}}
}function ah(au){if(k!=null){g(au)
}else{if(p!=null||i!=null){c(au)
}else{if(y!=null){S(au)
}else{if(A!=null){O(au)
}else{if(T!=null){B(au)
}}}}}}function h(av){var au=ak(av);
au.transport="ajax";
au.method="GET";
au.async=false;
au.reconnect=false;
m(au)
}function g(au){k.send(au)
}function v(av){if(av.length===0){return
}try{if(k){k.localSend(av)
}else{if(al){al.signal("localMessage",jQuery.stringifyJSON({id:D,event:av}))
}}}catch(au){jQuery.atmosphere.error(au)
}}function c(av){var au=ak(av);
m(au)
}function S(av){if(I.enableXDR&&jQuery.atmosphere.checkCORSSupport()){var au=ak(av);
au.reconnect=false;
t(au)
}else{c(av)
}}function O(au){c(au)
}function N(au){var av=au;
if(typeof(av)==="object"){av=au.data
}return av
}function ak(av){var aw=N(av);
var au={connected:false,timeout:60000,method:"POST",url:I.url,contentType:I.contentType,headers:I.headers,reconnect:true,callback:null,data:aw,suspend:false,maxRequest:-1,logLevel:"info",requestCount:0,withCredentials:I.withCredentials,transport:"polling",isOpen:true,attachHeadersAsQueryString:true,enableXDR:I.enableXDR,uuid:I.uuid,dispatchUrl:I.dispatchUrl,enableProtocol:false,messageDelimiter:"|",maxReconnectOnClose:I.maxReconnectOnClose};
if(typeof(av)==="object"){au=jQuery.extend(au,av)
}return au
}function B(au){var ax=N(au);
var av;
try{if(I.dispatchUrl!=null){av=I.webSocketPathDelimiter+I.dispatchUrl+I.webSocketPathDelimiter+ax
}else{av=ax
}if(!T.webSocketOpened){jQuery.atmosphere.error("WebSocket not connected.");
return
}T.send(av)
}catch(aw){T.onclose=function(ay){};
ag();
K("Websocket failed. Downgrading to Comet and resending "+av);
c(au)
}}function X(av){var au=jQuery.parseJSON(av);
if(au.id!==D){if(typeof(I.onLocalMessage)!=="undefined"){I.onLocalMessage(au.event)
}else{if(typeof(jQuery.atmosphere.onLocalMessage)!=="undefined"){jQuery.atmosphere.onLocalMessage(au.event)
}}}}function z(ax,au,av,aw){Q.responseBody=ax;
Q.transport=aw;
Q.status=av;
Q.state=au;
w()
}function ab(au,ax){if(!ax.readResponsesHeaders&&!ax.enableProtocol){ax.lastTimestamp=jQuery.now();
ax.uuid=jQuery.atmosphere.guid();
return
}try{var aw=au.getResponseHeader("X-Cache-Date");
if(aw&&aw!=null&&aw.length>0){ax.lastTimestamp=aw.split(" ").pop()
}var av=au.getResponseHeader("X-Atmosphere-tracking-id");
if(av&&av!=null){ax.uuid=av.split(" ").pop()
}if(ax.headers){jQuery.each(I.headers,function(aA){var az=au.getResponseHeader(aA);
if(az){Q.headers[aA]=az
}})
}}catch(ay){}}function W(au){ao(au,I);
ao(au,jQuery.atmosphere)
}function ao(av,aw){switch(av.state){case"messageReceived":f=0;
if(typeof(aw.onMessage)!=="undefined"){aw.onMessage(av)
}break;
case"error":if(typeof(aw.onError)!=="undefined"){aw.onError(av)
}break;
case"opening":if(typeof(aw.onOpen)!=="undefined"){aw.onOpen(av)
}break;
case"messagePublished":if(typeof(aw.onMessagePublished)!=="undefined"){aw.onMessagePublished(av)
}break;
case"re-connecting":if(typeof(aw.onReconnect)!=="undefined"){aw.onReconnect(I,av)
}break;
case"closedByClient":if(typeof(aw.onClientTimeout)!=="undefined"){aw.onClientTimeout(I)
}break;
case"re-opening":if(typeof(aw.onReopen)!=="undefined"){aw.onReopen(I,av)
}break;
case"fail-to-reconnect":if(typeof(aw.onFailureToReconnect)!=="undefined"){aw.onFailureToReconnect(I,av)
}break;
case"unsubscribe":case"closed":var au=typeof(I.closed)!=="undefined"?I.closed:false;
if(typeof(aw.onClose)!=="undefined"&&!au){aw.onClose(av)
}I.closed=true;
break
}}function ad(au){if(Q.state!=="closed"){Q.state="closed";
Q.responseBody="";
Q.messages=[];
Q.status=!au?501:200;
w()
}}function w(){var aw=function(az,aA){aA(Q)
};
if(k==null&&U!=null){U(Q.responseBody)
}I.reconnect=I.mrequest;
var au=typeof(Q.responseBody)==="string";
var ax=(au&&I.trackMessageLength)?(Q.messages.length>0?Q.messages:[""]):new Array(Q.responseBody);
for(var av=0;
av<ax.length;
av++){if(ax.length>1&&ax[av].length===0){continue
}Q.responseBody=(au)?jQuery.trim(ax[av]):ax[av];
if(k==null&&U!=null){U(Q.responseBody)
}if(Q.responseBody.length===0&&Q.state==="messageReceived"){continue
}W(Q);
if(jQuery.atmosphere.callbacks.length>0){if(I.logLevel==="debug"){jQuery.atmosphere.debug("Invoking "+jQuery.atmosphere.callbacks.length+" global callbacks: "+Q.state)
}try{jQuery.each(jQuery.atmosphere.callbacks,aw)
}catch(ay){jQuery.atmosphere.log(I.logLevel,["Callback exception"+ay])
}}if(typeof(I.callback)==="function"){if(I.logLevel==="debug"){jQuery.atmosphere.debug("Invoking request callbacks")
}try{I.callback(Q)
}catch(ay){jQuery.atmosphere.log(I.logLevel,["Callback exception"+ay])
}}}}function F(av,au){if(Q.partialMessage===""&&(au.transport==="streaming")&&(av.responseText.length>au.maxStreamingLength)){Q.messages=[];
ad(true);
x();
ag();
L(av,au,0)
}}function x(){if(I.enableProtocol&&!I.firstMessage){var av="X-Atmosphere-Transport=close&X-Atmosphere-tracking-id="+I.uuid;
var au=I.url.replace(/([?&])_=[^&]*/,av);
au=au+(au===I.url?(/\?/.test(I.url)?"&":"?")+av:"");
if(I.connectTimeout>0){jQuery.ajax({url:au,async:false,timeout:I.connectTimeout})
}else{jQuery.ajax({url:au,async:false})
}}}function ai(){I.reconnect=false;
aq=true;
Q.request=I;
Q.state="unsubscribe";
Q.responseBody="";
Q.status=408;
w();
x();
ag()
}function ag(){if(I.id){clearTimeout(I.id)
}if(y!=null){y.close();
y=null
}if(A!=null){A.abort();
A=null
}if(p!=null){p.abort();
p=null
}if(T!=null){if(T.webSocketOpened){T.close()
}T=null
}if(i!=null){i.close();
i=null
}an()
}function an(){if(al!=null){clearInterval(E);
document.cookie=encodeURIComponent("atmosphere-"+I.url)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
al.signal("close",{reason:"",heir:!aq?D:(al.get("children")||[])[0]});
al.close()
}if(k!=null){k.close()
}}this.subscribe=function(au){at(au);
n()
};
this.execute=function(){n()
};
this.invokeCallback=function(){w()
};
this.close=function(){ai()
};
this.disconnect=function(){x()
};
this.getUrl=function(){return I.url
};
this.push=function(aw,av){if(av!=null){var au=I.dispatchUrl;
I.dispatchUrl=av;
ah(aw);
I.dispatchUrl=au
}else{ah(aw)
}};
this.getUUID=function(){return I.uuid
};
this.pushLocal=function(au){v(au)
};
this.enableProtocol=function(au){return I.enableProtocol
};
this.request=I;
this.response=Q
},subscribe:function(b,e,d){if(typeof(e)==="function"){jQuery.atmosphere.addCallback(e)
}if(typeof(b)!=="string"){d=b
}else{d.url=b
}var c=new jQuery.atmosphere.AtmosphereRequest(d);
c.execute();
jQuery.atmosphere.requests[jQuery.atmosphere.requests.length]=c;
return c
},addCallback:function(b){if(jQuery.inArray(b,jQuery.atmosphere.callbacks)===-1){jQuery.atmosphere.callbacks.push(b)
}},removeCallback:function(c){var b=jQuery.inArray(c,jQuery.atmosphere.callbacks);
if(b!==-1){jQuery.atmosphere.callbacks.splice(b,1)
}},unsubscribe:function(){if(jQuery.atmosphere.requests.length>0){var b=[].concat(jQuery.atmosphere.requests);
for(var d=0;
d<b.length;
d++){var c=b[d];
c.close();
clearTimeout(c.response.request.id)
}}jQuery.atmosphere.requests=[];
jQuery.atmosphere.callbacks=[]
},unsubscribeUrl:function(c){var b=-1;
if(jQuery.atmosphere.requests.length>0){for(var e=0;
e<jQuery.atmosphere.requests.length;
e++){var d=jQuery.atmosphere.requests[e];
if(d.getUrl()===c){d.close();
clearTimeout(d.response.request.id);
b=e;
break
}}}if(b>=0){jQuery.atmosphere.requests.splice(b,1)
}},publish:function(c){if(typeof(c.callback)==="function"){jQuery.atmosphere.addCallback(c.callback)
}c.transport="polling";
var b=new jQuery.atmosphere.AtmosphereRequest(c);
jQuery.atmosphere.requests[jQuery.atmosphere.requests.length]=b;
return b
},checkCORSSupport:function(){if(jQuery.browser.msie&&!window.XDomainRequest){return true
}else{if(jQuery.browser.opera&&jQuery.browser.version<12){return true
}}var b=navigator.userAgent.toLowerCase();
var c=b.indexOf("android")>-1;
if(c){return true
}return false
},S4:function(){return(((1+Math.random())*65536)|0).toString(16).substring(1)
},guid:function(){return(jQuery.atmosphere.S4()+jQuery.atmosphere.S4()+"-"+jQuery.atmosphere.S4()+"-"+jQuery.atmosphere.S4()+"-"+jQuery.atmosphere.S4()+"-"+jQuery.atmosphere.S4()+jQuery.atmosphere.S4()+jQuery.atmosphere.S4())
},prepareURL:function(c){var d=jQuery.now();
var b=c.replace(/([?&])_=[^&]*/,"$1_="+d);
return b+(b===c?(/\?/.test(c)?"&":"?")+"_="+d:"")
},param:function(b){return jQuery.param(b,jQuery.ajaxSettings.traditional)
},supportStorage:function(){var c=window.localStorage;
if(c){try{c.setItem("t","t");
c.removeItem("t");
return window.StorageEvent&&!jQuery.browser.msie&&!(jQuery.browser.mozilla&&jQuery.browser.version.split(".")[0]==="1")
}catch(b){}}return false
},iterate:function(d,c){var e;
c=c||0;
(function b(){e=setTimeout(function(){if(d()===false){return
}b()
},c)
})();
return function(){clearTimeout(e)
}
},log:function(d,c){if(window.console){var b=window.console[d];
if(typeof b==="function"){b.apply(window.console,c)
}}},warn:function(){jQuery.atmosphere.log("warn",arguments)
},info:function(){jQuery.atmosphere.log("info",arguments)
},debug:function(){jQuery.atmosphere.log("debug",arguments)
},error:function(){jQuery.atmosphere.log("error",arguments)
}}
}();
(function(){var a,b;
jQuery.uaMatch=function(d){d=d.toLowerCase();
var c=/(chrome)[ \/]([\w.]+)/.exec(d)||/(webkit)[ \/]([\w.]+)/.exec(d)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(d)||/(msie) ([\w.]+)/.exec(d)||d.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(d)||[];
return{browser:c[1]||"",version:c[2]||"0"}
};
a=jQuery.uaMatch(navigator.userAgent);
b={};
if(a.browser){b[a.browser]=true;
b.version=a.version
}if(b.chrome){b.webkit=true
}else{if(b.webkit){b.safari=true
}}jQuery.browser=b;
jQuery.sub=function(){function c(f,g){return new c.fn.init(f,g)
}jQuery.extend(true,c,this);
c.superclass=this;
c.fn=c.prototype=this();
c.fn.constructor=c;
c.sub=this.sub;
c.fn.init=function e(f,g){if(g&&g instanceof jQuery&&!(g instanceof c)){g=c(g)
}return jQuery.fn.init.call(this,f,g,d)
};
c.fn.init.prototype=c.fn;
var d=c(document);
return c
}
})();
(function(d){var g=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,c={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
function a(f){return'"'+f.replace(g,function(h){var i=c[h];
return typeof i==="string"?i:"\\u"+("0000"+h.charCodeAt(0).toString(16)).slice(-4)
})+'"'
}function b(f){return f<10?"0"+f:f
}function e(m,l){var k,j,f,h,o=l[m],n=typeof o;
if(o&&typeof o==="object"&&typeof o.toJSON==="function"){o=o.toJSON(m);
n=typeof o
}switch(n){case"string":return a(o);
case"number":return isFinite(o)?String(o):"null";
case"boolean":return String(o);
case"object":if(!o){return"null"
}switch(Object.prototype.toString.call(o)){case"[object Date]":return isFinite(o.valueOf())?'"'+o.getUTCFullYear()+"-"+b(o.getUTCMonth()+1)+"-"+b(o.getUTCDate())+"T"+b(o.getUTCHours())+":"+b(o.getUTCMinutes())+":"+b(o.getUTCSeconds())+'Z"':"null";
case"[object Array]":f=o.length;
h=[];
for(k=0;
k<f;
k++){h.push(e(k,o)||"null")
}return"["+h.join(",")+"]";
default:h=[];
for(k in o){if(Object.prototype.hasOwnProperty.call(o,k)){j=e(k,o);
if(j){h.push(a(k)+":"+j)
}}}return"{"+h.join(",")+"}"
}}}d.stringifyJSON=function(f){if(window.JSON&&window.JSON.stringify){return window.JSON.stringify(f)
}return e("",{"":f})
}
}(jQuery));
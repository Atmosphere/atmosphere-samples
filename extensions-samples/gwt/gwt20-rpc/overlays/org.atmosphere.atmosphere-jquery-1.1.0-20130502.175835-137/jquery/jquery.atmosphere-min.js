jQuery.atmosphere=function(){jQuery(window).bind("unload.atmosphere",function(){jQuery.atmosphere.unsubscribe()
});
jQuery(window).keypress(function(b){if(b.keyCode==27){b.preventDefault()
}});
var a=function(c){var b,e=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,d={};
while(b=e.exec(c)){d[b[1]]=b[2]
}return d
};
return{version:"1.1.0",requests:[],callbacks:[],onError:function(b){},onClose:function(b){},onOpen:function(b){},onMessage:function(b){},onReconnect:function(c,b){},onMessagePublished:function(b){},onTransportFailure:function(c,b){},onLocalMessage:function(b){},onFailureToReconnect:function(c,b){},AtmosphereRequest:function(E){var G={timeout:300000,method:"GET",headers:{},contentType:"",callback:null,url:"",data:"",suspend:true,maxRequest:-1,reconnect:true,maxStreamingLength:10000000,lastIndex:0,logLevel:"info",requestCount:0,fallbackMethod:"GET",fallbackTransport:"streaming",transport:"long-polling",webSocketImpl:null,webSocketBinaryType:null,dispatchUrl:null,webSocketPathDelimiter:"@@",enableXDR:false,rewriteURL:false,attachHeadersAsQueryString:true,executeCallbackBeforeReconnect:false,readyState:0,lastTimestamp:0,withCredentials:false,trackMessageLength:false,messageDelimiter:"|",connectTimeout:-1,reconnectInterval:0,dropAtmosphereHeaders:true,uuid:0,shared:false,readResponsesHeaders:false,maxReconnectOnClose:5,enableProtocol:true,onError:function(at){},onClose:function(at){},onOpen:function(at){},onMessage:function(at){},onReopen:function(au,at){},onReconnect:function(au,at){},onMessagePublished:function(at){},onTransportFailure:function(au,at){},onLocalMessage:function(at){},onFailureToReconnect:function(au,at){}};
var O={status:200,reasonPhrase:"OK",responseBody:"",messages:[],headers:[],state:"messageReceived",transport:"polling",error:null,request:null,partialMessage:"",errorHandled:false,id:0};
var R=null;
var i=null;
var o=null;
var w=null;
var y=null;
var ac=true;
var f=0;
var ap=false;
var S=null;
var aj;
var k=null;
var B=jQuery.now();
var C;
ar(E);
function ak(){ac=true;
ap=false;
f=0;
R=null;
i=null;
o=null;
w=null
}function s(){ae();
ak()
}function ar(at){s();
G=jQuery.extend(G,at);
G.mrequest=G.reconnect;
if(!G.reconnect){G.reconnect=true
}}function j(){return G.webSocketImpl!=null||window.WebSocket||window.MozWebSocket
}function K(){return window.EventSource
}function m(){if(G.shared){k=aa(G);
if(k!=null){if(G.logLevel=="debug"){jQuery.atmosphere.debug("Storage service available. All communication will be local")
}if(k.open(G)){return
}}if(G.logLevel=="debug"){jQuery.atmosphere.debug("No Storage service available.")
}k=null
}G.firstMessage=true;
G.isOpen=false;
G.ctime=jQuery.now();
if(G.transport!="websocket"&&G.transport!="sse"){l(G)
}else{if(G.transport=="websocket"){if(!j()){I("Websocket is not supported, using request.fallbackTransport ("+G.fallbackTransport+")")
}else{ad(false)
}}else{if(G.transport=="sse"){if(!K()){I("Server Side Events(SSE) is not supported, using request.fallbackTransport ("+G.fallbackTransport+")")
}else{A(false)
}}}}}function aa(ax){var aA,au,aw,av="atmosphere-"+ax.url,at={storage:function(){if(!jQuery.atmosphere.supportStorage()){return
}var aD=window.localStorage,aB=function(aE){return jQuery.parseJSON(aD.getItem(av+"-"+aE))
},aC=function(aE,aF){aD.setItem(av+"-"+aE,jQuery.stringifyJSON(aF))
};
return{init:function(){aC("children",aB("children").concat([B]));
jQuery(window).on("storage.socket",function(aE){aE=aE.originalEvent;
if(aE.key===av&&aE.newValue){az(aE.newValue)
}});
return aB("opened")
},signal:function(aE,aF){aD.setItem(av,jQuery.stringifyJSON({target:"p",type:aE,data:aF}))
},close:function(){var aE,aF=aB("children");
jQuery(window).off("storage.socket");
if(aF){aE=jQuery.inArray(ax.id,aF);
if(aE>-1){aF.splice(aE,1);
aC("children",aF)
}}}}
},windowref:function(){var aB=window.open("",av.replace(/\W/g,""));
if(!aB||aB.closed||!aB.callbacks){return
}return{init:function(){aB.callbacks.push(az);
aB.children.push(B);
return aB.opened
},signal:function(aC,aD){if(!aB.closed&&aB.fire){aB.fire(jQuery.stringifyJSON({target:"p",type:aC,data:aD}))
}},close:function(){function aC(aF,aE){var aD=jQuery.inArray(aE,aF);
if(aD>-1){aF.splice(aD,1)
}}if(!aw){aC(aB.callbacks,az);
aC(aB.children,B)
}}}
}};
function az(aB){var aD=jQuery.parseJSON(aB),aC=aD.data;
if(aD.target==="c"){switch(aD.type){case"open":F("opening","local",G);
break;
case"close":if(!aw){aw=true;
if(aC.reason==="aborted"){ag()
}else{if(aC.heir===B){m()
}else{setTimeout(function(){m()
},100)
}}}break;
case"message":x(aC,"messageReceived",200,ax.transport);
break;
case"localMessage":V(aC);
break
}}}function ay(){var aB=new RegExp("(?:^|; )("+encodeURIComponent(av)+")=([^;]*)").exec(document.cookie);
if(aB){return jQuery.parseJSON(decodeURIComponent(aB[2]))
}}aA=ay();
if(!aA||jQuery.now()-aA.ts>1000){return
}au=at.storage()||at.windowref();
if(!au){return
}return{open:function(){var aB;
C=setInterval(function(){var aC=aA;
aA=ay();
if(!aA||aC.ts===aA.ts){az(jQuery.stringifyJSON({target:"c",type:"close",data:{reason:"error",heir:aC.heir}}))
}},1000);
aB=au.init();
if(aB){setTimeout(function(){F("opening","local",ax)
},50)
}return aB
},send:function(aB){au.signal("send",aB)
},localSend:function(aB){au.signal("localSend",jQuery.stringifyJSON({id:B,event:aB}))
},close:function(){if(!ap){clearInterval(C);
au.signal("close");
au.close()
}}}
}function W(){var au,at="atmosphere-"+G.url,ay={storage:function(){if(!jQuery.atmosphere.supportStorage()){return
}var az=window.localStorage;
return{init:function(){jQuery(window).on("storage.socket",function(aA){aA=aA.originalEvent;
if(aA.key===at&&aA.newValue){av(aA.newValue)
}})
},signal:function(aA,aB){az.setItem(at,jQuery.stringifyJSON({target:"c",type:aA,data:aB}))
},get:function(aA){return jQuery.parseJSON(az.getItem(at+"-"+aA))
},set:function(aA,aB){az.setItem(at+"-"+aA,jQuery.stringifyJSON(aB))
},close:function(){jQuery(window).off("storage.socket");
az.removeItem(at);
az.removeItem(at+"-opened");
az.removeItem(at+"-children")
}}
},windowref:function(){var az=at.replace(/\W/g,""),aA=(jQuery('iframe[name="'+az+'"]')[0]||jQuery('<iframe name="'+az+'" />').hide().appendTo("body")[0]).contentWindow;
return{init:function(){aA.callbacks=[av];
aA.fire=function(aB){var aC;
for(aC=0;
aC<aA.callbacks.length;
aC++){aA.callbacks[aC](aB)
}}
},signal:function(aB,aC){if(!aA.closed&&aA.fire){aA.fire(jQuery.stringifyJSON({target:"c",type:aB,data:aC}))
}},get:function(aB){return !aA.closed?aA[aB]:null
},set:function(aB,aC){if(!aA.closed){aA[aB]=aC
}},close:function(){}}
}};
function av(az){var aB=jQuery.parseJSON(az),aA=aB.data;
if(aB.target==="p"){switch(aB.type){case"send":af(aA);
break;
case"localSend":V(aA);
break;
case"close":ag();
break
}}}S=function ax(az){au.signal("message",az)
};
function aw(){document.cookie=encodeURIComponent(at)+"="+encodeURIComponent(jQuery.stringifyJSON({ts:jQuery.now()+1,heir:(au.get("children")||[])[0]}))
}au=ay.storage()||ay.windowref();
au.init();
if(G.logLevel=="debug"){jQuery.atmosphere.debug("Installed StorageService "+au)
}au.set("children",[]);
if(au.get("opened")!=null&&!au.get("opened")){au.set("opened",false)
}aw();
C=setInterval(aw,1000);
aj=au
}function F(av,ay,au){if(G.shared&&ay!="local"){W()
}if(aj!=null){aj.set("opened",true)
}au.close=function(){ag()
};
if(f>0&&av=="re-connecting"){au.isReopen=true;
X(O)
}else{if(O.error==null){O.request=au;
var aw=O.state;
O.state=av;
var at=O.transport;
O.transport=ay;
var ax=O.responseBody;
u();
O.responseBody=ax;
O.state=aw;
O.transport=at
}}}function r(av){av.transport="jsonp";
var au=G;
if((av!=null)&&(typeof(av)!="undefined")){au=av
}var at=au.url;
if(au.dispatchUrl!=null){at+=au.dispatchUrl
}var aw=au.data;
if(au.attachHeadersAsQueryString){at=P(au);
if(aw!=""){at+="&X-Atmosphere-Post-Body="+encodeURIComponent(aw)
}aw=""
}y=jQuery.ajax({url:at,type:au.method,dataType:"jsonp",error:function(ax,az,ay){O.error=true;
if(ax.status<300){J(y,au)
}else{Y(ax.status,ay)
}},jsonp:"jsonpTransport",success:function(ay){if(au.reconnect){if(au.maxRequest==-1||au.requestCount++<au.maxRequest){Z(y,au);
if(!au.executeCallbackBeforeReconnect){J(y,au)
}var aA=ay.message;
if(aA!=null&&typeof aA!="string"){try{aA=jQuery.stringifyJSON(aA)
}catch(az){}}var ax=q(aA,au,O);
if(!ax){x(O.responseBody,"messageReceived",200,au.transport)
}if(au.executeCallbackBeforeReconnect){J(y,au)
}}else{jQuery.atmosphere.log(G.logLevel,["JSONP reconnect maximum try reached "+G.requestCount]);
Y(0,"maxRequest reached")
}}},data:au.data,beforeSend:function(ax){b(ax,au,false)
}})
}function T(aw){var au=G;
if((aw!=null)&&(typeof(aw)!="undefined")){au=aw
}var at=au.url;
if(au.dispatchUrl!=null){at+=au.dispatchUrl
}var ax=au.data;
if(au.attachHeadersAsQueryString){at=P(au);
if(ax!=""){at+="&X-Atmosphere-Post-Body="+encodeURIComponent(ax)
}ax=""
}var av=typeof(au.async)!="undefined"?au.async:true;
y=jQuery.ajax({url:at,type:au.method,error:function(ay,aA,az){O.error=true;
if(ay.status<300){J(y,au)
}else{Y(ay.status,az)
}},success:function(aA,aB,az){if(au.reconnect){if(au.maxRequest==-1||au.requestCount++<au.maxRequest){if(!au.executeCallbackBeforeReconnect){J(y,au)
}var ay=q(aA,au,O);
if(!ay){x(O.responseBody,"messageReceived",200,au.transport)
}if(au.executeCallbackBeforeReconnect){J(y,au)
}}else{jQuery.atmosphere.log(G.logLevel,["AJAX reconnect maximum try reached "+G.requestCount]);
Y(0,"maxRequest reached")
}}},beforeSend:function(ay){b(ay,au,false)
},crossDomain:au.enableXDR,async:av})
}function d(at){if(G.webSocketImpl!=null){return G.webSocketImpl
}else{if(window.WebSocket){return new WebSocket(at)
}else{return new MozWebSocket(at)
}}}function e(){var at=P(G);
return decodeURI(jQuery('<a href="'+at+'"/>')[0].href.replace(/^http/,"ws"))
}function aq(){var at=P(G);
return at
}function A(au){O.transport="sse";
var at=aq(G.url);
if(G.logLevel=="debug"){jQuery.atmosphere.debug("Invoking executeSSE");
jQuery.atmosphere.debug("Using URL: "+at)
}if(G.enableProtocol&&au){var aw=jQuery.now()-G.ctime;
G.lastTimestamp=Number(G.stime)+Number(aw)
}if(au&&!G.reconnect){if(i!=null){ae()
}return
}try{i=new EventSource(at,{withCredentials:G.withCredentials})
}catch(av){Y(0,av);
I("SSE failed. Downgrading to fallback transport and resending");
return
}if(G.connectTimeout>0){G.id=setTimeout(function(){if(!au){ae()
}},G.connectTimeout)
}i.onopen=function(ax){if(G.logLevel=="debug"){jQuery.atmosphere.debug("SSE successfully opened")
}if(!au){F("opening","sse",G)
}else{F("re-opening","sse",G)
}au=true;
if(G.method=="POST"){O.state="messageReceived";
i.send(G.data)
}};
i.onmessage=function(ay){if(ay.origin!=window.location.protocol+"//"+window.location.host){jQuery.atmosphere.log(G.logLevel,["Origin was not "+window.location.protocol+"//"+window.location.host]);
return
}O.state="messageReceived";
O.status=200;
ay=ay.data;
var ax=q(ay,G,O);
if(jQuery.trim(ay).length==0){ax=true
}if(!ax){u();
O.responseBody="";
O.messages=[]
}};
i.onerror=function(ax){clearTimeout(G.id);
ab(au);
ae();
if(ap){jQuery.atmosphere.log(G.logLevel,["SSE closed normally"])
}else{if(!au){I("SSE failed. Downgrading to fallback transport and resending")
}else{if(G.reconnect&&(O.transport=="sse")){if(f++<G.maxReconnectOnClose){F("re-connecting",G.transport,G);
G.id=setTimeout(function(){A(true)
},G.reconnectInterval);
O.responseBody="";
O.messages=[]
}else{jQuery.atmosphere.log(G.logLevel,["SSE reconnect maximum try reached "+f]);
Y(0,"maxReconnectOnClose reached")
}}}}}
}function ad(au){O.transport="websocket";
if(G.enableProtocol&&au){var aw=jQuery.now()-G.ctime;
G.lastTimestamp=Number(G.stime)+Number(aw)
}var at=e(G.url);
var av=false;
if(G.logLevel=="debug"){jQuery.atmosphere.debug("Invoking executeWebSocket");
jQuery.atmosphere.debug("Using URL: "+at)
}if(au&&!G.reconnect){if(R!=null){ae()
}return
}R=d(at);
if(G.webSocketBinaryType!=null){R.binaryType=G.webSocketBinaryType
}if(G.connectTimeout>0){G.id=setTimeout(function(){if(!au){var ax={code:1002,reason:"",wasClean:false};
R.onclose(ax);
try{ae()
}catch(ay){}return
}},G.connectTimeout)
}G.id=setTimeout(function(){setTimeout(function(){ae()
},G.reconnectInterval)
},G.timeout);
R.onopen=function(ax){if(G.logLevel=="debug"){jQuery.atmosphere.debug("Websocket successfully opened")
}if(!au){F("opening","websocket",G)
}else{F("re-opening","websocket",G)
}au=true;
R.webSocketOpened=au;
if(G.method=="POST"){O.state="messageReceived";
R.send(G.data)
}};
R.onmessage=function(az){clearTimeout(G.id);
G.id=setTimeout(function(){setTimeout(function(){ae()
},G.reconnectInterval)
},G.timeout);
O.state="messageReceived";
O.status=200;
var az=az.data;
var ax=typeof(az)=="string";
if(ax){var ay=q(az,G,O);
if(!ay){u();
O.responseBody="";
O.messages=[]
}}else{if(!n(G,az)){return
}O.responseBody=az;
u();
O.responseBody=null
}};
R.onerror=function(ax){clearTimeout(G.id)
};
R.onclose=function(ax){if(av){return
}clearTimeout(G.id);
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
}}jQuery.atmosphere.warn("Websocket closed, reason: "+ay);
jQuery.atmosphere.warn("Websocket closed, wasClean: "+ax.wasClean);
ab(au);
av=true;
if(ap){jQuery.atmosphere.log(G.logLevel,["Websocket closed normally"])
}else{if(!au){I("Websocket failed. Downgrading to Comet and resending")
}else{if(G.reconnect&&O.transport=="websocket"){ae();
if(f++<G.maxReconnectOnClose){F("re-connecting",G.transport,G);
G.id=setTimeout(function(){O.responseBody="";
O.messages=[];
ad(true)
},G.reconnectInterval)
}else{jQuery.atmosphere.log(G.logLevel,["Websocket reconnect maximum try reached "+G.requestCount]);
jQuery.atmosphere.warn("Websocket error, reason: "+ax.reason);
Y(0,"maxReconnectOnClose reached")
}}}}}
}function n(av,au){if(av.enableProtocol&&av.firstMessage){av.firstMessage=false;
var at=au.split(av.messageDelimiter);
if(av.trackMessageLength){av.uuid=at[1];
av.stime=at[2]
}else{av.uuid=at[0];
av.stime=at[1]
}ah(av);
return false
}return true
}function Y(at,au){ae();
O.state="error";
O.reasonPhrase=au;
O.responseBody="";
O.status=at;
O.messages=[];
u()
}function q(ax,aw,at){if(ax.length==0){return true
}if(!n(G,ax)){return true
}if(aw.trackMessageLength){if(at.partialMessage.length!=0){ax=at.partialMessage+ax
}var av=[];
var ay=0;
var au=ax.indexOf(aw.messageDelimiter);
while(au!=-1){ay=ax.substring(ay,au);
ax=ax.substring(au+aw.messageDelimiter.length,ax.length);
if(ax.length==0||ax.length<ay){break
}au=ax.indexOf(aw.messageDelimiter);
av.push(ax.substring(0,ay))
}if(av.length==0||(au!=-1&&ax.length!=0&&ay!=ax.length)){at.partialMessage=ay+aw.messageDelimiter+ax
}else{at.partialMessage=""
}if(av.length!=0){at.responseBody=av.join(aw.messageDelimiter);
at.messages=av;
return false
}else{at.responseBody="";
at.messages=[];
return true
}}else{at.responseBody=ax
}return false
}function I(at){jQuery.atmosphere.log(G.logLevel,[at]);
if(typeof(G.onTransportFailure)!="undefined"){G.onTransportFailure(at,G)
}else{if(typeof(jQuery.atmosphere.onTransportFailure)!="undefined"){jQuery.atmosphere.onTransportFailure(at,G)
}}G.transport=G.fallbackTransport;
var au=G.connectTimeout==-1?0:G.connectTimeout;
if(G.reconnect&&G.transport!="none"||G.transport==null){G.method=G.fallbackMethod;
O.transport=G.fallbackTransport;
G.fallbackTransport="none";
G.id=setTimeout(function(){m()
},au)
}else{Y(500,"Unable to reconnect with fallback transport")
}}function P(av,at){var au=G;
if((av!=null)&&(typeof(av)!="undefined")){au=av
}if(at==null){at=au.url
}if(!au.attachHeadersAsQueryString){return at
}if(at.indexOf("X-Atmosphere-Framework")!=-1){return at
}at+=(at.indexOf("?")!=-1)?"&":"?";
at+="X-Atmosphere-tracking-id="+au.uuid;
at+="&X-Atmosphere-Framework="+jQuery.atmosphere.version;
at+="&X-Atmosphere-Transport="+au.transport;
if(au.trackMessageLength){at+="&X-Atmosphere-TrackMessageSize=true"
}if(au.lastTimestamp!=undefined){at+="&X-Cache-Date="+au.lastTimestamp
}else{at+="&X-Cache-Date="+0
}if(au.contentType!=""){at+="&Content-Type="+au.contentType
}if(au.enableProtocol){at+="&X-atmo-protocol=true"
}jQuery.each(au.headers,function(aw,ay){var ax=jQuery.isFunction(ay)?ay.call(this,au,av,O):ay;
if(ax!=null){at+="&"+encodeURIComponent(aw)+"="+encodeURIComponent(ax)
}});
return at
}function al(){if(jQuery.browser.msie){if(typeof XMLHttpRequest=="undefined"){XMLHttpRequest=function(){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")
}catch(at){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")
}catch(at){}try{return new ActiveXObject("Microsoft.XMLHTTP")
}catch(at){}throw new Error("This browser does not support XMLHttpRequest.")
}
}}return new XMLHttpRequest()
}function ah(at){if(!at.isOpen){at.isOpen=true;
F("opening",at.transport,at)
}else{if(at.isReopen){at.isReopen=false;
F("re-opening",at.transport,at)
}}}function l(av){var at=G;
if((av!=null)||(typeof(av)!="undefined")){at=av
}at.lastIndex=0;
at.readyState=0;
if((at.transport=="jsonp")||((at.enableXDR)&&(jQuery.atmosphere.checkCORSSupport()))){r(at);
return
}if(at.transport=="ajax"){T(av);
return
}if(jQuery.browser.msie&&jQuery.browser.version<10){if((at.transport=="streaming")){at.enableXDR&&window.XDomainRequest?H(at):ao(at);
return
}if((at.enableXDR)&&(window.XDomainRequest)){H(at);
return
}}var aw=function(){if(at.reconnect&&f++<at.maxReconnectOnClose){F("re-connecting",av.transport,av);
J(au,at,true)
}else{Y(0,"maxReconnectOnClose reached")
}};
if(at.reconnect&&(at.maxRequest==-1||at.requestCount++<at.maxRequest)){var au=al();
au.hasData=false;
b(au,at,true);
if(at.suspend){o=au
}if(at.transport!="polling"){O.transport=at.transport;
au.onabort=function(){ab(true)
};
au.onerror=function(){O.error=true;
try{O.status=XMLHttpRequest.status
}catch(ax){O.status=500
}if(!O.status){O.status=500
}ae();
if(!O.errorHandled){aw()
}}
}au.onreadystatechange=function(){if(ap){return
}O.error=null;
var ay=false;
var aC=false;
if(at.transport=="streaming"&&at.readyState>2&&au.readyState==4){ae();
aw();
return
}at.readyState=au.readyState;
if(at.transport=="streaming"&&au.readyState>=3){aC=true
}else{if(at.transport=="long-polling"&&au.readyState===4){aC=true
}}clearTimeout(at.id);
if((!at.enableProtocol||!av.firstMessage)&&at.transport!="polling"&&au.readyState==2){ah(at)
}if(aC){var ax=0;
if(au.readyState!=0){ax=au.status>1000?0:au.status
}if(ax>=300||ax==0){O.errorHandled=true;
ae();
aw();
return
}var aA=jQuery.trim(au.responseText);
if(aA.length==0&&at.transport=="long-polling"){if(!au.hasData){aw()
}else{au.hasData=false
}return
}au.hasData=true;
Z(au,G);
if(at.transport=="streaming"){if(!jQuery.browser.opera){var az=aA.substring(at.lastIndex,aA.length);
ay=q(az,at,O);
at.lastIndex=aA.length;
if(ay){return
}}else{jQuery.atmosphere.iterate(function(){if(O.status!=500&&au.responseText.length>at.lastIndex){try{O.status=au.status;
O.headers=a(au.getAllResponseHeaders());
Z(au,G)
}catch(aE){O.status=404
}O.state="messageReceived";
var aD=au.responseText.substring(at.lastIndex);
at.lastIndex=au.responseText.length;
ay=q(aD,at,O);
if(!ay){u()
}D(au,at)
}else{if(O.status>400){at.lastIndex=au.responseText.length;
return false
}}},0)
}}else{ay=q(aA,at,O)
}try{O.status=au.status;
O.headers=a(au.getAllResponseHeaders());
Z(au,at)
}catch(aB){O.status=404
}if(at.suspend){O.state=O.status==0?"closed":"messageReceived"
}else{O.state="messagePublished"
}if(!at.executeCallbackBeforeReconnect){J(au,at,false)
}if(O.responseBody.length!=0&&!ay){u()
}if(at.executeCallbackBeforeReconnect){J(au,at,false)
}D(au,at)
}};
au.send(at.data);
if(at.suspend){at.id=setTimeout(function(){if(ac){setTimeout(function(){ae();
l(at)
},at.reconnectInterval)
}},at.timeout)
}ac=true
}else{if(at.logLevel=="debug"){jQuery.atmosphere.log(at.logLevel,["Max re-connection reached."])
}Y(0,"maxRequest reached")
}}function b(av,aw,au){var at=aw.url;
if(aw.dispatchUrl!=null&&aw.method=="POST"){at+=aw.dispatchUrl
}at=P(aw,at);
at=jQuery.atmosphere.prepareURL(at);
if(au){av.open(aw.method,at,true);
if(aw.connectTimeout>-1){aw.id=setTimeout(function(){if(aw.requestCount==0){ae();
x("Connect timeout","closed",200,aw.transport)
}},aw.connectTimeout)
}}if(G.withCredentials){if("withCredentials" in av){av.withCredentials=true
}}if(!G.dropAtmosphereHeaders){av.setRequestHeader("X-Atmosphere-Framework",jQuery.atmosphere.version);
av.setRequestHeader("X-Atmosphere-Transport",aw.transport);
if(aw.lastTimestamp!=undefined){av.setRequestHeader("X-Cache-Date",aw.lastTimestamp)
}else{av.setRequestHeader("X-Cache-Date",0)
}if(aw.trackMessageLength){av.setRequestHeader("X-Atmosphere-TrackMessageSize","true")
}av.setRequestHeader("X-Atmosphere-tracking-id",aw.uuid)
}if(aw.contentType!=""){av.setRequestHeader("Content-Type",aw.contentType)
}jQuery.each(aw.headers,function(ax,az){var ay=jQuery.isFunction(az)?az.call(this,av,aw,au,O):az;
if(ay!=null){av.setRequestHeader(ax,ay)
}})
}function J(au,av,ax){if(ax||av.transport!="streaming"){if(av.reconnect||(av.suspend&&ac)){var at=0;
if(au.readyState!=0){at=au.status>1000?0:au.status
}O.status=at==0?204:at;
O.reason=at==0?"Server resumed the connection or down.":"OK";
var aw=av.connectTimeout==-1?0:av.connectTimeout;
if(ax){aw=av.reconnectInterval
}av.id=setTimeout(function(){l(av)
},aw)
}}}function X(at){at.state="re-connecting";
U(at)
}function H(at){if(at.transport!="polling"){w=N(at);
w.open()
}else{N(at).open()
}}function N(av){var au=G;
if((av!=null)&&(typeof(av)!="undefined")){au=av
}var ay=au.transport;
var at=new window.XDomainRequest();
var ax=au.rewriteURL||function(aA){var az=/(?:^|;\s*)(JSESSIONID|PHPSESSID)=([^;]*)/.exec(document.cookie);
switch(az&&az[1]){case"JSESSIONID":return aA.replace(/;jsessionid=[^\?]*|(\?)|$/,";jsessionid="+az[2]+"$1");
case"PHPSESSID":return aA.replace(/\?PHPSESSID=[^&]*&?|\?|$/,"?PHPSESSID="+az[2]+"&").replace(/&$/,"")
}return aA
};
at.onprogress=function(){aw(at)
};
at.onerror=function(){if(au.transport!="polling"){Y("XDR error")
}};
at.onload=function(){aw(at)
};
var aw=function(az){var aB=jQuery.trim(az.responseText);
if(aB.length==0||au.lastMessage==aB){return
}var aC=function(){if(au.transport=="long-polling"&&(au.reconnect&&(au.maxRequest==-1||au.requestCount++<au.maxRequest))){az.status=200;
if(aB.length!=0){J(az,au,false)
}}};
var aA=q(aB,au,O);
ah(au);
if(au.executeCallbackBeforeReconnect){aC()
}if(!aA){x(O.responseBody,"messageReceived",200,ay)
}if(!au.executeCallbackBeforeReconnect){aC()
}au.lastMessage=aB
};
return{open:function(){var az=au.url;
if(au.dispatchUrl!=null){az+=au.dispatchUrl
}az=P(au,az);
at.open(au.method,ax(az));
if(au.method=="GET"){at.send()
}else{at.send(au.data)
}if(au.connectTimeout>-1){au.id=setTimeout(function(){if(au.requestCount==0){ae();
x("Connect timeout","closed",200,au.transport)
}},au.connectTimeout)
}},close:function(){at.abort();
x(at.responseText,"closed",200,ay)
}}
}function ao(at){w=p(at);
w.open()
}function p(aw){var av=G;
if((aw!=null)&&(typeof(aw)!="undefined")){av=aw
}var au;
var ax=new window.ActiveXObject("htmlfile");
ax.open();
ax.close();
var at=av.url;
if(av.dispatchUrl!=null){at+=av.dispatchUrl
}if(av.transport!="polling"){O.transport=av.transport
}return{open:function(){var ay=ax.createElement("iframe");
at=P(av);
if(av.data!=""){at+="&X-Atmosphere-Post-Body="+encodeURIComponent(av.data)
}at=jQuery.atmosphere.prepareURL(at);
ay.src=at;
ax.body.appendChild(ay);
var az=ay.contentDocument||ay.contentWindow.document;
au=jQuery.atmosphere.iterate(function(){try{if(!az.firstChild){return
}if(az.readyState==="complete"){try{jQuery.noop(az.fileSize)
}catch(aF){x("Connection Failure","error",500,av.transport);
return false
}}var aC=az.body?az.body.lastChild:az;
var aE=function(){var aH=aC.cloneNode(true);
aH.appendChild(az.createTextNode("."));
var aG=aH.innerText;
aG=jQuery.trim(aG.substring(0,aG.length-1));
return aG
};
if(!jQuery.nodeName(aC,"pre")){var aB=az.head||az.getElementsByTagName("head")[0]||az.documentElement||az;
var aA=az.createElement("script");
aA.text="document.write('<plaintext>')";
aB.insertBefore(aA,aB.firstChild);
aB.removeChild(aA);
aC=az.body.lastChild
}if(av.closed){av.isReopen=true
}ah(av);
au=jQuery.atmosphere.iterate(function(){var aH=aE();
if(aH.length>av.lastIndex){O.status=200;
O.error=null;
aC.innerText="";
if(aH.length!=0){var aG=q(aH,av,O);
if(aG){return""
}x(O.responseBody,"messageReceived",200,av.transport)
}av.lastIndex=0
}if(az.readyState==="complete"){ab(true);
F("re-connecting",av.transport,av);
av.id=setTimeout(function(){ao(av)
},av.reconnectInterval);
return false
}},null);
return false
}catch(aD){O.error=true;
F("re-connecting",av.transport,av);
if(f++<av.maxReconnectOnClose){av.id=setTimeout(function(){ao(av)
},av.reconnectInterval)
}else{Y(0,"maxReconnectOnClose reached")
}ax.execCommand("Stop");
ax.close();
return false
}})
},close:function(){if(au){au()
}ax.execCommand("Stop");
ab(true)
}}
}function af(at){if(O.status==408){h(at)
}else{if(k!=null){g(at)
}else{if(o!=null||i!=null){c(at)
}else{if(w!=null){Q(at)
}else{if(y!=null){M(at)
}else{if(R!=null){z(at)
}}}}}}}function h(au){var at=ai(au);
at.transport="ajax";
at.method="GET";
at.async=false;
at.reconnect=false;
l(at)
}function g(at){k.send(at)
}function t(au){if(au.length==0){return
}try{if(k){k.localSend(au)
}else{if(aj){aj.signal("localMessage",jQuery.stringifyJSON({id:B,event:au}))
}}}catch(at){jQuery.atmosphere.error(at)
}}function c(au){var at=ai(au);
l(at)
}function Q(au){if(G.enableXDR&&jQuery.atmosphere.checkCORSSupport()){var at=ai(au);
at.reconnect=false;
r(at)
}else{c(au)
}}function M(at){c(at)
}function L(at){var au=at;
if(typeof(au)=="object"){au=at.data
}return au
}function ai(au){var av=L(au);
var at={connected:false,timeout:60000,method:"POST",url:G.url,contentType:G.contentType,headers:G.headers,reconnect:true,callback:null,data:av,suspend:false,maxRequest:-1,logLevel:"info",requestCount:0,withCredentials:G.withCredentials,transport:"polling",isOpen:true,attachHeadersAsQueryString:true,enableXDR:G.enableXDR,uuid:G.uuid,dispatchUrl:G.dispatchUrl,enableProtocol:false,messageDelimiter:"|",maxReconnectOnClose:G.maxReconnectOnClose};
if(typeof(au)=="object"){at=jQuery.extend(at,au)
}return at
}function z(at){var aw=L(at);
var au;
try{if(G.dispatchUrl!=null){au=G.webSocketPathDelimiter+G.dispatchUrl+G.webSocketPathDelimiter+aw
}else{au=aw
}R.send(au)
}catch(av){R.onclose=function(ax){};
ae();
I("Websocket failed. Downgrading to Comet and resending "+au);
c(at)
}}function V(au){var at=jQuery.parseJSON(au);
if(at.id!=B){if(typeof(G.onLocalMessage)!="undefined"){G.onLocalMessage(at.event)
}else{if(typeof(jQuery.atmosphere.onLocalMessage)!="undefined"){jQuery.atmosphere.onLocalMessage(at.event)
}}}}function x(aw,at,au,av){O.responseBody=aw;
O.transport=av;
O.status=au;
O.state=at;
u()
}function Z(at,aw){if(!aw.readResponsesHeaders&&!aw.enableProtocol){aw.lastTimestamp=jQuery.now();
aw.uuid=jQuery.atmosphere.guid();
return
}try{var av=at.getResponseHeader("X-Cache-Date");
if(av&&av!=null&&av.length>0){aw.lastTimestamp=av.split(" ").pop()
}var au=at.getResponseHeader("X-Atmosphere-tracking-id");
if(au&&au!=null){aw.uuid=au.split(" ").pop()
}if(aw.headers){jQuery.each(G.headers,function(az){var ay=at.getResponseHeader(az);
if(ay){O.headers[az]=ay
}})
}}catch(ax){}}function U(at){an(at,G);
an(at,jQuery.atmosphere)
}function an(au,av){switch(au.state){case"messageReceived":f=0;
if(typeof(av.onMessage)!="undefined"){av.onMessage(au)
}break;
case"error":if(typeof(av.onError)!="undefined"){av.onError(au)
}break;
case"opening":if(typeof(av.onOpen)!="undefined"){av.onOpen(au)
}break;
case"messagePublished":if(typeof(av.onMessagePublished)!="undefined"){av.onMessagePublished(au)
}break;
case"re-connecting":if(typeof(av.onReconnect)!="undefined"){av.onReconnect(G,au)
}break;
case"re-opening":if(typeof(av.onReopen)!="undefined"){av.onReopen(G,au)
}break;
case"fail-to-reconnect":if(typeof(av.onFailureToReconnect)!="undefined"){av.onFailureToReconnect(G,au)
}break;
case"unsubscribe":case"closed":var at=typeof(G.closed)!="undefined"?G.closed:false;
if(typeof(av.onClose)!="undefined"&&!at){av.onClose(au)
}G.closed=true;
break
}}function ab(at){O.state="closed";
O.responseBody="";
O.messages=[];
O.status=!at?501:200;
u()
}function u(){var av=function(ay,az){az(O)
};
if(k==null&&S!=null){S(O.responseBody)
}G.reconnect=G.mrequest;
var at=typeof(O.responseBody)=="string";
var aw=(at&&G.trackMessageLength)?(O.messages.length>0?O.messages:[""]):new Array(O.responseBody);
for(var au=0;
au<aw.length;
au++){if(aw.length>1&&aw[au].length==0){continue
}O.responseBody=(at)?jQuery.trim(aw[au]):aw[au];
if(k==null&&S!=null){S(O.responseBody)
}if(O.responseBody.length==0&&O.state=="messageReceived"){continue
}U(O);
if(jQuery.atmosphere.callbacks.length>0){if(G.logLevel=="debug"){jQuery.atmosphere.debug("Invoking "+jQuery.atmosphere.callbacks.length+" global callbacks: "+O.state)
}try{jQuery.each(jQuery.atmosphere.callbacks,av)
}catch(ax){jQuery.atmosphere.log(G.logLevel,["Callback exception"+ax])
}}if(typeof(G.callback)=="function"){if(G.logLevel=="debug"){jQuery.atmosphere.debug("Invoking request callbacks")
}try{G.callback(O)
}catch(ax){jQuery.atmosphere.log(G.logLevel,["Callback exception"+ax])
}}}}function D(au,at){if(O.partialMessage==""&&(at.transport=="streaming")&&(au.responseText.length>at.maxStreamingLength)){O.messages=[];
ab(true);
v();
ae();
J(au,at,true)
}}function v(){if(G.enableProtocol){var au="X-Atmosphere-Transport=close&X-Atmosphere-tracking-id="+G.uuid;
var at=G.url.replace(/([?&])_=[^&]*/,au);
at=at+(at===G.url?(/\?/.test(G.url)?"&":"?")+au:"");
if(G.connectTimeout>-1){jQuery.ajax({url:at,async:false,timeout:G.connectTimeout})
}else{jQuery.ajax({url:at,async:false})
}}}function ag(){G.reconnect=false;
ap=true;
O.request=G;
O.state="unsubscribe";
O.responseBody="";
O.status=408;
u();
ae()
}function ae(){if(w!=null){w.close();
w=null
}if(y!=null){y.abort();
y=null
}if(o!=null){o.abort();
o=null
}if(R!=null){if(R.webSocketOpened){R.close()
}R=null
}if(i!=null){i.close();
i=null
}am()
}function am(){if(aj!=null){clearInterval(C);
document.cookie=encodeURIComponent("atmosphere-"+G.url)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
aj.signal("close",{reason:"",heir:!ap?B:(aj.get("children")||[])[0]});
aj.close()
}if(k!=null){k.close()
}}this.subscribe=function(at){ar(at);
m()
};
this.execute=function(){m()
};
this.invokeCallback=function(){u()
};
this.close=function(){ag()
};
this.disconnect=function(){v()
};
this.getUrl=function(){return G.url
};
this.push=function(av,au){if(au!=null){var at=G.dispatchUrl;
G.dispatchUrl=au;
af(av);
G.dispatchUrl=at
}else{af(av)
}};
this.getUUID=function(){return G.uuid
};
this.pushLocal=function(at){t(at)
};
this.enableProtocol=function(at){return G.enableProtocol
};
this.request=G;
this.response=O
},subscribe:function(b,e,d){if(typeof(e)=="function"){jQuery.atmosphere.addCallback(e)
}if(typeof(b)!="string"){d=b
}else{d.url=b
}var c=new jQuery.atmosphere.AtmosphereRequest(d);
c.execute();
jQuery.atmosphere.requests[jQuery.atmosphere.requests.length]=c;
return c
},addCallback:function(b){if(jQuery.inArray(b,jQuery.atmosphere.callbacks)==-1){jQuery.atmosphere.callbacks.push(b)
}},removeCallback:function(c){var b=jQuery.inArray(c,jQuery.atmosphere.callbacks);
if(b!=-1){jQuery.atmosphere.callbacks.splice(b,1)
}},unsubscribe:function(){if(jQuery.atmosphere.requests.length>0){var b=[].concat(jQuery.atmosphere.requests);
for(var d=0;
d<b.length;
d++){var c=b[d];
c.disconnect();
c.close();
clearTimeout(c.response.request.id)
}}jQuery.atmosphere.requests=[];
jQuery.atmosphere.callbacks=[]
},unsubscribeUrl:function(c){var b=-1;
if(jQuery.atmosphere.requests.length>0){for(var e=0;
e<jQuery.atmosphere.requests.length;
e++){var d=jQuery.atmosphere.requests[e];
if(d.getUrl()==c){d.disconnect();
d.close();
clearTimeout(d.response.request.id);
b=e;
break
}}}if(b>=0){jQuery.atmosphere.requests.splice(b,1)
}},publish:function(c){if(typeof(c.callback)=="function"){jQuery.atmosphere.addCallback(callback)
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
if(typeof b=="function"){b.apply(window.console,c)
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
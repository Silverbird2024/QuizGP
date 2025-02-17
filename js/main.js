var NeoApp=angular.module("NeoApp",["ngAnimate","ngRoute","ngSanitize","ngTouch","ui.bootstrap"],function($interpolateProvider){$interpolateProvider.startSymbol("[");$interpolateProvider.endSymbol("]");});NeoApp.config(["$routeProvider",function($routeProvider,$scope,$rootScope){$routeProvider.when("/Home",{templateUrl:"Home",controller:"Home_Ctrl"});$routeProvider.when("/LandingPage",{templateUrl:"LandingPage",controller:"LandingPage_Ctrl"});$routeProvider.when("/Page01",{templateUrl:"Page01",controller:"Page01_Ctrl"});$routeProvider.when("/Page02",{templateUrl:"Page02",controller:"Page02_Ctrl"});$routeProvider.when("/Page03",{templateUrl:"Page03",controller:"Page03_Ctrl"});$routeProvider.when("/Page04",{templateUrl:"Page04",controller:"Page04_Ctrl"});$routeProvider.when("/Page05",{templateUrl:"Page05",controller:"Page05_Ctrl"});$routeProvider.when("/Page06",{templateUrl:"Page06",controller:"Page06_Ctrl"});$routeProvider.when("/Page07",{templateUrl:"Page07",controller:"Page07_Ctrl"});$routeProvider.when("/Page08",{templateUrl:"Page08",controller:"Page08_Ctrl"});$routeProvider.when("/Page09",{templateUrl:"Page09",controller:"Page09_Ctrl"});$routeProvider.when("/Page10",{templateUrl:"Page10",controller:"Page10_Ctrl"});$routeProvider.when("/Page11",{templateUrl:"Page11",controller:"Page11_Ctrl"});$routeProvider.when("/Page12",{templateUrl:"Page12",controller:"Page12_Ctrl"});$routeProvider.otherwise({redirectTo:"/Home"});}]);NeoApp.filter("checkmark",function(){return function(input){return input?"\u2713":"\u2718";};});NeoApp.filter("element",function(){return function(input,idx1,idx2){idx1=idx1||0;if(input&&input.constructor===Array){if(idx2){return input[idx1,idx2];}else{return input[idx1];};};return"";};});NeoApp.filter("string",function(){return function(input){if(input&&input.constructor===Array)return input.toString();if(input)return input;return"";};});NeoApp.filter("default",function(){return function(input,defValue){if(!input)return defValue;return input;};});NeoApp.filter("trustUrl",function($sce){return function(url){return $sce.trustAsResourceUrl(url);};});NeoApp.filter('bool',function(){return function(input,valueTrue,valueFalse){return input!==true?valueFalse:valueTrue;};});NeoApp.filter('splitLt',function(){return function(str,delimeter){var p=str.indexOf(delimeter);return(p>-1)?str.substring(0,p):str;};});NeoApp.filter('splitRt',function(){return function(str,delimeter){var p=str.indexOf(delimeter);return(p>-1)?str.substring(p+1):str;};});NeoApp.controller("NeoApp_CoreCtrl",function($scope,$rootScope,$location,$route,$modal,$window,$timeout,$interval,$http,$filter,$compile,$animate){$App=$rootScope;$App.$on("$locationChangeStart",function(event,newUrl,oldUrl){var newPg=newUrl.substr(newUrl.lastIndexOf("/")+1);var oldPg=oldUrl.substr(oldUrl.lastIndexOf("/")+1);if(newPg=="!"){event.preventDefault();};if(newPg=="Home"){$timeout($scope.Home_pageenter);};});
$scope.SetError=function(msg){throw msg;};$scope.Refresh=function(){$timeout(angular.noop);};$scope.AddFont=function(fontName,fontPath){neotempstyle=document.createElement("style");var position=fontPath.lastIndexOf("/");if(position!=-1){position++;}else{position=0;}var extPosition=fontPath.lastIndexOf(".");extPosition++;var extension=fontPath.substr(extPosition);if(extension=="ttf"){extension="truetype";}if(window.location.href.indexOf("file://")!=-1){neotempstyle.textContent='@font-face{font-family: "'+fontName+'";src: url("'+fontPath+'") format("'+extension+'");}';}else{fontPath=fontPath.substr(position);neotempstyle.textContent='@font-face{font-family: "'+fontName+'";src: url("./fonts/'+fontPath+'") format("'+extension+'");}';}document.head.append(neotempstyle);};$scope.GetOrientation=function(){if($window.orientation){if(Math.abs(window.orientation)===90){return"Landscape";}else{return"Portrait";}}else{if($window.innerWidth>=$window.innerHeight){return"Landscape";}else{return"Portrait";}}};$scope.GotoPageNum=function(pgNum){if(pgNum>0&&pgNum<=$App.NAB.PageList.length){if($App.NAB.PageEnterEffect[pgNum-1]){$App.NAB._pageEffect=" animate enter-"+$App.NAB.PageEnterEffect[pgNum-1]+" exit-"+($App.NAB.PageExitEffect[pgNum-1]||"fadeOut");}else{$App.NAB._pageEffect="";}$timeout(function(){$location.path('/'+$App.NAB.PageList[pgNum-1]);});}else{$scope.SetError('Invalid page.');}};$scope.GotoPage=function(pgId){$scope.GotoPageNum($App.NAB.PageList.indexOf(pgId)+1);};$scope.GotoFirstPage=function(){$scope.GotoPageNum(1);};$scope.GotoLastPage=function(){$scope.GotoPageNum($App.NAB.PageList.length);};$scope.GotoNextPage=function(){var pgNum=$App.NAB.PageNumber;if(pgNum<$App.NAB.PageList.length){$scope.GotoPageNum(pgNum+1);return true;}return false;};$scope.GotoPrevPage=function(){var pgNum=$App.NAB.PageNumber;if(pgNum>1){$scope.GotoPageNum(pgNum-1);return true;}return false;};function makeSVG(tag,attrs){var el=document.createElementNS('http://www.w3.org/2000/svg',tag);for(var k in attrs)el.setAttribute(k,attrs[k]);return el;};function addSvgNode(objId,svgNode){if(document.getElementById(objId).tagName=="svg"){document.getElementById(objId).appendChild(svgNode);}else{document.getElementById(objId).getElementsByTagName('svg')[0].appendChild(svgNode);}};$scope.DrawCircle=function DrawCircle(objId,svgName,cx,cy,circleRadio,strokeColor,strokeWidth,fillColor){$App[svgName]=makeSVG('circle',{'id':svgName,'VisualNEOWebName':svgName,'cx':cx,'cy':cy,'r':circleRadio,'stroke':strokeColor,'stroke-width':strokeWidth,'fill':fillColor});addSvgNode(objId,$App[svgName]);};$scope.DrawEllipse=function DrawEllipse(objId,svgName,cx,cy,rx,ry,strokeColor,strokeWidth,fillColor){$App[svgName]=makeSVG('ellipse',{'id':svgName,'VisualNEOWebName':svgName,'cx':cx,'cy':cy,'rx':rx,'ry':ry,'stroke':strokeColor,'stroke-width':strokeWidth,'fill':fillColor});addSvgNode(objId,$App[svgName]);};$scope.DrawRect=function DrawRect(objId,svgName,posx,posy,width,height,strokeColor,strokeWidth,fillColor){$App[svgName]=makeSVG('rect',{'id':svgName,'VisualNEOWebName':svgName,'x':posx,'y':posy,'width':width,'height':height,'stroke':strokeColor,'stroke-width':strokeWidth,'fill':fillColor});addSvgNode(objId,$App[svgName]);};$scope.DrawPolygon=function DrawPolygon(objId,svgName,points,strokeColor,strokeWidth,fillColor){$App[svgName]=makeSVG('polygon',{'id':svgName,'VisualNEOWebName':svgName,'points':points,'stroke':strokeColor,'stroke-width':strokeWidth,'fill':fillColor});addSvgNode(objId,$App[svgName]);};$scope.DrawPath=function DrawPath(objId,svgName,path,strokeColor,strokeWidth,fillColor){$App[svgName]=makeSVG('path',{'id':svgName,'VisualNEOWebName':svgName,'d':path,'stroke':strokeColor,'stroke-width':strokeWidth,'fill':fillColor});addSvgNode(objId,$App[svgName]);};$scope.DrawPolyLine=function DrawPolyLine(objId,svgName,points,strokeColor,strokeWidth){$App[svgName]=makeSVG('polyline',{'id':svgName,'VisualNEOWebName':svgName,'points':points,'stroke':strokeColor,'stroke-width':strokeWidth,'fill':'none'});addSvgNode(objId,$App[svgName]);};$scope.DrawLine=function DrawLine(objId,svgName,x1,y1,x2,y2,strokeColor,strokeWidth){$App[svgName]=makeSVG('line',{'id':svgName,'VisualNEOWebName':svgName,'x1':x1,'y1':y1,'x2':x2,'y2':y2,'stroke':strokeColor,'stroke-width':strokeWidth});addSvgNode(objId,$App[svgName]);};$scope.DrawImage=function DrawImage(objId,svgName,fileName,x,y,width,height){$App[svgName]=makeSVG('image',{'id':svgName,'VisualNEOWebName':svgName,'x':x,'y':y,'width':width,'height':height,'xlink:href':''});$App[svgName].setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",""+fileName+"");addSvgNode(objId,$App[svgName]);};$scope.DrawText=function DrawText(objId,svgName,theText,posx,posy,fillColor,fontSize,fontFamily,angle){$App[svgName]=makeSVG('text',{'id':svgName,'VisualNEOWebName':svgName,'x':posx,'y':posy,'stroke-width':0,'fill':fillColor,'font-size':fontSize,'font-family':fontFamily,'transform':'rotate('+angle+' '+posx+' '+posy+')'});$App[svgName].textContent=theText;addSvgNode(objId,$App[svgName]);};$scope.DrawClear=function DrawClear(objId){var n=0;$("#"+objId).children().each(function(){if(n!=0){$(this).remove();}n++;});};$scope.OnMouseEvent=function(objId,eventName,subroutine){if(eventName=="contextmenu"){if($App.NAB[objId]){$App.NAB[objId].on(eventName,function(e){e.preventDefault();subroutine;return;});}$("#"+objId).on(eventName,function(e){e.preventDefault();subroutine;return;});}if($App.NAB[objId]){$App.NAB[objId].on(eventName,subroutine);return;}$("#"+objId).on(eventName,subroutine);};$scope.RemoveOnMouseEvent=function(objId,eventName){if($App.NAB[objId]){$App.NAB[objId].off(eventName);return;}$("#"+objId).off(eventName);};$scope.OnTouchEvent=function(objId,eventName,subroutine){if($App.NAB[objId]){$App.NAB[objId].on(eventName,subroutine);return;}$("#"+objId).on(eventName,subroutine);};$scope.RemoveOnTouchEvent=function(objId,eventName){if($App.NAB[objId]){$App.NAB[objId].off(eventName);return;}$("#"+objId).off(eventName);};$scope.ShowObject=function(objId,effect,speed){if($App.NAB[objId]){$App.NAB[objId].show(speed);return;}if(!effect||effect.toLowerCase()=='none'){$App.NAB[objId+'_effect']='';}else{if(speed)effect=effect+' speed-'+speed*50;$App.NAB[objId+'_effect']='animate enter-'+effect;}$timeout(function(){var name=objId+'_hidden';if($App.NAB[name])delete $App.NAB[name];});};$scope.HideObject=function(objId,effect,speed){if($App.NAB[objId]){$App.NAB[objId].hide(speed);return;}if(!effect||effect.toLowerCase()=='none'){$App.NAB[objId+'_effect']='';}else{if(speed)effect=effect+' speed-'+speed*50;$App.NAB[objId+'_effect']='animate exit-'+effect;}$timeout(function(){$App.NAB[objId+'_hidden']=true;});};$scope.DisableObject=function(objId,value){var name=objId+'_disabled';if(value){$App.NAB[name]=value;}else{if($App.NAB[name])delete $App.NAB[name];}};$scope.ClipObjectPolygon=function(objId,polygonId){var points=$("#"+polygonId).html();points=points.replace('<polygon vector-effect="non-scaling-stroke" points="',"");points=points.replace('"></polygon>','');coords=points.split(",");var puntos="";for(i=0;i<coords.length;i=i+2){if(i!=coords.length-2){puntos=puntos+coords[i]+"px "+coords[i+1]+"px,";}else{puntos=puntos+coords[i]+"px "+coords[i+1]+"px";}}$("#"+objId).css("clip-path","polygon("+puntos+")");};$scope.ClipObjectPath=function(objId,shape){if(shape=="circle"){$("#"+objId).css("clip-path","circle(50% at 50% 50%)");}else if(shape=="triangle"){$("#"+objId).css("clip-path","polygon(50% 0%, 0% 100%, 100% 100%)");}else if(shape=="rhombus"){$("#"+objId).css("clip-path","polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)");}else if(shape=="pentagon"){$("#"+objId).css("clip-path","polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)");}else{$("#"+objId).css("clip-path",shape);}};$scope.SetObjectStyle=function(objId,selector,value){if($App.NAB[objId]){$App.NAB[objId].css(selector,value);return;}if($App[objId]){$("#"+objId).css(selector,value);return;}var name=objId+'_style';if(!$App.NAB[name])$App.NAB[name]={};if(value&&value.length>0){$App.NAB[name][selector]=value;}else{if($App.NAB[name][selector])delete $App.NAB[name][selector];if(jQuery.isEmptyObject($App.NAB[name]))delete $App.NAB[name];}};$scope.ClearObjectStyles=function(objId){var name=objId+'_style';if($App.NAB[name])delete $App.NAB[name];};$scope.GetObjectInfo=function(objId,info){if($App.NAB[objId]){return $App.NAB[objId].css(info);}return $("#"+objId).css(info);};$scope.GetObjectXY=function(objId,xvar,yvar){var rect=document.getElementById($App.NAB.PageID).getBoundingClientRect();$App.PageLeft=rect.left;$App.PageTop=rect.top;var objeto=document.getElementById(objId).getBoundingClientRect();$App[xvar]=objeto.x-$App.PageLeft;$App[yvar]=objeto.y-$App.PageTop;};$scope.SetObjectHTML=function(objId,code){if($App.NAB[objId]){$App.NAB[objId].html(code);return;}var e=document.getElementById(objId);e.innerHTML=code;$compile(e)($scope);};$scope.GetObjectHTML=function(objId){if($App.NAB[objId]){return $App.NAB[objId].html();;}return document.getElementById(objId).innerHTML;};$scope.SetObjectAttribute=function(objId,AttrName,AttrValue){var element=$("#"+objId);if(AttrName==="src"){AttrName="ng-src";}var pendingChanges=$App.NAB['pendingChanges']||{};pendingChanges[objId]=pendingChanges[objId]||[];pendingChanges[objId].push({AttrName,AttrValue});$App.NAB['pendingChanges']=pendingChanges;$scope.applyPendingChanges();};$scope.applyPendingChanges=function(){var pendingChanges=$App.NAB['pendingChanges'];if(!pendingChanges||jQuery.isEmptyObject(pendingChanges)){return;}Object.keys(pendingChanges).forEach(function(objId){var element=$("#"+objId);if(element.length>0){pendingChanges[objId].forEach(function(change){element.attr(change.AttrName,change.AttrValue);$compile(element)($scope);});}});};$scope.GetObjectAttribute=function(objId,AttrName){if($App.NAB[objId]){return $App.NAB[objId].attr(AttrName);}return $("#"+objId).attr(AttrName);};$scope.SetObjectText=function(objId,code){if($App.NAB[objId]){$App.NAB[objId].text(code);return;}var e=document.getElementById(objId);e.innerText=code;$compile(e)($scope);};$scope.GetObjectText=function(objId){if($App.NAB[objId]){return $App.NAB[objId].text();}return document.getElementById(objId).innerText;};$scope.DuplicateObject=function(objId,objName,containerId){if($App.NAB[objName]){$App.NAB[objName].remove();delete $App.NAB[objName];}else{$("#"+objName).remove();delete $App.NAB[objName];}if($App.NAB[objId]){$App.NAB[objName]=$App.NAB[objId].clone().appendTo("#"+containerId);}else if($App[objId]){$App.NAB[objName]=$("#"+objId).clone().appendTo("#"+containerId);$App.NAB[objName].attr("id","");}else{$App.NAB[objName]=$("#"+objId).clone().appendTo("#"+containerId);}$App.NAB[objName].attr("VisualNEOWebName",objName);$App.NAB[objName].attr("ng-style","NAB."+objName+"_style");$App.NAB[objName].attr("ng-hide","NAB."+objName+"_hidden");$App.NAB[objName].attr("ng-disabled","NAB."+objName+"_disabled");var e=document.getElementById(containerId);$compile(e)($scope);};$scope.DuplicateObjectEx=function(objId,objName,containerId,objStyle){if($App.NAB[objName]){$App.NAB[objName].remove();delete $App.NAB[objName];}else{$("#"+objName).remove();delete $App.NAB[objName];}if($App.NAB[objId]){$App.NAB[objName]=$App.NAB[objId].clone().appendTo("#"+containerId);}else if($App[objId]){$App.NAB[objName]=$("#"+objId).clone().appendTo("#"+containerId);$App.NAB[objName].attr("id","");}else{$App.NAB[objName]=$("#"+objId).clone().appendTo("#"+containerId);$App.NAB[objName].attr("id",objName);$App.NAB[objName].atyle=document.getElementById(objId).style;}$App.NAB[objName].attr("VisualNEOWebName",objName);$App.NAB[objName].attr("ng-style","NAB."+objName+"_style");$App.NAB[objName].attr("ng-hide","NAB."+objName+"_hidden");$App.NAB[objName].attr("ng-disabled","NAB."+objName+"_disabled");$App.NAB[objName].attr("style",objStyle);var e=document.getElementById(containerId);$compile(e)($scope);};$scope.AnimateObjectCSS=function(objId,cssData,duration,delay,easing,callbackfn){if($App.NAB[objId]){$App.NAB[objId].delay(delay).animate(cssData,duration,easing,callbackfn);}else{$("#"+objId).delay(delay).animate(cssData,duration,easing,callbackfn);}};$scope.SetObjectCSS=function(objId,cssData){if($App.NAB[objId]){$App.NAB[objId].css(cssData);}else{$("#"+objId).css(cssData);}};$scope.CheckCollision=function(objId1,objId2){var x1=$("#"+objId1).offset().left;var y1=$("#"+objId1).offset().top;var h1=$("#"+objId1).outerHeight(true);var w1=$("#"+objId1).outerWidth(true);var b1=y1+h1;var r1=x1+w1;var x2=$("#"+objId2).offset().left;var y2=$("#"+objId2).offset().top;var h2=$("#"+objId2).outerHeight(true);var w2=$("#"+objId2).outerWidth(true);var b2=y2+h2;var r2=x2+w2;if(b1<y2||y1>b2||r1<x2||x1>r2){return false;}else{return true;}};$scope.CheckFullCollision=function(objId1,objId2){var r1=document.getElementById(rectone);var r2=document.getElementById(recttwo);var r1bb=r1.getBoundingClientRect();var r2bb=r2.getBoundingClientRect();var r1x=r1bb.x;var r1w=r1bb.width;var r1y=r1bb.y;var r1h=r1bb.height;var r2x=r2bb.x;var r2w=r2bb.width;var r2y=r2bb.y;var r2h=r2bb.height;if(r1x+1>=r2x&&r1y+1>=r2y&&r1x+r1w-1<=r2x+r2w&&r1y+r1h-1<=r2y+r2h){return true;}else{return false;}};function fixUnit(s){var t=s.toString();var parts=t.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/);return(parts[2])?t:parts[1]+'px';}$scope.SetObjectBounds=function(objId,l,t,w,h){if($App.NAB[objId]){var e=$App.NAB[objId];}else{var e=document.getElementById(objId);}if(w){w=fixUnit(w);e.style.width=w;$scope.SetObjectStyle(objId,'width',w);};if(h){h=fixUnit(h);e.style.height=h;$scope.SetObjectStyle(objId,'height',h);};if(l){l=fixUnit(l);e.style.left=l;$scope.SetObjectStyle(objId,'left',l);};if(t){t=fixUnit(t);e.style.top=t;$scope.SetObjectStyle(objId,'top',t);};};$scope.MoveObject=function(objId,left,top){if($App.NAB[objId]){$App.NAB[objId].css("left",left);$App.NAB[objId].css("top",top);}else{$scope.SetObjectBounds(objId,left,top);}};$scope.ObjectToFront=function(objId){if($App.NAB[objId]){theParent=$App.NAB[objId].parent();$App.NAB[objId].detach().appendTo(theParent);}else{theParent=$("#"+objId).parent();$("#"+objId).detach().appendTo(theParent);}};$scope.ObjectToBack=function(objId){if($App.NAB[objId]){theParent=$App.NAB[objId].parent();$App.NAB[objId].detach().prependTo(theParent);}else if($("#"+objId).parent().prop("tagName")=="svg"){theParent=$("#"+objId).parent().children().first();$("#"+objId).detach().insertAfter(theParent);}else{theParent=$("#"+objId).parent();$("#"+objId).detach().prependTo(theParent);}};$scope.SizeObject=function(objId,width,height){if($App.NAB[objId]){w=fixUnit(width);h=fixUnit(height);$App.NAB[objId].css("width",w);$App.NAB[objId].css("height",h);}else{$scope.SetObjectBounds(objId,null,null,width,height);}};$scope.RotateObject=function(objId,deg){if($App.NAB[objId]){$App.NAB[objId].css("webkitTransform","rotate("+deg+"deg)");$App.NAB[objId].css("mozTransform","rotate("+deg+"deg)");$App.NAB[objId].css("msTransform","rotate("+deg+"deg)");$App.NAB[objId].css("oTransform","rotate("+deg+"deg)");$App.NAB[objId].css("transform","rotate("+deg+"deg)");}else{var e=document.getElementById(objId);e.style.webkitTransform='rotate('+deg+'deg)';e.style.mozTransform='rotate('+deg+'deg)';e.style.msTransform='rotate('+deg+'deg)';e.style.oTransform='rotate('+deg+'deg)';e.style.transform='rotate('+deg+'deg)';};};$scope.ListBoxSort=function(objId){if($("#"+objId).children("option:selected").text()==""){$("#"+objId).children("option:selected").remove();};$("#"+objId+" option").filter(function(){return!this.value||$.trim(this.value).length==0||$.trim(this.text).length==0;}).remove();var options=$("#"+objId+" option");var arr=options.map(function(_,o){return{t:$(o).text(),v:o.value};}).get();arr.sort(function(o1,o2){return o1.t>o2.t?1:o1.t<o2.t?-1:0;});options.each(function(i,o){o.value=arr[i].v;$(o).text(arr[i].t);});if($("#"+objId).children("option:selected").text()==""){$("#"+objId).children("option:selected").remove();};};$scope.ListBoxMoveItem=function(listID,direction){var listbox=document.getElementById(listID);var selIndex=listbox.selectedIndex;if(-1==selIndex){return;}var increment=-1;if(direction=='up'){if(selIndex==1){return;}else{increment=-1;}}else{increment=1;}if((selIndex+increment)<0||(selIndex+increment)>(listbox.options.length-1)){return;}var selValue=listbox.options[selIndex].value;var selText=listbox.options[selIndex].text;listbox.options[selIndex].value=listbox.options[selIndex+increment].value
listbox.options[selIndex].text=listbox.options[selIndex+increment].text
listbox.options[selIndex+increment].value=selValue;listbox.options[selIndex+increment].text=selText;listbox.selectedIndex=selIndex+increment;};$scope.OpenDialog=function(dlgId){var modalInstance=$modal.open({templateUrl:dlgId,controller:dlgId+'_Ctrl',scope:$scope,size:'sm',backdrop:'static',animation:true});};$scope.AlertBox=function(dlgTitle,dlgMsg,dlgKind,callbackFn){detect1=dlgMsg.toLowerCase().search("<script");detect2=dlgMsg.toLowerCase().search("javascript:");detect3=dlgMsg.toLowerCase().search("onclick");detect4=dlgMsg.toLowerCase().search("onmouse");if(detect1!=-1||detect2!=-1||detect3!=-1||detect4!=-1){return;}var dlgKind=dlgKind||"primary";var modalInstance=$modal.open({template:'<div class="modal-dialog" ng-class="modal-sm">'+'<div class="modal-content">'+'<div class="modal-header bg-'+dlgKind+'">'+'<h4 class="modal-title">'+dlgTitle+'</h4>'+'</div>'+'<div class="modal-body">'+'<p>'+dlgMsg+'</p>'+'</div>'+'<div class="modal-footer">'+'<button class="btn btn-primary" ng-click="CloseDialog();">OK</button>'+'</div>'+'</div>'+'</div>',controller:'App_DlgCtrl',scope:$scope,size:'sm',backdrop:'static'});if(callbackFn!=undefined){modalInstance.result.then(function(){callbackFn()},function(){callbackFn()});}};$scope.AlertBoxEx=function(dlgTitle,dlgMsg,dlgKind,theWidth,theHeight,theColor,callbackFn){detect1=dlgMsg.toLowerCase().search("<script");detect2=dlgMsg.toLowerCase().search("javascript:");detect3=dlgMsg.toLowerCase().search("onclick");detect4=dlgMsg.toLowerCase().search("onmouse");if(detect1!=-1||detect2!=-1||detect3!=-1||detect4!=-1){return;}var dlgKind=dlgKind||"primary";if(theWidth<150){theWidth=150;}if(theHeight<200){theHeight=200;}var modalBodyMaxHeight=theHeight-140;var modalInstance=$modal.open({template:'<div class="modal-dialog" style="width:'+theWidth+'px;height:'+theHeight+'px;" ng-class="modal-sm">'+'<div class="modal-content">'+'<div style="background:'+theColor+';" class="modal-header bg-'+dlgKind+'">'+'<h4 class="modal-title">'+dlgTitle+'</h4>'+'</div>'+'<div style="overflow:auto;max-height:'+modalBodyMaxHeight+'px" class="modal-body">'+'<p>'+dlgMsg+'</p>'+'</div>'+'<div class="modal-footer">'+'<button class="btn btn-custom" style="color:#fff;background:'+theColor+';" ng-click="CloseDialog();">OK</button>'+'</div>'+'</div>'+'</div>',controller:'App_DlgCtrl',scope:$scope,size:'sm',backdrop:'static'});if(callbackFn!=undefined){modalInstance.result.then(function(){callbackFn()},function(){callbackFn()});}};$scope.MessageBoxEx=function(dlgTitle,dlgMsg,dlgButtons,dlgKind,theWidth,theHeight,theColor,callbackFn){detect1=dlgMsg.toLowerCase().search("<script");detect2=dlgMsg.toLowerCase().search("javascript:");detect3=dlgMsg.toLowerCase().search("onclick");detect4=dlgMsg.toLowerCase().search("onmouse");if(detect1!=-1||detect2!=-1||detect3!=-1||detect4!=-1){return;}if(theWidth<150){theWidth=150;}if(theHeight<200){theHeight=200;}var modalBodyMaxHeight=theHeight-140;var idx;var btns=dlgButtons.split("|");var btnsHTML='';for(idx=0;idx<btns.length;idx++){btnsHTML+='<button class="btn btn-custom" style="color:#fff;background:'+theColor+';" ng-click="CloseDialogBtn('+idx.toString()+');">'+btns[idx]+'</button>';}var dlgKind=dlgKind||"primary";var modalInstance=$modal.open({template:'<div class="modal-dialog" style="width:'+theWidth+'px;height:'+theHeight+'px;" ng-class="modal-sm">'+'<div class="modal-content">'+'<div style="background:'+theColor+';" class="modal-header bg-'+dlgKind+'">'+'<h4 class="modal-title">'+dlgTitle+'</h4>'+'</div>'+'<div style="overflow:auto;max-height:'+modalBodyMaxHeight+'px" class="modal-body">'+'<p>'+dlgMsg+'</p>'+'</div>'+'<div class="modal-footer">'+btnsHTML+'</div>'+'</div>'+'</div>',controller:'App_DlgCtrl',scope:$scope,size:'sm',backdrop:'static'});if(callbackFn){modalInstance.result.then(function(value){callbackFn(value+1)},function(){callbackFn(0)});}};$scope.MessageBox=function(dlgTitle,dlgMsg,dlgButtons,dlgKind,callbackFn){detect1=dlgMsg.toLowerCase().search("<script");detect2=dlgMsg.toLowerCase().search("javascript:");detect3=dlgMsg.toLowerCase().search("onclick");detect4=dlgMsg.toLowerCase().search("onmouse");if(detect1!=-1||detect2!=-1||detect3!=-1||detect4!=-1){return;}var idx;var btns=dlgButtons.split("|");var btnsHTML='';for(idx=0;idx<btns.length;idx++){btnsHTML+='<button class="btn btn-primary" ng-click="CloseDialogBtn('+idx.toString()+');">'+btns[idx]+'</button>';}var dlgKind=dlgKind||"primary";var modalInstance=$modal.open({template:'<div class="modal-dialog" ng-class="modal-sm">'+'<div class="modal-content">'+'<div class="modal-header bg-'+dlgKind+'">'+'<h4 class="modal-title">'+dlgTitle+'</h4>'+'</div>'+'<div class="modal-body">'+'<p>'+dlgMsg+'</p>'+'</div>'+'<div class="modal-footer">'+btnsHTML+'</div>'+'</div>'+'</div>',controller:'App_DlgCtrl',scope:$scope,size:'sm',backdrop:'static'});if(callbackFn){modalInstance.result.then(function(value){callbackFn(value+1)},function(){callbackFn(0)});}};$scope.SerializeForm=function(formId){var form=document.getElementById(formId);if(!form||form.nodeName!=="FORM")return;var i,j,s,field,m,q=[];for(i=0;i<form.elements.length;i++){field=form.elements[i];if(field.name==="")continue;switch(field.nodeName){case'INPUT':switch(field.type){case'text':case'hidden':case'password':case'number':q.push(field.name+"="+encodeURIComponent(field.value));break;case'checkbox':if(angular.isElement(field)){m=angular.element(field).controller('ngModel');if(m){q.push(field.name+"="+encodeURIComponent(m.$modelValue));break;}}q.push(field.name+"="+encodeURIComponent(field.checked));break;case'radio':if(field.checked){q.push(field.name+"="+encodeURIComponent(field.value));}break;case'file':break;}break;case'TEXTAREA':q.push(field.name+"="+encodeURIComponent(field.value));break;case'SELECT':switch(field.type){case'select-one':q.push(field.name+"="+encodeURIComponent(field.value));break;case'select-multiple':s='';for(j=field.options.length-1;j>=0;j=j-1){if(field.options[j].selected){s+=','+encodeURIComponent(field.options[j].value);}}if(s.length>0)q.push(field.name+"="+s.substr(1));break;}break;}}return q.join("&");};$scope.SubmitForm=function(form,url,method,submitFn,successFn,failFn){var ok=true;if(submitFn){ok=submitFn();}if(ok&&form&&url&&method){var f=$scope.SerializeForm(form);$http({method:method,url:url,data:f,responseType:"text",headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then(function(response){if(successFn)successFn(response.data,response.status);},function(response){if(failFn)failFn(response.data,response.status);});}};$scope.FormSubmit=function(formulario,url){var neoApp=angular.element(document.getElementById("ng-view")).scope();var fnsubmit=neoApp[formulario+"_submit"];var fnsuccess=neoApp[formulario+"_success"];var fnfail=neoApp[formulario+"_fail"];neoApp.SubmitForm(formulario,url,'POST',fnsubmit,fnsuccess,fnfail);};$scope.FormReset=function(formulario){$("#"+formulario).trigger("reset");};$scope.SetCompVar=function(varname,varvalue){varname2="";vararray=varname.split("[");for(n=0;n<vararray.length;n++){vararray[n]=vararray[n].replace("]","");if($App[vararray[n]]!=undefined){varname2=varname2+$App[vararray[n]];}else{varname2=varname2+vararray[n];};};$App[varname2]=varvalue;};$scope.GetCompVar=function(varname,composedvar){varname2="";vararray=composedvar.split("[");for(n=0;n<vararray.length;n++){vararray[n]=vararray[n].replace("]","");if($App[vararray[n]]!=undefined){varname2=varname2+$App[vararray[n]];}else{varname2=varname2+vararray[n];};};$App[varname]=$App[varname2];};$scope.ArraySuffle=function(array,newArray){for(n=0;n<array.length;n++){newArray[n]=array[n];}var currentIndex=newArray.length,temporaryValue,randomIndex;while(0!==currentIndex){randomIndex=Math.floor(Math.random()*currentIndex);currentIndex-=1;temporaryValue=newArray[currentIndex];newArray[currentIndex]=newArray[randomIndex];newArray[randomIndex]=temporaryValue;}};$scope.ArrayCopy=function(a,start,len){if(a&&start>-1&&len>0)return a.slice(start,start+len);return[]};$scope.LoadGoogleFont=function(fontName){$("head").append("<link href='https://fonts.googleapis.com/css?family="+fontName+"' rel='stylesheet' type='text/css'>");};$scope.LocalFileToVar=function(inputFileName,resultVar,tipo){$App.NAB.temp=resultVar;var realInputFileName=$("#"+inputFileName).prop("for");var files=$('#'+realInputFileName).prop("files");for(var i=0,f;f=files[i];i++){var reader=new FileReader();reader.onload=(function(theFile,resultVar,callBackFunction){return function(e,resultVar){varName=$App.NAB.temp;$App[varName]=e.target.result;};})(f);if(tipo=="text"){reader.readAsText(f);}else if(tipo=="binary"){reader.readAsBinaryString(f);}else if(tipo=="base64"){reader.readAsDataURL(f);}else{reader.readAsArrayBuffer(f);}};};$scope.SvgToBase64=function(theContainer,theWidth,theHeight,theType,theQuality,resultVar,callbackFn){var tagName=$("#"+theContainer).prop("tagName").toLowerCase();if(tagName=="svg"){var svg=document.getElementById(theContainer);}else{var svg=document.querySelector("#"+theContainer+" svg");}var svgToBase64PngTemp=svg.outerHTML;tempWidth=svg.getAttribute("width");if(tempWidth==null){tempWidth=theWidth;}tempHeight=svg.getAttribute("height");if(tempHeight==null){tempHeight=theHeight;}svg.setAttribute("width",theWidth);svg.setAttribute("height",theHeight);var svgData=new XMLSerializer().serializeToString(svg);var canvas=document.createElement("canvas");canvas.width=theWidth;canvas.height=theHeight;var ctx=canvas.getContext("2d");var img=document.createElement("img");img.setAttribute("src","data:image/svg+xml;base64,"+btoa(svgData));img.onload=function(){ctx.drawImage(img,0,0);svg.setAttribute("width",tempWidth);svg.setAttribute("height",tempHeight);if(theType=="jpg"){$App[resultVar]=canvas.toDataURL("image/jpeg",theQuality);if(callbackFn!=""&&callbackFn!=null&&callbackFn!=undefined){callbackFn();}}else{$App[resultVar]=canvas.toDataURL("image/png");if(callbackFn!=""&&callbackFn!=null&&callbackFn!=undefined){callbackFn();}}};};$scope.ImgToBase64=function(theImg,theType,theQuality,resultVar){var img=document.querySelector("#"+theImg);const canvas=document.createElement('canvas');const ctx=canvas.getContext('2d');canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;ctx.drawImage(img,0,0);if(theType=="jpg"){$App[resultVar]=canvas.toDataURL('image/jpeg',theQuality);}else{$App[resultVar]=canvas.toDataURL('image/png');}};$scope.Base64ToLocalFile=function(dataurl,filename){var arr=dataurl.split(','),mime=arr[0].match(/:(.*?);/)[1],bstr=atob(arr[1]),n=bstr.length,u8arr=new Uint8Array(n);while(n--){u8arr[n]=bstr.charCodeAt(n);}theFile=new File([u8arr],filename,{type:mime});saveAs(theFile,filename);};$scope.ResizeDesktopWindow=function(theWidth,theHeight){if(window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true){window.resizeTo(theWidth,theHeight);}};$scope.FitAppToScreen=function(coverScreen,verticalAlign,horizontalAlign){$scope.AppPosition(verticalAlign,horizontalAlign);var ha=horizontalAlign.toUpperCase();var va=verticalAlign.toUpperCase();if(va=="MIDDLE"){va="CENTER"};fit(document.getElementById("ng-app"),{x:0,y:0,width:window.innerWidth,height:window.innerHeight},{cover:coverScreen,hAlign:fit[ha],vAlign:fit[va]});fit(document.getElementById("ng-app"),{x:0,y:0,width:window.innerWidth,height:window.innerHeight},{cover:coverScreen,hAlign:fit[ha],vAlign:fit[va]},function(transform){$App.NAB.AppScale=transform.scale});};$scope.IsInstalled=function(){if(window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true){return true;}else{return false;}};$scope.CenterApp=function(){$("body").css("position","absolute");$("body").css("top","0px");$("body").css("bottom","0px");$("body").css("left","0px");$("body").css("right","0px");$("body").css("margin","auto");$("body").css("margin","auto");};$scope.TopCenterApp=function(){$("body").css("position","absolute");$("body").css("top","0px!important");$("body").css("left","0px");$("body").css("right","0px");$("body").css("bottom","auto");$("body").css("margin","auto");};$scope.ScaleApp=function(thezoom){$App.NAB.AppScale=thezoom;$("#ng-app").css("transform-origin","50% 50%");$("#ng-app").css("transform","scale("+thezoom+","+thezoom+")");};$scope.AppPosition=function(vertical,horizontal){$('body').css("position","absolute");if(vertical=="top"){$('body').css("top","0px");$('body').css("bottom","auto");}else if(vertical=="bottom"){$('body').css("bottom","0px");$('body').css("top","auto");}else{$('body').css("bottom","0px");$('body').css("top","0px");}if(horizontal=="left"){$('body').css("left","0px");$('body').css("right","auto");}else if(horizontal=="right"){$('body').css("left","auto");$('body').css("right","0px");}else{$('body').css("left","0px");$('body').css("right","0px");}$('body').css("margin","auto");};$scope.SetResponsivePages=function(plarge,pmedium,psmall,pxsmall){if(matchMedia){const largedisp=window.matchMedia("(min-width: 1025px)");const mediumdisp=window.matchMedia("(min-width: 768px) and (max-width: 1024px)");const smalldisp=window.matchMedia("(min-width: 481px) and (max-width: 767px)");const verysmalldisp=window.matchMedia("(min-width: 320px) and (max-width: 480px)");funciones=angular.element(document.getElementById("ng-view")).scope();$("body").css("width","100%");$("body").css("height","100%");$("body").css("overflow-x","hidden");$("body").css("overflow-y","auto");largedisp.addListener(WidthChangeLarge);WidthChangeLarge(largedisp);mediumdisp.addListener(WidthChangeMedium);WidthChangeMedium(mediumdisp);smalldisp.addListener(WidthChangeSmall);WidthChangeSmall(smalldisp);verysmalldisp.addListener(WidthChangeVerySmall);WidthChangeVerySmall(verysmalldisp);function WidthChangeLarge(largedisp){if(largedisp.matches){funciones.GotoPage(plarge);}};function WidthChangeMedium(mediumdisp){if(mediumdisp.matches){funciones.GotoPage(pmedium);}};function WidthChangeSmall(smalldisp){if(smalldisp.matches){funciones.GotoPage(psmall);}};function WidthChangeVerySmall(verysmalldisp){if(verysmalldisp.matches){funciones.GotoPage(pxsmall);}};}};$scope.AppBackgroundColor=function(thecolor){$("html").css("background",thecolor);};$scope.AppBackgroundImage=function(imagen){ruta=$("#"+imagen).attr('src');$("html").css('background-image','url('+ruta+' )');$("html").css('background-repeat','no-repeat');$("html").css('background-position','center center');$("html").css('background-attachment','fixed');$("html").css("-webkit-background-size","cover");$("html").css("-moz-background-size","cover");$("html").css("-o-background-size","cover");$("html").css("background-size","cover");};$scope.ObjDisableSelection=function(objectname){$("#"+objectname).css("-webkit-touch-callout","none");$("#"+objectname).css("-webkit-user-select","none");$("#"+objectname).css("-khtml-user-select","none");$("#"+objectname).css("-moz-user-select","none");$("#"+objectname).css("-ms-user-select","none");$("#"+objectname).css("user-select","none");};$scope.DisableSelection=function(){$("*").css("-webkit-touch-callout","none");$("*").css("-webkit-user-select","none");$("*").css("-khtml-user-select","none");$("*").css("-moz-user-select","none");$("*").css("-ms-user-select","none");$("*").css("user-select","none");};$scope.GetUrlParameter=function(param){url=window.location.href;var queryString=url?url.split('?')[1]:window.location.search.slice(1);var obj={};if(queryString){queryString=queryString.split('#')[0];var arr=queryString.split('&');for(var i=0;i<arr.length;i++){var a=arr[i].split('=');var paramName=a[0];var paramValue=typeof(a[1])==='undefined'?true:a[1];if(typeof paramValue==='string')paramValue=paramValue;if(paramName.match(/\[(\d+)?\]$/)){var key=paramName.replace(/\[(\d+)?\]/,'');if(!obj[key])obj[key]=[];if(paramName.match(/\[\d+\]$/)){var index=/\[(\d+)\]/.exec(paramName)[1];obj[key][index]=paramValue;}else{obj[key].push(paramValue);}}else{if(!obj[paramName]){obj[paramName]=paramValue;}else if(obj[paramName]&&typeof obj[paramName]==='string'){obj[paramName]=[obj[paramName]];obj[paramName].push(paramValue);}else{obj[paramName].push(paramValue);}}}}return obj[param];};$scope.csvToJSON=function(mycsv,separator,jsonObject){var lines=$App[mycsv].split("\n");var result=[];var headers=lines[0].split(separator);for(var i=1;i<lines.length;i++){var obj={};var currentline=lines[i].split(separator);for(var j=0;j<headers.length;j++){obj[headers[j]]=currentline[j];}result.push(obj);}$App[jsonObject]=result;};$scope.CheckInternetConnection=function(url,timeout,successFn,errorFn){$.ajax({url:url,timeout:timeout,cache:false,success:function(){if(successFn!=undefined){successFn();}},error:function(){if(errorFn!=undefined){errorFn();}},});};$scope.SetRelativePosition=function(objectname,vertical,horizontal){$("#"+objectname).css("position","absolute");if(vertical=="top"){$("#"+objectname).css("top","0px");$("#"+objectname).css("bottom","auto");}else if(vertical=="bottom"){$("#"+objectname).css("bottom","0px");$("#"+objectname).css("top","auto");}else{$("#"+objectname).css("bottom","0px");$("#"+objectname).css("top","0px");}if(horizontal=="left"){$("#"+objectname).css("left","0px");$("#"+objectname).css("right","auto");}else if(horizontal=="right"){$("#"+objectname).css("left","auto");$("#"+objectname).css("right","0px");}else{$("#"+objectname).css("left","0px");$("#"+objectname).css("right","0px");}$("#"+objectname).css("margin","auto");};$scope.WatchVar=function(varName,fn){if($App.NAB.$Watches[varName]){if($App.NAB.$Watches[varName].deRegFn)$App.NAB.$Watches[varName].deRegFn();delete $App.NAB.$Watches[varName];};if(fn){$App.NAB.$Watches[varName]={id:varName,deRegFn:undefined};$App.NAB.$Watches[varName].deRegFn=$scope.$watch(varName,function(newVal,oldVal){if(oldVal!==newVal)fn(newVal,oldVal);});};};$scope.TimerStart=function(objId,ms){if($App.NAB.$Timers[objId]){if(!angular.isDefined($App.NAB.$Timers[objId].promise)){$App.NAB.$Timers[objId].stime=Date.now();$App.NAB.$Timers[objId].promise=$interval($App.NAB.$Timers[objId].fn,ms||1000);}}else throw'A timer named "'+objId+'" does not exist.';};$scope.TimerStop=function(objId){if($App.NAB.$Timers[objId]){if(angular.isDefined($App.NAB.$Timers[objId].promise)){$interval.cancel($App.NAB.$Timers[objId].promise);$App.NAB.$Timers[objId].promise=undefined;}}else throw'A timer named "'+objId+'" does not exist.';};$scope._DeleteSound=function(sname){if($App.NAB.$Audio[sname]){$App.NAB.$Audio[sname].player.pause();delete $App.NAB.$Audio[sname].player;delete $App.NAB.$Audio[sname];return true;}return false;};$scope.PlaySound=function(fname,loop){var sname=ExtractFileName(fname).toLowerCase();if($App.NAB.$Audio[sname])throw'A sound named "'+sname+'" is already playing.';var devicePlatform=(typeof device!=='undefined'&&device.platform)?device.platform:null;if(typeof Audio!=="undefined"&&devicePlatform===null){obj={id:sname,kind:"audio",player:new Audio(fname)};obj.player.addEventListener("ended",function(){$scope._DeleteSound(sname);});}else if(devicePlatform){if(devicePlatform==='Android'){if(!IsUrl(fname))fname='/android_asset/www/'+fname;}obj={id:sname,kind:"media",player:new Media(fname,function onSuccess(){$scope._DeleteSound(sname);},function onError(e){console.log("Error playing sound: "+JSON.stringify(e));$scope._DeleteSound(sname);})};}else throw'Sound API unavailable.';$App.NAB.$Audio[sname]=obj;if(obj.kind==="audio"){obj.player.loop=loop;obj.player.play();}else obj.player.play({numberOfLoops:loop});};$scope.StopSound=function(fname){if(!fname||fname.length===0){for(var id in $App.NAB.$Audio)$scope._DeleteSound(id);}else{var sname=ExtractFileName(fname).toLowerCase();if(!$scope._DeleteSound(sname))throw'There is no playing sound named "'+sname+'"';}};$scope.CreateVideoPlayer=function(objId,fname,controls,autoplay,looping,muted){var sname=ExtractFileName(fname).toLowerCase();if(controls){addcontrols="controls";}else{addcontrols="";}if(autoplay){addautoplay="autoplay";}else{addautoplay="";}if(looping){addloop="loop";}else{addloop="";}if(muted){addmuted="muted";}else{addmuted="";}htmlstring='<video id="'+objId+'Video" width="100%" height="100%" '+addcontrols+' '+addautoplay+' '+addloop+' '+addmuted+'><source src="'+fname+'" type="video/mp4"></video>';$("#"+objId).html(htmlstring);};$scope.OnVideoEvent=function(objId,eventName,subroutine){if($App.NAB[objId+"Video"]){$App.NAB[objId+"Video"].on(eventName,subroutine);return;}$("#"+objId+"Video").on(eventName,subroutine);};$scope.CreateAudioPlayer=function(objId,fname,controls,autoplay,looping){var sname=ExtractFileName(fname).toLowerCase();if(controls){addcontrols="controls";}else{addcontrols="";}if(autoplay){addautoplay="autoplay";}else{addautoplay="";}if(looping){addloop="loop";}else{addloop="";}htmlstring='<audio id="'+objId+'Audio" width="100%" height="100%" '+addcontrols+' '+addautoplay+' '+addloop+'><source src="'+fname+'" type="audio/mp3"></audio>';$("#"+objId).html(htmlstring);};$scope.OnAudioEvent=function(objId,eventName,subroutine){if($App.NAB[objId+"Audio"]){$App.NAB[objId+"Audio"].on(eventName,subroutine);return;}$("#"+objId+"Audio").on(eventName,subroutine);};$scope.SoundBeep=function(){var snd=new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");snd.play();};var fit=function(){"use strict";function t(t){return t.toUpperCase()}function e(t){return"number"==typeof t&&!isNaN(t)}function n(){return(new Date).getTime()}function i(t,e){for(var n=[],i=0,r=t.length;r>i;i++)n[i]=e(t[i]);return n}function r(t,e){for(var n in e)n in t||(t[n]=e[n]);return t}function o(e){if(!d)for(var n,i=H(C.body),r=w,o=0,a=T.length;a>o&&(d=T[o],n=d+r,!(n in i))&&(d=d.replace(/^(\w)/,t),n=d+r,!(n in i));o++);return d+e}function a(t){var e=H(t),n=e[o(w)].replace(/[a-z()]/gi,"").split(",");if(n.length<6)return[1,0,0,1,0,0];for(var i=0;6>i;i++)n[i]=parseFloat(n[i]);return n}function f(t,e){var n=a(e);n[0]=t.scale,n[3]=t.scale,n[4]+=t.tx,n[5]+=t.ty;var r=i(n,function(t){return t.toFixed(6)});e.style[o(m)]="0 0",e.style[o(w)]="matrix("+r.join(",")+")"}function s(t,e){var n=H(e),i=parseFloat(n.left)||0,r=parseFloat(n.top)||0;"static"===n.position&&(e.style.position="relative"),e.style.left=i+t.tx+b,e.style.top=r+t.ty+b,e.style.height=t.height+b,e.style.width=t.width+b}function l(t,e){var n=H(e),i=parseFloat(n.marginLeft)||0,r=parseFloat(n.marginTop)||0;e.style.marginLeft=i+t.tx+b,e.style.marginTop=r+t.ty+b,e.style.height=t.height+b,e.style.width=t.width+b}function h(t,e){e.height*=t.scale,e.width*=t.scale,e.x+=t.tx,e.y+=t.ty}function u(t){if(t.nodeType&&1==t.nodeType){var n=t.getBoundingClientRect();t={height:t.offsetHeight,width:t.offsetWidth,x:n.left,y:n.top}}return!e(t.x)&&e(t.left)&&(t.x=t.left),!e(t.y)&&e(t.top)&&(t.y=t.top),t}function c(){var t=n(),e=t-y;if(x>=e)clearInterval(v),v=setTimeout(c,x-e);else{for(var i=0,r=M.length;r>i;i++)M[i]();y=t}}function g(t,e,n,i,r){var o=u(t),a=u(e),s=0===o.width?R:o.width,l=0===o.height?P:o.height,c=0===a.width?I:a.width,g=0===a.height?P:a.height;R=s,B=l,I=c,P=g;var p=c/s,d=g/l,y=s/l,v=c/g,x=n.cover?d:p,m=n.cover?p:d,w=y>=v?x:m,T=s*w,O=l*w,F=n.hAlign==E?.5*(T-c):n.hAlign==L?T-c:0,b=n.vAlign==E?.5*(O-g):n.vAlign==A?O-g:0;return r=r||{},r.tx=a.x-F-o.x,r.ty=a.y-b-o.y,r.x=a.x-F-o.x*w,r.y=a.y-b-o.y*w,r.height=o.height*w,r.width=o.width*w,r.scale=w,i?i(r,t):n.apply&&(i="undefined"!=typeof HTMLElement&&t instanceof HTMLElement?f:h)(r,t),r}function p(t,e,n,i){if(!t||!e)throw"You must supply a target and a container";"function"==typeof n&&(i=n,n={}),n=r(n||{},N);var o=g(t,e,n,i);return n.watch&&(M.length||(z.addEventListener?(z.addEventListener("resize",c),z.addEventListener("orientationchange",c)):(z.attachEvent("onresize",c),z.attachEvent("onorientationchange",c))),o.trigger=function(){g(t,e,n,i,o)},o.on=function(t){var e=M.indexOf(o.trigger);~e||M.push(o.trigger),t||o.trigger()},o.off=function(){var t=M.indexOf(o.trigger);~t&&M.splice(t,1)},o.on(!0)),o}var d,y,v,x=50,m="TransformOrigin",w="Transform",T="moz ms o webkit".split(" "),E="center",A="bottom",L="right",O="left",F="top",b="px",z=window||self,C=document,H=z.getComputedStyle,M=[],N={hAlign:E,vAlign:E,watch:!1,cover:!1,apply:!0};Array.prototype.indexOf||(Array.prototype.indexOf=function(t){for(var e=0;e<this.length;++e)if(this[e]==t)return e;return-1});var R,B,I,P;return r(p,{watching:M,defaults:N,cssTransform:f,cssPosition:s,cssMargin:l,CENTER:E,BOTTOM:A,RIGHT:L,LEFT:O,TOP:F})}();"undefined"!=typeof exports&&("undefined"!=typeof module&&module.exports&&(exports=module.exports=fit),exports.fit=fit);(function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],function($){return factory($)})}else if(typeof module==="object"&&typeof module.exports==="object"){exports=factory(require("jquery"))}else{factory(jQuery)}})(function($){$.easing.jswing=$.easing.swing;var pow=Math.pow,sqrt=Math.sqrt,sin=Math.sin,cos=Math.cos,PI=Math.PI,c1=1.70158,c2=c1*1.525,c3=c1+1,c4=2*PI/3,c5=2*PI/4.5;function bounceOut(x){var n1=7.5625,d1=2.75;if(x<1/d1){return n1*x*x}else if(x<2/d1){return n1*(x-=1.5/d1)*x+.75}else if(x<2.5/d1){return n1*(x-=2.25/d1)*x+.9375}else{return n1*(x-=2.625/d1)*x+.984375}}$.extend($.easing,{def:"easeOutQuad",swing:function(x){return $.easing[$.easing.def](x)},easeInQuad:function(x){return x*x},easeOutQuad:function(x){return 1-(1-x)*(1-x)},easeInOutQuad:function(x){return x<.5?2*x*x:1-pow(-2*x+2,2)/2},easeInCubic:function(x){return x*x*x},easeOutCubic:function(x){return 1-pow(1-x,3)},easeInOutCubic:function(x){return x<.5?4*x*x*x:1-pow(-2*x+2,3)/2},easeInQuart:function(x){return x*x*x*x},easeOutQuart:function(x){return 1-pow(1-x,4)},easeInOutQuart:function(x){return x<.5?8*x*x*x*x:1-pow(-2*x+2,4)/2},easeInQuint:function(x){return x*x*x*x*x},easeOutQuint:function(x){return 1-pow(1-x,5)},easeInOutQuint:function(x){return x<.5?16*x*x*x*x*x:1-pow(-2*x+2,5)/2},easeInSine:function(x){return 1-cos(x*PI/2)},easeOutSine:function(x){return sin(x*PI/2)},easeInOutSine:function(x){return-(cos(PI*x)-1)/2},easeInExpo:function(x){return x===0?0:pow(2,10*x-10)},easeOutExpo:function(x){return x===1?1:1-pow(2,-10*x)},easeInOutExpo:function(x){return x===0?0:x===1?1:x<.5?pow(2,20*x-10)/2:(2-pow(2,-20*x+10))/2},easeInCirc:function(x){return 1-sqrt(1-pow(x,2))},easeOutCirc:function(x){return sqrt(1-pow(x-1,2))},easeInOutCirc:function(x){return x<.5?(1-sqrt(1-pow(2*x,2)))/2:(sqrt(1-pow(-2*x+2,2))+1)/2},easeInElastic:function(x){return x===0?0:x===1?1:-pow(2,10*x-10)*sin((x*10-10.75)*c4)},easeOutElastic:function(x){return x===0?0:x===1?1:pow(2,-10*x)*sin((x*10-.75)*c4)+1},easeInOutElastic:function(x){return x===0?0:x===1?1:x<.5?-(pow(2,20*x-10)*sin((20*x-11.125)*c5))/2:pow(2,-20*x+10)*sin((20*x-11.125)*c5)/2+1},easeInBack:function(x){return c3*x*x*x-c1*x*x},easeOutBack:function(x){return 1+c3*pow(x-1,3)+c1*pow(x-1,2)},easeInOutBack:function(x){return x<.5?pow(2*x,2)*((c2+1)*2*x-c2)/2:(pow(2*x-2,2)*((c2+1)*(x*2-2)+c2)+2)/2},easeInBounce:function(x){return 1-bounceOut(1-x)},easeOutBounce:bounceOut,easeInOutBounce:function(x){return x<.5?(1-bounceOut(1-2*x))/2:(1+bounceOut(2*x-1))/2}})});function d(c){var b,a;if(!this.length)return this;b=this[0];b.ownerDocument?a=b.ownerDocument:(a=b,b=a.documentElement);if(null==c){if(!a.exitFullscreen&&!a.webkitExitFullscreen&&!a.webkitCancelFullScreen&&!a.msExitFullscreen&&!a.mozCancelFullScreen)return null;c=!!a.fullscreenElement||!!a.msFullscreenElement||!!a.webkitIsFullScreen||!!a.mozFullScreen;return!c?c:a.fullscreenElement||a.webkitFullscreenElement||a.webkitCurrentFullScreenElement||a.msFullscreenElement||a.mozFullScreenElement||c}c?(c=b.requestFullscreen||b.webkitRequestFullscreen||b.webkitRequestFullScreen||b.msRequestFullscreen||b.mozRequestFullScreen)&&c.call(b):(c=a.exitFullscreen||a.webkitExitFullscreen||a.webkitCancelFullScreen||a.msExitFullscreen||a.mozCancelFullScreen)&&c.call(a);return this}jQuery.fn.fullScreen=d;jQuery.fn.toggleFullScreen=function(){return d.call(this,!d.call(this))};var e,f,g;e=document;e.webkitCancelFullScreen?(f="webkitfullscreenchange",g="webkitfullscreenerror"):e.msExitFullscreen?(f="MSFullscreenChange",g="MSFullscreenError"):e.mozCancelFullScreen?(f="mozfullscreenchange",g="mozfullscreenerror"):(f="fullscreenchange",g="fullscreenerror");jQuery(document).bind(f,function(){jQuery(document).trigger(new jQuery.Event("fullscreenchange"))});jQuery(document).bind(g,function(){jQuery(document).trigger(new jQuery.Event("fullscreenerror"))});$scope.EnterFullScreen=function(){$(document).fullScreen(true);};$scope.ExitFullScreen=function(){$(document).fullScreen(false);};$scope.ObjectEnterFullScreen=function(ObjId){$("#"+ObjId).fullScreen(true);};$scope.ObjectExitFullScreen=function(ObjId){$("#"+ObjId).fullScreen(false);};var neoscript;$scope.AppOnKeyDown=function(callbackFn){$("body").keydown(function(evt){callbackFn(evt.which);});};(function(a,b){if("function"==typeof define&&define.amd)define([],b);else if("undefined"!=typeof exports)b();else{b(),a.FileSaver={exports:{}}.exports}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Depricated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(b,c,d){var e=new XMLHttpRequest;e.open("GET",b),e.responseType="blob",e.onload=function(){a(e.response,c,d)},e.onerror=function(){console.error("could not download file")},e.send()}function d(a){var b=new XMLHttpRequest;return b.open("HEAD",a,!1),b.send(),200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.saveAs||"object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(a,b,d,e){if(e=e||open("","_blank"),e&&(e.document.title=e.document.body.innerText="downloading..."),"string"==typeof a)return c(a,b,d);var g="application/octet-stream"===a.type,h=/constructor/i.test(f.HTMLElement)||f.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent);if((i||g&&h)&&"object"==typeof FileReader){var j=new FileReader;j.onloadend=function(){var a=j.result;a=i?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),e?e.location.href=a:location=a,e=null},j.readAsDataURL(a)}else{var k=f.URL||f.webkitURL,l=k.createObjectURL(a);e?e.location=l:location.href=l,e=null,setTimeout(function(){k.revokeObjectURL(l)},4E4)}};f.saveAs=a.saveAs=a,"undefined"!=typeof module&&(module.exports=a)});$scope.VarToFile=function(datavar,filename){var blob=new Blob([datavar],{type:"text/plain;charset=utf-8"});saveAs(blob,filename);};!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.mexp=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){var d=a("./postfix_evaluator.js");d.prototype.formulaEval=function(){"use strict";for(var a,b,c,d=[],e=this.value,f=0;f<e.length;f++)1===e[f].type||3===e[f].type?d.push({value:3===e[f].type?e[f].show:e[f].value,type:1}):13===e[f].type?d.push({value:e[f].show,type:1}):0===e[f].type?d[d.length-1]={value:e[f].show+("-"!=e[f].show?"(":"")+d[d.length-1].value+("-"!=e[f].show?")":""),type:0}:7===e[f].type?d[d.length-1]={value:(1!=d[d.length-1].type?"(":"")+d[d.length-1].value+(1!=d[d.length-1].type?")":"")+e[f].show,type:7}:10===e[f].type?(a=d.pop(),b=d.pop(),"P"===e[f].show||"C"===e[f].show?d.push({value:"<sup>"+b.value+"</sup>"+e[f].show+"<sub>"+a.value+"</sub>",type:10}):d.push({value:(1!=b.type?"(":"")+b.value+(1!=b.type?")":"")+"<sup>"+a.value+"</sup>",type:1})):2===e[f].type||9===e[f].type?(a=d.pop(),b=d.pop(),d.push({value:(1!=b.type?"(":"")+b.value+(1!=b.type?")":"")+e[f].show+(1!=a.type?"(":"")+a.value+(1!=a.type?")":""),type:e[f].type})):12===e[f].type&&(a=d.pop(),b=d.pop(),c=d.pop(),d.push({value:e[f].show+"("+c.value+","+b.value+","+a.value+")",type:12}));return d[0].value},b.exports=d},{"./postfix_evaluator.js":5}],2:[function(a,b,c){function d(a,b){for(var c=0;c<a.length;c++)a[c]+=b;return a}function e(a,b,c,d){for(var e=0;e<d;e++)if(a[c+e]!==b[e])return!1;return!0}var f=a("./math_function.js"),g=["sin","cos","tan","pi","(",")","P","C","asin","acos","atan","7","8","9","int","cosh","acosh","ln","^","root","4","5","6","/","!","tanh","atanh","Mod","1","2","3","*","sinh","asinh","e","log","0",".","+","-",",","Sigma","n","Pi","pow"],h=["sin","cos","tan","&pi;","(",")","P","C","asin","acos","atan","7","8","9","Int","cosh","acosh"," ln","^","root","4","5","6","&divide;","!","tanh","atanh"," Mod ","1","2","3","&times;","sinh","asinh","e"," log","0",".","+","-",",","&Sigma;","n","&Pi;","pow"],i=[f.math.sin,f.math.cos,f.math.tan,"PI","(",")",f.math.P,f.math.C,f.math.asin,f.math.acos,f.math.atan,"7","8","9",Math.floor,f.math.cosh,f.math.acosh,Math.log,Math.pow,Math.sqrt,"4","5","6",f.math.div,f.math.fact,f.math.tanh,f.math.atanh,f.math.mod,"1","2","3",f.math.mul,f.math.sinh,f.math.asinh,"E",f.math.log,"0",".",f.math.add,f.math.sub,",",f.math.sigma,"n",f.math.Pi,Math.pow],j={0:11,1:0,2:3,3:0,4:0,5:0,6:0,7:11,8:11,9:1,10:10,11:0,12:11,13:0},k=[0,0,0,3,4,5,10,10,0,0,0,1,1,1,0,0,0,0,10,0,1,1,1,2,7,0,0,2,1,1,1,2,0,0,3,0,1,6,9,9,11,12,13,12,8],l={0:!0,1:!0,3:!0,4:!0,6:!0,8:!0,9:!0,12:!0,13:!0},m={0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0,9:!0,10:!0,11:!0,12:!0,13:!0},n={0:!0,3:!0,4:!0,8:!0,12:!0,13:!0},o={},p={0:!0,1:!0,3:!0,4:!0,6:!0,8:!0,12:!0,13:!0},q={1:!0},r=[[],["1","2","3","7","8","9","4","5","6","+","-","*","/","(",")","^","!","P","C","e","0",".",",","n"],["pi","ln","Pi"],["sin","cos","tan","Del","int","Mod","log","pow"],["asin","acos","atan","cosh","root","tanh","sinh"],["acosh","atanh","asinh","Sigma"]];f.addToken=function(a){for(var b=0;b<a.length;b++){var c=a[b].token.length,d=-1;if(c<r.length)for(var e=0;e<r[c].length;e++)if(a[b].token===r[c][e]){d=g.indexOf(r[c][e]);break}d===-1?(g.push(a[b].token),k.push(a[b].type),r.length<=a[b].token.length&&(r[a[b].token.length]=[]),r[a[b].token.length].push(a[b].token),i.push(a[b].value),h.push(a[b].show)):(g[d]=a[b].token,k[d]=a[b].type,i[d]=a[b].value,h[d]=a[b].show)}},f.lex=function(a,b){"use strict";var c,s,t,u,v={value:f.math.changeSign,type:0,pre:21,show:"-"},w={value:")",show:")",type:5,pre:0},x={value:"(",type:4,pre:0,show:"("},y=[x],z=[],A=a,B=0,C=l,D=0,E=o,F="";"undefined"!=typeof b&&f.addToken(b);var G={};for(s=0;s<A.length;s++)if(" "!==A[s]){for(c="",t=A.length-s>r.length-2?r.length-1:A.length-s;t>0;t--)for(u=0;u<r[t].length;u++)e(A,r[t][u],s,t)&&(c=r[t][u],u=r[t].length,t=0);if(s+=c.length-1,""===c)throw new f.Exception("Can't understand after "+A.slice(s));var H,I=g.indexOf(c),J=c,K=k[I],L=i[I],M=j[K],N=h[I],O=y[y.length-1];for(H=z.length;H--&&0===z[H];)if([0,2,3,5,9,11,12,13].indexOf(K)!==-1){if(C[K]!==!0)throw new f.Exception(c+" is not allowed after "+F);y.push(w),C=m,E=p,d(z,-1).pop()}if(C[K]!==!0)throw new f.Exception(c+" is not allowed after "+F);if(E[K]===!0&&(K=2,L=f.math.mul,N="&times;",M=3,s-=c.length),G={value:L,type:K,pre:M,show:N},0===K)C=l,E=o,d(z,2).push(2),y.push(G),y.push(x);else if(1===K)1===O.type?(O.value+=L,d(z,1)):y.push(G),C=m,E=n;else if(2===K)C=l,E=o,d(z,2),y.push(G);else if(3===K)y.push(G),C=m,E=p;else if(4===K)B+=z.length,z=[],D++,C=l,E=o,y.push(G);else if(5===K){if(!D)throw new f.Exception("Closing parenthesis are more than opening one, wait What!!!");for(;B--;)y.push(w);B=0,D--,C=m,E=p,y.push(G)}else if(6===K){if(O.hasDec)throw new f.Exception("Two decimals are not allowed in one number");1!==O.type&&(O={value:0,type:1,pre:0},y.push(O),d(z,-1)),C=q,d(z,1),E=o,O.value+=L,O.hasDec=!0}else 7===K&&(C=m,E=p,d(z,1),y.push(G));8===K?(C=l,E=o,d(z,4).push(4),y.push(G),y.push(x)):9===K?(9===O.type?O.value===f.math.add?(O.value=L,O.show=N,d(z,1)):O.value===f.math.sub&&"-"===N&&(O.value=f.math.add,O.show="+",d(z,1)):5!==O.type&&7!==O.type&&1!==O.type&&3!==O.type&&13!==O.type?"-"===J&&(C=l,E=o,d(z,2).push(2),y.push(v),y.push(x)):(y.push(G),d(z,2)),C=l,E=o):10===K?(C=l,E=o,d(z,2),y.push(G)):11===K?(C=l,E=o,y.push(G)):12===K?(C=l,E=o,d(z,6).push(6),y.push(G),y.push(x)):13===K&&(C=m,E=p,y.push(G)),d(z,-1),F=c}for(H=z.length;H--&&0===z[H];)y.push(w),d(z,-1).pop();if(C[5]!==!0)throw new f.Exception("complete the expression");for(;D--;)y.push(w);return y.push(w),new f(y)},b.exports=f},{"./math_function.js":3}],3:[function(a,b,c){var d=function(a){this.value=a};d.math={isDegree:!0,acos:function(a){return d.math.isDegree?180/Math.PI*Math.acos(a):Math.acos(a)},add:function(a,b){return a+b},asin:function(a){return d.math.isDegree?180/Math.PI*Math.asin(a):Math.asin(a)},atan:function(a){return d.math.isDegree?180/Math.PI*Math.atan(a):Math.atan(a)},acosh:function(a){return Math.log(a+Math.sqrt(a*a-1))},asinh:function(a){return Math.log(a+Math.sqrt(a*a+1))},atanh:function(a){return Math.log((1+a)/(1-a))},C:function(a,b){var c=1,e=a-b,f=b;f<e&&(f=e,e=b);for(var g=f+1;g<=a;g++)c*=g;return c/d.math.fact(e)},changeSign:function(a){return-a},cos:function(a){return d.math.isDegree&&(a=d.math.toRadian(a)),Math.cos(a)},cosh:function(a){return(Math.pow(Math.E,a)+Math.pow(Math.E,-1*a))/2},div:function(a,b){return a/b},fact:function(a){if(a%1!==0)return"NaN";for(var b=1,c=2;c<=a;c++)b*=c;return b},inverse:function(a){return 1/a},log:function(a){return Math.log(a)/Math.log(10)},mod:function(a,b){return a%b},mul:function(a,b){return a*b},P:function(a,b){for(var c=1,d=Math.floor(a)-Math.floor(b)+1;d<=Math.floor(a);d++)c*=d;return c},Pi:function(a,b,c){for(var d=1,e=a;e<=b;e++)d*=Number(c.postfixEval({n:e}));return d},pow10x:function(a){for(var b=1;a--;)b*=10;return b},sigma:function(a,b,c){for(var d=0,e=a;e<=b;e++)d+=Number(c.postfixEval({n:e}));return d},sin:function(a){return d.math.isDegree&&(a=d.math.toRadian(a)),Math.sin(a)},sinh:function(a){return(Math.pow(Math.E,a)-Math.pow(Math.E,-1*a))/2},sub:function(a,b){return a-b},tan:function(a){return d.math.isDegree&&(a=d.math.toRadian(a)),Math.tan(a)},tanh:function(a){return d.sinha(a)/d.cosha(a)},toRadian:function(a){return a*Math.PI/180}},d.Exception=function(a){this.message=a},b.exports=d},{}],4:[function(a,b,c){var d=a("./lexer.js");d.prototype.toPostfix=function(){"use strict";for(var a,b,c,e,f,g=[],h=[{value:"(",type:4,pre:0}],i=this.value,j=1;j<i.length;j++)if(1===i[j].type||3===i[j].type||13===i[j].type)1===i[j].type&&(i[j].value=Number(i[j].value)),g.push(i[j]);else if(4===i[j].type)h.push(i[j]);else if(5===i[j].type)for(;4!==(b=h.pop()).type;)g.push(b);else if(11===i[j].type){for(;4!==(b=h.pop()).type;)g.push(b);h.push(b)}else{a=i[j],e=a.pre,f=h[h.length-1],c=f.pre;var k="Math.pow"==f.value&&"Math.pow"==a.value;if(e>c)h.push(a);else{for(;c>=e&&!k||k&&e<c;)b=h.pop(),f=h[h.length-1],g.push(b),c=f.pre,k="Math.pow"==a.value&&"Math.pow"==f.value;h.push(a)}}return new d(g)},b.exports=d},{"./lexer.js":2}],5:[function(a,b,c){var d=a("./postfix.js");d.prototype.postfixEval=function(a){"use strict";a=a||{},a.PI=Math.PI,a.E=Math.E;for(var b,c,e,f=[],g=this.value,h="undefined"!=typeof a.n,i=0;i<g.length;i++)1===g[i].type?f.push({value:g[i].value,type:1}):3===g[i].type?f.push({value:a[g[i].value],type:1}):0===g[i].type?"undefined"==typeof f[f.length-1].type?f[f.length-1].value.push(g[i]):f[f.length-1].value=g[i].value(f[f.length-1].value):7===g[i].type?"undefined"==typeof f[f.length-1].type?f[f.length-1].value.push(g[i]):f[f.length-1].value=g[i].value(f[f.length-1].value):8===g[i].type?(b=f.pop(),c=f.pop(),f.push({type:1,value:g[i].value(c.value,b.value)})):10===g[i].type?(b=f.pop(),c=f.pop(),"undefined"==typeof c.type?(c.value=c.concat(b),c.value.push(g[i]),f.push(c)):"undefined"==typeof b.type?(b.unshift(c),b.push(g[i]),f.push(b)):f.push({type:1,value:g[i].value(c.value,b.value)})):2===g[i].type||9===g[i].type?(b=f.pop(),c=f.pop(),"undefined"==typeof c.type?(console.log(c),c=c.concat(b),c.push(g[i]),f.push(c)):"undefined"==typeof b.type?(b.unshift(c),b.push(g[i]),f.push(b)):f.push({type:1,value:g[i].value(c.value,b.value)})):12===g[i].type?(b=f.pop(),"undefined"!=typeof b.type&&(b=[b]),c=f.pop(),e=f.pop(),f.push({type:1,value:g[i].value(e.value,c.value,new d(b))})):13===g[i].type&&(h?f.push({value:a[g[i].value],type:3}):f.push([g[i]]));if(f.length>1)throw new d.exception("Uncaught Syntax error");return f[0].value>1e15?"Infinity":parseFloat(f[0].value.toFixed(15))},d.eval=function(a,b,c){return"undefined"==typeof b?this.lex(a).toPostfix().postfixEval():"undefined"==typeof c?"undefined"!=typeof b.length?this.lex(a,b).toPostfix().postfixEval():this.lex(a).toPostfix().postfixEval(b):this.lex(a,b).toPostfix().postfixEval(c)},b.exports=d},{"./postfix.js":4}]},{},[1])(1)});$scope.Calculate=function(formula,decimals){var numero=mexp.eval(formula);if(decimals!=-1){potencia=Math.pow(10,decimals);numero=Math.round(numero*potencia)/potencia;}return numero;};$(document).mousemove(function(evt){if($App.NAB.AppScale==0){$App.NAB.AppScale=1;}var x=((evt.pageX-$('body').offset().left)+$(window).scrollLeft())/$App.NAB.AppScale;var y=((evt.pageY-$('body').offset().top)+$(window).scrollTop())/$App.NAB.AppScale;var sx=((evt.pageX+$(window).scrollLeft())/$App.NAB.AppScale);var sy=((evt.pageY+$(window).scrollTop())/$App.NAB.AppScale);$App.NAB.MouseX=Math.round(x);$App.NAB.MouseY=Math.round(y);$App.NAB.MouseScreenX=Math.round(sx);$App.NAB.MouseScreenY=Math.round(sy);});$(document).on("touchmove",function(evt){if($App.NAB.AppScale==0){$App.NAB.AppScale=1;}var x=((evt.touches[0].clientX-$('body').offset().left)+$(window).scrollLeft())/$App.NAB.AppScale;var y=((evt.touches[0].clientY-$('body').offset().top)+$(window).scrollTop())/$App.NAB.AppScale;$App.NAB.TouchX=Math.round(x);$App.NAB.TouchY=Math.round(y);});$(document).on("touchstart",function(evt){if($App.NAB.AppScale==0){$App.NAB.AppScale=1;}var x=((evt.touches[0].clientX-$('body').offset().left)+$(window).scrollLeft())/$App.NAB.AppScale;var y=((evt.touches[0].clientY-$('body').offset().top)+$(window).scrollTop())/$App.NAB.AppScale;$App.NAB.TouchX=Math.round(x);$App.NAB.TouchY=Math.round(y);});
$App.NAB={PageList:["Home","LandingPage","Page01","Page02","Page03","Page04","Page05","Page06","Page07","Page08","Page09","Page10","Page11","Page12"],PageEnterEffect:["","","fadeIn","fadeIn","fadeIn","fadeIn","fadeIn","fadeIn","fadeIn","fadeIn","fadeIn","fadeIn","fadeIn","fadeIn"],PageCount:14,PageExitEffect:["","","","","","","","","","","","","",""],PageNumber:1,AppScale:1,PageID:"",Hour:"",Hour24:"",Minute:"",Second:"",Time:"",Time24:"",DateShort:"",DateLong:"",DateFull:"",Month:"",MonthNum:"",WeekNum:"",Day:"",DayNum:"",Year:"",ClientWidth:$window.innerWidth,ClientHeight:$window.innerHeight,WindowWidth:$window.outerWidth,WindowHeight:$window.outerHeight,Orientation:$scope.GetOrientation(),OperatingSystem:"",$Watches:{},$Timers:{},$Audio:{}};$scope.__doUpdate=function(){var Now=new Date();$App.NAB.Hour=$filter("date")(Now,"h");$App.NAB.Hour24=$filter("date")(Now,"H");$App.NAB.Minute=$filter("date")(Now,"mm");$App.NAB.Second=$filter("date")(Now,"ss");$App.NAB.Time=$filter("date")(Now,"mediumTime");$App.NAB.Time24=$filter("date")(Now,"H:mm:ss");$App.NAB.DateShort=$filter("date")(Now,"shortDate");$App.NAB.DateLong=$filter("date")(Now,"longDate");$App.NAB.DateFull=$filter("date")(Now,"fullDate");$App.NAB.Month=$filter("date")(Now,"MMMM");$App.NAB.MonthNum=$filter("date")(Now,"M");$App.NAB.WeekNum=$filter("date")(Now,"w");$App.NAB.Day=$filter("date")(Now,"EEEE");$App.NAB.DayNum=$filter("date")(Now,"d");$App.NAB.Year=$filter("date")(Now,"yyyy");};$scope.__doOrientationChange=function(){$App.NAB.Orientation=$scope.GetOrientation();};$scope.__doResize=function(){$App.NAB.ClientWidth=$window.innerWidth;$App.NAB.ClientHeight=$window.innerHeight;$App.NAB.WindowWidth=$window.outerWidth;$App.NAB.WindowHeight=$window.outerHeight;};$scope.__init=function(){angular.element($window).bind("orientationchange.app",function(){$timeout($scope.__doOrientationChange);});angular.element($window).bind("resize.app",function(){$timeout($scope.__doResize);});$interval($scope.__doUpdate,1000);$App.NAB.OperatingSystem=GetPlatform();$scope.__doUpdate();};
$scope.Home_pageenter = function() {$scope.HideObject("show1","",0);
$scope.HideObject("show2","",0);
$scope.HideObject("show3","",0);
$scope.HideObject("show4","",0);
$scope.HideObject("show5","",0);
$scope.HideObject("show6","",0);
$scope.HideObject("show7","",0);
$scope.HideObject("show8","",0);
$scope.HideObject("show9","",0);
$scope.HideObject("show10","",0);
$scope.HideObject("show11","",0);
$scope.HideObject("show12","",0);
$scope.HideObject("show100","",0);
$App.question1 = localStorage.getItem("question1");
$App.option1a = localStorage.getItem("option1a");
$App.option1b = localStorage.getItem("option1b");
$App.option1c = localStorage.getItem("option1c");
$App.option1d = localStorage.getItem("option1d");
$App.option1e = localStorage.getItem("option1e");
$App.question2 = localStorage.getItem("question2");
$App.option2a = localStorage.getItem("option2a");
$App.option2b = localStorage.getItem("option2b");
$App.option2c = localStorage.getItem("option2c");
$App.option2d = localStorage.getItem("option2d");
$App.option2e = localStorage.getItem("option2e");
$App.question3 = localStorage.getItem("question3");
$App.option3a = localStorage.getItem("option3a");
$App.option3b = localStorage.getItem("option3b");
$App.option3c = localStorage.getItem("option3c");
$App.option3d = localStorage.getItem("option3d");
$App.option3e = localStorage.getItem("option3e");
$App.question4 = localStorage.getItem("question4");
$App.option4a = localStorage.getItem("option4a");
$App.option4b = localStorage.getItem("option4b");
$App.option4c = localStorage.getItem("option4c");
$App.option4d = localStorage.getItem("option4d");
$App.option4e = localStorage.getItem("option4e");
$App.question5 = localStorage.getItem("question5");
$App.option5a = localStorage.getItem("option5a");
$App.option5b = localStorage.getItem("option5b");
$App.option5c = localStorage.getItem("option5c");
$App.option5d = localStorage.getItem("option5d");
$App.option5e = localStorage.getItem("option5e");
$App.question6 = localStorage.getItem("question6");
$App.option6a = localStorage.getItem("option6a");
$App.option6b = localStorage.getItem("option6b");
$App.option6c = localStorage.getItem("option6c");
$App.option6d = localStorage.getItem("option6d");
$App.option6e = localStorage.getItem("option6e");
$App.question7 = localStorage.getItem("question7");
$App.option7a = localStorage.getItem("option7a");
$App.option7b = localStorage.getItem("option7b");
$App.option7c = localStorage.getItem("option7c");
$App.option7d = localStorage.getItem("option7d");
$App.option7e = localStorage.getItem("option7e");
$App.question8 = localStorage.getItem("question8");
$App.option8a = localStorage.getItem("option8a");
$App.option8b = localStorage.getItem("option8b");
$App.option8c = localStorage.getItem("option8c");
$App.option8d = localStorage.getItem("option8d");
$App.option8e = localStorage.getItem("option8e");
$App.question9 = localStorage.getItem("question9");
$App.option9a = localStorage.getItem("option9a");
$App.option9b = localStorage.getItem("option9b");
$App.option9c = localStorage.getItem("option9c");
$App.option9d = localStorage.getItem("option9d");
$App.option9e = localStorage.getItem("option9e");
$App.question10 = localStorage.getItem("question10");
$App.option10a = localStorage.getItem("option10a");
$App.option10b = localStorage.getItem("option10b");
$App.option10c = localStorage.getItem("option10c");
$App.option10d = localStorage.getItem("option10d");
$App.option10e = localStorage.getItem("option10e");
$App.question11 = localStorage.getItem("question11");
$App.option11a = localStorage.getItem("option11a");
$App.option11b = localStorage.getItem("option11b");
$App.option11c = localStorage.getItem("option11c");
$App.option11d = localStorage.getItem("option11d");
$App.option11e = localStorage.getItem("option11e");
$App.question12 = localStorage.getItem("question12");
$App.option12a = localStorage.getItem("option12a");
$App.option12b = localStorage.getItem("option12b");
$App.option12c = localStorage.getItem("option12c");
$App.option12d = localStorage.getItem("option12d");
$App.option12e = localStorage.getItem("option12e");};
angular.element(document).ready( function(){
$scope.__init();
neo = angular.element(document.getElementById("ng-view")).scope();neo.Refresh();});
});NeoApp.controller("App_DlgCtrl",function($scope,$rootScope,$modalInstance,$filter,$window,$animate){$scope.CloseDialog=function(){$modalInstance.close();};$scope.CloseDialogBtn=function(btnNum){$modalInstance.close(btnNum);};});
function debounce(func,wait,immediate){var timeout;return function(){var context=this,args=arguments;var later=function(){timeout=null;if(!immediate)func.apply(context,args);};var callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow)func.apply(context,args);};};NeoApp.directive('timer',function(){return{restrict:'E',replace:false,transclude:false,link:function(scope,element,attributes){if(attributes.autostop){scope.$on('$destroy',function(){scope.$parent.TimerStop(attributes.id);});};if(attributes.autostart)scope.$parent.TimerStart(attributes.id,attributes.interval);}};});NeoApp.directive('slider',['$window',function($window){return{restrict:'E',replace:true,transclude:true,require:'?ngModel',scope:{value:"=ngModel",min:"=",max:"=",disabled:'=ngDisabled',onChange:"&",onChanging:"&"},compile:function(element,attributes){element.addClass('neoapp-slider');var html='';if(attributes.trackimage){html+='<img class="track-img" src="'+attributes.trackimage+'"';if(attributes.trackheight)html+=' style="height:'+attributes.trackheight+'"';html+='/>';}else{html+='<div class="track"';if(attributes.trackheight)html+=' style="height:'+attributes.trackheight+'"';html+='><div class="track-left';if(attributes.kind)html+=' track-left-'+attributes.kind;html+='"></div>';};html+='</div><button class="thumb';if(attributes.thumbimage)html+=' thumb-img';if(attributes.kind)html+=' thumb-'+attributes.kind;html+='"';if(attributes.thumbwidth||attributes.thumbimage){html+=' style="';if(attributes.thumbwidth)html+='width:'+attributes.thumbwidth;if(attributes.thumbwidth&&attributes.thumbimage)html+=';';if(attributes.thumbimage)html+="background-image:url('"+attributes.thumbimage+"')";html+='"';};html+=' ng-style="NAB.'+attributes.id+'_style"';html+=' ng-transclude></button>';element.html(html);return linkFn;}};function linkFn($scope,element,attributes,ngModel){var mouseDown=false,track=attributes.trackimage?element.find('.track-img'):element.find('.track'),thumb=element.find('.thumb'),trackLeft=element.find('.track-left'),elemLeft,vMin=isNaN(parseFloat($scope.min))?0:parseFloat($scope.min),vMax=isNaN(parseFloat($scope.max))?100:parseFloat($scope.max),xOffs,dbOnChanging=($scope.onChanging)?debounce(function(){$scope.onChanging();},100):null;if(vMax<=vMin)vMax=vMin+1;var value=isNaN(parseFloat($scope.value))?vMin:parseFloat($scope.value);function positionThumb(){var basePos=((value-vMin)/(vMax-vMin))*(track.width()-thumb.innerWidth());thumb.css('left',basePos);if(trackLeft)trackLeft.css('width',basePos);};function updateValue(){if(ngModel&&!isNaN(parseFloat($scope.value))){var v=$scope.value;value=Math.max(vMin,Math.min(Math.floor(v),vMax));$scope.value=value;}else{value=Math.max(vMin,Math.min(Math.floor(value),vMax));};positionThumb();};function mouseCoords(event){if(event.type=='touchstart'||event.type=='touchmove'||event.type=='touchend'||event.type=='touchcancel'){var touch=event.originalEvent.touches[0]||event.originalEvent.changedTouches[0];return{x:touch.pageX,y:touch.pageY};}else{return{x:event.pageX,y:event.pageY};};};thumb.on('mousedown touchstart',function(event){if(!element.attr('disabled')){mouseDown=true;elemLeft=element.position().left;xOffs=mouseCoords(event).x-thumb.position().left-elemLeft;$(document).one('mouseup touchend ontouchcancel',function(event){if($scope.onChange)$scope.onChange();mouseDown=false;return false;});return false;};});element.on('mousemove touchmove',function(event){if(mouseDown){var xPos=mouseCoords(event).x-elemLeft-xOffs;var v=((xPos/(track.width()-thumb.innerWidth()))*(vMax-vMin))+vMin;v=Math.max(vMin,Math.min(Math.floor(v),vMax));if(value!=v){value=v;positionThumb();if(ngModel){$scope.value=value;if($scope.onChanging)$scope.onChanging();$scope.$apply();};if($scope.onChanging)dbOnChanging();};return false;};});angular.element($window).on('resize.'+element.id,function(){positionThumb();});if(ngModel){$scope.$watch('value',function(){if(!mouseDown){updateValue();};});};if(angular.isObject($scope.max)){$scope.$watch('max',function(){vMax=+$scope.max||100;updateValue();});};if(angular.isObject($scope.min)){$scope.$watch('min',function(){vMin=+$scope.min||0;updateValue();});};$scope.$watch('disabled',function(newVal){element.find('*').attr('disabled',newVal||false);});$scope.$on('$destroy',function(){angular.element($window).off('resize.'+element.id);});};}]);
NeoApp.controller("Home_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 1;
$App.NAB.PageID = "Home";
$scope.Quiz03_click = function() {$App.googleSheet = "https://docs.google.com/spreadsheets/d/1SUx689mPCnpOshbKechRq312Ce80i0vB2sr_2j3QS_0/edit?usp=sharingadd #gid=X";
$App.Quiz = "This is Quiz Three";
$scope.SetObjectStyle("Quiz03","background-color","#ADFF2F");
$scope.SetObjectStyle("Quiz03","background-color","#ADFF2F");
$scope.SetObjectStyle("Quiz02","background-color","#DCDCDC");
$scope.SetObjectStyle("Quiz01","background-color","#DCDCDC");
neoGSheetsLoadCell($App.googleSheet,"question1","a",25,null);

neoGSheetsLoadCell($App.googleSheet,"option1a","b",25,null);

neoGSheetsLoadCell($App.googleSheet,"option1b","c",25,null);

neoGSheetsLoadCell($App.googleSheet,"option1c","d",25,null);

neoGSheetsLoadCell($App.googleSheet,"option1d","e",25,null);

neoGSheetsLoadCell($App.googleSheet,"question2","a",26,null);

neoGSheetsLoadCell($App.googleSheet,"option2a","b",26,null);

neoGSheetsLoadCell($App.googleSheet,"option2b","c",26,null);

neoGSheetsLoadCell($App.googleSheet,"option2c","d",26,null);

neoGSheetsLoadCell($App.googleSheet,"option2d","e",26,null);

neoGSheetsLoadCell($App.googleSheet,"question3","a",27,null);

neoGSheetsLoadCell($App.googleSheet,"option3a","b",27,null);

neoGSheetsLoadCell($App.googleSheet,"option3b","c",27,null);

neoGSheetsLoadCell($App.googleSheet,"option3c","d",27,null);

neoGSheetsLoadCell($App.googleSheet,"option3d","e",27,null);

neoGSheetsLoadCell($App.googleSheet,"question4","a",28,null);

neoGSheetsLoadCell($App.googleSheet,"option4a","b",28,null);

neoGSheetsLoadCell($App.googleSheet,"option4b","c",28,null);

neoGSheetsLoadCell($App.googleSheet,"option4c","d",28,null);

neoGSheetsLoadCell($App.googleSheet,"option4d","e",28,null);

neoGSheetsLoadCell($App.googleSheet,"question5","a",29,null);

neoGSheetsLoadCell($App.googleSheet,"option5a","b",29,null);

neoGSheetsLoadCell($App.googleSheet,"option5b","c",29,null);

neoGSheetsLoadCell($App.googleSheet,"option5c","d",29,null);

neoGSheetsLoadCell($App.googleSheet,"option5d","e",29,null);

neoGSheetsLoadCell($App.googleSheet,"option5e","f",29,null);

neoGSheetsLoadCell($App.googleSheet,"question6","a",30,null);

neoGSheetsLoadCell($App.googleSheet,"option6a","b",30,null);

neoGSheetsLoadCell($App.googleSheet,"option6b","c",30,null);

neoGSheetsLoadCell($App.googleSheet,"option6c","d",30,null);

neoGSheetsLoadCell($App.googleSheet,"option6d","e",30,null);

neoGSheetsLoadCell($App.googleSheet,"option6e","f",30,null);

neoGSheetsLoadCell($App.googleSheet,"question7","a",31,null);

neoGSheetsLoadCell($App.googleSheet,"option7a","b",31,null);

neoGSheetsLoadCell($App.googleSheet,"option7b","c",31,null);

neoGSheetsLoadCell($App.googleSheet,"option7c","d",31,null);

neoGSheetsLoadCell($App.googleSheet,"option7d","e",31,null);

neoGSheetsLoadCell($App.googleSheet,"option7e","f",31,null);

neoGSheetsLoadCell($App.googleSheet,"question8","a",32,null);

neoGSheetsLoadCell($App.googleSheet,"option8a","b",32,null);

neoGSheetsLoadCell($App.googleSheet,"option8b","c",32,null);

neoGSheetsLoadCell($App.googleSheet,"option8c","d",32,null);

neoGSheetsLoadCell($App.googleSheet,"option8d","e",32,null);

neoGSheetsLoadCell($App.googleSheet,"option8e","f",32,null);

neoGSheetsLoadCell($App.googleSheet,"question9","a",33,null);

neoGSheetsLoadCell($App.googleSheet,"option9a","b",33,null);

neoGSheetsLoadCell($App.googleSheet,"option9b","c",33,null);

neoGSheetsLoadCell($App.googleSheet,"option9c","d",33,null);

neoGSheetsLoadCell($App.googleSheet,"option9d","e",33,null);

neoGSheetsLoadCell($App.googleSheet,"option9e","f",33,null);

neoGSheetsLoadCell($App.googleSheet,"question10","a",34,null);

neoGSheetsLoadCell($App.googleSheet,"option10a","b",34,null);

neoGSheetsLoadCell($App.googleSheet,"option10b","c",34,null);

neoGSheetsLoadCell($App.googleSheet,"option10c","d",34,null);

neoGSheetsLoadCell($App.googleSheet,"option10d","e",34,null);

neoGSheetsLoadCell($App.googleSheet,"option10e","f",34,null);

neoGSheetsLoadCell($App.googleSheet,"question11","a",35,null);

neoGSheetsLoadCell($App.googleSheet,"option11a","b",35,null);

neoGSheetsLoadCell($App.googleSheet,"option11b","c",35,null);

neoGSheetsLoadCell($App.googleSheet,"option11c","d",35,null);

neoGSheetsLoadCell($App.googleSheet,"option11d","e",35,null);

neoGSheetsLoadCell($App.googleSheet,"option11e","f",35,null);

neoGSheetsLoadCell($App.googleSheet,"question12","a",36,null);

neoGSheetsLoadCell($App.googleSheet,"option12a","b",36,null);

neoGSheetsLoadCell($App.googleSheet,"option12b","c",36,null);

neoGSheetsLoadCell($App.googleSheet,"option12c","d",36,null);

neoGSheetsLoadCell($App.googleSheet,"option12d","e",36,null);

neoGSheetsLoadCell($App.googleSheet,"option12e","f",36,null);

localStorage.setItem("question1",$App.question1);
localStorage.setItem("option1a",$App.option1a);
localStorage.setItem("option1b",$App.option1b);
localStorage.setItem("option1c",$App.option1c);
localStorage.setItem("option1d",$App.option1d);
localStorage.setItem("option1e",$App.option1e);
localStorage.setItem("question2",$App.question2);
localStorage.setItem("option2a",$App.option2a);
localStorage.setItem("option2b",$App.option2b);
localStorage.setItem("option2c",$App.option2c);
localStorage.setItem("option2d",$App.option2d);
localStorage.setItem("option2e",$App.option2e);
localStorage.setItem("question3",$App.question3);
localStorage.setItem("option3a",$App.option3a);
localStorage.setItem("option3b",$App.option3b);
localStorage.setItem("option3c",$App.option3c);
localStorage.setItem("option3d",$App.option3d);
localStorage.setItem("option3e",$App.option3e);
localStorage.setItem("question4",$App.question4);
localStorage.setItem("option4a",$App.option4a);
localStorage.setItem("option4b",$App.option4b);
localStorage.setItem("option4c",$App.option4c);
localStorage.setItem("option4d",$App.option4d);
localStorage.setItem("option4e",$App.option4e);
localStorage.setItem("question5",$App.question5);
localStorage.setItem("option5a",$App.option5a);
localStorage.setItem("option5b",$App.option5b);
localStorage.setItem("option5c",$App.option5c);
localStorage.setItem("option5d",$App.option5d);
localStorage.setItem("option5e",$App.option5e);
localStorage.setItem("question6",$App.question6);
localStorage.setItem("option6a",$App.option6a);
localStorage.setItem("option6b",$App.option6b);
localStorage.setItem("option6c",$App.option6c);
localStorage.setItem("option6d",$App.option6d);
localStorage.setItem("option6e",$App.option6e);
localStorage.setItem("question7",$App.question7);
localStorage.setItem("option7b",$App.option7a);
localStorage.setItem("option7b",$App.option7b);
localStorage.setItem("option7c",$App.option7c);
localStorage.setItem("option7d",$App.option7d);
localStorage.setItem("option7e",$App.option7e);
localStorage.setItem("question8",$App.question8);
localStorage.setItem("option8b",$App.option8a);
localStorage.setItem("option8b",$App.option8b);
localStorage.setItem("option8c",$App.option8c);
localStorage.setItem("option8d",$App.option8d);
localStorage.setItem("option8e",$App.option8e);
localStorage.setItem("question9",$App.question9);
localStorage.setItem("option9b",$App.option9a);
localStorage.setItem("option9b",$App.option9b);
localStorage.setItem("option9c",$App.option9c);
localStorage.setItem("option9d",$App.option9d);
localStorage.setItem("option9e",$App.option9e);
localStorage.setItem("question10",$App.question10);
localStorage.setItem("option10b",$App.option10a);
localStorage.setItem("option10b",$App.option10b);
localStorage.setItem("option10c",$App.option10c);
localStorage.setItem("option10d",$App.option10d);
localStorage.setItem("option10e",$App.option10e);
localStorage.setItem("question11",$App.question11);
localStorage.setItem("option11b",$App.option11a);
localStorage.setItem("option11b",$App.option11b);
localStorage.setItem("option11c",$App.option11c);
localStorage.setItem("option11d",$App.option11d);
localStorage.setItem("option11e",$App.option11e);
localStorage.setItem("question12",$App.question12);
localStorage.setItem("option12b",$App.option12a);
localStorage.setItem("option12b",$App.option12b);
localStorage.setItem("option12c",$App.option12c);
localStorage.setItem("option12d",$App.option12d);
localStorage.setItem("option12e",$App.option12e);
$App.question1 = localStorage.getItem("question1");
$App.option1a = localStorage.getItem("option1a");
$App.option1b = localStorage.getItem("option1b");
$App.option1c = localStorage.getItem("option1c");
$App.option1d = localStorage.getItem("option1d");
$App.option1e = localStorage.getItem("option1e");
$App.question2 = localStorage.getItem("question2");
$App.option2a = localStorage.getItem("option2a");
$App.option2b = localStorage.getItem("option2b");
$App.option2c = localStorage.getItem("option2c");
$App.option2d = localStorage.getItem("option2d");
$App.option2e = localStorage.getItem("option2e");
$App.question3 = localStorage.getItem("question3");
$App.option3a = localStorage.getItem("option3a");
$App.option3b = localStorage.getItem("option3b");
$App.option3c = localStorage.getItem("option3c");
$App.option3d = localStorage.getItem("option3d");
$App.option3e = localStorage.getItem("option3e");
$App.option3f = localStorage.getItem("option3f");
$App.option3g = localStorage.getItem("option3g");
$App.question4 = localStorage.getItem("question4");
$App.option4a = localStorage.getItem("option4a");
$App.option4b = localStorage.getItem("option4b");
$App.option4c = localStorage.getItem("option4c");
$App.option4d = localStorage.getItem("option4d");
$App.option4e = localStorage.getItem("option4e");
$App.option4f = localStorage.getItem("option4f");
$App.option4g = localStorage.getItem("option4g");
$App.question5 = localStorage.getItem("question5");
$App.option5a = localStorage.getItem("option5a");
$App.option5b = localStorage.getItem("option5b");
$App.option5c = localStorage.getItem("option5c");
$App.option5d = localStorage.getItem("option5d");
$App.option5e = localStorage.getItem("option5e");
$App.question6 = localStorage.getItem("question6");
$App.option6a = localStorage.getItem("option6a");
$App.option6b = localStorage.getItem("option6b");
$App.option6c = localStorage.getItem("option6c");
$App.option6d = localStorage.getItem("option6d");
$App.option6e = localStorage.getItem("option6e");
$App.question7 = localStorage.getItem("question7");
$App.option7a = localStorage.getItem("option7a");
$App.option7b = localStorage.getItem("option7b");
$App.option7c = localStorage.getItem("option7c");
$App.option7d = localStorage.getItem("option7d");
$App.option7e = localStorage.getItem("option7e");
$App.question8 = localStorage.getItem("question8");
$App.option8a = localStorage.getItem("option8a");
$App.option8b = localStorage.getItem("option8b");
$App.option8c = localStorage.getItem("option8c");
$App.option8d = localStorage.getItem("option8d");
$App.option8e = localStorage.getItem("option8e");
$App.question9 = localStorage.getItem("question9");
$App.option9a = localStorage.getItem("option9a");
$App.option9b = localStorage.getItem("option9b");
$App.option9c = localStorage.getItem("option9c");
$App.option9d = localStorage.getItem("option9d");
$App.option9e = localStorage.getItem("option9e");
$App.question10 = localStorage.getItem("question10");
$App.option10a = localStorage.getItem("option10a");
$App.option10b = localStorage.getItem("option10b");
$App.option10c = localStorage.getItem("option10c");
$App.option10d = localStorage.getItem("option10d");
$App.option10e = localStorage.getItem("option10e");
$App.question11 = localStorage.getItem("question11");
$App.option11a = localStorage.getItem("option11a");
$App.option11b = localStorage.getItem("option11b");
$App.option11c = localStorage.getItem("option11c");
$App.option11d = localStorage.getItem("option11d");
$App.option11e = localStorage.getItem("option11e");
$App.question12 = localStorage.getItem("question12");
$App.option12a = localStorage.getItem("option12a");
$App.option12b = localStorage.getItem("option12b");
$App.option12c = localStorage.getItem("option12c");
$App.option12d = localStorage.getItem("option12d");
$App.option12e = localStorage.getItem("option12e");
$App.loaded = "loaded";
$scope.GotoPage( "Page01" );
$scope.GotoPage( "Home" );};
$scope.Quiz02_click = function() {$App.googleSheet = "https://docs.google.com/spreadsheets/d/1SUx689mPCnpOshbKechRq312Ce80i0vB2sr_2j3QS_0/edit?usp=sharingadd #gid=X";
$App.Quiz = "This is Quiz Two";
$scope.SetObjectStyle("Quiz02","background-color","#ADFF2F");
$scope.SetObjectStyle("Quiz02","background-color","#ADFF2F");
$scope.SetObjectStyle("Quiz01","background-color","#DCDCDC");
$scope.SetObjectStyle("Quiz03","background-color","#DCDCDC");
neoGSheetsLoadCell($App.googleSheet,"question1","a",13,null);

neoGSheetsLoadCell($App.googleSheet,"option1a","b",13,null);

neoGSheetsLoadCell($App.googleSheet,"option1b","c",13,null);

neoGSheetsLoadCell($App.googleSheet,"option1c","d",13,null);

neoGSheetsLoadCell($App.googleSheet,"option1d","e",13,null);

neoGSheetsLoadCell($App.googleSheet,"question2","a",14,null);

neoGSheetsLoadCell($App.googleSheet,"option2a","b",14,null);

neoGSheetsLoadCell($App.googleSheet,"option2b","c",14,null);

neoGSheetsLoadCell($App.googleSheet,"option2c","d",14,null);

neoGSheetsLoadCell($App.googleSheet,"option2d","e",14,null);

neoGSheetsLoadCell($App.googleSheet,"question3","a",15,null);

neoGSheetsLoadCell($App.googleSheet,"option3a","b",15,null);

neoGSheetsLoadCell($App.googleSheet,"option3b","c",15,null);

neoGSheetsLoadCell($App.googleSheet,"option3c","d",15,null);

neoGSheetsLoadCell($App.googleSheet,"option3d","e",15,null);

neoGSheetsLoadCell($App.googleSheet,"question4","a",16,null);

neoGSheetsLoadCell($App.googleSheet,"option4a","b",15,null);

neoGSheetsLoadCell($App.googleSheet,"option4b","c",16,null);

neoGSheetsLoadCell($App.googleSheet,"option4c","d",16,null);

neoGSheetsLoadCell($App.googleSheet,"option4d","e",16,null);

neoGSheetsLoadCell($App.googleSheet,"question5","a",17,null);

neoGSheetsLoadCell($App.googleSheet,"option5a","b",17,null);

neoGSheetsLoadCell($App.googleSheet,"option5b","c",17,null);

neoGSheetsLoadCell($App.googleSheet,"option5c","d",17,null);

neoGSheetsLoadCell($App.googleSheet,"option5d","e",17,null);

neoGSheetsLoadCell($App.googleSheet,"option5e","f",17,null);

neoGSheetsLoadCell($App.googleSheet,"question6","a",18,null);

neoGSheetsLoadCell($App.googleSheet,"option6a","b",18,null);

neoGSheetsLoadCell($App.googleSheet,"option6b","c",18,null);

neoGSheetsLoadCell($App.googleSheet,"option6c","d",18,null);

neoGSheetsLoadCell($App.googleSheet,"option6d","e",18,null);

neoGSheetsLoadCell($App.googleSheet,"option6e","f",18,null);

neoGSheetsLoadCell($App.googleSheet,"question7","a",19,null);

neoGSheetsLoadCell($App.googleSheet,"option7a","b",19,null);

neoGSheetsLoadCell($App.googleSheet,"option7b","c",19,null);

neoGSheetsLoadCell($App.googleSheet,"option7c","d",19,null);

neoGSheetsLoadCell($App.googleSheet,"option7d","e",19,null);

neoGSheetsLoadCell($App.googleSheet,"option7e","f",19,null);

neoGSheetsLoadCell($App.googleSheet,"question8","a",20,null);

neoGSheetsLoadCell($App.googleSheet,"option8a","b",20,null);

neoGSheetsLoadCell($App.googleSheet,"option8b","c",20,null);

neoGSheetsLoadCell($App.googleSheet,"option8c","d",20,null);

neoGSheetsLoadCell($App.googleSheet,"option8d","e",20,null);

neoGSheetsLoadCell($App.googleSheet,"option8e","f",20,null);

neoGSheetsLoadCell($App.googleSheet,"question9","a",21,null);

neoGSheetsLoadCell($App.googleSheet,"option9a","b",21,null);

neoGSheetsLoadCell($App.googleSheet,"option9b","c",21,null);

neoGSheetsLoadCell($App.googleSheet,"option9c","d",21,null);

neoGSheetsLoadCell($App.googleSheet,"option9d","e",21,null);

neoGSheetsLoadCell($App.googleSheet,"option9e","f",21,null);

neoGSheetsLoadCell($App.googleSheet,"question10","a",22,null);

neoGSheetsLoadCell($App.googleSheet,"option10a","b",22,null);

neoGSheetsLoadCell($App.googleSheet,"option10b","c",22,null);

neoGSheetsLoadCell($App.googleSheet,"option10c","d",22,null);

neoGSheetsLoadCell($App.googleSheet,"option10d","e",22,null);

neoGSheetsLoadCell($App.googleSheet,"option10e","f",22,null);

neoGSheetsLoadCell($App.googleSheet,"question11","a",23,null);

neoGSheetsLoadCell($App.googleSheet,"option11a","b",23,null);

neoGSheetsLoadCell($App.googleSheet,"option11b","c",23,null);

neoGSheetsLoadCell($App.googleSheet,"option11c","d",23,null);

neoGSheetsLoadCell($App.googleSheet,"option11d","e",23,null);

neoGSheetsLoadCell($App.googleSheet,"option11e","f",23,null);

neoGSheetsLoadCell($App.googleSheet,"question12","a",24,null);

neoGSheetsLoadCell($App.googleSheet,"option12a","b",24,null);

neoGSheetsLoadCell($App.googleSheet,"option12b","c",24,null);

neoGSheetsLoadCell($App.googleSheet,"option12c","d",24,null);

neoGSheetsLoadCell($App.googleSheet,"option12d","e",24,null);

neoGSheetsLoadCell($App.googleSheet,"option12e","f",24,null);

localStorage.setItem("question1",$App.question1);
localStorage.setItem("option1a",$App.option1a);
localStorage.setItem("option1b",$App.option1b);
localStorage.setItem("option1c",$App.option1c);
localStorage.setItem("option1d",$App.option1d);
localStorage.setItem("option1e",$App.option1e);
localStorage.setItem("question2",$App.question2);
localStorage.setItem("option2a",$App.option2a);
localStorage.setItem("option2b",$App.option2b);
localStorage.setItem("option2c",$App.option2c);
localStorage.setItem("option2d",$App.option2d);
localStorage.setItem("option2e",$App.option2e);
localStorage.setItem("question3",$App.question3);
localStorage.setItem("option3a",$App.option3a);
localStorage.setItem("option3b",$App.option3b);
localStorage.setItem("option3c",$App.option3c);
localStorage.setItem("option3d",$App.option3d);
localStorage.setItem("option3e",$App.option3e);
localStorage.setItem("question4",$App.question4);
localStorage.setItem("option4a",$App.option4a);
localStorage.setItem("option4b",$App.option4b);
localStorage.setItem("option4c",$App.option4c);
localStorage.setItem("option4d",$App.option4d);
localStorage.setItem("option4e",$App.option4e);
localStorage.setItem("question5",$App.question5);
localStorage.setItem("option5a",$App.option5a);
localStorage.setItem("option5b",$App.option5b);
localStorage.setItem("option5c",$App.option5c);
localStorage.setItem("option5d",$App.option5d);
localStorage.setItem("option5e",$App.option5e);
localStorage.setItem("question6",$App.question6);
localStorage.setItem("option6a",$App.option6a);
localStorage.setItem("option6b",$App.option6b);
localStorage.setItem("option6c",$App.option6c);
localStorage.setItem("option6d",$App.option6d);
localStorage.setItem("option6e",$App.option6e);
localStorage.setItem("question7",$App.question7);
localStorage.setItem("option7b",$App.option7a);
localStorage.setItem("option7b",$App.option7b);
localStorage.setItem("option7c",$App.option7c);
localStorage.setItem("option7d",$App.option7d);
localStorage.setItem("option7e",$App.option7e);
localStorage.setItem("question8",$App.question8);
localStorage.setItem("option8b",$App.option8a);
localStorage.setItem("option8b",$App.option8b);
localStorage.setItem("option8c",$App.option8c);
localStorage.setItem("option8d",$App.option8d);
localStorage.setItem("option8e",$App.option8e);
localStorage.setItem("question9",$App.question9);
localStorage.setItem("option9b",$App.option9a);
localStorage.setItem("option9b",$App.option9b);
localStorage.setItem("option9c",$App.option9c);
localStorage.setItem("option9d",$App.option9d);
localStorage.setItem("option9e",$App.option9e);
localStorage.setItem("question10",$App.question10);
localStorage.setItem("option10b",$App.option10a);
localStorage.setItem("option10b",$App.option10b);
localStorage.setItem("option10c",$App.option10c);
localStorage.setItem("option10d",$App.option10d);
localStorage.setItem("option10e",$App.option10e);
localStorage.setItem("question11",$App.question11);
localStorage.setItem("option11b",$App.option11a);
localStorage.setItem("option11b",$App.option11b);
localStorage.setItem("option11c",$App.option11c);
localStorage.setItem("option11d",$App.option11d);
localStorage.setItem("option11e",$App.option11e);
localStorage.setItem("question12",$App.question12);
localStorage.setItem("option12b",$App.option12a);
localStorage.setItem("option12b",$App.option12b);
localStorage.setItem("option12c",$App.option12c);
localStorage.setItem("option12d",$App.option12d);
localStorage.setItem("option12e",$App.option12e);
$App.question1 = localStorage.getItem("question1");
$App.option1a = localStorage.getItem("option1a");
$App.option1b = localStorage.getItem("option1b");
$App.option1c = localStorage.getItem("option1c");
$App.option1d = localStorage.getItem("option1d");
$App.option1e = localStorage.getItem("option1e");
$App.question2 = localStorage.getItem("question2");
$App.option2a = localStorage.getItem("option2a");
$App.option2b = localStorage.getItem("option2b");
$App.option2c = localStorage.getItem("option2c");
$App.option2d = localStorage.getItem("option2d");
$App.option2e = localStorage.getItem("option2e");
$App.question3 = localStorage.getItem("question3");
$App.option3a = localStorage.getItem("option3a");
$App.option3b = localStorage.getItem("option3b");
$App.option3c = localStorage.getItem("option3c");
$App.option3d = localStorage.getItem("option3d");
$App.option3e = localStorage.getItem("option3e");
$App.option3f = localStorage.getItem("option3f");
$App.option3g = localStorage.getItem("option3g");
$App.question4 = localStorage.getItem("question4");
$App.option4a = localStorage.getItem("option4a");
$App.option4b = localStorage.getItem("option4b");
$App.option4c = localStorage.getItem("option4c");
$App.option4d = localStorage.getItem("option4d");
$App.option4e = localStorage.getItem("option4e");
$App.option4f = localStorage.getItem("option4f");
$App.option4g = localStorage.getItem("option4g");
$App.question5 = localStorage.getItem("question5");
$App.option5a = localStorage.getItem("option5a");
$App.option5b = localStorage.getItem("option5b");
$App.option5c = localStorage.getItem("option5c");
$App.option5d = localStorage.getItem("option5d");
$App.option5e = localStorage.getItem("option5e");
$App.question6 = localStorage.getItem("question6");
$App.option6a = localStorage.getItem("option6a");
$App.option6b = localStorage.getItem("option6b");
$App.option6c = localStorage.getItem("option6c");
$App.option6d = localStorage.getItem("option6d");
$App.option6e = localStorage.getItem("option6e");
$App.question7 = localStorage.getItem("question7");
$App.option7a = localStorage.getItem("option7a");
$App.option7b = localStorage.getItem("option7b");
$App.option7c = localStorage.getItem("option7c");
$App.option7d = localStorage.getItem("option7d");
$App.option7e = localStorage.getItem("option7e");
$App.question8 = localStorage.getItem("question8");
$App.option8a = localStorage.getItem("option8a");
$App.option8b = localStorage.getItem("option8b");
$App.option8c = localStorage.getItem("option8c");
$App.option8d = localStorage.getItem("option8d");
$App.option8e = localStorage.getItem("option8e");
$App.question9 = localStorage.getItem("question9");
$App.option9a = localStorage.getItem("option9a");
$App.option9b = localStorage.getItem("option9b");
$App.option9c = localStorage.getItem("option9c");
$App.option9d = localStorage.getItem("option9d");
$App.option9e = localStorage.getItem("option9e");
$App.question10 = localStorage.getItem("question10");
$App.option10a = localStorage.getItem("option10a");
$App.option10b = localStorage.getItem("option10b");
$App.option10c = localStorage.getItem("option10c");
$App.option10d = localStorage.getItem("option10d");
$App.option10e = localStorage.getItem("option10e");
$App.question11 = localStorage.getItem("question11");
$App.option11a = localStorage.getItem("option11a");
$App.option11b = localStorage.getItem("option11b");
$App.option11c = localStorage.getItem("option11c");
$App.option11d = localStorage.getItem("option11d");
$App.option11e = localStorage.getItem("option11e");
$App.question12 = localStorage.getItem("question12");
$App.option12a = localStorage.getItem("option12a");
$App.option12b = localStorage.getItem("option12b");
$App.option12c = localStorage.getItem("option12c");
$App.option12d = localStorage.getItem("option12d");
$App.option12e = localStorage.getItem("option12e");
$App.loaded = "loaded";
$scope.GotoPage( "Page01" );
$scope.GotoPage( "Home" );};
$scope.Startbutton_click = function() {$scope.HideObject("sd1","",0);
$scope.HideObject("sd2","",0);
$scope.HideObject("sd3","",0);
$scope.HideObject("sd4","",0);
$scope.HideObject("sd5","",0);
$scope.HideObject("sd6","",0);
$scope.HideObject("sd7","",0);
$scope.HideObject("sd8","",0);
$scope.HideObject("sd9","",0);
$scope.HideObject("sd10","",0);
$scope.HideObject("sd11","",0);
$scope.HideObject("sd12","",0);
$scope.ShowObject("b1","",0);
$scope.ShowObject("b2","",0);
$scope.ShowObject("b3","",0);
$scope.ShowObject("b4","",0);
$scope.ShowObject("b5","",0);
$scope.ShowObject("b6","",0);
$scope.ShowObject("b7","",0);
$scope.ShowObject("b8","",0);
$scope.ShowObject("b9","",0);
$scope.ShowObject("b10","",0);
$scope.ShowObject("b11","",0);
$scope.ShowObject("b12","",0);
$scope.ShowObject("b13","",0);
$scope.ShowObject("b14","",0);
$scope.ShowObject("b15","",0);
$scope.ShowObject("b16","",0);
$scope.ShowObject("b17","",0);
$scope.ShowObject("b18","",0);
$scope.ShowObject("b19","",0);
$scope.ShowObject("b20","",0);
$scope.ShowObject("b21","",0);
$scope.ShowObject("b22","",0);
$scope.ShowObject("b23","",0);
$scope.ShowObject("b24","",0);
$scope.ShowObject("b25","",0);
$scope.ShowObject("b26","",0);
$scope.ShowObject("b27","",0);
$scope.ShowObject("b28","",0);
$scope.ShowObject("b29","",0);
$scope.ShowObject("b30","",0);
$scope.ShowObject("b31","",0);
$scope.ShowObject("b32","",0);
$scope.ShowObject("b33","",0);
$scope.ShowObject("b34","",0);
$scope.ShowObject("b35","",0);
$scope.ShowObject("b36","",0);
$scope.ShowObject("b37","",0);
$scope.ShowObject("b38","",0);
$scope.ShowObject("b39","",0);
$scope.ShowObject("b40","",0);
$scope.ShowObject("b41","",0);
$scope.ShowObject("b42","",0);
$scope.ShowObject("b43","",0);
$scope.ShowObject("b44","",0);
$scope.ShowObject("b45","",0);
$scope.ShowObject("b46","",0);
$scope.ShowObject("b47","",0);
$scope.ShowObject("b48","",0);
$scope.ShowObject("b49","",0);
$scope.ShowObject("b50","",0);
$scope.ShowObject("b51","",0);
$scope.ShowObject("b52","",0);
$App.q1d = "";
$App.q2d = "";
$App.q3d = "";
$App.q4d = "";
$App.q5d = "";
$App.q6d = "";
$App.q7d = "";
$App.q8d = "";
$App.q9d = "";
$App.q10d = "";
$App.q11d = "";
$App.q12d = "";
$scope.HideObject("next1","",0);
$scope.HideObject("next2","",0);
$scope.HideObject("next3","",0);
$scope.HideObject("next4","",0);
$scope.HideObject("next5","",0);
$scope.HideObject("next6","",0);
$scope.HideObject("next7","",0);
$scope.HideObject("next8","",0);
$scope.HideObject("next9","",0);
$scope.HideObject("next10","",0);
$scope.HideObject("next11","",0);
$scope.HideObject("next12","",0);
$scope.GotoPage( "Page01" );};
$scope.PushButton30_click = function() {$scope.ShowObject("show1","",0);
$scope.ShowObject("show2","",0);
$scope.ShowObject("show3","",0);
$scope.ShowObject("show4","",0);
$scope.ShowObject("show5","",0);
$scope.ShowObject("show6","",0);
$scope.ShowObject("show7","",0);
$scope.ShowObject("show8","",0);
$scope.ShowObject("show9","",0);
$scope.ShowObject("show10","",0);
$scope.ShowObject("show11","",0);
$scope.ShowObject("show12","",0);
$scope.ShowObject("show100","",0);};
$scope.PushButton31_click = function() {$scope.HideObject("show1","",0);
$scope.HideObject("show2","",0);
$scope.HideObject("show3","",0);
$scope.HideObject("show4","",0);
$scope.HideObject("show5","",0);
$scope.HideObject("show6","",0);
$scope.HideObject("show7","",0);
$scope.HideObject("show8","",0);
$scope.HideObject("show9","",0);
$scope.HideObject("show10","",0);
$scope.HideObject("show11","",0);
$scope.HideObject("show12","",0);
$scope.HideObject("show100","",0);};
$scope.PushButton32_click = function() {window.document.location.reload();
$scope.GotoPage( "Home" );};
$scope.Dropdown1_change = function(value) {$App.SelectIndustry = value;
if ($App.SelectIndustry == "GPSR- 12 Question Genaric Quiz?") {
if($App.NAB["Quiz01"]){$App.NAB["Quiz01"].click();}else{$("#"+"Quiz01").click();}
} else {
};
if ($App.SelectIndustry == "GPSR- 12 Question Textile Industry Quiz?") {
if($App.NAB["Quiz02"]){$App.NAB["Quiz02"].click();}else{$("#"+"Quiz02").click();}
} else {
};
if ($App.SelectIndustry == "GPSR- 12 Question Genaric Quiz?") {
if($App.NAB["Quiz01"]){$App.NAB["Quiz01"].click();}else{$("#"+"Quiz01").click();}
} else {
};
if ($App.SelectIndustry == "GPSR- 12 Question Textile Industry Quiz?") {
if($App.NAB["Quiz02"]){$App.NAB["Quiz02"].click();}else{$("#"+"Quiz02").click();}
} else {
};};
$scope.PushButton3_click = function() {$scope.ShowObject("Container1","",0);};
$scope.PushButton5_click = function() {window.document.location.reload();};
$scope.Quiz01_click = function() {$App.googleSheet = "https://docs.google.com/spreadsheets/d/1SUx689mPCnpOshbKechRq312Ce80i0vB2sr_2j3QS_0/edit?usp=sharingadd #gid=X";
$App.Quiz = "This is Quiz one";
$scope.SetObjectStyle("Quiz01","background-color","#ADFF2F");
$scope.SetObjectStyle("Quiz02","background-color","#DCDCDC");
$scope.SetObjectStyle("Quiz03","background-color","#DCDCDC");
neoGSheetsLoadCell($App.googleSheet,"question1","a",1,null);

neoGSheetsLoadCell($App.googleSheet,"option1a","b",1,null);

neoGSheetsLoadCell($App.googleSheet,"option1b","c",1,null);

neoGSheetsLoadCell($App.googleSheet,"option1c","d",1,null);

neoGSheetsLoadCell($App.googleSheet,"option1d","e",1,null);

neoGSheetsLoadCell($App.googleSheet,"question2","a",2,null);

neoGSheetsLoadCell($App.googleSheet,"option2a","b",2,null);

neoGSheetsLoadCell($App.googleSheet,"option2b","c",2,null);

neoGSheetsLoadCell($App.googleSheet,"option2c","d",2,null);

neoGSheetsLoadCell($App.googleSheet,"option2d","e",2,null);

neoGSheetsLoadCell($App.googleSheet,"question3","a",3,null);

neoGSheetsLoadCell($App.googleSheet,"option3a","b",3,null);

neoGSheetsLoadCell($App.googleSheet,"option3b","c",3,null);

neoGSheetsLoadCell($App.googleSheet,"option3c","d",3,null);

neoGSheetsLoadCell($App.googleSheet,"option3d","e",3,null);

neoGSheetsLoadCell($App.googleSheet,"question4","a",4,null);

neoGSheetsLoadCell($App.googleSheet,"option4a","b",4,null);

neoGSheetsLoadCell($App.googleSheet,"option4b","c",4,null);

neoGSheetsLoadCell($App.googleSheet,"option4c","d",4,null);

neoGSheetsLoadCell($App.googleSheet,"option4d","e",4,null);

neoGSheetsLoadCell($App.googleSheet,"question5","a",5,null);

neoGSheetsLoadCell($App.googleSheet,"option5a","b",5,null);

neoGSheetsLoadCell($App.googleSheet,"option5b","c",5,null);

neoGSheetsLoadCell($App.googleSheet,"option5c","d",5,null);

neoGSheetsLoadCell($App.googleSheet,"option5d","e",5,null);

neoGSheetsLoadCell($App.googleSheet,"option5e","f",5,null);

neoGSheetsLoadCell($App.googleSheet,"question6","a",6,null);

neoGSheetsLoadCell($App.googleSheet,"option6a","b",6,null);

neoGSheetsLoadCell($App.googleSheet,"option6b","c",6,null);

neoGSheetsLoadCell($App.googleSheet,"option6c","d",6,null);

neoGSheetsLoadCell($App.googleSheet,"option6d","e",6,null);

neoGSheetsLoadCell($App.googleSheet,"option6e","f",6,null);

neoGSheetsLoadCell($App.googleSheet,"question7","a",7,null);

neoGSheetsLoadCell($App.googleSheet,"option7a","b",7,null);

neoGSheetsLoadCell($App.googleSheet,"option7b","c",7,null);

neoGSheetsLoadCell($App.googleSheet,"option7c","d",7,null);

neoGSheetsLoadCell($App.googleSheet,"option7d","e",7,null);

neoGSheetsLoadCell($App.googleSheet,"option7e","f",7,null);

neoGSheetsLoadCell($App.googleSheet,"question8","a",8,null);

neoGSheetsLoadCell($App.googleSheet,"option8a","b",8,null);

neoGSheetsLoadCell($App.googleSheet,"option8b","c",8,null);

neoGSheetsLoadCell($App.googleSheet,"option8c","d",8,null);

neoGSheetsLoadCell($App.googleSheet,"option8d","e",8,null);

neoGSheetsLoadCell($App.googleSheet,"option8e","f",8,null);

neoGSheetsLoadCell($App.googleSheet,"question9","a",9,null);

neoGSheetsLoadCell($App.googleSheet,"option9a","b",9,null);

neoGSheetsLoadCell($App.googleSheet,"option9b","c",9,null);

neoGSheetsLoadCell($App.googleSheet,"option9c","d",9,null);

neoGSheetsLoadCell($App.googleSheet,"option9d","e",9,null);

neoGSheetsLoadCell($App.googleSheet,"option9e","f",9,null);

neoGSheetsLoadCell($App.googleSheet,"question10","a",10,null);

neoGSheetsLoadCell($App.googleSheet,"option10a","b",10,null);

neoGSheetsLoadCell($App.googleSheet,"option10b","c",10,null);

neoGSheetsLoadCell($App.googleSheet,"option10c","d",10,null);

neoGSheetsLoadCell($App.googleSheet,"option10d","e",10,null);

neoGSheetsLoadCell($App.googleSheet,"option10e","f",10,null);

neoGSheetsLoadCell($App.googleSheet,"question11","a",11,null);

neoGSheetsLoadCell($App.googleSheet,"option11a","b",11,null);

neoGSheetsLoadCell($App.googleSheet,"option11b","c",11,null);

neoGSheetsLoadCell($App.googleSheet,"option11c","d",11,null);

neoGSheetsLoadCell($App.googleSheet,"option11d","e",11,null);

neoGSheetsLoadCell($App.googleSheet,"option11e","f",11,null);

neoGSheetsLoadCell($App.googleSheet,"question12","a",12,null);

neoGSheetsLoadCell($App.googleSheet,"option12a","b",12,null);

neoGSheetsLoadCell($App.googleSheet,"option12b","c",12,null);

neoGSheetsLoadCell($App.googleSheet,"option12c","d",12,null);

neoGSheetsLoadCell($App.googleSheet,"option12d","e",12,null);

neoGSheetsLoadCell($App.googleSheet,"option12e","f",12,null);

localStorage.setItem("question1",$App.question1);
localStorage.setItem("option1a",$App.option1a);
localStorage.setItem("option1b",$App.option1b);
localStorage.setItem("option1c",$App.option1c);
localStorage.setItem("option1d",$App.option1d);
localStorage.setItem("option1e",$App.option1e);
localStorage.setItem("question2",$App.question2);
localStorage.setItem("option2a",$App.option2a);
localStorage.setItem("option2b",$App.option2b);
localStorage.setItem("option2c",$App.option2c);
localStorage.setItem("option2d",$App.option2d);
localStorage.setItem("option2e",$App.option2e);
localStorage.setItem("question3",$App.question3);
localStorage.setItem("option3a",$App.option3a);
localStorage.setItem("option3b",$App.option3b);
localStorage.setItem("option3c",$App.option3c);
localStorage.setItem("option3d",$App.option3d);
localStorage.setItem("option3e",$App.option3e);
localStorage.setItem("question4",$App.question4);
localStorage.setItem("option4a",$App.option4a);
localStorage.setItem("option4b",$App.option4b);
localStorage.setItem("option4c",$App.option4c);
localStorage.setItem("option4d",$App.option4d);
localStorage.setItem("option4e",$App.option4e);
localStorage.setItem("question5",$App.question5);
localStorage.setItem("option5a",$App.option5a);
localStorage.setItem("option5b",$App.option5b);
localStorage.setItem("option5c",$App.option5c);
localStorage.setItem("option5d",$App.option5d);
localStorage.setItem("option5e",$App.option5e);
localStorage.setItem("question6",$App.question6);
localStorage.setItem("option6a",$App.option6a);
localStorage.setItem("option6b",$App.option6b);
localStorage.setItem("option6c",$App.option6c);
localStorage.setItem("option6d",$App.option6d);
localStorage.setItem("option6e",$App.option6e);
localStorage.setItem("question7",$App.question7);
localStorage.setItem("option7b",$App.option7a);
localStorage.setItem("option7b",$App.option7b);
localStorage.setItem("option7c",$App.option7c);
localStorage.setItem("option7d",$App.option7d);
localStorage.setItem("option7e",$App.option7e);
localStorage.setItem("question8",$App.question8);
localStorage.setItem("option8b",$App.option8a);
localStorage.setItem("option8b",$App.option8b);
localStorage.setItem("option8c",$App.option8c);
localStorage.setItem("option8d",$App.option8d);
localStorage.setItem("option8e",$App.option8e);
localStorage.setItem("question9",$App.question9);
localStorage.setItem("option9b",$App.option9a);
localStorage.setItem("option9b",$App.option9b);
localStorage.setItem("option9c",$App.option9c);
localStorage.setItem("option9d",$App.option9d);
localStorage.setItem("option9e",$App.option9e);
localStorage.setItem("question10",$App.question10);
localStorage.setItem("option10b",$App.option10a);
localStorage.setItem("option10b",$App.option10b);
localStorage.setItem("option10c",$App.option10c);
localStorage.setItem("option10d",$App.option10d);
localStorage.setItem("option10e",$App.option10e);
localStorage.setItem("question11",$App.question11);
localStorage.setItem("option11b",$App.option11a);
localStorage.setItem("option11b",$App.option11b);
localStorage.setItem("option11c",$App.option11c);
localStorage.setItem("option11d",$App.option11d);
localStorage.setItem("option11e",$App.option11e);
localStorage.setItem("question12",$App.question12);
localStorage.setItem("option12b",$App.option12a);
localStorage.setItem("option12b",$App.option12b);
localStorage.setItem("option12c",$App.option12c);
localStorage.setItem("option12d",$App.option12d);
localStorage.setItem("option12e",$App.option12e);
$App.question1 = localStorage.getItem("question1");
$App.option1a = localStorage.getItem("option1a");
$App.option1b = localStorage.getItem("option1b");
$App.option1c = localStorage.getItem("option1c");
$App.option1d = localStorage.getItem("option1d");
$App.option1e = localStorage.getItem("option1e");
$App.question2 = localStorage.getItem("question2");
$App.option2a = localStorage.getItem("option2a");
$App.option2b = localStorage.getItem("option2b");
$App.option2c = localStorage.getItem("option2c");
$App.option2d = localStorage.getItem("option2d");
$App.option2e = localStorage.getItem("option2e");
$App.question3 = localStorage.getItem("question3");
$App.option3a = localStorage.getItem("option3a");
$App.option3b = localStorage.getItem("option3b");
$App.option3c = localStorage.getItem("option3c");
$App.option3d = localStorage.getItem("option3d");
$App.option3e = localStorage.getItem("option3e");
$App.option3f = localStorage.getItem("option3f");
$App.option3g = localStorage.getItem("option3g");
$App.question4 = localStorage.getItem("question4");
$App.option4a = localStorage.getItem("option4a");
$App.option4b = localStorage.getItem("option4b");
$App.option4c = localStorage.getItem("option4c");
$App.option4d = localStorage.getItem("option4d");
$App.option4e = localStorage.getItem("option4e");
$App.option4f = localStorage.getItem("option4f");
$App.option4g = localStorage.getItem("option4g");
$App.question5 = localStorage.getItem("question5");
$App.option5a = localStorage.getItem("option5a");
$App.option5b = localStorage.getItem("option5b");
$App.option5c = localStorage.getItem("option5c");
$App.option5d = localStorage.getItem("option5d");
$App.option5e = localStorage.getItem("option5e");
$App.question6 = localStorage.getItem("question6");
$App.option6a = localStorage.getItem("option6a");
$App.option6b = localStorage.getItem("option6b");
$App.option6c = localStorage.getItem("option6c");
$App.option6d = localStorage.getItem("option6d");
$App.option6e = localStorage.getItem("option6e");
$App.question7 = localStorage.getItem("question7");
$App.option7a = localStorage.getItem("option7a");
$App.option7b = localStorage.getItem("option7b");
$App.option7c = localStorage.getItem("option7c");
$App.option7d = localStorage.getItem("option7d");
$App.option7e = localStorage.getItem("option7e");
$App.question8 = localStorage.getItem("question8");
$App.option8a = localStorage.getItem("option8a");
$App.option8b = localStorage.getItem("option8b");
$App.option8c = localStorage.getItem("option8c");
$App.option8d = localStorage.getItem("option8d");
$App.option8e = localStorage.getItem("option8e");
$App.question9 = localStorage.getItem("question9");
$App.option9a = localStorage.getItem("option9a");
$App.option9b = localStorage.getItem("option9b");
$App.option9c = localStorage.getItem("option9c");
$App.option9d = localStorage.getItem("option9d");
$App.option9e = localStorage.getItem("option9e");
$App.question10 = localStorage.getItem("question10");
$App.option10a = localStorage.getItem("option10a");
$App.option10b = localStorage.getItem("option10b");
$App.option10c = localStorage.getItem("option10c");
$App.option10d = localStorage.getItem("option10d");
$App.option10e = localStorage.getItem("option10e");
$App.question11 = localStorage.getItem("question11");
$App.option11a = localStorage.getItem("option11a");
$App.option11b = localStorage.getItem("option11b");
$App.option11c = localStorage.getItem("option11c");
$App.option11d = localStorage.getItem("option11d");
$App.option11e = localStorage.getItem("option11e");
$App.question12 = localStorage.getItem("question12");
$App.option12a = localStorage.getItem("option12a");
$App.option12b = localStorage.getItem("option12b");
$App.option12c = localStorage.getItem("option12c");
$App.option12d = localStorage.getItem("option12d");
$App.option12e = localStorage.getItem("option12e");
$App.loaded = "loaded";
$scope.GotoPage( "Page01" );
$scope.GotoPage( "Home" );};
$scope.PushButton1_click = function() {$scope.GotoPage( "LandingPage" );};
});
NeoApp.controller("LandingPage_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 2;
$App.NAB.PageID = "LandingPage";
$scope.PushButton2_click = function() {$scope.GotoPage( "Home" );};
});
NeoApp.controller("Page01_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 3;
$App.NAB.PageID = "Page01";
$scope.b1_click = function() {$App.sk1 = "1";
$App.qt = "0";
$scope.HideObject("b1","",0);
$scope.HideObject("b2","",0);
$scope.HideObject("b3","",0);
$scope.HideObject("b4","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk1,-1);
$App.q1d = "Well done correct";
$scope.ShowObject("sd1","fadeIn",24);
$scope.ShowObject("next1","holeIn",80);};
$scope.b2_click = function() {$App.sk1 = "0";
$App.qt = "0";
$scope.HideObject("b1","",0);
$scope.HideObject("b2","",0);
$scope.HideObject("b3","",0);
$scope.HideObject("b4","",0);
neoGSheetsLoadCell($App.googleSheet,"q1e","g",1,null);

$App.qt = $scope.Calculate($App.qt+"+"+$App.sk1,-1);
$App.q1d = "Sorry incorrect";
$scope.ShowObject("sd1","fadeIn",24);
$scope.ShowObject("next1","holeIn",80);};
$scope.b3_click = function() {$App.sk1 = "0";
$App.qt = "0";
$scope.HideObject("b1","",0);
$scope.HideObject("b2","",0);
$scope.HideObject("b3","",0);
$scope.HideObject("b4","",0);
neoGSheetsLoadCell($App.googleSheet,"q1e","g",1,null);

$App.qt = $scope.Calculate($App.qt+"+"+$App.sk1,-1);
$App.q1d = "Sorry incorrect";
$scope.ShowObject("sd1","fadeIn",24);
$scope.ShowObject("next1","holeIn",80);};
$scope.b4_click = function() {$App.sk1 = "0";
$App.qt = "0";
$scope.HideObject("b1","",0);
$scope.HideObject("b2","",0);
$scope.HideObject("b3","",0);
$scope.HideObject("b4","",0);
neoGSheetsLoadCell($App.googleSheet,"q1e","g",1,null);

$App.qt = $scope.Calculate($App.qt+"+"+$App.sk1,-1);
$App.q1d = "Sorry incorrect";
$scope.ShowObject("sd1","fadeIn",24);
$scope.ShowObject("next1","holeIn",80);};
$scope.next1_click = function() {$scope.GotoPage( "Page02" );};
$scope.PushButton18_click = function() {$scope.GotoPage( "Home" );};
$scope.PushButton4_click = function() {$scope.ShowObject("show1","",0);
$scope.ShowObject("show2","",0);
$scope.ShowObject("show3","",0);
$scope.ShowObject("show4","",0);
$scope.ShowObject("show5","",0);
$scope.ShowObject("show6","",0);
$scope.ShowObject("show7","",0);
$scope.ShowObject("show8","",0);
$scope.ShowObject("show9","",0);
$scope.ShowObject("show10","",0);
$scope.ShowObject("show11","",0);
$scope.ShowObject("show12","",0);
$scope.ShowObject("show100","",0);};
});
NeoApp.controller("Page02_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 4;
$App.NAB.PageID = "Page02";
$scope.b5_click = function() {$App.sk2 = "0";
$scope.HideObject("b5","",0);
$scope.HideObject("b6","",0);
$scope.HideObject("b7","",0);
$scope.HideObject("b8","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk2,-1);
$App.q2d = "Sorry incorrect";
$scope.ShowObject("sd2","fadeIn",24);
$scope.ShowObject("next2","holeIn",80);};
$scope.b6_click = function() {$App.sk2 = "1";
$scope.HideObject("b5","",0);
$scope.HideObject("b6","",0);
$scope.HideObject("b7","",0);
$scope.HideObject("b8","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk2,-1);
$App.q2d = "Well done correct";
$scope.ShowObject("sd2","fadeIn",24);
$scope.ShowObject("next2","holeIn",80);};
$scope.b7_click = function() {$App.sk2 = "0";
$scope.HideObject("b5","",0);
$scope.HideObject("b6","",0);
$scope.HideObject("b7","",0);
$scope.HideObject("b8","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk2,-1);
$App.q2d = "Sorry incorrect";
$scope.ShowObject("sd2","fadeIn",24);
$scope.ShowObject("next2","holeIn",80);};
$scope.b8_click = function() {$App.sk2 = "0";
$scope.HideObject("b5","",0);
$scope.HideObject("b6","",0);
$scope.HideObject("b7","",0);
$scope.HideObject("b8","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk2,-1);
$App.q1d = "Sorry incorrect";
$scope.ShowObject("sd2","fadeIn",24);
$scope.ShowObject("next2","holeIn",80);};
$scope.next2_click = function() {$scope.GotoPage( "Page03" );};
$scope.PushButton19_click = function() {$scope.GotoPage( "Home" );};
});
NeoApp.controller("Page03_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 5;
$App.NAB.PageID = "Page03";
$scope.b9_click = function() {$App.sk3 = "0";
$scope.HideObject("b9","",0);
$scope.HideObject("b10","",0);
$scope.HideObject("b11","",0);
$scope.HideObject("b12","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk3,-1);
$App.q3d = "Sorry incorrect";
$scope.ShowObject("sd3","fadeIn",24);
$scope.ShowObject("next3","holeIn",80);};
$scope.b10_click = function() {$App.sk3 = "1";
$scope.HideObject("b9","",0);
$scope.HideObject("b10","",0);
$scope.HideObject("b11","",0);
$scope.HideObject("b12","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk3,-1);
$App.q3d = "Well done correct";
$scope.ShowObject("sd3","fadeIn",24);
$scope.ShowObject("next3","holeIn",80);};
$scope.b11_click = function() {$App.sk3 = "0";
$scope.HideObject("b9","",0);
$scope.HideObject("b10","",0);
$scope.HideObject("b11","",0);
$scope.HideObject("b12","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk3,-1);
$App.q3d = "Sorry incorrect";
$scope.ShowObject("sd3","fadeIn",24);
$scope.ShowObject("next3","holeIn",80);};
$scope.b12_click = function() {$App.sk3 = "0";
$scope.HideObject("b9","",0);
$scope.HideObject("b10","",0);
$scope.HideObject("b11","",0);
$scope.HideObject("b12","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk3,-1);
$App.q3d = "Sorry incorrect";
$scope.ShowObject("sd3","fadeIn",24);
$scope.ShowObject("next3","holeIn",80);};
$scope.next3_click = function() {$scope.GotoPage( "Page04" );};
$scope.PushButton20_click = function() {$scope.GotoPage( "Home" );};
});
NeoApp.controller("Page04_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 6;
$App.NAB.PageID = "Page04";
$scope.b13_click = function() {$App.sk4 = "0";
$scope.HideObject("b13","",0);
$scope.HideObject("b14","",0);
$scope.HideObject("b15","",0);
$scope.HideObject("b16","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk4,-1);
$App.q4d = "Sorry incorrect";
$scope.ShowObject("sd4","fadeIn",24);
$scope.ShowObject("next4","holeIn",80);};
$scope.b14_click = function() {$App.sk4 = "0";
$scope.HideObject("b13","",0);
$scope.HideObject("b14","",0);
$scope.HideObject("b15","",0);
$scope.HideObject("b16","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk4,-1);
$App.q4d = "Sorry incorrect";
$scope.ShowObject("sd4","fadeIn",24);
$scope.ShowObject("next4","holeIn",80);};
$scope.b15_click = function() {$App.sk4 = "0";
$scope.HideObject("b13","",0);
$scope.HideObject("b14","",0);
$scope.HideObject("b15","",0);
$scope.HideObject("b16","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk3,-1);
$App.q4d = "Sorry incorrect";
$scope.ShowObject("sd4","fadeIn",24);
$scope.ShowObject("next4","holeIn",80);};
$scope.b16_click = function() {$App.sk4 = "1";
$scope.HideObject("b13","",0);
$scope.HideObject("b14","",0);
$scope.HideObject("b15","",0);
$scope.HideObject("b16","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk4,-1);
$App.q4d = "Well done correct";
$scope.ShowObject("sd4","fadeIn",24);
$scope.ShowObject("next4","holeIn",80);};
$scope.next4_click = function() {$scope.GotoPage( "Page05" );};
$scope.PushButton21_click = function() {$scope.GotoPage( "Home" );};
});
NeoApp.controller("Page05_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 7;
$App.NAB.PageID = "Page05";
$scope.b22_click = function() {$App.sk5 = "0";
$scope.HideObject("b21","",0);
$scope.HideObject("b22","",0);
$scope.HideObject("b23","",0);
$scope.HideObject("b24","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk5,-1);
$App.q5d = "Sorry incorrect";
$scope.ShowObject("sd5","fadeIn",24);
$scope.ShowObject("next5","holeIn",80);};
$scope.b23_click = function() {$App.sk5 = "0";
$scope.HideObject("b21","",0);
$scope.HideObject("b22","",0);
$scope.HideObject("b23","",0);
$scope.HideObject("b24","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk5,-1);
$App.q5d = "Sorry incorrect";
$scope.ShowObject("sd5","fadeIn",24);
$scope.ShowObject("next5","holeIn",80);};
$scope.b24_click = function() {$App.sk5 = "0";
$scope.HideObject("b21","",0);
$scope.HideObject("b22","",0);
$scope.HideObject("b23","",0);
$scope.HideObject("b24","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk5,-1);
$App.q5d = "Sorry incorrect";
$scope.ShowObject("sd5","fadeIn",24);
$scope.ShowObject("next5","holeIn",80);};
$scope.next5_click = function() {$scope.GotoPage( "Page06" );};
$scope.PushButton22_click = function() {$scope.GotoPage( "Home" );};
$scope.b21_click = function() {$App.sk5 = "1";
$scope.HideObject("b21","",0);
$scope.HideObject("b22","",0);
$scope.HideObject("b23","",0);
$scope.HideObject("b24","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk5,-1);
$App.q5d = "Well done correct";
$scope.ShowObject("sd5","fadeIn",24);
$scope.ShowObject("next5","holeIn",80);};
});
NeoApp.controller("Page06_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 8;
$App.NAB.PageID = "Page06";
$scope.b25_click = function() {$App.sk6 = "0";
$scope.HideObject("b25","",0);
$scope.HideObject("b26","",0);
$scope.HideObject("b27","",0);
$scope.HideObject("b28","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk6,-1);
$App.q6d = "Sorry incorrect";
$scope.ShowObject("sd6","fadeIn",24);
$scope.ShowObject("next6","holeIn",80);};
$scope.b26_click = function() {$App.sk6 = "0";
$scope.HideObject("b25","",0);
$scope.HideObject("b26","",0);
$scope.HideObject("b27","",0);
$scope.HideObject("b28","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk6,-1);
$App.q6d = "Sorry incorrect";
$scope.ShowObject("sd6","fadeIn",24);
$scope.ShowObject("next6","holeIn",80);};
$scope.b27_click = function() {$App.sk6 = "0";
$scope.HideObject("b25","",0);
$scope.HideObject("b26","",0);
$scope.HideObject("b27","",0);
$scope.HideObject("b28","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk6,-1);
$App.q6d = "Sorry incorrect";
$scope.ShowObject("sd6","fadeIn",24);
$scope.ShowObject("next6","holeIn",80);};
$scope.b28_click = function() {$App.sk6 = "1";
$scope.HideObject("b25","",0);
$scope.HideObject("b26","",0);
$scope.HideObject("b27","",0);
$scope.HideObject("b28","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk6,-1);
$App.q6d = "Well done correct";
$scope.ShowObject("sd6","fadeIn",24);
$scope.ShowObject("next6","holeIn",80);};
$scope.next6_click = function() {$scope.GotoPage( "Page07" );};
$scope.PushButton23_click = function() {$scope.GotoPage( "Home" );};
});
NeoApp.controller("Page07_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 9;
$App.NAB.PageID = "Page07";
$scope.b29_click = function() {$App.sk7 = "0";
$scope.HideObject("b29","",0);
$scope.HideObject("b30","",0);
$scope.HideObject("b31","",0);
$scope.HideObject("b32","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk7,-1);
$App.q7d = "Sorry incorrect";
$scope.ShowObject("sd7","fadeIn",24);
$scope.ShowObject("next7","holeIn",80);};
$scope.b30_click = function() {$App.sk7 = "0";
$scope.HideObject("b29","",0);
$scope.HideObject("b30","",0);
$scope.HideObject("b31","",0);
$scope.HideObject("b32","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk7,-1);
$App.q7d = "Sorry incorrect";
$scope.ShowObject("sd7","fadeIn",24);
$scope.ShowObject("next7","holeIn",80);};
$scope.b31_click = function() {$App.sk7 = "0";
$scope.HideObject("b29","",0);
$scope.HideObject("b30","",0);
$scope.HideObject("b31","",0);
$scope.HideObject("b32","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk7,-1);
$App.q7d = "Sorry incorrect";
$scope.ShowObject("sd7","fadeIn",24);
$scope.ShowObject("next7","holeIn",80);};
$scope.b32_click = function() {$App.sk7 = "1";
$scope.HideObject("b29","",0);
$scope.HideObject("b30","",0);
$scope.HideObject("b31","",0);
$scope.HideObject("b32","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk7,-1);
$App.q7d = "Well done correct";
$scope.ShowObject("sd7","fadeIn",24);
$scope.ShowObject("next7","holeIn",80);};
$scope.next7_click = function() {$scope.GotoPage( "Page08" );};
$scope.PushButton24_click = function() {$scope.GotoPage( "Home" );};
});
NeoApp.controller("Page08_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 10;
$App.NAB.PageID = "Page08";
$scope.b33_click = function() {$App.sk8 = "1";
$scope.HideObject("b33","",0);
$scope.HideObject("b34","",0);
$scope.HideObject("b35","",0);
$scope.HideObject("b36","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk8,-1);
$App.q8d = "Well done correct";
$scope.ShowObject("sd8","fadeIn",24);
$scope.ShowObject("next8","holeIn",80);};
$scope.b34_click = function() {$App.sk8 = "0";
$scope.HideObject("b33","",0);
$scope.HideObject("b34","",0);
$scope.HideObject("b35","",0);
$scope.HideObject("b36","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk8,-1);
$App.q8d = $App.option8f;
$App.q8d = "Sorry incorrect";
$scope.ShowObject("sd8","fadeIn",24);
$scope.ShowObject("next8","holeIn",80);};
$scope.b35_click = function() {$App.sk8 = "0";
$scope.HideObject("b33","",0);
$scope.HideObject("b34","",0);
$scope.HideObject("b35","",0);
$scope.HideObject("b36","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk8,-1);
$App.q8d = "Sorry incorrect";
$scope.ShowObject("sd8","fadeIn",24);
$scope.ShowObject("next8","holeIn",80);};
$scope.b36_click = function() {$App.sk8 = "0";
$scope.HideObject("b33","",0);
$scope.HideObject("b34","",0);
$scope.HideObject("b35","",0);
$scope.HideObject("b36","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk8,-1);
$App.q8d = "Sorry incorrect";
$scope.ShowObject("sd8","fadeIn",24);
$scope.ShowObject("next8","holeIn",80);};
$scope.next8_click = function() {$scope.GotoPage( "Page09" );};
$scope.PushButton25_click = function() {$scope.GotoPage( "Home" );};
});
NeoApp.controller("Page09_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 11;
$App.NAB.PageID = "Page09";
$scope.b37_click = function() {$App.sk9 = "1";
$scope.HideObject("b37","",0);
$scope.HideObject("b38","",0);
$scope.HideObject("b39","",0);
$scope.HideObject("b40","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk9,-1);
$App.q9d = "Well done correct";
$scope.ShowObject("sd9","fadeIn",24);
$scope.ShowObject("next9","holeIn",80);};
$scope.b38_click = function() {$App.sk9 = "0";
$scope.HideObject("b37","",0);
$scope.HideObject("b38","",0);
$scope.HideObject("b39","",0);
$scope.HideObject("b40","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk9,-1);
$App.q9d = "Sorry incorrect";
$scope.ShowObject("sd9","fadeIn",24);
$scope.ShowObject("next9","holeIn",80);};
$scope.b39_click = function() {$App.sk9 = "0";
$scope.HideObject("b37","",0);
$scope.HideObject("b38","",0);
$scope.HideObject("b39","",0);
$scope.HideObject("b40","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk3,-1);
$App.q9d = "Sorry incorrect";
$scope.ShowObject("sd9","fadeIn",24);
$scope.ShowObject("next9","holeIn",80);};
$scope.b40_click = function() {$App.sk9 = "0";
$scope.HideObject("b37","",0);
$scope.HideObject("b38","",0);
$scope.HideObject("b39","",0);
$scope.HideObject("b40","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk3,-1);
$App.q9d = "Sorry incorrect";
$scope.ShowObject("sd9","fadeIn",24);
$scope.ShowObject("next9","holeIn",80);};
$scope.next9_click = function() {$scope.GotoPage( "Page10" );};
$scope.PushButton26_click = function() {$scope.GotoPage( "Home" );};
});
NeoApp.controller("Page10_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 12;
$App.NAB.PageID = "Page10";
$scope.b41_click = function() {$App.sk10 = "0";
$scope.HideObject("b41","",0);
$scope.HideObject("b42","",0);
$scope.HideObject("b43","",0);
$scope.HideObject("b44","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk10,-1);
$App.q10d = "Sorry incorrect";
$scope.ShowObject("sd10","fadeIn",24);
$scope.ShowObject("next10","holeIn",80);};
$scope.b42_click = function() {$App.sk10 = "1";
$scope.HideObject("b41","",0);
$scope.HideObject("b42","",0);
$scope.HideObject("b43","",0);
$scope.HideObject("b44","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk10,-1);
$App.q10d = "Well done correct";
$scope.ShowObject("sd10","fadeIn",24);
$scope.ShowObject("next10","holeIn",80);};
$scope.b43_click = function() {$App.sk10 = "0";
$scope.HideObject("b41","",0);
$scope.HideObject("b42","",0);
$scope.HideObject("b43","",0);
$scope.HideObject("b44","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk10,-1);
$App.q10d = "Sorry incorrect";
$scope.ShowObject("sd10","fadeIn",24);
$scope.ShowObject("next10","holeIn",80);};
$scope.b44_click = function() {$App.sk10 = "0";
$scope.HideObject("b41","",0);
$scope.HideObject("b42","",0);
$scope.HideObject("b43","",0);
$scope.HideObject("b44","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk10,-1);
$App.q10d = "Sorry incorrect";
$scope.ShowObject("sd10","fadeIn",24);
$scope.ShowObject("next10","holeIn",80);};
$scope.next10_click = function() {$scope.GotoPage( "Page11" );};
$scope.PushButton27_click = function() {$scope.GotoPage( "Home" );};
});
NeoApp.controller("Page11_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 13;
$App.NAB.PageID = "Page11";
$scope.b45_click = function() {$App.sk11 = "0";
$scope.HideObject("b45","",0);
$scope.HideObject("b46","",0);
$scope.HideObject("b47","",0);
$scope.HideObject("b48","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk11,-1);
$App.q11d = "Sorry incorrect";
$scope.ShowObject("sd11","fadeIn",24);
$scope.ShowObject("next11","holeIn",80);};
$scope.b46_click = function() {$App.sk11 = "1";
$scope.HideObject("b45","",0);
$scope.HideObject("b46","",0);
$scope.HideObject("b47","",0);
$scope.HideObject("b48","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk11,-1);
$App.q11d = "Well done correct";
$scope.ShowObject("sd11","fadeIn",24);
$scope.ShowObject("next11","holeIn",80);};
$scope.b47_click = function() {$App.sk11 = "0";
$scope.HideObject("b45","",0);
$scope.HideObject("b46","",0);
$scope.HideObject("b47","",0);
$scope.HideObject("b48","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk11,-1);
$App.q11d = "Sorry incorrect";
$scope.ShowObject("sd11","fadeIn",24);
$scope.ShowObject("next11","holeIn",80);};
$scope.b48_click = function() {$App.sk11 = "0";
$scope.HideObject("b45","",0);
$scope.HideObject("b46","",0);
$scope.HideObject("b47","",0);
$scope.HideObject("b48","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk11,-1);
$App.q11d = "Sorry incorrect";
$scope.ShowObject("sd11","fadeIn",24);
$scope.ShowObject("next11","holeIn",80);};
$scope.next11_click = function() {$scope.GotoPage( "Page12" );};
$scope.PushButton28_click = function() {$scope.GotoPage( "Home" );};
});
NeoApp.controller("Page12_Ctrl", function($scope,$rootScope,$route,$timeout,$filter,$window,$animate) {
$App.NAB.PageNumber = 14;
$App.NAB.PageID = "Page12";
$scope.b49_click = function() {$App.sk12 = "0";
$scope.HideObject("b49","",0);
$scope.HideObject("b50","",0);
$scope.HideObject("b51","",0);
$scope.HideObject("b52","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk12,-1);
$App.q12d = "Sorry incorrect";
$scope.ShowObject("sd12","fadeIn",24);
$scope.ShowObject("next12","holeIn",80);};
$scope.b50_click = function() {$App.sk12 = "0";
$scope.HideObject("b49","",0);
$scope.HideObject("b50","",0);
$scope.HideObject("b51","",0);
$scope.HideObject("b52","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk12,-1);
$App.q12d = "Sorry incorrect";
$scope.ShowObject("sd12","fadeIn",24);
$scope.ShowObject("next12","holeIn",80);};
$scope.b51_click = function() {$App.sk12 = "0";
$scope.HideObject("b49","",0);
$scope.HideObject("b50","",0);
$scope.HideObject("b51","",0);
$scope.HideObject("b52","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk12,-1);
$App.q12d = "Sorry incorrect";
$scope.ShowObject("sd12","fadeIn",24);
$scope.ShowObject("next12","holeIn",80);};
$scope.b52_click = function() {$App.sk12 = "1";
$scope.HideObject("b49","",0);
$scope.HideObject("b50","",0);
$scope.HideObject("b51","",0);
$scope.HideObject("b52","",0);
$App.qt = $scope.Calculate($App.qt+"+"+$App.sk12,-1);
$App.q12d = "Well done correct";
$scope.ShowObject("sd12","fadeIn",24);
$scope.ShowObject("next12","holeIn",80);};
$scope.next12_click = function() {if ($App.Quiz == "This is Quiz one") {
$App.qt1 = $App.qt;
} else {
};
if ($App.Quiz == "This is Quiz Two") {
$App.qt2 = $App.qt;
} else {
};
if ($App.Quiz == "This is Quiz Three") {
$App.qt3 = $App.qt;
} else {
};
$scope.GotoPage( "Home" );};
$scope.PushButton29_click = function() {$scope.GotoPage( "Home" );};
});
NeoApp.controller("NewDialog_Ctrl", function($scope,$rootScope,$modalInstance,$filter,$window) {
 $scope.CloseDialog = function() {
  $modalInstance.close();
 };
});
function neoGSheetsLoad(gsheets,theArray,sqlquery,subroutine){$App[theArray]=new Array();sheetrock({url:gsheets,query:sqlquery,fetchSize:0,reset:true,callback:function(error,options,response){if(error!=null){console.log("neoGSheetsLoad error: "+error,options,response);if(subroutine){subroutine(error,options,response);}}else{for(n=0;n<response.rows.length;n++){$App[theArray][n]=new Object();for(i=0;i<response.rows[n].cellsArray.length;i++){etiqueta=response.rows[n].labels[i];$App[theArray][n][etiqueta]=response.rows[n].cellsArray[i];}}if(subroutine){subroutine(error,options,response);}}}});};function neoGSheetsLoadColumn(gsheets,theArray,columnLetter,subroutine){$App[theArray]=new Array();columnLetter=columnLetter.toUpperCase();sheetrock({url:gsheets,query:"select "+columnLetter,fetchSize:0,reset:true,callback:function(error,options,response){if(error!=null){console.log("neoGSheetsLoadColumn error: "+error,options,response);if(subroutine){subroutine(error,options,response);}}else{for(n=1;n<response.rows.length;n++){$App[theArray][n-1]=response.rows[n].cellsArray[0];}if(subroutine){subroutine(error,options,response);}}}});};function neoGSheetsLoadCell(gsheets,myVar,columnLetter,rowNumber,subroutine){rowNumber--;columnLetter=columnLetter.toUpperCase();sheetrock({url:gsheets,query:"select "+columnLetter,fetchSize:0,reset:true,callback:function(error,options,response){if(error!=null){console.log("neoGSheetsLoadCell error: "+error,options,response);if(subroutine){subroutine(error,options,response);}}else{$App[myVar]=response.rows[rowNumber].cellsArray[0];if(subroutine){subroutine(error,options,response);}}}});};function neoGSheetsLoadAsTable(objId,gsheets,sqlquery,subroutine){$('#'+objId).html('<table id="'+objId+'neoGSheets" class="table table-striped"></table>');$('#'+objId+'neoGSheets').sheetrock({url:gsheets,fetchSize:0,reset:true,query:sqlquery,callback:function(error,options,response){if(error!=null){console.log("neoGSheetsLoadAsTable error: "+error,options,response);if(subroutine){subroutine(error,options,response);}}else if(subroutine){subroutine(error,options,response);}}});};function neoGSheetsLoadByName(gsheets,theArray,fieldPrefix,sqlquery,subroutine){console.log("neoGSheetsLoadByName - ");sheetrock({url:gsheets,query:"select *",fetchSize:1,reset:true,callback:function(error,options,response){if(error!=null){console.log("neoGSheetsLoadByName error: "+error,options,response);if(subroutine){subroutine(error,options,response);}}else{columnIDStr1="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,";columnIDStr2="AA,AB,AC,AD,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO,AP,AQ,AR,AS,AT,AU,AV,AW,AX,AY,AZ,";columnIDStr3="BA,BB,BC,BD,BE,BF,BG,BH,BI,BJ,BK,BL,BM,BN,BO,BP,BQ,BR,BS,BT,BU,BV,BW,BX,BY,BZ";columnIDStr=columnIDStr1+columnIDStr2+columnIDStr3;columnIDArray=columnIDStr.split(",");for(i=0;i<response.rows[0].cellsArray.length;i++){columnID=columnIDArray[i];fieldName=response.rows[0].labels[i];console.log("neoGSheetsLoadByName column for field "+fieldName+" is "+columnID);var regexstring=fieldPrefix+fieldName;var regexp=new RegExp(regexstring,"g");sqlquery=sqlquery.replace(regexp,columnID);}console.log("neoGSheetsLoadByName sqlquery: "+sqlquery);neoGSheetsLoad(gsheets,theArray,sqlquery,subroutine);}}});};

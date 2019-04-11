

OpenLayers.DOTS_PER_INCH=96;
var ngii = {};
ngii.version = "1.0";
ngii.util = {};
ngii.util.dotGubun = function(value){
	dotStr = value.split(".");
	if (dotStr.length == 2) {
		var commaVal = ngii.util.setComma(dotStr[0]);
		commaVal = commaVal + "." + dotStr[1];
	} else {
		commaVal = ngii.util.setComma(dotStr[0]);
	}
	return commaVal;
};
ngii.util.setComma = function(value){ 
	var temp_str = String(value);
	for(var i = 0 , retValue = String() , stop = temp_str.length; i < stop ; i++)
		retValue = ((i%3) == 0) && i != 0 ? temp_str.charAt((stop - i) -1) + "," + retValue : temp_str.charAt((stop - i) -1) + retValue; 
	return retValue; 
};
ngii.util.fillzero = function(n, digits) { 
	var zero = '';
	n = n.toString();
	if (digits > n.length) {
		for (var i = 0; digits - n.length > i; i++) {
			zero += '0';
		}
	}
	return zero + n;
};
ngii.util.to_charFM = function(strNum, jarisu, fillChar){
	if(!fillChar)fillChar = "0";
   	var intNum = 0;
   	try {intNum = parseInt(strNum);}catch(e){return strNum;}
   	strNum = intNum+"";
   	var strNumLength = strNum.length;
   	for (var i = 0; i < jarisu-strNumLength; i++) {
   		strNum = fillChar+strNum;
	}
   	return strNum;
};
ngii.util.objMap = function(key, val){
	this.key = key;
	this.val = val;
};
ngii.mapIndex = 0;
ngii.mapObjects = [];
ngii.findMapObject = function(index){
	for(var i=0;i<ngii.mapObjects.length;i++){
		if(ngii.mapObjects[i].key==index)return ngii.mapObjects[i].val;
	}
};
ngii.map = function(objId, options){
	if(!objId||typeof objId!="string")return;
	var mapObj = document.getElementById(objId);
	var ngiiMap = this;
	var properties = ngii.map.properties;
	
	var mapMode = 0;
	var initCenter = properties.initCenter;
	var initZoom = properties.initZoom;
	var initLayers = [];
	for(var i=0;i<properties.tileUrls.length;i++){
		initLayers.push(new OpenLayers.Layer.TMS(properties.tileNames_en[i],properties.tileUrls[i], properties.baseLayerOptions));
	}
	var initControls = [];
	
	if(options){
		if(options.mapMode){
			mapMode = options.mapMode;
			delete options.mapMode;
		}
		if(options.center){
			initCenter = options.center;
			delete options.center;
		}
		if(options.zoom){
			initZoom = options.zoom;
			delete options.zoom;
		}
		if(options.layers){
			for(var i=0;i<options.layers.length;i++){
				initLayers.push(options.layers[i]);
			}
			delete options.layers;
		}
		if(options.controls){
			for(var i=0;i<options.controls.length;i++){
				initControls.push(options.controls[i]);
			}
			delete options.controls;
		}
	}

	var initOptions = {
		controls : initControls,
		layers : initLayers,
		maxExtent: new OpenLayers.Bounds(-200000.0, -3015.4524155292 , 3803015.45241553, 4000000.0),
		eventListeners: {}
	};
	initOptions = $.extend({}, initOptions, options);
	var map = new OpenLayers.Map(objId, initOptions);

	var mapIndex = ngii.mapIndex++;
	ngii.mapObjects.push(new ngii.util.objMap(mapIndex, this));
	
	map.setBaseLayer(initLayers[mapMode]);
	map.setCenter(initCenter, initZoom);

	this._getMap = function(){
		return map;
	};
	this._setMapMode = function(mode){
		mapMode = mode;
		map.setBaseLayer(map.layers[mode]);
	};
	this._getMapMode = function(){
		return mapMode;
	};
	this._addDefaultMapModeBox = function(options){
		mapObj.style.position = "relative";
		var boxId = "ngiimap_mapmodebox_"+mapIndex;
		var boxClass = "ngiimap_mapmodebox";
		var boxObj= document.getElementById(boxId);
		
		if(!boxObj){
			var tileNames_ko = ngii.map.properties.tileNames_ko;
			boxObj = document.createElement("div");
			boxObj.id=boxId;
			boxObj.className = boxClass;
			boxObj.style.width="230px";
			boxObj.style.height="105px";
			boxObj.style.position="absolute";
			boxObj.style.top="35px";
			boxObj.style.right="15px";
			boxObj.style.zIndex="1000000";
			var emapUrl = ngii.map.properties.emapUrl;
			var chkdHtml = mapMode==0?"chkd_":"";
			var html="<div style=\"width:56px;height:52px;float:left;\">";
			html+="<a href=\"javascript:ngii.findMapObject("+mapIndex+")._setMapMode(0);ngii.map.mapModeBoxClick('"+boxId+"', 0);\" title=\""+tileNames_ko[0]+"\">";
			html+="<img src=\""+emapUrl+"/images/design/btCircle_"+chkdHtml+"off_01.png\" onmouseover=\"this.src=this.src.replace('_off','_on')\" onmouseout=\"this.src=this.src.replace('_on','_off')\" border=\"0\"/></a>";
			html+="</div>";
			chkdHtml = mapMode==1?"chkd_":"";
			html+="<div style=\"width:56px;height:52px;float:left;\">";
			html+="<a href=\"javascript:ngii.findMapObject("+mapIndex+")._setMapMode(1);ngii.map.mapModeBoxClick('"+boxId+"', 1);\" title=\""+tileNames_ko[1]+"\">";
			html+="<img src=\""+emapUrl+"/images/design/btCircle_"+chkdHtml+"off_02.png\" onmouseover=\"this.src=this.src.replace('_off','_on')\" onmouseout=\"this.src=this.src.replace('_on','_off')\" border=\"0\"/></a>";
			html+="</div>";
			chkdHtml = mapMode==2?"chkd_":"";
			html+="<div style=\"width:56px;height:52px;float:left;\">";
			html+="<a href=\"javascript:ngii.findMapObject("+mapIndex+")._setMapMode(2);ngii.map.mapModeBoxClick('"+boxId+"', 2);\" title=\""+tileNames_ko[2]+"\">";
			html+="<img src=\""+emapUrl+"/images/design/btCircle_"+chkdHtml+"off_03.png\" onmouseover=\"this.src=this.src.replace('_off','_on')\" onmouseout=\"this.src=this.src.replace('_on','_off')\" border=\"0\"/></a>";
			html+="</div>";
			chkdHtml = mapMode==4?"chkd_":"";
			html+="<div style=\"width:56px;height:52px;float:left;\">";
			html+="<a href=\"javascript:ngii.findMapObject("+mapIndex+")._setMapMode(4);ngii.map.mapModeBoxClick('"+boxId+"', 4);\" title=\""+tileNames_ko[4]+"\">";
			html+="<img src=\""+emapUrl+"/images/design/btCircle_"+chkdHtml+"off_05.png\" onmouseover=\"this.src=this.src.replace('_off','_on')\" onmouseout=\"this.src=this.src.replace('_on','_off')\" border=\"0\"/></a>";
			html+="</div>";
			chkdHtml = mapMode==3?"chkd_":"";
			html+="<div style=\"width:56px;height:52px;float:left;\">";
			html+="<a href=\"javascript:ngii.findMapObject("+mapIndex+")._setMapMode(3);ngii.map.mapModeBoxClick('"+boxId+"', 3);\" title=\""+tileNames_ko[3]+"\">";
			html+="<img src=\""+emapUrl+"/images/design/btCircle_"+chkdHtml+"off_04.png\" onmouseover=\"this.src=this.src.replace('_off','_on')\" onmouseout=\"this.src=this.src.replace('_on','_off')\" border=\"0\"/></a>";
			html+="</div>";
			chkdHtml = mapMode==5?"chkd_":"";
			html+="<div style=\"width:56px;height:52px;float:left;\">";
			html+="<a href=\"javascript:ngii.findMapObject("+mapIndex+")._setMapMode(5);ngii.map.mapModeBoxClick('"+boxId+"', 5);\" title=\""+tileNames_ko[5]+"\">";
			html+="<img src=\""+emapUrl+"/images/design/btCircle_"+chkdHtml+"off_06.png\" onmouseover=\"this.src=this.src.replace('_off','_on')\" onmouseout=\"this.src=this.src.replace('_on','_off')\" border=\"0\"/></a>";
			html+="</div>";
			chkdHtml = mapMode==6?"chkd_":"";
			html+="<div style=\"width:56px;height:52px;float:left;\">";
			html+="<a href=\"javascript:ngii.findMapObject("+mapIndex+")._setMapMode(6);ngii.map.mapModeBoxClick('"+boxId+"', 6);\" title=\""+tileNames_ko[6]+"\">";
			html+="<img src=\""+emapUrl+"/images/design/btCircle_"+chkdHtml+"off_07.png\" onmouseover=\"this.src=this.src.replace('_off','_on')\" onmouseout=\"this.src=this.src.replace('_on','_off')\" border=\"0\"/></a>";
			html+="</div>";
			chkdHtml = mapMode==7?"chkd_":"";
			html+="<div style=\"width:56px;height:52px;float:left;\">";
			html+="<a href=\"javascript:ngii.findMapObject("+mapIndex+")._setMapMode(7);ngii.map.mapModeBoxClick('"+boxId+"', 7);\" title=\""+tileNames_ko[7]+"\">";
			html+="<img src=\""+emapUrl+"/images/design/btCircle_"+chkdHtml+"off_08.png\" onmouseover=\"this.src=this.src.replace('_off','_on')\" onmouseout=\"this.src=this.src.replace('_on','_off')\" border=\"0\"/></a>";
			html+="</div>";
			boxObj.innerHTML = html;
			mapObj.appendChild(boxObj);
		}
		if(options){
			if(options.top){
				boxObj.style.top=options.top;boxObj.style.bottom="";
			}
			if(options.bottom){
				boxObj.style.bottom=options.bottom;boxObj.style.top="";
			}
			if(options.left){
				boxObj.style.left=options.left;boxObj.style.right="";
			}
			if(options.right){
				boxObj.style.right=options.right;boxObj.style.left="";
			}
		}
	};
	
	/** 현재맵의 설정을 대상맵에 일치시킨다. */
	this._synchronize = function(toMaps){
		var zoom = map.getZoom();
		var center = map.getCenter();
		for(var i=0;i<toMaps.length;i++){
			toMaps[i].setCenter(center, zoom);
		}
	};
	/** 대상맵의 설정을 현재맴에 일치시킨다. */
	this._synchronizeWith = function(fromMap){
		map.setCenter(fromMap.getCenter(), fromMap.getZoom());
	};
	/** 지도상의 팝업을 모두 제거한다. */
	this._clearPopup = function(){
		try { 
			for ( var i = 0; i < map.popups.length; i++) {
				var tmpPop = map.popups[i];
				map.removePopup(tmpPop);
				tmpPop.destroy();
				i--;
			}
		} catch (e) {
		}
	};

	/** 기본 Control 추가 */
	map.addControl(new OpenLayers.Control.Navigation({dragPanOptions: {enableKinetic: false}}));
	map.addControl(new OpenLayers.Control.Attribution({	separator : " "	}));
	
	var controls = [];
	this._addControl = function(key, control){
		var obj = new ngii.util.objMap(key, control);
		controls.push(obj);
		map.addControl(control);
	};
	this._getControl = function(key){
		for(var i=0;i<controls.length;i++){
			if(controls[i].key == key)return controls[i].val;
		}
	};
	/** 키값을 가지고 대상 컨트롤을 활성화한다. */
	this._mapControl = function(key) {
		for(var i=0;i<controls.length;i++){
			controls[i].val.deactivate();
		}
		ngiiMap._clearPopup();
		var control = ngiiMap._getControl(key);
		if(control)
		control.activate();
	};
	
	/** 메져 콘트롤 measure Control 이하 */
	this._addDefaultMeasureControl = function(){
		var lonLatPosition;
		var measurePopupId = "measurePopup"+mapIndex;
		var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
		renderer = (renderer) ? [ renderer ] : OpenLayers.Layer.Vector.prototype.renderers;
		var measureSymbolizers = {
			"Point" : {
				pointRadius : 5,
				graphicName : "circle",
				fillColor : "#FF9933",
				fillOpacity : 1,
				strokeWidth : 1,
				strokeOpacity : 1,
				strokeColor : "#FF9933"
			},
			"Line" : {
				strokeWidth : 2,
				strokeOpacity : 1,
				strokeColor : "#FF9933",
				strokeDashstyle : ""
			},
			"Polygon" : {
				strokeWidth : 2,
				strokeOpacity : 1,
				strokeColor : "#cc9999",
				fillColor : "#ee9900",
				fillOpacity : 0.2
			}
		};
		var measureStyle = new OpenLayers.Style();
		measureStyle.addRules([ new OpenLayers.Rule({
			symbolizer : measureSymbolizers
		}) ]);
		var measureOption = {
			handlerOptions : {
				style : "default",
				layerOptions : {styleMap : new OpenLayers.StyleMap({"default" : measureStyle})},
				renderers : renderer,
				persist : true
			}
		};
	
		var measureControl1 = new OpenLayers.Control.Measure(OpenLayers.Handler.Path, measureOption);
		var measureControl2 = new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, measureOption);
		measureControl1.events.on({
			"measure" : handleMeasurements_end,
			"measurepartial" : handleMeasurements_start
		});
		measureControl2.events.on({
			"measure" : handleMeasurements_end,
			"measurepartial" : handleMeasurements_start
		});
		ngiiMap._addControl("measure_distance", measureControl1);
		ngiiMap._addControl("measure_area", measureControl2);
		map.events.register("mousemove", map, function(e) {
			lonLatPosition = map.getLonLatFromPixel(e.xy);
		});
		function handleMeasurements_start(event) {
			ngiiMap._clearPopup();
		}
		function handleMeasurements_end(event) {
			ngiiMap._clearPopup();
			var units = event.units;
			var order = event.order;
			var measure = event.measure;
			var out = "";
			var result=ngii.util.dotGubun(measure.toFixed(1));
			var widthSize=result.length*10;
			if (order == 1) {
				out += "<table height='33px' style='width:100%;background-color:#1A2A51; background-repeat:no-repeat;'> ";
				out += "<tr><td style='padding:0px 8px 0px 4px;'>";
				out += "<table cellspacing='0' cellpadding='0' border='0' width='100%' align='center'>";
				out += "<tr><td style='text-align: right;'><font face='\"Open Sans\", sans-serif' size='2' color='white'>"
						+ result
						+ " "
						+ units
						+ "</font>"
						+ "</td>";
				out += "</tr></table>";
				out += "</tr></table>";
			} else {
				out += "<table height='33px' style='width:100%;background-color:#1A2A51; background-repeat:no-repeat;'> ";
				out += "<tr><td style='padding:0px 8px 0px 4px;'>";
				out += "<table cellspacing='0' cellpadding='0' border='0' width='100%' align='center'>";
				out += "<tr><td style='text-align: right;'><font face='\"Open Sans\", sans-serif' size='2' color='white'>"
						+ result
						+ " "
						+ units
						+ "<sup>2</font></td>";
				out += "</tr></table>";
				out += "</tr></table>";
			}
			out +="<div onclick=\"ngii.findMapObject("+mapIndex+")._clearPopup();\" style=\"width:20px;height:20px;position:absolute;right:-10px;top:-10px;overflow:visible;background:url('"+ngii.map.properties.emapUrl+"/js/map/theme/default/img/close.gif') no-repeat;cursor:pointer;\"></div>";
	
			popup = new OpenLayers.Popup(measurePopupId, new OpenLayers.LonLat(lonLatPosition.lon, lonLatPosition.lat), 
					new OpenLayers.Size(widthSize, 24), out, true);
	
			map.addPopup(popup);
			// 크롬에서 스크롤 생길때.. 이걸 해주면 없어진다.
			$('#'+measurePopupId+"_contentDiv").attr('style', 'whidth:'+widthSize+'px; overflow:hidden; background-color:none;');
			$('#'+measurePopupId+"_GroupDiv").attr('style', 'overflow:hidden; background-color:none;');
	
			$('#'+measurePopupId).css('background', 'none');
			$('#'+measurePopupId).css('overflow', 'visible');
			$('#'+measurePopupId+"_close").css('display', 'none');
		}
	};
	
	/** OpenLayers.Map 클래스의 속성과 메소드로 연결 ngii.map 객체에서 접근하였을때 OpenLayers.Map 객체로 연결 (이하 내용은 www.openlayers.org 의 api document 문서에 정의된 것들이다.) */
	this.events           =map.events           ;
	this.allOverlays      =map.allOverlays      ;
	this.div              =map.div              ;
	this.layers           =map.layers           ;
	this.controls         =map.controls         ;
	this.baseLayer        =map.baseLayer        ;
	this.options          =map.options          ;
	this.tileSize         =map.tileSize         ;
	this.projection       =map.projection       ;
	this.units            =map.units            ;
	this.resolutions      =map.resolutions      ;
	this.maxResolution    =map.maxResolution    ;
	this.minResolution    =map.minResolution    ;
	this.maxScale         =map.maxScale         ;
	this.minScale         =map.minScale         ;
	this.maxExtent        =map.maxExtent        ;
	this.minExtent        =map.minExtent        ;
	this.restrictedExtent =map.restrictedExtent ;
	this.numZoomLevels    =map.numZoomLevels    ;
	this.theme            =map.theme            ;
	this.displayProjection=map.displayProjection;
	this.tileManager      =map.tileManager      ;
	this.fallThrough      =map.fallThrough      ;
	this.autoUpdateSize   =map.autoUpdateSize   ;
	this.eventListeners   =map.eventListeners   ;
	this.panMethod        =map.panMethod        ;
	this.zoomMethod       =map.zoomMethod       ;
	this.getViewport             =function(){return map.getViewport             .apply(map, arguments);};
	this.render                  =function(){return map.render                  .apply(map, arguments);};
	this.destroy                 =function(){return map.destroy                 .apply(map, arguments);};
	this.setOptions              =function(){return map.setOptions              .apply(map, arguments);};
	this.getTileSize             =function(){return map.getTileSize             .apply(map, arguments);};
	this.getBy                   =function(){return map.getBy                   .apply(map, arguments);};
	this.getLayersBy             =function(){return map.getLayersBy             .apply(map, arguments);};
	this.getLayersByName         =function(){return map.getLayersByName         .apply(map, arguments);};
	this.getLayersByClass        =function(){return map.getLayersByClass        .apply(map, arguments);};
	this.getControlsBy           =function(){return map.getControlsBy           .apply(map, arguments);};
	this.getControlsByClass      =function(){return map.getControlsByClass      .apply(map, arguments);};
	this.getLayer                =function(){return map.getLayer                .apply(map, arguments);};
	this.addLayer                =function(){return map.addLayer                .apply(map, arguments);};
	this.addLayers               =function(){return map.addLayers               .apply(map, arguments);};
	this.removeLayer             =function(){return map.removeLayer             .apply(map, arguments);};
	this.getNumLayers            =function(){return map.getNumLayers            .apply(map, arguments);};
	this.getLayerIndex           =function(){return map.getLayerIndex           .apply(map, arguments);};
	this.setLayerIndex           =function(){return map.setLayerIndex           .apply(map, arguments);};
	this.raiseLayer              =function(){return map.raiseLayer              .apply(map, arguments);};
	this.setBaseLayer            =function(){return map.setBaseLayer            .apply(map, arguments);};
	this.addControl              =function(){return map.addControl              .apply(map, arguments);};
	this.addControls             =function(){return map.addControls             .apply(map, arguments);};
	this.getControl              =function(){return map.getControl              .apply(map, arguments);};
	this.removeControl           =function(){return map.removeControl           .apply(map, arguments);};
	this.addPopup                =function(){return map.addPopup                .apply(map, arguments);};
	this.removePopup             =function(){return map.removePopup             .apply(map, arguments);};
	this.getSize                 =function(){return map.getSize                 .apply(map, arguments);};
	this.updateSize              =function(){return map.updateSize              .apply(map, arguments);};
	this.getCenter               =function(){return map.getCenter               .apply(map, arguments);};
	this.getZoom                 =function(){return map.getZoom                 .apply(map, arguments);};
	this.pan                     =function(){return map.pan                     .apply(map, arguments);};
	this.panTo                   =function(){return map.panTo                   .apply(map, arguments);};
	this.setCenter               =function(){return map.setCenter               .apply(map, arguments);};
	this.getMinZoom              =function(){return map.getMinZoom              .apply(map, arguments);};
	this.getProjection           =function(){return map.getProjection           .apply(map, arguments);};
	this.getProjectionObject     =function(){return map.getProjectionObject     .apply(map, arguments);};
	this.getMaxResolution        =function(){return map.getMaxResolution        .apply(map, arguments);};
	this.getMaxExtent            =function(){return map.getMaxExtent            .apply(map, arguments);};
	this.getNumZoomLevels        =function(){return map.getNumZoomLevels        .apply(map, arguments);};
	this.getExtent               =function(){return map.getExtent               .apply(map, arguments);};
	this.getResolution           =function(){return map.getResolution           .apply(map, arguments);};
	this.getUnits                =function(){return map.getUnits                .apply(map, arguments);};
	this.getScale                =function(){return map.getScale                .apply(map, arguments);};
	this.getZoomForExtent        =function(){return map.getZoomForExtent        .apply(map, arguments);};
	this.getResolutionForZoom    =function(){return map.getResolutionForZoom    .apply(map, arguments);};
	this.getZoomForResolution    =function(){return map.getZoomForResolution    .apply(map, arguments);};
	this.zoomTo                  =function(){return map.zoomTo                  .apply(map, arguments);};
	this.zoomIn                  =function(){return map.zoomIn                  .apply(map, arguments);};
	this.zoomOut                 =function(){return map.zoomOut                 .apply(map, arguments);};
	this.zoomToExtent            =function(){return map.zoomToExtent            .apply(map, arguments);};
	this.zoomToMaxExtent         =function(){return map.zoomToMaxExtent         .apply(map, arguments);};
	this.zoomToScale             =function(){return map.zoomToScale             .apply(map, arguments);};
	this.getViewPortPxFromLonLat =function(){return map.getViewPortPxFromLonLat .apply(map, arguments);};
	this.getLonLatFromPixel      =function(){return map.getLonLatFromPixel      .apply(map, arguments);};
	this.getPixelFromLonLat      =function(){return map.getPixelFromLonLat      .apply(map, arguments);};
	this.getViewPortPxFromLayerPx=function(){return map.getViewPortPxFromLayerPx.apply(map, arguments);};
	this.getLayerPxFromViewPortPx=function(){return map.getLayerPxFromViewPortPx.apply(map, arguments);};
	this.getLayerPxFromLonLat    =function(){return map.getLayerPxFromLonLat    .apply(map, arguments);};
};
ngii.map.overlay_getTileURL = function(bounds) {
	var properties = ngii.map.properties;
	var res = this.map.getResolution(); 
	var x = Math.round((bounds.left - properties.mapBounds_tile.left) / (res * this.tileSize.w)); 
	var y = Math.round((bounds.bottom - properties.mapBounds_tile.bottom) / (res * this.tileSize.h)); 
	var z = this.map.getZoom()+6; 
	z = "L"+ngii.util.fillzero(z, 2);
	return this.url + z + "/" + x + "/" + y + "." + this.type; 
};
ngii.map.overlay_getIndoorTileURL = function(bounds) {
	var properties = ngii.map.properties;
	var res = this.map.getResolution(); 
	var x = Math.round((bounds.left - properties.mapBounds_tile.left) / (res * this.tileSize.w)); 
	var y = Math.round((bounds.bottom - properties.mapBounds_tile.bottom) / (res * this.tileSize.h)); 
	var z = this.map.getZoom()+17; 
	z = "L"+ngii.util.fillzero(z, 2);
	return this.url + z + "/" + x + "/" + y + "." + this.type; 
};

ngii.map.properties = {
	mapBounds_tile : new OpenLayers.Bounds(-200000.0, -28024123.62 , 31824123.62, 4000000.0),
	tileNames_en : "white_map",
	tileNames_ko : "백지도",
	//tileUrls : "http://210.92.123.148:8070/map/",
	tileUrls : "http://210.92.123.150/whitemap/",
	baseLayerOptions : {
		serviceVersion: '.', 
		alpha: true, 					
		type: 'png', 
		getURL: ngii.map.overlay_getTileURL,
		'buffer': 4,
		projection: "EPSG:5179",
		numZoomLevels : 10,
		maxResolution: 1954.597389,
		units : "m"
	},
	layerOptions : {
		serviceVersion: '.', 
		alpha: true, 					
		type: 'png', 
		getURL: ngii.map.overlay_getTileURL,
		'buffer': 4,
		projection: "EPSG:5179",
		numZoomLevels : 10,
		maxResolution: 1954.597389,
		maxExtent: new OpenLayers.Bounds(-200000.0, -3015.4524155292 , 3803015.45241553, 4000000.0),
		//maxExtent: new OpenLayers.Bounds(-190578.7224371, 1146329.8811026 , 2538283.5572806, 2893739.9468686),
		//-190578.7224371, bottom: 1146329.8811026, right: 2311305.9354829, top: 2893739.9468686}
		units : "m"
	},
	mapProjection : "EPSG:5179",
	displayProjection : "EPSG:4326",
	maxZoom : 0,
	//initCenter : new OpenLayers.LonLat(960363.60652286, 1920034.9139856),
	//initCenter : new OpenLayers.LonLat(1010363.60652286, 2220034.9139856),
	initCenter : new OpenLayers.LonLat(1074620.9964562, 1778258.3370459),
	initZoom : 3
	
};
ngii.map.mapModeBoxClick = function(boxId, mode){
	var aTags = document.getElementById(boxId).getElementsByTagName("img");
	var strMode = ngii.util.to_charFM(mode+1+"", 2);
	var aTagIndex = 0;
	for(var i=0;i<aTags.length;i++){
		if(aTags[i].src.indexOf(strMode+".")!=-1)
		aTagIndex=i;
		aTags[i].src = aTags[i].src.replace("btCircle_chkd_", "btCircle_");
	}
	aTags[aTagIndex].src = aTags[aTagIndex].src.replace("btCircle_", "btCircle_chkd_");
};
ngii.map.chkAuthor = function(){
};


Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

function ipv(){
	return -1!=ip().indexOf(":")?6:4
};
function alertPopup ( _msg )
{
	ClassyPopup.destroy();
    ClassyPopup.init({
        override: true,
        background: 'none',
        centerOnResize: true,
        fade: false
    });
    alert(_msg);
 }


function createWmsMap ( _layername  , _bounds , _map)
{
        _map.addLayer( new OpenLayers.Layer.WMS(
                _layername ,
                wmsUrl ,
                {
                        layers: _layername,
                        srs: defautProjection ,
                        transparent:true
                }
        )
      );
        _map.zoomToExtent(new OpenLayers.Bounds( _bounds).transform( displayProjection , _map.getProjection()), 14);
}

function createWmsLayer( _layername )
{
        return new OpenLayers.Layer.WMS(  _layername,
            wmsUrl ,
            {   'layers': _layername, srs: defautProjection ,transparent: true, format: 'image/gif'},
            {   isBaseLayer: false ,singleTile: true}
            ,{ visibility:false}
                );
}

function createWmsLayeWithAlias(_alias,  _layername ,_filter)
{
        return new OpenLayers.Layer.WMS(  _alias,
            wmsUrl ,
            {   'layers': _layername, srs: defautProjection ,transparent: true, format: 'image/gif',CQL_FILTER: _filter},
            {   isBaseLayer: false ,singleTile: true}
            ,{ visibility:false}
                );
}

// function createRequestUrl (  data ){
// 	var params = decodeURIComponent( $.param( data) );
// 	var reqUrl = wfsUrl + params ;

// 	var encodedReqUrl = encodeURIComponent  ( reqUrl );
// 	var _url = proxyUrl + encodedReqUrl;

// 	return _url ;
// }

function createRequestUrl ( _url, _data ){
		var params = decodeURIComponent( $.param( _data) );
		var reqUrl = _url + params ;

		var encodedReqUrl = encodeURIComponent  ( reqUrl );
		return proxyUrl + encodedReqUrl;
	}
    /*
심각 FF0000
경계 FF8000
주의 FFFF00
관심 0000FF
*/
var myStyles = new OpenLayers.StyleMap({


            "level1":new OpenLayers.Style(OpenLayers.Util.applyDefaults({
                        fillColor:"#0000FF",
                        //strokeColor:"gray",
                        graphicName:"circle",
                        fillOpacity:"0.8",
                        rotation:90,
                        pointRadius:7
                    }, OpenLayers.Feature.Vector.style["level1"])),
                    "level2":new OpenLayers.Style(OpenLayers.Util.applyDefaults({
                        fillColor:"#FFFF00",
                        //strokeColor:"gray",
                        graphicName:"circle",
                        fillOpacity:"0.8",
                        rotation:90,
                        pointRadius:7
                    }, OpenLayers.Feature.Vector.style["level2"])),
                    "level3":new OpenLayers.Style(OpenLayers.Util.applyDefaults({
                        fillColor:"#FF8000",
                        //strokeColor:"gray",
                        graphicName:"circle",
                        fillOpacity:"0.8",
                        rotation:90,
                        pointRadius:7
                    }, OpenLayers.Feature.Vector.style["level3"])),
                    "level4":new OpenLayers.Style(OpenLayers.Util.applyDefaults({
                        fillColor:"#FF0000",
                        //strokeColor:"gray",
                        graphicName:"circle",
                        fillOpacity:"0.8",
                        rotation:90,
                        pointRadius:7
                    }, OpenLayers.Feature.Vector.style["level4"])),
                     "default":new OpenLayers.Style(OpenLayers.Util.applyDefaults({
                        fillColor:"#00CC66",
                        fillOpacity:10,
                        //strokeColor:"#155FFF",
                        //strokeWidth:2,
                        graphicName:"circle",
                        //rotation:90,
                        pointRadius:7,
                        label : "${NAME}(${GName})",
                        fontColor: "${favColor}",
                        fontSize: "12px",
                        fontFamily: "맑은 고딕",
                        fontWeight: "bold",
                        labelAlign: "cm",
                        labelXOffset: "10",
                        labelYOffset: "10",
                        labelOutlineColor: "black",
                        labelOutlineWidth: 0
                    }, OpenLayers.Feature.Vector.style["default"])),
                    "select":new OpenLayers.Style(OpenLayers.Util.applyDefaults({
                        fillColor:"#FF00FF",
                        fillOpacity:1,
                        strokeColor:"red",
                        graphicName:"circle",
                        rotation:90,
                        pointRadius:7
                    }, OpenLayers.Feature.Vector.style["select"])),
                    "highlight":new OpenLayers.Style(OpenLayers.Util.applyDefaults({
                        graphicName:"circle",
                        fillColor:"#FF00FF",
                        rotation:90,
                        pointRadius:7
                    }, OpenLayers.Feature.Vector.style["highlight"]))
            });
function createWfsmap( _layerName , _map ) {
	var vector ;
	var data  = {
		service :'wfs',
		version : '1.1.0',
		request : 'GetFeature',
		outputformat: 'json',
		srsName :  defautProjection ,
		typeName : _layerName
	};

	var reqUrl = createRequestUrl( wfsUrl, data );



	vector = new OpenLayers.Layer.Vector(
		_layerName
		, {
       minScale:1/30000
      ,maxScale:1/1000
		  ,rendererOption :{zIndex:true} }
		, {projection: defautProjection });



	return vector;

}

function set_styleMapLabelDS()
{
    var template = {
        strokeColor: "#0000FF",
        strokeOpacity: 1,
        strokeWidth: 3,
        fillColor: "#00AAFF",
        fillOpacity: 1,
        pointRadius: 5,
        pointerEvents: "visiblePainted",

        // label : "${NAME}",

        // labelOffsetX: "10",
        // labelOffsetY: "-10",
        // fontColor: "red",
        // fontSize: 10,
        // fontFamily: "Arial",
        // fontWeight: "bold",
        // labelAlign: "lt"
    };
    var templateB = {
        strokeColor: "#FF00FF",
        strokeOpacity: 1,
        strokeWidth: 3,
        fillColor: "#AA00FF",
        fillOpacity: 1,
        pointRadius: 5,
        pointerEvents: "visiblePainted",

        // label : "${NAME}",

        // labelOffsetX: "10",
        // labelOffsetY: "-10",
        // fontColor: "blue",
        // fontSize: 10,
        // fontFamily: "Arial",
        // fontWeight: "bold",
        // labelAlign: "lt"
    };
    styleMapLabelDS = new OpenLayers.StyleMap( { "default" : new OpenLayers.Style(template), "select" : new OpenLayers.Style(templateB) } );
}


var gstyleGvoeElement = new OpenLayers.StyleMap(
                {
                "default": new OpenLayers.Style({
                                              fillColor: "#fff000",
                                              fillOpacity :0,
                                              strokeColor: "#666666",
                }),
                "select": new OpenLayers.Style({
                                                fillColor: "#ff0000",
                                                fillOpacity :0.6
                                               // strokeColor: "#ff0000",
                                                //strokeWidth: 3,
                                                }),
                "temporary": new OpenLayers.Style({
                                                fillColor: "#ffffff",
                                                strokeColor: "#666666",
                                                }),
                "level1": new OpenLayers.Style({
                                                fillColor: "#0000FF",
                                                strokeColor: "#666666",
                                                 fillOpacity :0.6
                                                }),
                "level2": new OpenLayers.Style({
                                                fillColor: "#FFFF00",
                                                strokeColor: "#666666",
                                                fillOpacity :0.6
                                                }),
                "level3": new OpenLayers.Style({
                                                fillColor: "#FF8000",
                                                strokeColor: "#666666",
                                                fillOpacity :0.6
                                                }),
                "level4": new OpenLayers.Style({
                                                fillColor: "#FF0000",
                                                strokeColor: "#666666",
                                                fillOpacity :0.6
                                                })
                }
);

function createWfsmap_new( _layerName , _map ,_style) {
    var vector ;
    // var vectorProperties ={
    //     stylemap : StyleObjekt,
    //     rendererOption : {zIndex :true}
    // }  ;
    // if (_style != null && _style !='')
    //     vectorProperties.stylemap = _style ;

    if ( _layerName =='GoldenT:GovElement')
   {
        vector = new OpenLayers.Layer.Vector(
            _layerName
           , { styleMap: gstyleGvoeElement, rendererOption :{zIndex:true} }
            , { projection: defautProjection }
        );
    } else {
         vector = new OpenLayers.Layer.Vector(
        _layerName
       , { styleMap: myStyles, rendererOption :{zIndex:true} }

        , { projection: defautProjection }
    );
    }
    return vector;
}

function createLegend( _layerName , _id){

	var options = {
		request : 'GetLegendGraphic',
		version : '1.0.0',
		format :'image/png',
		width : '200',
		height : '20',
		legend_options : 'fontColor:0xFFFFFF;fontSize:14;bgColor:0x0000',
		layer : _layerName
	}
	//var params = decodeURIComponent( $.param( options) );
	var params = $.param( options);

	var legend_url = wmsUrl +"?"+ params  ;

	$(_id).attr("src", legend_url );
}


function CreateMSXMLDocumentObject () {
            if (typeof (ActiveXObject) != "undefined") {
                var progIDs = [
                                "Msxml2.DOMDocument.6.0",
                                "Msxml2.DOMDocument.5.0",
                                "Msxml2.DOMDocument.4.0",
                                "Msxml2.DOMDocument.3.0",
                                "MSXML2.DOMDocument",
                                "MSXML.DOMDocument"
                              ];
                for (var i = 0; i < progIDs.length; i++) {
                    try {
                        return new ActiveXObject(progIDs[i]);
                    } catch(e) {};
                }
            }
            return null;
        }

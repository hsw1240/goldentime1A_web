var host = "http://"+window.location.hostname;		
var webservicehost ="http://211.205.94.253"	

var proxyUrl = host+"/sraproxy/sraproxy.aspx?url=" ;


	function changeURL( url) {
		if (host.indexOf('localhost' ) > 0 || host.indexOf('127.0.0.1' ) > 0  || host.indexOf('211.205.94.60') > 0 )
				url = proxyUrl + url;
		return url;
	}
	function ajaxCall( url, succcessFunc , errorFunc ) {
		$.ajax({
			type: 'get'
			, data: "xml"
			, url : url 
			, success: succcessFunc
			, error: function(xhr, status, error) {alert(error); }
		});		
	}



	function xmlToString(xmlData){
		var xmlString;
		if ( window.ActiveXObject) {
			xmlString =  xmlData[0].xml;
		}
		if ( xmlString === undefined ){
			var objSerializer = new XMLSerializer();
			xmlString = objSerializer.serializeToString( xmlData);
		}
		return xmlString;
	}

	function stringToXml( strData){

		if ( window.ActiveXObject) {
			var objXml = new ActiveXObject(	"Microsoft.XMLDOM");
			objXml.loadXML( strData );
			return objXml;
		}

		else {
			return ( new DOMParser()).parseFromString( strData, "text/xml");
		}

	}
	function createRequestUrl ( _url, _data ){
		var params = decodeURIComponent( $.param( _data) );
		var reqUrl = _url + params ; 
		
		var encodedReqUrl = encodeURIComponent  ( reqUrl );		
		return proxyUrl + encodedReqUrl;
	}
	function parseXml(xml) {
	   var dom = null;
	   if (window.DOMParser) {
	      try { 
	         dom = (new DOMParser()).parseFromString(xml, "text/xml"); 
	      } 
	      catch (e) { dom = null; }
	   }
	   else if (window.ActiveXObject) {
	      try {
	         dom = new ActiveXObject('Microsoft.XMLDOM');
	         dom.async = false;
	         if (!dom.loadXML(xml)) // parse error ..

	            window.alert(dom.parseError.reason + dom.parseError.srcText);
	      } 
	      catch (e) { dom = null; }
	   }
	   else
	      alert("cannot parse xml string!");
	   return dom;
	}


	
 	function ConvertUTCTimeToLocalTime(UTCDateString)
    {
        var convertdLocalTime = new Date(UTCDateString);

        var _year , _month, _day, _hours, _minutes, _seconds; 

        

        var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;

        var _year = convertdLocalTime.getFullYear();
        var _month = convertdLocalTime.getMonth() ;
        var _day = convertdLocalTime.getDate();
        var _hour = convertdLocalTime.getHours() + hourOffset;
        var _min = convertdLocalTime.getMinutes();
        var _second = convertdLocalTime.getSeconds();
        
        //console.log(  UTCDateString , _year, _month , _day, _hour ,_min,_second );


		return Date.UTC(  _year, _month , _day, _hour ,_min,_second  )

        //convertdLocalTime.setHours( convertdLocalTime.getHours() + hourOffset ); 

        //return convertdLocalTime;
    }

   	function QueryStringToJSON() {            
	    var pairs = location.search.slice(1).split('&');
	    
	    var result = {};
	    pairs.forEach(function(pair) {
	        pair = pair.split('=');
	        result[pair[0]] = decodeURIComponent(pair[1] || '');
	    });

  	  return JSON.parse(JSON.stringify(result));
	}

    function delete_cookie(name) {
  		document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}	
   function setCookie( name, value, expiredays ) {   
        var todayDate = new Date();   
        todayDate.setDate( todayDate.getDate() + expiredays );   
       document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"   
    }  
    function getCookie( name ) {  
       var nameOfCookie = name + "=";  
       var x = 0;  
       while ( x <= document.cookie.length )  
       {  
           var y = (x+nameOfCookie.length);  
           if ( document.cookie.substring( x, y ) == nameOfCookie ) {  
               if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )  
                   endOfCookie = document.cookie.length;  
               return unescape( document.cookie.substring( y, endOfCookie ) );  
           }  
           x = document.cookie.indexOf( " ", x ) + 1;  
           if ( x == 0 )  
               break;  
       }  
       return "";  
    }  

//https://gist.github.com/lfender6445/6707904
query_to_hash = function() {
   var j, q;
  q = window.location.search.replace(/\?/, "").split("&");
   j = {};
   $.each(q, function(i, arr) {
     arr = arr.split('=');
     return j[arr[0]] = arr[1];
   });
   return j;
 }

function ajaxCall( _url, _succcessFunc , _datatype, _errorFunc ) {
        var datatype = 'xml';
        if ( _datatype == 'json ')
            datatype ='json';


        $.ajax({
            type: 'get'
            , data: datatype
                    //,async: false
            , url : _url
            , success: _succcessFunc
            , error: function(xhr, status, error) { alert(error); }
        });
    }


function getURLParameters(paramName)
    {
    var sURL = window.document.URL.toString();

    if (sURL.indexOf("?") > 0)
    {
        var arrParams = sURL.split("?");

        var arrURLParams = arrParams[1].split("&");

        var arrParamNames = new Array(arrURLParams.length);
        var arrParamValues = new Array(arrURLParams.length);

        var i = 0;
        for (i=0;i<arrURLParams.length;i++)
        {
            var sParam =  arrURLParams[i].split("=");
            arrParamNames[i] = sParam[0];
            if (sParam[1] != "")
                arrParamValues[i] = unescape(sParam[1]);
            else
                arrParamValues[i] = "No Value";
        }

        for (i=0;i<arrURLParams.length;i++)
        {
            if(arrParamNames[i] == paramName){
                alert("Param:"+arrParamValues[i]);
                return arrParamValues[i];
             }
        }
        return "No Parameters Found";
    }

}

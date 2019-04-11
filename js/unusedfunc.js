
function GenPopText(evt){
     var temstr="<b><i>" + evt.features[0].gml.featureType + "</i></b><br/>";
     for(var key in evt.features[0].attributes)
     {
        temstr += "<b>" + key + "</b>:" + evt.features[0].attributes[key] + "<br/>";
     }
     return temstr;
 }


function openPopup(){
	
	//var myFrame = document.getElementById('ifr');
	//myFrame.src = myFrame.src +'?sitecode=test'
	//myFrame.contentWindow.document.getElementsByClassName('highcharts-title')[0].innerHTML= selectedAreaName ;
	drawImage();
	callNext( urls, 0)	 ;	
	
	$('.modal-title').text(selectedAreaName);
	$('#myModal').modal('show');
	$("#myModal").draggable({
  			handle: ".modal-header"
			});
	
}

function showInfonew(evt) {
	
	
    if (evt.features && evt.features.length) {
    
         highlightLayer.destroyFeatures();
         highlightLayer.addFeatures(evt.features);
         var ret = highlightLayer.redraw();
         
    } else {
    
        document.getElementById('responseText').innerHTML = evt.text;
    }
}
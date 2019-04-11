	var Time_Arr = [];
	var RFMean_mm_Arr=[];
	var	LValue_Arr=[];
	var	QValue_Arr=[];
	//var QOBS_CMS_Arr=[];
	//var QSIM_CMS_Arr=[];
	//var damName_Arr=[];
	var Value_Arr =[];
	//var Value1_Arr =[];
	var DValue_Arr=[];
	var zoomtitle ;
	var strGRM_Data_Meta="";	//2016.11.14 원 추가.


//매개변수, 차트 데이타 조회
//fc =1 인 경우 댐 방류량이 리턴되므로 표, 차트를 그려줘야 한다.
	function getChartDataByWPName( _wpname, _fc , _init ){
			fc = _fc;
			Time_Arr=[];
			Value_Arr =[];
			QValue_Arr =[];
			LValue_Arr =[];
			RFMean_mm_Arr=[];
			DValue_Arr = [] ;
			wpname = _wpname;
			$("#selectedWpName").html(wpname);

			var reqDataUrl = rainfallUrl+"wpname=" + wpname+"&runid=" +runid ;
			var reqParameterUrl = proxyUrl + getGRMParameterByWpnameUrl +"wpname="+wpname;

			chartdataUrl=  createRequestUrl(reqDataUrl ,'');
			if ( _init = true )
			{
				ajaxCall( chartdataUrl, chartParseProcess );
				ajaxCall ( reqParameterUrl , loadParameterProcess);
			}
			else {
				ajaxCall( chartdataUrl, chartParseProcess );
			}
	/*
	<qcal diffgr:id="qcal1" msdata:rowOrder="0">
	<RunID>9999</RunID>

	<WPName>ADS_WP1 </WPName>
	<Time>201610051720</Time>
	<Value>10.57</Value>
	<RFMean_mm>0</RFMean_mm>
	</qcal>

	*/
		function chartParseProcess( xml ) {
			Time_Arr=[];
			Value_Arr =[];
			QValue_Arr =[];
			LValue_Arr =[];
			RFMean_mm_Arr=[];
			DValue_Arr =[];
			$(xml).find("Time").each(function()
			 {
		 		Time_Arr.push( $(this).text()) ;
			 });

		 	$(xml).find('RFMean_mm').each(function()
		 	{
	 			RFMean_mm_Arr.push( Number( $(this).text() ));
		 	});

		 	$(xml).find('Value').each(function()
		 	{
	 			Value_Arr.push( Number( $(this).text() ));
			});
			$(xml).find('LValue').each(function()
		 	{
	 			LValue_Arr.push( Number( $(this).text() ));
			});
			$(xml).find('QValue').each(function()
		 	{
		 		if ( $(this).text() != '-' )
	 				QValue_Arr.push( Number( $(this).text() ));
	 			else
	 				QValue_Arr.push( $(this).text());
			});
			$(xml).find('dqvalue').each(function()
		 	{
		 		if ( $(this).text() != '-' )
	 				DValue_Arr.push( Number( $(this).text() ));
			});
			drawtable();

			drawchart( );
		}

		function loadParameterProcess( xml){
			$(xml).find("string").each(function() {
                var xmlDoc = jQuery.parseXML($(this).text());
                siteParameters  = $.xml2json(xmlDoc);
                drawParametersTable();
            });
		}
			function drawParametersTable(){
				var strSiteParameters = JSON.stringify( siteParameters );

					var watershedhtml ='';
				var stramhtml ='';
				var coeffihtml = '';
				wopid = siteParameters.ID;
				var titlelist = [
				 "Initial soil saturation ratio","Minimum slope of land surface","Minimum slope of channel bed",
				 "Minimum channel width[m]","Apply initial stream flow[CMS]", "Channel roughness coefficient ",
				 "Initial dry stream order","Land cover roughness coefficient","Soil Depth",
				 "Soil porosity","Soil wetting front suction head",
				 "Soil hydraulic conductivity"];

				var paramlist = ["IniSaturation" , "MinSlopeOF" , "MinSlopeChBed" , "MinChBaseWidth" , "IniFlow",
				"ChRoughness" ,"DryStreamOrder", "CalCoefLCRoughness",	"CalCoefSoilDepth",	"CalCoefPorosity",	"CalCoefWFSuctionHead","CalCoefHydraulicK"];

				var tempval= '';

				$('#watershedparams').html("");
				$('#streamparam').html("");
				$('#coeffiparams').html("");
				for (var i=0; i< 2 ; i++){
					tempval =eval ( 'siteParameters.'+ paramlist[i] );
					watershedhtml +='<div class="form-group"><label  class="control-label col-xs-8">';
					watershedhtml +='<input type="hidden" id="wsid" value="'+eval ( 'siteParameters.ID')+'">';
					watershedhtml += titlelist[i]; //IniSaturation
					if ( tempval == undefined)
							tempval =0;
					if ( i==1 )
					{
						watershedhtml +='</label><div class="col-xs-4"><input type="text" id="'+paramlist[i] +'"class="form-control"  value="'+tempval +'"   ></div></div>';
					}
					else {
						watershedhtml +='</label><div class="col-xs-4"><input type="text" id="'+paramlist[i] +'"class="form-control"  value="'+tempval +'"></div></div>';
					}
				}

				$('#watershedparams').append(watershedhtml);
				for (var i=2; i< 7 ; i++){
					tempval =eval ( 'siteParameters.'+ paramlist[i] );
					stramhtml +='<div class="form-group"><label  class="control-label col-xs-8">';
					stramhtml += titlelist[i]; //IniSaturation

					if ( tempval == undefined)
							tempval =0;
					if ( i==3 || i==6 ){
						//stramhtml +='</label><div class="col-xs-4"><input type="text" id="'+paramlist[i] +'"class="form-control"  value="'+tempval +'"  readonly ></div></div>';
						stramhtml +='</label><div class="col-xs-4"><input type="text" id="'+paramlist[i] +'"class="form-control"  value="'+tempval +'"   ></div></div>';
					}
					else{
						stramhtml +='</label><div class="col-xs-4"><input type="text" id="'+paramlist[i] +'"class="form-control"  value="'+tempval +'" ></div></div>';
					}
				}
				$('#streamparam').append(stramhtml);
				for (var i=7; i< titlelist.length ; i++){
					tempval =eval ( 'siteParameters.'+ paramlist[i] );
					coeffihtml +='<div class="form-group"><label  class="control-label col-xs-8">';
					coeffihtml += titlelist[i]; //IniSaturation
					if ( tempval == undefined)
							tempval =0;
					if ( i==11 )
						coeffihtml +='</label><div class="col-xs-4"><input type="text" id="'+paramlist[i] +'"class="form-control"  value="'+tempval +'" ></div></div>';
					else
						//coeffihtml +='</label><div class="col-xs-4"><input type="text" id="'+paramlist[i] +'"class="form-control"  value="'+tempval +'" readonly ></div></div>';
					coeffihtml +='</label><div class="col-xs-4"><input type="text" id="'+paramlist[i] +'"class="form-control"  value="'+tempval +'"  ></div></div>';
				}
				$('#coeffiparams').append(coeffihtml);

				if ( siteParameters.MODIFY.text =="T" )
					$("#modify").prop("disabled",false);
				else
					$("#modify").prop("disabled", true );
			}

	}
	/* getChartDataByWPName 사용하는 것으로 확인 2018-11-03
	function getChartData( i ){
		if ( i >=1) {
			console.log('i=',i);
			drawtable();
			drawchart( );
			return;
		}
		else {
			var params='';
			var reqDataUrl = getChartDataByElementCodeUrl+"sig_cd=" + sig_cd+"&runid=" +runid ;


			chartdataUrl=  createRequestUrl(reqDataUrl ,'');

			ajaxCall( chartdataUrl, chartParseProcess );

			function chartParseProcess( xml ) {
				Time_Arr=[];
				Value_Arr =[];
				RFMean_mm_Arr=[];
				LValue_Arr =[];
				QValue_Arr =[];

				$(xml).find("Time").each(function()
				 {
			 		Time_Arr.push( $(this).text()) ;
				 });

			 	$(xml).find('RFMean_mm').each(function()
			 	{
		 			RFMean_mm_Arr.push( Number( $(this).text() ));
			 	});

			 	$(xml).find('Value').each(function()
			 	{
		 			Value_Arr.push( Number( $(this).text() ));
				});
				$(xml).find('QValue').each(function()
			 	{
		 			QValue_Arr.push( Number( $(this).text() ));
				});
				$(xml).find('LValue').each(function()
			 	{
		 			LValue_Arr.push( Number( $(this).text() ));
				});
				getChartData( i+1);
			 }
		}
	}
	*/
/*
	function callNext( urls, i) {
		if ( i >=1) {
			console.log('i=',i);
			drawtable();
			drawchart( );
			return;
		}
		else {
			var params='';
			var reqUrl = createRequestUrl( urls[i], params);

			ajaxCall( reqUrl, chartParseProcess );

	// <qcal diffgr:id="qcal1" msdata:rowOrder="0">
	// <RunID>9999</RunID>
	// <WPName>ADS_WP1 </WPName>
	// <Time>201610051720</Time>
	// <Value>10.57</Value>
	// <RFMean_mm>0</RFMean_mm>
	// </qcal>

			function chartParseProcess( xml ) {
				Time_Arr=[];
				Value_Arr =[];
				RFMean_mm_Arr=[];

				$(xml).find("Time").each(function()
				 {
			 		Time_Arr.push( $(this).text()) ;
				 });

			 	$(xml).find('RFMean_mm').each(function()
			 	{
		 			RFMean_mm_Arr.push( Number( $(this).text() ));
			 	});

			 	$(xml).find('Value').each(function()
			 	{
		 			Value_Arr.push( Number( $(this).text() ));
				});
				callNext( urls, i+1);
			 }
		}

	}*/

/* 해당 지자체 watchpoint 목록 ㅈ회 */
	function getWPList(){

		var wplistUrl= proxyUrl +  encodeURIComponent( getWatchpointListByGovElementService + 'sig_cd='+sig_cd );

	 	getWPListData( wplistUrl) ;

	 	function getWPListData( wplistUrl)
	 	{
	 		ajaxCall(wplistUrl , whenSuccess );
/*
<watchpointlist diffgr:id="watchpointlist1" msdata:rowOrder="0">
<Name>ADS_WP1 </Name>
<QWP>1</QWP>
<TWP>0</TWP>
<QCTP>1</QCTP>
<QCP>1</QCP>
<FC>0</FC>
<WOP>1</WOP>
<WOPID>200301 </WOPID>
<WSCode>NDG </WSCode>
<BCode>NDG </BCode>
<GName>구담</GName>
<GOVCode_E>ADS </GOVCode_E>
<GOVCode_L>GBD </GOVCode_L>
<Code>ADS </Code>
<NameK>안동시</NameK>
<NameE>Andong-si</NameE>
<SIG_CD>47170</SIG_CD>
</watchpointlist>
*/

			function whenSuccess( xml){
				var arrWatchpoint = new Array();

				$("watchpointlist", xml).each( function(){
					//NameArr.push( $("Name", this).text().trim() );
					var objWatchpoint = new Object();
					wpname = $("Name", this).text().trim();
					wopid =  $("WOPID", this).text().trim();

					objWatchpoint.Name = $("Name", this).text().trim();
					objWatchpoint.QWP = $("QWP", this).text().trim();
					objWatchpoint.TWP = $("TWP", this).text().trim();
					objWatchpoint.QCTP = $("QCTP", this).text().trim();
					objWatchpoint.QCP = $("QCP", this).text().trim();
					objWatchpoint.FC = $("FC", this).text().trim();
					objWatchpoint.WOP = $("WOP", this).text().trim();
					objWatchpoint.WOPID = $("WOPID", this).text().trim();
					objWatchpoint.WSCode = $("WSCode", this).text().trim();
					objWatchpoint.BCode = $("BCode", this).text().trim();
					objWatchpoint.GName = $("GName", this).text().trim();
					objWatchpoint.GOVCode_E = $("GOVCode_E", this).text().trim();
					objWatchpoint.GOVCode_L = $("GOVCode_L", this).text().trim();
					objWatchpoint.Code = $("Code", this).text().trim();
					objWatchpoint.NameK = $("NameK", this).text().trim();
					objWatchpoint.NameE = $("NameE", this).text().trim();
					objWatchpoint.SIG_CD = $("SIG_CD", this).text().trim();
					objWatchpoint.RefSWSID = $("RefSWSID", this).text().trim();

					arrWatchpoint.push(objWatchpoint);
				});
				//console.log( JSON.stringify( arrWatchpoint));

				var headerHtml ='';

				var trHtml ='';
				$('#watchpointlist').html("");

				for ( var i=0; i<arrWatchpoint.length;i++){
					var rowData = arrWatchpoint[i];

					 var row = $("<tr onclick=getChartDataByWPName('"+rowData.Name+"','"+rowData.FC +"',true); />")
				    $("#watchpointlist").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
				    row.append($("<td>" + (i+1)+ "</td>"));
				    row.append($("<td><a href=javascript:getChartDataByWPName('"+rowData.Name+"','"+rowData.FC +"',true);>" + rowData.Name+ "</a></td>"));
					row.append($("<td>" + rowData.QWP+ "</td>"));
					row.append($("<td>" + rowData.TWP+ "</td>"));
					row.append($("<td>" + rowData.QCTP+ "</td>"));
					row.append($("<td>" + rowData.QCP+ "</td>"));
					row.append($("<td>" + rowData.FC+ "</td>"));
					row.append($("<td>" + rowData.WOP+ "</td>"));
					row.append($("<td>" + rowData.WOPID+ "</td>"));
					row.append($("<td>" + rowData.WSCode+ "</td>"));
					row.append($("<td>" + rowData.BCode+ "</td>"));
					row.append($("<td>" + rowData.GName+ "</td>"));
					row.append($("<td>" + rowData.GOVCode_E+ "</td>"));
					row.append($("<td>" + rowData.GOVCode_L+ "</td>"));
					row.append($("<td>" + rowData.Code+ "</td>"));
					row.append($("<td>" + rowData.NameK+ "</td>"));
					row.append($("<td>" + rowData.NameE+ "</td>"));
					row.append($("<td>" + rowData.SIG_CD+ "</td>"));
					row.append($("<td>" + rowData.RefSWSID+ "</td>"));
				}



				// for ( var i = 0; i< arrWatchpoint.length ; i++)
				// {
				// 	if ( i/2 == 0 )
				// 		trhtml +="<tr>";
				// 	else
				// 		trhtml +="<tr class='odd' >";

				// 	trhtml +='<td>' +Time_Arr[i]+'<td>-<td>'+Value_Arr[i] +'<td>'+RFMean_mm_Arr[i];


				// 	trhtml +='</tr>';
				// }

				// $('#tablelist').append(trhtml);
				// gotoBottom('table_container');



			}
	 	}
	}

	function drawchart(  )
	{
		var seriesDataR = {
			'name': '강우'
			, 'type' :'column'
			, 'data' : RFMean_mm_Arr
			, 'tooltip' : {valueSuffix :'mm'}
			, 'yAxis' :1

		};

		var seriesDataA = {
			'name': '관측유량'
			, 'type' :'spline'
			, 'data' : QValue_Arr
			, 'tooltip' : {valueSuffix :'CMS'}
			, 'yAxis' :0
		};

		var seriesDataC = {
			'name': '계산유량'
			, 'type' :'spline'
			, 'data' : Value_Arr
			, 'tooltip' : {valueSuffix :'CMS'}
			, 'yAxis' :0
			, 'dashStyle' : 'solid'
		};
		Highcharts.setOptions({
			global:{
				timezoneOffset:5*60,
				useUTC:false
			}
		});


		chart = $('#chart').highcharts({
				plotOptions: {
					series: {
						turboThreshold:5000//set it to a larger threshold, it is by default to 1000
						,animation: false //초기 애니메이션 효과 off
					}
			},

			rangeSelector : {
		inputEnabled : false
		},
			chart : {
				renderTo : 'chart',
				zoomType : 'xy',
				height:410 //차트 높이 결정 ,

				// ,width:null
				// ,height:null
			},

			//colors: ['#0000ff','#ff9900','#008000','#DA0CE1'], //강우 , 계산,관측
			colors: ['#0000ff','#ff9900','#008000'], //강우 , 계산,관측
			lineWidth: 5,
			title : {


				text :  wpname,//selectedWPName,

				x : -10
			},
			xAxis: {
			type: 'datetime',
			//tickInterval: 10*1000,

			//minRange :  3600000 , //2일   2 * 24 * (60*60 * 1000= 600000 ), 3600000 : 1시간
			dateTimeLabelFormats: {
	 		//day: '%Y/%m/%e' ,
	 		day: '%e of %b' ,
	 		week : '%m/%e' ,
	 		month :  '%Y/%m/%e',
	 		year : '%Y'
			},
				 labels: {
				 	step: 300,
				 	style: {
				 		//color: 'white',
				 		//fontSize:'12px'
				 	}
				 },
				categories: Time_Arr ,
				crosshair:true
				,tickLength: 0,
                tickInterval : 30000000,

		 },

			yAxis : [
				/*강우 */

				/*관측 */
				{ tickAmount: 8,
					labels : {
						format : '{value} ',

						style : {
							color :Highcharts.getOptions().colors[1]
						}
					} ,
					title :{
						text : '유량(CMS)',
						style :{
							color: Highcharts.getOptions().colors[1]
						}
					}
					//,opposite : true
				},
				{
					tickAmount: 8,
					labels : {
						format :'{value}',

						style : {
							color: Highcharts.getOptions().colors[0]
						}
					},
					title : {
						text : '강우(mm)',
						style :{
							color :Highcharts.getOptions().colors[0]
						}

					}
					,reversed: true,opposite : true
					, min: 0
					, max: RFMean_mm_Arr.max() + 5


				},
				/*계산유량 */
				{    tickAmount: 8,
					labels : {
						//format : '{value} ',
						formatter :function(){
							return this.value +'CMS';
						},
						style : {
							color :Highcharts.getOptions().colors[2]
						}
					} ,
					title :{
						text : '',
						style :{
							color: Highcharts.getOptions().colors[2]
						}
					}
					,opposite : true
				}
			]
			, tooltip :{
				shared: true
			},

	        legend: {
	            enabled: true
	        },
			navigator: {
				height:30,
	        enabled: true
	    },

	    scrollbar: {
	        enabled: true
	    },
			series: [ seriesDataR,seriesDataA,seriesDataC ]
		});

		$('#myModal').on('shown.bs.modal', function(){
			var chart = $('#chart').highcharts();
			 chart.reflow();
		});
	}



/*fc=1이어서 댐방류량이 리턴되면 댐 방류량 dvalue_arr의 값을 그려준다 */
	function drawtable( ){
// 컬럼 헤더가 유동적이므로 테이블 그릴때 생성해준다 11.16
		var headerHtml ='';
		$('#colheader').html('');
		var strGRM_Data_MetaArray = strGRM_Data_Meta.split(',');	// 2016.11.14 원,한 : 추가
		if ( fc ==0  )
			headerHtml = '<td>일시<td>관측유량(CMS)<td>계산유량(CMS)<td>강우(mm)';
		else if ( DValue_Arr.length > 0)
			headerHtml = '<td>일시<td>관측유량(CMS)<td>계산유량(CMS)<td>강우(mm)<td>댐방류량';
		else
			headerHtml = '<td>일시<td>관측유량(CMS)<td>계산유량(CMS)<td>강우(mm)';
		$('#colheader').html( headerHtml);

		var trhtml ='';
		$('#tablelist').html("");

		for ( var i = 0; i< Time_Arr.length ; i++)
		{
			if ( i/2 == 0 )
				trhtml +="<tr>";
			else
				trhtml +="<tr class='odd' >";
			if ( fc ==0 )
				trhtml +='<td>' +Time_Arr[i]+'<td>'+QValue_Arr[i]+'<td>'+Value_Arr[i] +'<td>'+RFMean_mm_Arr[i];
			else
			{
				if ( DValue_Arr.length>0 ) //autorom인 경우 댐방류량 표시하지않음.
					trhtml +='<td>' +Time_Arr[i]+'<td>'+QValue_Arr[i]+'<td>'+Value_Arr[i] +'<td>'+RFMean_mm_Arr[i]+'<td>' + DValue_Arr[i];
				else
					trhtml +='<td>' +Time_Arr[i]+'<td>'+QValue_Arr[i]+'<td>'+Value_Arr[i] +'<td>'+RFMean_mm_Arr[i];
			}


			trhtml +='</tr>';
		}

		$('#tablelist').append(trhtml);
		gotoBottom('table_container');
	}
	function gotoBottom(id){
   		var element = document.getElementById(id);
  	 	element.scrollTop = element.scrollHeight - element.clientHeight;
	}
	function drawParametersTable( ){
		for ( var i=0; i< arrSubWaterShed.length;i++)
		{
			var rowData = arrSubWaterShed[i];
			 var row = $("<tr class='clickable-row' />")
			$("#settinglist").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it

			// "<input type='text class='form-control' value='" + "'' />"

// row.append($("<td>" +"<input type='text' class='form-control' value='"+ (i+1)+ "'' />"+ "</td>"));
/*
row.append($("<td>" +"<input type='text' class='form-control form-control2' value='"+ rowData.ID+ "'' />"+ "</td>"));
row.append($("<td>" +"<input type='text' class='form-control' value='"+ rowData.IniSaturation+ "'' />"+ "</td>"));
row.append($("<td>" +"<input type='text' class='form-control' value='"+ rowData.MinSlopeOF+ "'' />"+ "</td>"));
row.append($("<td>" +"<input type='text' class='form-control' value='"+ rowData.UnsaturatedKType+ "'' />"+ "</td>"));
row.append($("<td>" +"<input type='text' class='form-control' value='"+ rowData.CoefUnsaturatedK+ "'' />"+ "</td>"));
row.append($("<td>" +"<input type='text' class='form-control' value='"+ rowData.MinSlopeChBed+ "'' />"+ "</td>"));
row.append($("<td>" +"<input type='text' class='form-control' value='"+ rowData.MinChBaseWidth+ "'' />"+ "</td>"));
row.append($("<td>" +"<input type='text' class='form-control' value='"+ rowData.ChRoughness+ "'' />"+ "</td>"));
row.append($("<td>" +"<input type='text' class='form-control' value='"+ rowData.DryStreamOrder+ "'' />"+ "</td>"));
row.append($("<td>" +"<input type='text' class='form-control' value='"+ rowData.IniFlow+ "'' />"+ "</td>"));
row.append($("<td>" +"<input type='text' class='form-control' value='"+ rowData.CalCoefLCRoughness+ "'' />"+ "</td>"));
row.append($("<td>" +"<input type='text' class='form-control' value='"+ rowData.CalCoefPorosity+ "'' />"+ "</td>"));
row.append($("<td>" +"<input type='text' class='form-control' value='"+ rowData.CalCoefWFSuctionHead+ "'' />"+ "</td>"));
row.append($("<td>" +"<input type='text' class='form-control' value='"+ rowData.CalCoefHydraulicK+ "'' />"+ "</td>"));
row.append($("<td>" +"<input type='text' class='form-control' value='"+ rowData.CalCoefSoilDepth+ "'' />"+ "</td>"));
*/
row.append($("<td>" + rowData.ID+ "</td>"));
row.append($("<td>" + rowData.IniSaturation+ "</td>"));
row.append($("<td>" + rowData.MinSlopeOF+ "</td>"));
row.append($("<td>" + rowData.UnsaturatedKType+ "</td>"));
row.append($("<td>" + rowData.CoefUnsaturatedK+ "</td>"));
row.append($("<td>" + rowData.MinSlopeChBed+ "</td>"));
row.append($("<td>" + rowData.MinChBaseWidth+ "</td>"));
row.append($("<td>" + rowData.ChRoughness+ "</td>"));
row.append($("<td>" + rowData.DryStreamOrder+ "</td>"));
row.append($("<td>" + rowData.IniFlow+ "</td>"));
row.append($("<td>" + rowData.CalCoefLCRoughness+ "</td>"));
row.append($("<td>" + rowData.CalCoefPorosity+ "</td>"));
row.append($("<td>" + rowData.CalCoefWFSuctionHead+ "</td>"));
row.append($("<td>" + rowData.CalCoefHydraulicK+ "</td>"));
row.append($("<td>" + rowData.CalCoefSoilDepth+ "</td>"));
// row.append($("<td>" +"<input type='text' class='form-control' value='"+ rowData.UserSet+ "'' />"+ "</td>"));
         }

}


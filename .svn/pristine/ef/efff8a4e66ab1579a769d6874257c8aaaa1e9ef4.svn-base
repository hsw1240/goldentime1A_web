function callNext( urls, i) {		
			if ( i > urls.length ) {
				
				drawtable();
				drawchart( chartOptions);
				return; 
			}
			var params=''; 
			var reqUrl = createRequestUrl( urls[i], params);
			
			ajaxCall( reqUrl, whenSuccess );
		
			function whenSuccess( xml ) {		
		 		var chartOption = {};

				$(xml).find("string").each(function()
				 {
				 	var data = $(this).text(); 

				    var siteinfo = {} 
				 	siteinfo.creationTime =  $(data).find('creationTime').text();

				 	$(data).find( 'criteria').each( function(){
				 		//console.log( $(this).children().children().children().attr('value') );
				 	} );

					$(data).find('sourceInfo').each( function () 
					{
						siteinfo.sourceinfo ={
							'sitename' : $(this).find('sitename').text()  
							,'sitecode'	:$(this).find('sitecode').text()  						
							,'elevation_m' :$(this).find('elevation_m').text()  
							,'verticaldatum' :$(this).find('verticaldatum').text() 
							,'county' : $(this).children('siteproperty[name="County"]').text()
							,'state' : $(this).children('siteproperty[name="State"]').text()
							,'site comments' : $(this).children('siteproperty[name="Site Comments"]').text()
							,'site type' : $(this).children('siteproperty[name="Site Type"]').text()
						}
						chartOption.title = $(this).find('sitename').text() ;
						chartOption.subtitle = $(this).find('sitecode').text() ;

						$(this).find('geolocation').each(function(){
							siteinfo.geolocation  =  {
								'latitude' : $(this).find('latitude')
								,'longitude' : $(this).find('longitude')
							}
						});
					});

					
					$(data).find('variable').each( function () {
					
						siteinfo.variable ={
							 'variablecode' : $(this).find('variablecode').text()  
							, 'variablename' : $(this).find('variablename').text()  
							, 'valuetype' : $(this).find('valuetype').text()
							, 'datatype': $(this).find('datatype').text()
							, 'generalcategory' : $(this).find('generalcategory').text()
							, 'samplemedium' : $(this).find('samplemedium').text()
							, 'nodatavalue' : $(this).find('nodatavalue').text()
							, 'speciation' : $(this).find('speciation').text()
						}
						chartOption.variablename = $(this).find('variablename').text() ;
						chartOption.Yunitabbreviation =	$(this).find('unit unitabbreviation')[0].textContent;
						$(this).find('unit').each( function ()
					 	{
					 		siteinfo.variable.unit = { 
					 			'unitname' : $(this).find('unitname').text() , 
					 			'unittype' : $(this).find('unittype').text() ,
					 			'unitabbreviation'  : $(this).find('unitabbreviation').text() ,
					 			'unitcode' : $(this).find('unitcode').text() ,
					 		};
						if(uname=="")
							uname += siteinfo.variable.unit.unitabbreviation;
					 	});
					 	$(this).find('timescale unit').each( function(){
				 			siteinfo.variable.timescle = {
					 			'unitname' :$(this).find('unitname').text() , 
					 			'unittype' : $(this).find('unittype').text() ,
					 			'unitabbreviation' : $(this).find('unitabbreviation').text() ,
					 			'unitcode' : $(this).find('unitcode').text() ,
				 			};
				 		});	
					});
					 
			 		siteinfo.values = [];  

			 		chartOption.xList=[];
			 		chartOption.yList=[]
			 		$(data).find('values').each( function() {		 			
			 			$(this).find('value').each( function(i){
			 				siteinfo.values[i]= { 
			 					'qualitycontrollevelcode' : $(this).attr('qualityControlLevelCode')
			 					,'sourcecode': $(this).attr('sourceCode')
			 					,'methodcode' : $(this).attr('methodCode')
			 					,'datetimeutc' : $(this).attr('dateTimeUTC')
			 					,'timeoffset' : $(this).attr('timeOffset')
			 					,'datetime' : $(this).attr('dateTime')
			 					,'censorCode' : $(this).attr('censorCode') 
			 					,'text':$(this).text()
			 				};
			 				//chartOption.xList[i] = $(this).attr('dateTime').substring(2,10);
			 				chartOption.xList[i] = $(this).attr('dateTime');
			 				chartOption.yList[i] = Number( $(this).text() );
							
			 			});
			 		} );
					// 0408 추가
					
							
			 		siteinfoList.push(siteinfo) ;

				 	chartOptions.push( chartOption)	;
				 	
				 });
				chartOption.unitabbreviation = siteinfoList[0].variable.unit.unitabbreviation;
				chartOption.unitname = siteinfoList[0].variable.unit.unitname;
		
				//tabletitle = chartOption.variablename +'(' +chartOption.unitabbreviation +')';
				tabletitle = chartOption.variablename +'(' +uname+')';

		 		callNext( urls, i+1);
				
		 }
		// $('#tabletitle').append(tabletitle);
		 //$('#tabletitle').append("데이타");
		
	}


//Date.UTC(year,month,day,hours,minutes,seconds,millisec)
// month 0 -11 
// day 1-31
// hour 0-23 
// min 0-59
// sec 0-59
// millisec 0-999
	
	function drawchart( _chartOptions ){
			
			
			
			// for ( var i=0; i<_chartOptions.length; i++){
			// 	var arrY = {};
			// 	arrY.name = _chartOptions[i].title;
			// 	arrY.data=_chartOptions[i].yList; 
			// 	series.push(arrY);
			// }	
			var seriesDataArr=  [];
			

			for ( var i = 0 ; i< _chartOptions.length ; i++) {
				var series = [];
				var seriesData = {};
				for ( var j = 0 ; j < _chartOptions[i].xList.length ; j++) {
					var s = [];
					s.push ( ConvertUTCTimeToLocalTime (_chartOptions[i].xList[j]));
					s.push ( _chartOptions[i].yList[j] );
					//console.log(s);
					series.push( s); 
				}
				
				//seriesData.name = _chartOptions[i].title  ;
				if ( i== 0 )
				{
						seriesData.type  ='column';
						seriesData.name = '강우';
				}
				else 
				{
					seriesData.type  ='spline';
					seriesData.name = '수위';
				}	
				seriesData.pointInterval = 24* 3600*1000;
				seriesData.pointStart = ConvertUTCTimeToLocalTime (_chartOptions[i].xList[0]);
				seriesData.data = series; 
				if  ( i==1 )
				  seriesData.yAxis=1 ;

				seriesDataArr.push( seriesData );
			}
			
			//seriesData.type = 'area' ;
			

			//console.log( seriesData);
			// Highcharts.setOptions ({
			// 		lang :{
			// 			months :['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11','12'],
			// 			shortMonths :['1', '2', '3', '4월', '5', '6', '7', '8', '9', '10', '11','12']
			// 		}
			// });

			//var chart = new Highcharts.Chart({




			$('#container').highcharts({
				chart : {
					renderTo : 'container',
					zoomType : 'xy'
				}, 
				title : {					
					//text : _chartOptions[0].title +'('+ _chartOptions[0].subtitle +')', 					
					text : '낙동강유역',
					x : -20 
				},
				 // subtitle :{
				 // 	text : _chartOptions[0].variablename ,
				 // 	x : -20 ,
				 // 	style : { 'font-size' : '18px'}
				 // },
				 xAxis: {
            		type: 'datetime',
					title : {
						// 0428
						style : { 'font-size' : '12px','color':'black'},
					 	text : _chartOptions[0].unitname +'(' +_chartOptions[0].unitabbreviation+')'
					},
            		minRange :  3600000 , //2일   2 * 24 * 3600000 , 3600000 : 1시간 
            		dateTimeLabelFormats: {
                		day: '%Y/%m/%e' ,
                		week : '%m/%e' ,
                		month :  '%Y/%m/%e',
                		year : '%Y'
            		},
						// 0428 수정
					labels: {
						style: {
							color: 'black',
							fontSize:'12px'
						}
					},
					crosshair:true
        		 },
/*				yAxis : {
					title : {
						style : { 'font-size' : '18px','color':'black'},						
						text : _chartOptions[0].variablename +'(' +uname+')',
					},
					plotLines : [{
					value : 0 ,
					width : 1, 
					color :'#808080'
					}],
						
					labels: {
						style: {
							color: 'black',
							fontSize:'20px'
						}
					}
				},
*/				
				yAxis : [ {
					labels : {
						format :'{value} ',
						style : {
							color: Highcharts.getOptions().colors[0]
						}
					},
					title : {
						text : '강우('+_chartOptions[0].Yunitabbreviation+')',
						style :{
							color :Highcharts.getOptions().colors[0]
						}
					}, reversed: true
					,min: 0
				}, {
					title :{
						text : '수위('+_chartOptions[1].Yunitabbreviation+')',
						style :{
							color: Highcharts.getOptions().colors[1]
						}
					},
					labels : {
						format : '{value} ',
						style : {
							color :Highcharts.getOptions().colors[1]
						}
					} ,
					opposite : true
				}] ,
				tooltip :{
					shared: true
				},
				 legend :{
				 	layout: 'vertical',
		            align: 'left',
		            x: 120,
		            verticalAlign: 'top',
		            y: 100,
		            floating: true,
		            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
				 },
				/* plotOptions: {
			 		series:{
			 			threshold:100
			 		},
            		area: {
		                fillColor: {
		                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
		                    stops: [
		                        [0, Highcharts.getOptions().colors[0]],
		                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
		                    ]
		               			 },
		                marker: {
		                    radius: 2
		                },
		                lineWidth: 1,
		                states: {
		                    hover: {
		                        lineWidth: 1
		                    }
                		},
                threshold: null
             
            }
        }, */
       
				   series: [  seriesDataArr[0], seriesDataArr[1]   ]

			});
			$('#ajax_loading').hide();
			
			// btn show
			$('#btn, #help').show();
			//$('#keywords').show();
	}



	function drawtable( ){
		siteinfoList
		var trhtml ='';
		for ( var i = 0; i<siteinfoList.length ; i++){
			var unitname = siteinfoList[i].variable.timescle.unitname;
			if ( i/2 == 0 ) 
				trhtml ="<tr>";
			else 
				trhtml ="<tr class='odd'>";
			for ( var j=0;j<siteinfoList[i].values.length; j++){

				var datavalue = siteinfoList[i].values[j].text;
				var datetimeutc= siteinfoList[i].values[j].datetimeutc;
				

				var datetime = siteinfoList[i].values[j].datetime;
				
				datetime = datetime.replace('T',' ');
				
				if ( unitname.indexOf('min') > -1 )	{
					datetime = datetime.substring(0,16);
				}else if ( unitname.indexOf('ho') > -1) {
					datetime = datetime.substring(0,16);	
				}else if ( unitname.indexOf('day') > -1) {
					datetime = datetime.substring(0,10);	
				}else if ( unitname.indexOf('sec') > -1) {
					datetime = datetime.substring(0,19);	
				}

				//console.log(j,datavalue, datetimeutc, datetime);
				trhtml +='<th>' +datetime+'<td>'+datavalue+'</tr>';
			}
		}
		$('#tablelist').append(trhtml);
	}
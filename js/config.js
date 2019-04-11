

var host = "http://"+window.location.hostname;
var wmsUrl =  "http://210.92.123.150:8080/geoserver/wms" ;
var wfsUrl = "http://210.92.123.150:8080/geoserver/wfs?";

// var wmsUrl =  "http://hygis-server.southeastasia.cloudapp.azure.com:8080/geoserver/wms" ;
// var wfsUrl = "http://hygis-server.southeastasia.cloudapp.azure.com:8080/geoserver/wfs?";
var displayProjection = "EPSG:4326" ;
//var defautProjection = "EPSG:900913"; //vworld

var defautProjection = "EPSG:5179";

var proxyUrl = host+"/sraproxy/sraproxy.aspx?url=" ;



var bounds =  [124.68800483687885 ,33.44436454796301 , 130.75465268662208, 39.12569492351057 ];


var rainfallUrl, getParametersService , setParameterService ;
var imageServiceUrl;


var azure_webservice = "http://realgrm.southeastasia.cloudapp.azure.com:8080/goldenws/goldencommon.asmx";
//var azure_webservice = "http://210.92.123.131/goldenws/goldencommon.asmx";
var webservice_host = azure_webservice;//"http://test-grm2.cloudapp.net:8080/hydroradarws/hrwebservice.asmx";
var startService = webservice_host  + "/GRMStart?" ;
var stopService = webservice_host  + "/GRMEnd?";
var getGrmStatusService = webservice_host  + "/GetGRMStatus?";
var getGrmRunningStatusService = webservice_host  + "/GetGRMRunningStatus?";
var getGetServersStatusService = webservice_host  + "/GetServersStatus?";


var getProcessInfoService = webservice_host  + "/GetGRMProcessInfo?";

var objquery =query_to_hash( ) ;
var wpname = objquery.wpname;
var fid= objquery.fid;


	//rainfallUrl = proxyUrl + webservice_host  + "/GetDataQCAL?wpname=" + wpname+"&runid=" +runid ;
    rainfallUrl = webservice_host  + "/GetDataQCAL?";
	//getParametersService = webservice_host  + "/GRMparamLoad?";


	imageServiceUrl = webservice_host  + "/GetWaterShedImg?";
var getWatchpointListByGovElementService = webservice_host + "/GetWatchpointListByGovElement?";
var getChartDataByElementCodeUrl =webservice_host +"/GetDataQCALByElementCode?";
var getGetWatchpointCriteriaLevelUrl =webservice_host +"/GetWatchpointCriteriaLevel?";
var getGetgGovElementCriteriaLevelUrl =webservice_host +"/GetgGovElementCriteriaLevel?";

var getGetRunMetaListUrl = webservice_host + "/GetRunMetaList?";

// 파라미터 관련 서비스 목록
var getGRMParameterByWpnameUrl = webservice_host + "/GRMparamLoadByWPName?"; //팝업 화면 wp별 상세 보기/ 수정
setParameterService = webservice_host  + "/GRMparamUpdate?";
var getGRMSettingLoadUrl = webservice_host +"/GRMSettingLoad?"; //전체 매개변수 설정
var GRMSettingLoadByRunidUrl = webservice_host +"/GRMSettingLoadByRunid?"; //전체 매개변수 설정





app
.controller(
        "exchangeRateController",
        function($scope, $http) {

$scope.getExchangeRateDetails="https://api.exchangeratesapi.io/latest";

$scope.showCurrencyRateTable= false;

 $scope.latestForeignExchange = function() {


    $http
    .get( $scope.getExchangeRateDetails)
    .then(
            function success(response) {

 $scope.exchangeRateData=response.data;
 
 $scope.currencyArray=[];
 $scope.baseCurrencyArray=['EUR'];
 
 
 $scope.selectedCur=$scope.currencyArray[0];
 for (const key in $scope.exchangeRateData.rates) {
   
    $scope.currencyArray.push(key);
    $scope.baseCurrencyArray.push(key);
    
    for( var i= 0; i<$scope.baseCurrencyArray.length; i++)  {
        if ($scope.baseCurrencyArray[i]=='EUR') {
          $scope.baseCurr=$scope.baseCurrencyArray[i];
        }
    }
  
}
            },
	function error(response) {

											
												$scope.errResponse = response.data;
												$scope.errMsg = response.data;
                                            
                                        });

                                    

                                    
    }

    $scope.latestForeignExchange();



    $scope.getBaseCurr=function(base){
        $scope.baseCurr=base;
    }


    $scope.getCurrD2=function(value2){
        $scope.selectedCur2=value2;
        }


        
    $scope.getCurrD1= function(value1){
        $scope.selectedCur1=value1;
        console.log("$scope.selectedCur1",$scope.selectedCur1);
        }




        $scope.getLatestExchangeRate= function(){
            $http
            .get( $scope.getExchangeRateDetails,$scope.config)
            .then(
                    function success(response) {
        
         $scope.details=response.data;
          Object.keys($scope.details.rates).forEach(function(key){
              var value = $scope.details.rates[key];
              
        
              $scope.currencyData={"currency": key ,"currencyValue":value.toFixed(2), "date":$scope.details.date, "base": $scope.details.base }
              $scope.exchangeRate.rates.push( $scope.currencyData);
              $scope.showCurrencyRateTable= true;
            
              
          })
        
        },
        function error(response) {
        
            $scope.errResponse = response.data;
            $scope.errMsg = response.data;
                                            });
        }



        $scope.singleDateCurrencyFunction = function(){
            $scope.getsingleDateCurrencyRateUrl='https://api.exchangeratesapi.io/';
            $http
    .get( $scope.getsingleDateCurrencyRateUrl + $scope.date , $scope.config)
    .then(
            function success(response) {

 $scope.ratedetails=response.data;
  Object.keys($scope.ratedetails.rates).forEach(function(key){
      var value = $scope.ratedetails.rates[key];

      $scope.cData={"currency": key ,"currencyValue":value.toFixed(2) , "date": $scope.ratedetails.date , "base":$scope.ratedetails.base}
      $scope.exchangeRate.rates.push( $scope.cData);
      $scope.showCurrencyRateTable= true;
     
  })

},
function error(response) {
    $scope.errResponse = response.data;
    $scope.errMsg = response.data;


                                    });



        }



        $scope.historicalCurrencyFunction = function(config){
            $scope.gethistoricalDateCurrencyRateUrl='https://api.exchangeratesapi.io/history';
            $http
    .get( $scope.gethistoricalDateCurrencyRateUrl,config)
    .then(
            function success(response) {

 $scope.historicalRatedetails=response.data;
  Object.keys($scope.historicalRatedetails.rates).forEach(function(key){
      var currencyArray = $scope.historicalRatedetails.rates[key];
      Object.keys(currencyArray).forEach(function(curr){
        
        var value = currencyArray[curr];
        $scope.cData={"date": key , "currency":curr ,"currencyValue": value.toFixed(2) ,  "base":$scope.historicalRatedetails.base}
        $scope.exchangeRate.rates.push( $scope.cData);
        $scope.showCurrencyRateTable= true;
        
       
    })
      })
    },

     

function error(response) {

    $scope.errResponse = response.data;
    $scope.errMsg = response.data;
                                    });



        }




       $scope.submit= function(){
      var x=  document.getElementById("dateID");
      
        $scope.selectedDate=x.value;
        $scope.startDate=$scope.selectedDate.slice(0,10);
        $scope.endDate= $scope.selectedDate.slice(13,23);
       

        $scope.exchangeRate={};
        $scope.exchangeRate.rates=[];
        var selectedCurrencies= $scope.selectedCur1 + "," + $scope.selectedCur2;
         $scope.config = {
            params: {
                

            }
        }

        if($scope.selectedCur1 !="" && $scope.selectedCur1  != null && $scope.selectedCur1  != undefined 
        && $scope.selectedCur2 !="" && $scope.selectedCur2  != null && $scope.selectedCur2  != undefined){
            $scope.config.params.symbols=selectedCurrencies;
           
            
        }
        else{
            if($scope.selectedCur1 !="" && $scope.selectedCur1  != null && $scope.selectedCur1  != undefined){
                $scope.config.params.symbols=$scope.selectedCur1 ;
               
                
            }
            if($scope.selectedCur2 !="" && $scope.selectedCur2  != null && $scope.selectedCur2  != undefined){
                $scope.config.params.symbols=$scope.selectedCur2 ;
               
                
            }

        }
        
       
        if($scope.baseCurr !="" && $scope.baseCurr !=null && $scope.baseCurr !=undefined){
            if($scope.baseCurr!=='EUR'){
                $scope.config.params.base= $scope.baseCurr;
            }
           
         
        }
        if($scope.startDate !="" && $scope.startDate !=null && $scope.startDate !=undefined &&
         $scope.endDate !="" && $scope.endDate !=null && $scope.endDate !=undefined){
             if( $scope.startDate===$scope.endDate){
                $scope.date= $scope.startDate;
                $scope.singleDateCurrencyFunction();
             }
          else{

            if( $scope.startDate !==$scope.endDate){
                $scope.config.params.start_at= $scope.startDate;
                $scope.config.params.end_at= $scope.endDate;
                $scope.historicalCurrencyFunction($scope.config);
             }
          }

        }
        else{
            $scope.getLatestExchangeRate();
        }




       

      
    



                                

            
      }
});












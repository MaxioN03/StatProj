//Open XML
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "../resource/xml_1.xml",
        dataType: "xml",
        success: xmlParser
    });
});


var deals = []; 
var myChart;


//Parse XML
function xmlParser(xml) {     
    $('#load').fadeOut();
    $(xml).find("DATA_RECORD").each(function () {        
        
        var deal = {
            ORGID: $(this).find("ORGID").text(),
            FLATUID: $(this).find("ORGID").text(), 
            INVNUMBER: $(this).find("INVNUMBER").text(),           
            INOPERUID: $(this).find("INOPERUID").text(),            
            INVNUMBER: $(this).find("INVNUMBER").text(),
            KODREG: $(this).find("KODREG").text(),
            PREVADDRESS: $(this).find("PREVADDRESS").text(),
            PURPOSEUID: $(this).find("PURPOSEUID").text(),
            PURPOSECOMMENT: $(this).find("PURPOSECOMMENT").text(),
            SQUARE: $(this).find("SQUARE").text(),
            ROOMSCOUNT: $(this).find("ROOMSCOUNT").text(),
            FLOOR: $(this).find("FLOOR").text(),
            FLATNAME: $(this).find("FLATNAME").text(),
            REMARKIN: $(this).find("REMARKIN").text(),
            OUTOPERUID: $(this).find("OUTOPERUID").text(),
            REMARKOUT: $(this).find("REMARKOUT").text(),
            NUMCOMPLEX: $(this).find("NUMCOMPLEX").text(),
            ORGUID: $(this).find("ORGUID").text(),
            PAGENUM: $(this).find("PAGENUM").text(),
            BSQUARE: $(this).find("BSQUARE").text(),
            BPURPOSEUID: $(this).find("BPURPOSEUID").text(),
            WALLTYPEUID: $(this).find("WALLTYPEUID").text(),
            INDATE: $(this).find("INDATE").text(),
            FLOORS: $(this).find("FLOORS").text(),
            BUILDNAME: $(this).find("BUILDNAME").text(),
            DOCTYPEUID: $(this).find("DOCTYPEUID").text(),
            IDRIGHTTYPE: $(this).find("IDRIGHTTYPE").text(),
            RIGHTTYPEREMARK: $(this).find("RIGHTTYPEREMARK").text(),
            DATESTART: $(this).find("DATESTART").text(),
            DATEEND: $(this).find("DATEEND").text(),
            OPERDATE: $(this).find("OPERDATE").text(),
            DECLDATE: $(this).find("DECLDATE").text(),
            PRICEVALUE: $(this).find("PRICEVALUE").text(),
            CURRENCYTYPE: $(this).find("CURRENCYTYPE").text(),
            ADDRESSUID: $(this).find("ADDRESSUID").text(),
            SOATO: $(this).find("SOATO").text(),
            OBJECTNUMBER: $(this).find("OBJECTNUMBER").text(),
            PRICEVALUEUSD: $(this).find("PRICEVALUEUSD").text(),
            PRICEDESCR: $(this).find("PRICEDESCR").text(),
            DOCUMUID: $(this).find("DOCUMUID").text(),
            AUTHENTIC: $(this).find("AUTHENTIC").text(),
            XRECOUNT: $(this).find("XRECOUNT").text(),
            YRECOUNT: $(this).find("YRECOUNT").text(),
            OPERUID: $(this).find("OPERUID").text(),
            REGCODE: $(this).find("REGCODE").text(),
            DETAILPARCEL: $(this).find("DETAILPARCEL").text(),
            PARCELUID: $(this).find("PARCELUID").text(),
            PINOPERUID: $(this).find("PINOPERUID").text(),
            NEWRECORD: $(this).find("NEWRECORD").text(),
            BUILDINGUID: $(this).find("BUILDINGUID").text(),
            COUNTPARCELS: $(this).find("COUNTPARCELS").text(),
            PBLOCK: $(this).find("PBLOCK").text(),
            PPURPOSEUID: $(this).find("PPURPOSEUID").text(),
            PSQUARE: $(this).find("PSQUARE").text(),
            PARCELNUMBER: $(this).find("PARCELNUMBER").text(),
            PRINTMARK: $(this).find("PRINTMARK").text(),
            SOATO_1: $(this).find("SOATO_1").text(),
            BLDINV: $(this).find("BLDINV").text(),
            DOL: $(this).find("DOL").text()            
            }
        
        deals.push(deal);        
              
    }); 
    
    countYears();
    
    bubbleChart();
    groupedChart(); 
    lineChart();
    StackedChart();       
    boxPlotButton();
}



//Подсчёт значений анализируемых лет
var countDeals = function(){     
    var parseData = function(date){
    var dateAndTime = date.split(" ");
    return dateAndTime[0].split("/")[0];   
    }
    
   var years = new Object();
    
   deals.forEach(function(item, i, arr) {
        if(typeof  years[parseData(item.OPERDATE)] == "undefined"){
           years[parseData(item.OPERDATE)] = 1;
        }        
       else{
           years[parseData(item.OPERDATE)]++;
       }
   });
    
   return years;    
};

//Подсчёт количества лет
var countYears = function(){
    var yearsDeals = new Object(); yearsDeals = countDeals();
    var years = new Array();
    
    for(key in yearsDeals){
        years.push(key);
        
    };
    
    return years;
    
}

//Сумма площадей в кв. м по данному году
var countSquare = function(){
    var parseData = function(date){
    var dateAndTime = date.split(" ");
    return dateAndTime[0].split("/")[0];   
    }
    
    var square = new Array();
    square = countDeals();
    
    for(key in square){
        square[key] = 0;        
    } 
    
    
    
    for(key in square){
        deals.forEach(function(item, i, arr) {
        if(parseData(parseData(item.OPERDATE))==key){          
          square[key]+=parseFloat(item.SQUARE); 
        }
    });
              
    }
    return square; 
};

//Сумма цен сделок в BYN  по данному году
var countCost = function(){
    var parseData = function(date){
    var dateAndTime = date.split(" ");
    return dateAndTime[0].split("/")[0];   
    }
    
    var cost = new Array();
    cost = countDeals();
    
    for(key in cost){
        cost[key] = 0;        
    }    
    
    
    for(key in cost){
        deals.forEach(function(item, i, arr) {
        if(parseData(parseData(item.OPERDATE))==key){           
          cost[key]+=parseFloat(item.PRICEVALUE); 
        }
    });
              
    }

    return cost; 
};


//Диаграммы 

//Пузырькая диаграмма
//document.getElementById("bubbleChartButton").onclick  
var bubbleChart = function(){        
    var years = new Array(); years = countDeals();
    var square = new Array(); square = countSquare();
    var cost = new Array(); cost = countCost();
    
    var backgroundColorAmount = 'rgba(51,88,153, ';
    var borderColorAmount = 'rgba(51,88,153, 1)';
    
    
    myChart  = new Chart(document.getElementById("bubbleChart"), {
    type: 'bubble',     
    options: {
        legend: {
            display: true,
            position: 'bottom',
        },
      title: {
        display: true,
        text: 'Ёмкость рынка и количество сделок',
        fontSize: 14,
        fontColor: "black"
      }, scales: {
        
        yAxes: [{ 
          scaleLabel: {
            display: true,
            labelString: "Ёмкость, млн. BYN",
            //fontSize: 10,
            fontColor: "black"
          }
        }],
        xAxes: [{
        
          scaleLabel: {
            
            display: true,             
            labelString: "Ёмкость, тыс. кв. м",
            //fontSize: 10,
            fontColor: "black"
            
          }
        }]
      }
    }
});

    for(key in years){
        console.log(backgroundColorAmount+years[key]/deals.length+")");
        var newDataset = {
        label: key,
        backgroundColor: backgroundColorAmount+years[key]/deals.length+")",
        borderColor: borderColorAmount,
        borderWidth: 1,
        data: [{
            x: square[key]/1000,
            y: cost[key]/1000000,
            r: years[key]
          }]
    } 
       
   // You add the newly created dataset to the list of `data`
    myChart.data.datasets.push(newDataset);
    // You update the chart to take into account the new dataset
    myChart.update();        
   
    }
    
    
}
 

//Нормированная гистограмма с накоплением 
var StackedChart = function() {
    var years = new Array(); years = countYears();
    var deal = new Object(); deal = countDeals();
    var square = new Array(); square = countSquare();
    var cost = new Array(); cost = countCost();
    
    var backgroundColorWithMortgage = 'rgba(51,88,153,0.8)';
    var backgroundColorWithoutMortgage = 'rgba(179,190,223,0.8)';
    
    var withMortgage = new Array();
    var withoutMortgage = new Array();
    for(key in deal){
        withMortgage.push(deal[key]-1);
        withoutMortgage.push(deal[key]);
    }   
    
var myChart = new Chart(document.getElementById("stackedChart"), {
  data: {
    labels: years,
    datasets: [
      { label: "Квартиры в ипотеку", data: withMortgage, backgroundColor: backgroundColorWithMortgage },
      { label: "Квартиры без ипотеки", data: withoutMortgage, backgroundColor: backgroundColorWithoutMortgage }
    ]
  },
  type: 'bar',   
  options: {
      title: {
        display: true,
        text: 'Квартиры в сделках в ипотеку',
        fontSize: 14,
        fontColor: "black"
      },
      legend: {
            display: true,
            position: 'bottom',
        },
      plugins: {
      stacked100: { enable: true }
    },
    scales: {
      yAxes: [{
        ticks: {
            beginAtZero: true,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
            return value + '%';
            }
        }
        
      },
             {
                 
        id: 'lines',
        type: 'linear',
        position: 'right',
        ticks: {
            beginAtZero: true,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
            return value + '%';
            }
        }
      }],
      xAxes: [{
       
        ticks: {
          beginAtZero: true
        }
      }]

    }
  }
});
    
    
}

//Гистограмма с группировкой на основной оси и график с маркерами на вспомогательной оси 
var groupedChart = function() {
    var year = new Array(); year = countYears();
    var years = new Array(); years = countDeals();
    var square = new Array(); square = countSquare();
    var cost = new Array(); cost = countCost();
    
    var backgroundColorBar = 'rgba(59,100,173,0.8)';
    var backgroundColorLine = 'rgba(143,162,212,0.8)';
    
    var currencyAmount = 1000;

    myChart = new Chart(document.getElementById("groupedChart"), {
    
    type: 'bar', 
    data:{
        labels: year
    },
    options: {
        legend: {
            display: false,
            position: 'bottom',
        },
    title: {
    display: true,
    text: 'Среднице цены и количество сделок',
    fontSize: 14,
    fontColor: "black"
    },
    elements: {
        line: {
            tension: 0
        }
    }, 
    scales: {
      yAxes: [{
        id: 'bars',
        type: 'linear',
        position: 'left',
          scaleLabel: {
            
            display: true,             
            labelString: "Сделки",
            //fontSize: 10,
            fontColor: "black"
            
          }
      }, {
        id: 'lines',
        type: 'linear',
        position: 'right',
          scaleLabel: {
            
            display: true,             
            labelString: "Цены (BYN/кв. м)",
            //fontSize: 10,
            fontColor: "black"
            
          }
      }]
    }
  }
});

    for(key in years){
        var newDataset = {        
        type: 'bar',
        label: "Сделки",
        backgroundColor: backgroundColorBar,
        //borderColor: 'rgba(99, 255, 132, 1)',
        borderWidth: 1,
        yAxisID: 'bars',
        data: [years[key]]
    } 
       
   // You add the newly created dataset to the list of `data`
    myChart.data.datasets.push(newDataset);
    // You update the chart to take into account the new dataset
    myChart.update();           
    }
    
    var dataForLineGraph = new Array();
    for(key in years){
        dataForLineGraph.push(parseFloat(cost[key]/(square[key]*currencyAmount)).toFixed(2));
    }
    console.log(dataForLineGraph);
    
    for(key in years){
        var newDataset = { 
        type: 'line',
        label : "Цены",
        fill:false,
        backgroundColor: backgroundColorLine,
        //borderColor: 'rgba(99, 255, 132, 1)',
        borderWidth: 1,
            yAxisID: 'lines',
        data: dataForLineGraph
        //data: []
    } 
       
   // You add the newly created dataset to the list of `data`
    myChart.data.datasets.push(newDataset);
    // You update the chart to take into account the new dataset
    myChart.update();           
    }
}


//Линейный график
 var lineChart = function() {
    var years = new Array(); years = countYears();
    var deal = new Array(); deal = countDeals();
    var square = new Array(); square = countSquare();
    var cost = new Array(); cost = countCost();
    
     var backGroundColor1 = "rgba(51,88,153, 0.8)";
     var backGroundColor2 = "rgba(63,106,183, 0.8)";
     var backGroundColor3 = "rgba(121,145,206, 0.8)";
     var backGroundColor4 = "rgba(179,190,223, 0.8)";

    //Создаём массивы данных
    var lineData1 = new Object;
    var lineData2 = new Object;
    var lineData3 = new Object;
    var lineData4 = new Object;
    
    var parseData = function(date){
    var dateAndTime = date.split(" ");
    return dateAndTime[0].split("/")[0];   
    }
    
    //Для первого ряда
    years.forEach(function(item, i, arr) {
        lineData1[item] = 0;
    });    
    
    for(key in lineData1){        
        deals.forEach(function(item, i, arr) {         
        if(item.INDATE=="" && parseData(item.OPERDATE)==key){          
          lineData1[key]++; 
        }
    });              
    }
    
    //Для второго ряда
    years.forEach(function(item, i, arr) {
        lineData2[item] = 0;
    });    
    
    for(key in lineData2){        
        deals.forEach(function(item, i, arr) {          
        if(parseInt(parseData(item.INDATE))<1990 && parseData(item.OPERDATE)==key){            
          lineData2[key]++; 
        }
    });              
    }
    
    //Для третьего ряда
    years.forEach(function(item, i, arr) {
        lineData3[item] = 0;
    });    
    
    for(key in lineData3){        
        deals.forEach(function(item, i, arr) {          
        if(parseInt(parseData(item.INDATE))>=1990 && parseInt(parseData(item.INDATE))<=2015 && parseData(item.OPERDATE)==key){            
          lineData3[key]++; 
        }
    });              
    }
    
    //Для четвёртого ряда
    years.forEach(function(item, i, arr) {
        lineData4[item] = 0;
    });    
    
    for(key in lineData4){        
        deals.forEach(function(item, i, arr) {          
        if(parseInt(parseData(item.INDATE))==2016 && parseData(item.OPERDATE)==key){            
          lineData4[key]++; 
        }
    });              
    }  
    
    
    
    var lineDataArr1 = new Array(); 
    for(key in lineData1){
        lineDataArr1.push(lineData1[key]);
    }
    var lineDataArr2 = new Array(); 
    for(key in lineData2){
        lineDataArr2.push(lineData2[key]);
    }
    var lineDataArr3 = new Array(); 
    for(key in lineData3){
        lineDataArr3.push(lineData3[key]);
    }
    var lineDataArr4 = new Array(); 
    for(key in lineData4){
        lineDataArr4.push(lineData4[key]);
    } 
    
 myChart = new Chart(document.getElementById("lineChart"), {
    type: 'line',
    data: {
    labels: years,
    datasets: [
    { label: "Нет сведений", data: lineDataArr1, backgroundColor: backGroundColor1 },
    { label: "до 1990 г.", data: lineDataArr2, backgroundColor: backGroundColor2 },
    { label: "1990…2000 гг.", data: lineDataArr3, backgroundColor: backGroundColor3 },
    { label: "Новое строительство (2016 г.)", data: lineDataArr4, backgroundColor: backGroundColor4 },
    ]
  },
    options: {
        legend: {
            display: true,
            position: 'bottom',
        },
        title: {
        display: true,
        text: 'Жилые многоквартирные дома в сделках по году постройки',
        fontSize: 14,
        fontColor: "black"
      },
    plugins: {
      stacked100: { enable: true }
    },    
    elements: {
        line: {
            tension: 0
        }
    },      
    responsive: false,
    scales: {
      yAxes: [{
          ticks: {
            beginAtZero: true,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
            return value + '%';
            }
        },
        stacked: true,
      }]
    },
    animation: {
      duration: 750,
    },
  }
});       
}    
  

//Ящик с усами/ Box Plot
var boxPlotButton = function() {  
    var year = new Array(); year = countYears();
    var years = new Array(); years = countDeals();
    var square = new Array(); square = countSquare();
    var cost = new Array(); cost = countCost();
    
    var currencyCoeff = 1000;
    
    var commonDataArray = new Array();
    
    var parseData = function(date){
    var dateAndTime = date.split(" ");
    return dateAndTime[0].split("/")[0];   
    }    
    
    var findMax = function(array, year){
        var max = -1; 
        var i=0;
        while(max==-1){            
            if(parseData(array[i].OPERDATE)==year){               
               max =  parseFloat(array[i].PRICEVALUE);           
            }
            i++;
        }
        
        array.forEach(function(item) {        
        if(parseFloat(item.PRICEVALUE)>max  && parseData(item.OPERDATE)==year){           
            max  = parseFloat(item.PRICEVALUE);           
        }     
    }); 
        return max/currencyCoeff; 
    };
    
   var findMin = function(array, year){
        var min = -1; 
        var i=0;
        while(min==-1){            
            if(parseData(array[i].OPERDATE)==year){               
               min =  parseFloat(array[i].PRICEVALUE);           
            }
            i++;
        }
        
        array.forEach(function(item) {        
        if(parseFloat(item.PRICEVALUE)<min  && parseData(item.OPERDATE)==year){           
            min  = parseFloat(item.PRICEVALUE);           
        }     
    }); 
        return min/currencyCoeff; 
    };
    
    var findMedian = function(cost, count){      
      return parseFloat((cost/count)/currencyCoeff).toFixed(1);  
    };
    
    var findLowQuartile = function(cost, count){        
      return parseFloat(((cost/count)/2)/currencyCoeff).toFixed(1); 
    };
    
    var findHighQuartile = function(cost, count){
      return parseFloat((((cost/count)/2)*3)/currencyCoeff).toFixed(1); 
    };
    
    year.forEach(function(item, i, arr) {
        var tmpArr = new Array();
        
        tmpArr.push(findMin(deals,parseFloat(item)));
        tmpArr.push(findLowQuartile(cost[item],years[item]));
        tmpArr.push(findMedian(cost[item],years[item]));
        tmpArr.push(findHighQuartile(cost[item],years[item]));
        tmpArr.push(findMax(deals,parseFloat(item)));
        
        commonDataArray.push(tmpArr);
    }); 
    
    
    Highcharts.setOptions({
    colors: ["rgba(51,88,153, 0.8)"]
    });

    
    var myChart = Highcharts.chart('container', {
    //Убрать надпись под графиком    
    credits:{
        text: ""
    },
        
    chart: {
        type: 'boxplot',
        
    },

    title: {
        text: 'Основные ценовые показатели, BYN/кв. м',        
          
    },

    legend: {
        enabled: false
    },

    xAxis: {
        categories: year,
        //visible: false,
    },

    yAxis: {        
        visible: false
    },

    series: [{
        name: 'Наблюдение',
        data: commonDataArray
    }/*, {
        name: 'Outlier',
        color: Highcharts.getOptions().colors[0],
        type: 'scatter',
        data: [ // x, y positions where 0 is the first category
            [0, 644],
            [4, 718],
            [4, 951],
            [4, 969]
        ],
        marker: {
            fillColor: 'white',
            lineWidth: 1,
            lineColor: Highcharts.getOptions().colors[0]
        },
        tooltip: {
            pointFormat: 'Observation: {point.y}'
        }
    }*/]

});
    
    



}




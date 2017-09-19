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
}

//ReCreate canvas
var resetCanvas = function(){
  $('#myChart').remove(); // this is my <canvas> element
  $('#graph-container').append('<canvas id="myChart" width="600" height="400"></canvas>');  
};





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


//Diagrams
//Bubble Chart/Пузырькая диаграмма
document.getElementById("bubbleChartButton").onclick = function(){   
        
    var years = new Array(); years = countDeals();
    var square = new Array(); square = countSquare();
    var cost = new Array(); cost = countCost();
    
    resetCanvas();
    
    
    myChart  = new Chart(document.getElementById("myChart"), {        
    type: 'bubble',     
    options: {
      title: {
        display: true,
        text: 'Ёмкость рынка и количество сделок'
      }, scales: {
        yAxes: [{ 
          scaleLabel: {
            display: true,
            labelString: "Ёмкость, млн. BYN"
          }
        }],
        xAxes: [{ 
          scaleLabel: {
            display: true,
            labelString: "Ёмкость, тыс. кв. м"
          }
        }]
      }
    }
});

    for(key in years){
        var newDataset = {
        label: key,
        backgroundColor: 'rgba(99, 255, 132, 0.2)',
        borderColor: 'rgba(99, 255, 132, 1)',
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
 

//Stacked Diagram / Нормированная гистограмма с накоплением 
document.getElementById("stackedChartButton").onclick = function() {
    var years = new Array(); years = countYears();
    var deals = new Object(); deals = countDeals();
    var square = new Array(); square = countSquare();
    var cost = new Array(); cost = countCost();
    resetCanvas();

var myChart = new Chart(document.getElementById("myChart"), {
  
  type: 'bar',   
  options: {
    scales: {
      yAxes: [{
        
        ticks: {
          beginAtZero: true
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
    
    for(key in deals){
        var newDataset = { 
        label : key,
        backgroundColor: 'rgba(99, 255, 132, 0.2)',
        borderColor: 'rgba(99, 255, 132, 1)',
        borderWidth: 1,
        data: [deals[key]]
    } 
       
   // You add the newly created dataset to the list of `data`
    myChart.data.datasets.push(newDataset);
    // You update the chart to take into account the new dataset
    myChart.update();           
    }
};

//Гистограмма с группировкой на основной оси и график с маркерами на вспомогательной оси 
document.getElementById("groupedChartButton").onclick = function() {
    var year = new Array(); year = countYears();
    var years = new Array(); years = countDeals();
    var square = new Array(); square = countSquare();
    var cost = new Array(); cost = countCost();
    resetCanvas();

    myChart = new Chart(document.getElementById("myChart"), {
    type: 'bar', 
    data:{
        labels: year
    },
    options: {
    scales: {
      yAxes: [{
        id: 'bars',
        type: 'linear',
        position: 'left',
      }, {
        id: 'lines',
        type: 'linear',
        position: 'right'        
      }]
    }
  }
});

    for(key in years){
        var newDataset = {        
        type: 'bar',
        label: key,
        backgroundColor: 'rgba(99, 255, 132, 0.2)',
        borderColor: 'rgba(99, 255, 132, 1)',
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
        dataForLineGraph.push(cost[key]/square[key]);
    }
    console.log(dataForLineGraph);
    
    for(key in years){
        var newDataset = { 
        type: 'line',
        label : key,
        fill:false,
        backgroundColor: 'rgba(99, 255, 132, 0.2)',
        borderColor: 'rgba(99, 255, 132, 1)',
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
    
};

//Линейный график
document.getElementById("lineChartButton").onclick = function() {
    var years = new Array(); years = countDeals();
    var square = new Array(); square = countSquare();
    var cost = new Array(); cost = countCost();
    resetCanvas();


 myChart = new Chart(document.getElementById("myChart"), {
    type: 'line',
    //data: data,
    options: {
        scales: {
            yAxes: [{
                stacked: true
            }],
            xAxes: [{
                stacked: true
            }]
        }
    }
});

    for(key in years){
        var newDataset = {        
        type: 'line',        
        label: key,
        backgroundColor: 'rgba(99, 255, 132, 0.2)',
        borderColor: 'rgba(99, 255, 132, 1)',
        borderWidth: 1,
        fill: true,
        data: [{
        x: 10,
        y: 20
        }, {
        x: 15,
        y: 10
        },{
        x: 25,
        y: 30
        }]
    } 
       
   // You add the newly created dataset to the list of `data`
    myChart.data.datasets.push(newDataset);
    // You update the chart to take into account the new dataset
    myChart.update();           
    }
    
    
    
};


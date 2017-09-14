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
    
}

//Diagrams

//Stacked Diagram
document.getElementById("bubbleChartButton").onclick = function() {
       
    console.log(deals);
    var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["2016", "2017"],
    datasets: [{
        //label: '# of Votes 1',
        data: [10, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(255,99,132,1)',
          'rgba(255,99,132,1)',
          'rgba(255,99,132,1)',
          'rgba(255,99,132,1)',
          'rgba(255,99,132,1)'
        ],
        borderWidth: 2
      },
      {
        //label: '# of Votes 2',
        data: [15, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2
      }
    ]
  },
  options: {
    scales: {
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }]

    }
  }
});
};
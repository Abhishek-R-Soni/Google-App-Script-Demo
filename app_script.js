  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName('big_basket');
  
  // get record
  function doGet(e) {
  // call doGetById() if parameter is given
  // var recordId = parseInt(e?.parameter?.id)
  // if(recordId) {
  //   doGetById(recordId);
  // }

  var values = sheet.getDataRange().getValues();
  var output = [];

  for(var i=1; i<values.length; i++){
    var row = {};
    row['id'] = values[i][0];
    row['product'] = values[i][1];
    row['description'] = values[i][9];
    row['category'] = values[i][2];
    row['brand'] = values[i][4];
    row['price'] = values[i][5];
    row['ratting'] = values[i][8];
    output.push(row);
  }

  return ContentService.createTextOutput(JSON.stringify({records: output.length, data: output})).setMimeType(ContentService.MimeType.JSON);
}

// get record by ID
function doGetById(recordId) {
  var values = sheet.getDataRange(recordId).getValues();
  return ContentService.createTextOutput(JSON.stringify({msg:'GET', data: values})).setMimeType(ContentService.MimeType.JSON);
}

// add record
function doPost(e) {
  // call doDelete() if parameter is given
  var recordId = parseInt(e?.parameter?.id)
  if(recordId) {
    doDelete(recordId);
  }
  else {
    // create record
    var values = sheet.getDataRange().getValues();
    var id = parseInt(values[values.length-1][0]) + 1;
    var productDetails = JSON.parse(e.postData.contents)
    sheet.appendRow([id,productDetails.product, productDetails.category, productDetails.category, 
                    productDetails.brand, productDetails.price, productDetails.price, '', productDetails.ratting, productDetails.description])
  }
  return ContentService.createTextOutput('Success').setMimeType(ContentService.MimeType.JSON);
}

// remove record
function doDelete(recordId) {
  sheet.deleteRow(recordId + 1)
}

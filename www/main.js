/*global NdefPlugin, Ndef */
var selector = 0 ;
function tag(nfcEvent) {

    if(selector == 0){
        // ignore what's on the tag for now, just overwrite
    
        var mimeType = document.forms[0].elements["mimeType"].value,
        payload = document.forms[0].elements["payload"].value,
        record = ndef.mimeMediaRecord(mimeType, nfc.stringToBytes(payload));

        nfc.write(
            [record], 
            function () {
                window.plugins.toast.showShortBottom("Escribiendo en el TAG");
                navigator.notification.vibrate(100);
            }, 
            function (reason) {
                navigator.notification.alert(reason, function() {}, "Hubo un problema");
            }
        ); 
    }
    if(selector == 1){
        alert(nfc.bytesToString(ndefMessage[0].payload).substring(3));
    }
}

var ready = function () {
  
  function win() {
    console.log("Listening for NDEF tags");
  }
  
  function fail() {
    alert('Failed to register NFC Listener');
  }
  
  nfc.addTagDiscoveredListener(tag, win, fail);
  

  document.addEventListener("volumeupbutton", showSampleData, false);
  document.addEventListener("volumedownbutton", showSampleData, false);

};

document.addEventListener('deviceready', ready, false);

var data = [
    {
        mimeType: 'text/pg',
        payload: 'Hello PhoneGap'
    },
    {
        mimeType: 'text/plain',
        payload: 'Hello PhoneGap'
    },
    {
        mimeType: 'text/x-vCard',
        payload: 'BEGIN:VCARD\n' +
            'VERSION:2.1\n' +
            'N:Coleman;Don;;;\n' +
            'FN:Don Coleman\n' +
            'ORG:Chariot Solutions;\n' +
            'URL:http://chariotsolutions.com\n' +
            'TEL;WORK:215-358-1780\n' +
            'EMAIL;WORK:dcoleman@chariotsolutions.com\n' +
            'END:VCARD'
    },
    {
        mimeType: 'text/x-vCard',
        payload: 'BEGIN:VCARD\n' +
            'VERSION:2.1\n' +
            'N:Griffin;Kevin;;;\n' +
            'FN:Kevin Griffin\n' +
            'ORG:Chariot Solutions;\n' +
            'URL:http://chariotsolutions.com\n' +
            'TEL;WORK:215-358-1780\n' +
            'EMAIL;WORK:kgriffin@chariotsolutions.com\n' +
            'END:VCARD'
    },
    {
        mimeType: 'game/rockpaperscissors',
        payload: 'Rock'
    },
    {
        mimeType: '',
        payload: ''
    }
];

var index = 0;
function showSampleData(e) {

    var mimeTypeField = document.forms[0].elements["mimeType"],
      payloadField = document.forms[0].elements["payload"];

    if (e.type === 'volumedownbutton') {
        index--;
        selector = 0;
        alert("Escribiendo NFC");
    } else {
        index++;
        selector = 1;
        alert("Leyendo NFC");
    }
    
    if (index >= data.length) {
        index = 0;
    } else if (index < 0) {
        index = data.length - 1;
    }

    var record = data[index];
    mimeTypeField.value = record.mimeType;
    payloadField.value = record.payload;    
}

$(document).ready(function () {
    var qrcode = new QRCode("qrcode12");

    makeCode(qrcode);
});

function makeCode(qrcode) {
    console.log(doc_id, date);
    qrcode.makeCode(doc_id);
}


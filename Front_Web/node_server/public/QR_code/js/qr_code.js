$(document).ready(function () {
    var qrcode = new QRCode("qrcode12");

    makeCode(qrcode);
});

function makeCode(qrcode) {

    qrcode.makeCode("성공");
}


module.exports.qr_code = print_qr_code;

var qr_code = `
<div id="qrcode12"></div>
`;

function print_qr_code() {
    return `
      ${qr_code}
    `;
}
module.exports.qr_code = print_qr_code;

var qr_code = `
<div id="qrcode12"></div>
`;

function print_qr_code(doc_id, date) {
    return `
      <script>
      var doc_id = "${doc_id}";
      var date = "${date}";
      </script>
      ${qr_code}
    `;
}
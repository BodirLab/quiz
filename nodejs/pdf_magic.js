import { PdfReader } from 'pdfreader';
// const {PdfReader} = import('pdfreader')

new PdfReader().parseFileItems("c:\\Users\\Andy\\Desktop\\fishingquiz\\Pruefungsvorbereitung_2020-11-10.pdf", (err, item) => {
  if (err) console.error("error:", err);
  else if (!item) console.warn("end of file");
  else if (item.text) console.log(item);
});
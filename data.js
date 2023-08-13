const axios = require('axios');
const url = 'http://www.dneonline.com/calculator.asmx?wsdl';

const intA = 100;
const intB = 20;

const xml = `
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
   <soap:Header/>
   <soap:Body>
      <tem:Add>
         <tem:intA>${intA}</tem:intA>
         <tem:intB>${intB}</tem:intB>
      </tem:Add>
   </soap:Body>
</soap:Envelope>
`;

axios
  .post(url, xml, {
    headers: {
      'Content-Type': 'text/xml;charset=UTF-8',
      'SOAPAction': 'http://tempuri.org/Add'
    },
  })
  .then((response) => {
    // Process the SOAP response
    console.log('SOAP response:', response.data);

    // Extract the result from the response XML using a parser
    const parseString = require('xml2js').parseString;
    parseString(response.data, (err, result) => {
      if (err) {
        console.error('Error parsing SOAP response:', err);
        return;
      }

      // Access the result value
      const resultValue = result['soap:Envelope']['soap:Body'][0]['AddResponse'][0]['AddResult'][0];
      console.log('Result of adding two numbers:', resultValue);
    });
  })
  .catch((error) => {
    console.error('Error sending SOAP request:', error);
  });
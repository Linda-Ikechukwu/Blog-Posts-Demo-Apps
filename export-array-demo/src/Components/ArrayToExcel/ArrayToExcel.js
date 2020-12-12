export const arrayToExcel = (function () {

    //STEP 2: Append Table data to Spreadsheet XML Template.
    const createXMLTable = (table, fileName) => {
        const xmlTable = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"
            xmlns="http://www.w3.org/TR/REC-html40"
        >
           <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"/>
           <head>
              <xml>
                <x:ExcelWorkbook>
                    <x:ExcelWorksheets>
                        <x:ExcelWorksheet>
                            <x:Name>${fileName}</x:Name>
                            <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
                        </x:ExcelWorksheet>
                    </x:ExcelWorksheets>
                </x:ExcelWorkbook>
              </xml>
           </head>
           <body>
             ${table}
           </body>
        </html> `
        return xmlTable;
    }

    //STEP 3: Create fileURL from XML template for download
    const createFileUrl = (xmlTable) => {
        const tableBlob = new Blob([xmlTable], { type: 'application/vnd.ms-excel;base64,' });
        const downloadURL = URL.createObjectURL(tableBlob);
        return downloadURL;
    }

    //STEP 5: Create download link on button click
    const downloadFile = (downloadURL, fileName) => {
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);
        downloadLink.download = fileName;
        downloadLink.href = downloadURL;
        downloadLink.click();
    }

    //STEP 1: Convert Array to HTML Table.
    return{
        convertArrayToTable : async (apiArray, fileName) => {
            //use keys from the first array object to form table column headers
            const tableHeaders = `<tr>${Object.keys(apiArray[0]).map(key => `<td>${key}</td>`).join('')}</tr>`;
            //now loop through all array objects to form table rows
            const tableRows = apiArray.map(obj =>
                [`<tr>
              ${Object.keys(obj).map(key => `<td>${obj[key] === null || obj[key] === '' ? '' : obj[key]}</td>`).join('')}
            <tr/>`]
            ).join('');

            const table = `<table>${tableHeaders}${tableRows}</table>`.trim();
            const xmlTable = createXMLTable(table, fileName);
            const downloadURL = createFileUrl(xmlTable);
            downloadFile(downloadURL, fileName);

        }
    }

})();
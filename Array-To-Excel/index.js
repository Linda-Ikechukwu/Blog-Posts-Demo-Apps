//STEP 1: Fetch JSON Array

const fetchJsonArray = async () => {
    try {
        const response = await fetch('https://jsonfy.com/users');
        let jsonArray = await response.json();
        return jsonArray;
    } catch (error) {
        console.log(error.message);
    }
}

//STEP 2: Convert Array to HTML Table.

const convertArrayToTable = async () => {
    const apiArray = await fetchJsonArray();

    //use keys from the first array object to form table column headers
    const tableHeaders = `<tr>${Object.keys(apiArray[0]).map(key => `<td>${key}</td>`).join('')}</tr>`;
    //now loop through all array objects to form table rows
    const tableRows = apiArray.map(obj =>
        [`<tr>
          ${Object.keys(obj).map(key => `<td>${obj[key] === null || obj[key] === '' ? '': obj[key]}</td>`).join('')}
        <tr/>`]
    ).join('');
    console.log(tableHeaders);
    return `<table>${tableHeaders}${tableRows}</table>`.trim();

}

//STEP 3: Append Table data to Spreadsheet XML Template.

const getTableXML =async() => {
    const table = await convertArrayToTable();
    const tableXML =`
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
       <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"/>
       <head>
           <xml>
                <x:ExcelWorkbook>
                    <x:ExcelWorksheets>
                        <x:ExcelWorksheet>
                            <x:Name>Demo</x:Name>
                            <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
                        </x:ExcelWorksheet>
                    </x:ExcelWorksheets>
                </x:ExcelWorkbook>
            </xml>
        </head>
        <body>
            ${table}
        </body>
    </html>
    `
   return tableXML;
}

//STEP 4: Create fileURL from XML template for download

const createFileUrl = async() => {
    const tableOutput = await getTableXML();
    const tableBlob = new Blob ([tableOutput], {type:'application/vnd.ms-excel;base64,'});
    const url = URL.createObjectURL(tableBlob);
    return url;
}

//STEP 5: Create download link on button click
document.getElementById('downloadbtn').addEventListener('click', async()=>{
    const downloadURL = await createFileUrl();
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.download = "DownloadScript";
    downloadLink.href = downloadURL;
    downloadLink.click();
})

window.addEventListener('load', async()=>{
    const table = await convertArrayToTable();
    document.body.innerHTML= table;
})
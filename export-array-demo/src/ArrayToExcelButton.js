import React, { useState } from "react";
import Modal from "../Components/Modal";
import XlsExport from 'xlsexport';
import Button from "../Resources/Forms/Button";
import Checkbox from "../Resources/Forms/Checkbox";
import Select from "../Resources/Forms/Select";
import { _splitWords, _cloneArray } from "../Utils/helpers";

const DataExport = ({ modalHeader, exportArray, }) => {

    const [isDownloading, setIsDownloading] = useState(false);
    const [columnsType, setColumnsType] = useState("1");
    const [selectedColumns, setSelectedColumns] = useState([]);

    const totalColumns = exportArray ? Object.keys(exportArray[0]).length : "";

    const updateSelectedColumns = (e, column) => {
        if (e.target.checked) {
            setSelectedColumns([...selectedColumns, column]);
        } else {
            setSelectedColumns(selectedColumns.filter(value => value !== column));
        }
    }

    const exportArrayToExcel = () => {
        setIsDownloading(true);
        let xls
        if (columnsType === "1") {
            xls = new XlsExport(exportArray, `${modalHeader}`);
            setIsDownloading(false);
        } else {
            const customArray = _cloneArray(exportArray);
            customArray.map(obj => Object.keys(obj).forEach((key) => {
                if (!selectedColumns.includes(key)) {
                    delete obj[key];
                }
            }))
            xls = new XlsExport(customArray, `${modalHeader}`);
            setIsDownloading(false);
            setSelectedColumns([]);
        }
        xls.exportToXLS(`${modalHeader}.xls`);
    }

    return (

        <Modal
            header={modalHeader ? `Export ${modalHeader}` : `Export to Excel`}
            closeModal={() => setShowExportModal(false)}
            autoScroll={true}
        >

            <div style={{ paddingBottom: "100px", }}>
                <div style={{ width: "200px", }}>
                    <Select
                        width="200px"
                        name="Columns"
                        options={[
                            { name: `All Columns (${totalColumns})`, value: "1" },
                            { name: "Custom", value: "2" },
                        ]}
                        value={columnsType}
                        onChange={(e) => setColumnsType(e.target.value)}
                        label="Discount Type"
                        withMargin={true}
                    />
                </div>


                {columnsType === "1" &&
                    <p>
                        {Object.keys(exportArray[0]).map((key, index) => {
                            return (
                                <span key={index}>{_splitWords(key)}, </span>
                            )
                        })}
                    </p>
                }

                {columnsType === "2" &&
                    <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
                        {Object.keys(exportArray[0]).map((key, index) => {
                            return (
                                <div key={index}
                                    style={{ display: "flex", alignItems: "center", }}
                                    className="one-third"
                                >
                                    <Checkbox
                                        id={key}
                                        onChange={(e) => updateSelectedColumns(e, key)}
                                        label={_splitWords(key)}
                                    />

                                </div>
                            )
                        })}
                    </div>
                }


            </div>

            <div className="modal-submit"
                style={{ paddingRight: "10px", justifyContent: "flex-end", boxSizing: "border-box" }}
            >
                <div style={{ marginRight: "10px", }}>
                    <Button
                        onClick={() => setShowExportModal(false)}
                        type={"default"}
                    >
                        Cancel
                    </Button>
                </div>
                <div>
                    <Button
                        loading={isDownloading}
                        onClick={() => exportArrayToExcel()}
                        type={"primary"}
                    >
                        Export
                    </Button>
                </div>

            </div>

        </Modal>


    )
}

export default DataExport;

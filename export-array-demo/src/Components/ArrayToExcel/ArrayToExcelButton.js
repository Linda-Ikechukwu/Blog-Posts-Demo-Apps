import React, { useState } from "react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
    Checkbox,
} from "@chakra-ui/react"
import { DownloadIcon } from '@chakra-ui/icons'
import { arrayToExcel } from "./ArrayToExcel";
import cloneDeep from "lodash.clonedeep";

const ArrayToExcelButton = ({ apiArray, fileName, buttonTitle }) => {

    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [columnsType, setColumnsType] = useState("1");
    const [selectedColumns, setSelectedColumns] = useState([]);

    const totalColumns = apiArray ? Object.keys(apiArray[0]).length : "";

    const updateSelectedColumns = (e, column) => {
        if (e.target.checked) {
            setSelectedColumns([...selectedColumns, column]);
        } else {
            setSelectedColumns(selectedColumns.filter(value => value !== column));
        }
    }

    const apiArrayToExcel = () => {
        if (columnsType === "1") {
            arrayToExcel.convertArrayToTable(apiArray, fileName)
        } else {
            const customArray = cloneDeep(apiArray);
            customArray.map(obj => Object.keys(obj).forEach((key) => {
                if (!selectedColumns.includes(key)) {
                    delete obj[key];
                }
            }))
            arrayToExcel.convertArrayToTable(customArray, fileName)
            setSelectedColumns([]);
        }
    }


    return (
        <>
            {(apiArray.length > 0 && apiArray !== undefined) &&
                <>
                    <Button leftIcon={<DownloadIcon />} colorScheme="teal" onClick={() => setShowDownloadModal(true)}>
                        {buttonTitle}
                    </Button>
                    {showDownloadModal &&
                        <Modal isOpen={showDownloadModal} onClose={() => setShowDownloadModal(false)}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>{buttonTitle}</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <p style={{ marginBottom: "10px" }}>Select Download Type: </p>
                                    <Select onChange={(e) => setColumnsType(e.target.value)}>
                                        <option value="1">All Columns({totalColumns})</option>
                                        <option value="2">Custom</option>
                                    </Select>
                                    {columnsType === "1" &&
                                        <p style={{ marginTop: "20px" }}>
                                            {Object.keys(apiArray[0]).map((key, index) => {
                                                return (
                                                    <span key={index}>{(key)}, </span>
                                                )
                                            })}
                                        </p>
                                    }
                                    {columnsType === "2" &&
                                        <div style={{ display: "flex", flexWrap: "wrap", width: "100%", marginTop: "20px" }}>
                                            {Object.keys(apiArray[0]).map((key, index) => {
                                                return (
                                                    <div key={index} style={{ display: "flex", alignItems: "center", width: "33.3%" }}>
                                                        <Checkbox
                                                            id={key}
                                                            onChange={(e) => updateSelectedColumns(e, key)}
                                                        >
                                                            {key}
                                                        </Checkbox>

                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }

                                </ModalBody>

                                <ModalFooter>
                                    <Button variant="ghost" mr={3} onClick={() => setShowDownloadModal(false)}>
                                        Cancel
                         </Button>
                                    <Button colorScheme="teal" onClick={() => apiArrayToExcel()}>
                                        Download
                         </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    }
                </>
            }

        </>
    )
}

export default ArrayToExcelButton;
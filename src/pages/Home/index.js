import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input/";
import {
    faUserPlus,
    faTrash,
    faCopy,
    faArrowRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { MySelectBox } from "~/components/MySelectBox";
import styles from "./Home.module.scss";
import { Table } from "~/components/Table";
import {
    getAllEmployee,
    getDetailEmployee,
    getHeaderTable,
} from "~/services/employee";
import AddEmployeeModal from "./AddEmployeeModal";
import { getDepartments } from "~/services/department";
import { getPositions } from "~/services/position";
import { useData } from "~/hooks";
import {
    setCurrentPage,
    setFilterDepartment,
    setFilterInput,
    setFilterPosition,
} from "~/store/action";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
const employeeHeaderTable = getHeaderTable();

function Home() {
    const [employees, setEmployees] = useState({});
    const [isOpenAddModal, setOpenAddModal] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [positions, setPositions] = useState([]);
    const [state, dispatch] = useData();
    const [employeeDetail, setEmployeeDetail] = useState({});
    const [type, setType] = useState("add");
    const {
        filterPosition,
        filterDepartment,
        filterInput,
        perPage,
        currentPage,
        selectedRow,
    } = state;
    const handleClickOpenModal = () => {
        setType("add");
        setOpenAddModal(true);
    };

    const handleClickCloseModal = () => {
        setType("add");
        setOpenAddModal(false);
    };

    const handleEditEmployee = (employeeId) => {
        getDetailEmployee(employeeId)
            .then((result) => {
                setType("edit");
                setEmployeeDetail(result.data);
                setOpenAddModal(true);
            })
            .catch(console.log);
    };

    useEffect(() => {
        const callApi = async () => {
            let result = await getAllEmployee({
                keyword: filterInput,
                department: filterDepartment,
                position: filterPosition,
                perPage,
                currentPage,
            });
            setEmployees(result.data);
        };
        callApi();
    }, [filterPosition, filterDepartment, filterInput, currentPage, perPage]);

    useEffect(() => {
        getDepartments().then((result) => {
            setDepartments(result);
        });
    }, []);

    useEffect(() => {
        getPositions().then((result) => {
            setPositions(result);
        });
    }, []);

    const handleSelectPosition = (value) => {
        dispatch(setCurrentPage(0));
        dispatch(setFilterPosition(value?.id ?? ""));
    };

    const handleSelectDepartment = (value) => {
        dispatch(setCurrentPage(0));
        dispatch(setFilterDepartment(value?.id ?? ""));
    };

    const handleChangeFilterInput = (event) => {
        dispatch(setCurrentPage(0));
        dispatch(setFilterInput(event.target.value));
    };

    const handleCloneEmployeeBtn = () => {
        if (selectedRow.length < 1) {
            toast.error("Vui l??ng ch???n nh??n vi??n c???n nh??n b???n");
            return;
        }
        if (selectedRow.length != 1) {
            toast.error("M???i l???n ch??? ???????c nh??n b???n 1 nh??n vi??n");
        }
        let employeeId = selectedRow[0].id;
        getDetailEmployee(employeeId)
            .then((result) => {
                setType("clone");
                setEmployeeDetail(result.data);
                setOpenAddModal(true);
            })
            .catch(console.log);
    };

    return (
        <>
            <div className={cx("row", "space-between", "align-center")}>
                <p className={cx("content__title")}>Danh s??ch nh??n vi??n</p>
                <Button
                    type="success"
                    text="Th??m nh??n vi??n"
                    icon={faUserPlus}
                    onClick={handleClickOpenModal}></Button>
            </div>

            <div className={cx("row", "space-between", "mt-16")}>
                <div className={cx("col", "c-9")}>
                    <div className="row">
                        <div className={cx({ col: true, "c-3": true })}>
                            <Input
                                placeholder="Nh???p t??n nh??n vi??n, m?? nh??n vi??n c???n t??m ki???m"
                                onChange={handleChangeFilterInput}></Input>
                        </div>
                        <div className={cx("col", "c-2")}>
                            <MySelectBox
                                data={departments}
                                onChange={handleSelectDepartment}
                                fieldText="departmentName"></MySelectBox>
                        </div>
                        <div className={cx("col", "c-2")}>
                            <MySelectBox
                                data={positions}
                                onChange={handleSelectPosition}
                                fieldText="positionName"></MySelectBox>
                        </div>
                    </div>
                </div>

                <div className={cx("col")}>
                    <div className="row">
                        <Button
                            icon={faTrash}
                            className={["mr-4"]}
                            type="danger"></Button>
                        <Button
                            icon={faCopy}
                            className={["mr-4"]}
                            type="success"
                            onClick={handleCloneEmployeeBtn}></Button>
                    </div>
                </div>
            </div>
            <AddEmployeeModal
                isOpen={isOpenAddModal}
                handleClose={handleClickCloseModal}
                employeeData={employeeDetail}
                type={type}></AddEmployeeModal>
            <div className={cx("row", "mt-16")}>
                <div className={cx("col", "c-12")}>
                    <Table
                        data={employees?.employees ?? []}
                        columns={employeeHeaderTable}
                        perPage={perPage}
                        totalPages={employees?.totalPages ?? 0}
                        currentPage={currentPage}
                        handleDoubleClick={handleEditEmployee}></Table>
                </div>
            </div>
        </>
    );
}

export default Home;

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
const cx = classNames.bind(styles);
const employeeHeaderTable = getHeaderTable();

function Home() {
    const [employees, setEmployees] = useState({});
    const [isOpenAddModal, setOpenAddModal] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [positions, setPositions] = useState([]);
    const [state, dispatch] = useData();
    const [employeeDetail, setEmployeeDetail] = useState({});
    const [editing, setEditing] = useState(false);
    const {
        filterPosition,
        filterDepartment,
        filterInput,
        perPage,
        currentPage,
    } = state;
    const handleClickOpenModal = () => {
        setEditing(false);
        setOpenAddModal(true);
    };

    const handleClickCloseModal = () => {
        setEditing(false);
        setOpenAddModal(false);
    };

    const handleEditEmployee = (employeeId) => {
        getDetailEmployee(employeeId)
            .then((result) => {
                setEditing(true);
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

    return (
        <>
            <div className={cx("row", "space-between", "align-center")}>
                <p className={cx("content__title")}>Danh sách nhân viên</p>
                <Button
                    type="success"
                    text="Thêm nhân viên"
                    icon={faUserPlus}
                    onClick={handleClickOpenModal}></Button>
            </div>

            <div className={cx("row", "space-between", "mt-16")}>
                <div className={cx("col", "c-9")}>
                    <div className="row">
                        <div className={cx({ col: true, "c-3": true })}>
                            <Input
                                placeholder="Nhập tên nhân viên, mã nhân viên cần tìm kiếm"
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
                            type="success"></Button>
                        <Button
                            icon={faArrowRotateRight}
                            type="danger"></Button>
                    </div>
                </div>
            </div>
            <AddEmployeeModal
                isOpen={isOpenAddModal}
                handleClose={handleClickCloseModal}
                employeeData={employeeDetail}
                editing={editing}></AddEmployeeModal>
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

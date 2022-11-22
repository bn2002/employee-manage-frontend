import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "~/components/Modal";
import stylesModal from "~/components/Modal/Modal.module.scss";
import stylesInput from "~/components/Input/Input.module.scss";
import { getPositions } from "~/services/position";
import { getDepartments } from "~/services/department";
import {
    createEmployee,
    getEmployeeCode,
    updateEmployee,
} from "~/services/employee";
import { convertDateTime } from "~/libs/helper";
const cx = classNames.bind(stylesModal);
const cxInput = classNames.bind(stylesInput);
const listDateField = ["dateOfBirth", "joiningDate", "identityIssuedDate"];
function AddEmployeeModal({
    isOpen,
    handleClose,
    type = "",
    employeeData = {},
}) {
    const [positions, setPositions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        setError,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        getPositions().then((positions) => {
            setPositions(positions);
        });
    }, []);

    useEffect(() => {
        getDepartments().then((departments) => {
            setDepartments(departments);
        });
    }, []);

    useEffect(() => {
        if (type === "add") {
            getEmployeeCode().then((result) => {
                setValue("employeeCode", result);
            });
        } else if (type === "edit" || type === "clone") {
            for (let field in employeeData) {
                if (listDateField.includes(field)) {
                    setValue(field, convertDateTime(employeeData[field]));
                } else {
                    setValue(field, employeeData[field]);
                }
            }
        }
    }, [isOpen === true]);

    useEffect(() => {
        if (isOpen !== true) {
            reset();
            return;
        }
    }, [isOpen === false]);

    const onSubmit = (data) => {
        let handler;
        if (type === "edit") {
            handler = updateEmployee;
        } else if (type === "add" || type === "clone") {
            handler = createEmployee;
        }
        handler(data)
            .then((result) => {
                toast.success(result.data.message);
            })
            .catch((error) => {
                let errResponse = error?.response?.data;
                let listInputErrors = errResponse?.data;
                if (listInputErrors.length > 0) {
                    listInputErrors.map((mess) => {
                        setError(mess.field, {
                            type: "manual",
                            message: mess.message,
                        });
                    });
                }
                toast.error(errResponse?.message);
            });
    };

    return (
        <Modal
            openModal={isOpen}
            title={"Thêm nhân viên"}
            submitText={"Lập hồ sơ"}
            submitIcon={faSave}
            handleClose={handleClose}
            submitType={"success"}>
            <div className={"row"}>
                <div className="col c-12">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        id="add-employee-form">
                        <p className={cx("modal__section")}>
                            A. Thông tin chung:
                        </p>
                        <div className={"row"}>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Mã nhân viên (
                                    <span className="color-red">*</span>)
                                    <input
                                        type="text"
                                        className={cxInput("input__control")}
                                        {...register("employeeCode")}
                                        placeholder="Mã nhân viên"></input>
                                    {errors.employeeCode && (
                                        <p className={cx("color-red", "mt-4")}>
                                            {errors.employeeCode.message}
                                        </p>
                                    )}
                                </span>
                            </div>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Họ và tên (
                                    <span className="color-red">*</span>)
                                    <input
                                        type="text"
                                        className={cxInput("input__control")}
                                        {...register("employeeName")}
                                        placeholder="Tên nhân viên"></input>
                                    {errors.employeeName && (
                                        <p className={cx("color-red", "mt-4")}>
                                            {errors.employeeName.message}
                                        </p>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className={"row mt-16"}>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Ngày sinh (
                                    <span className="color-red">*</span>)
                                    <input
                                        type="date"
                                        className={cxInput("input__control")}
                                        {...register("dateOfBirth")}
                                        placeholder="Ngày sinh"></input>
                                    {errors.dateOfBirth && (
                                        <p className={cx("color-red", "mt-4")}>
                                            {errors.dateOfBirth.message}
                                        </p>
                                    )}
                                </span>
                            </div>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Giới tính (
                                    <span className="color-red">*</span>)
                                    <select
                                        className={cxInput("input__control")}
                                        {...register("gender")}>
                                        <option value="0">Nữ</option>
                                        <option value="1">Nam</option>
                                        <option value="2">Khác</option>
                                    </select>
                                    {errors.gender && (
                                        <p className={cx("color-red", "mt-4")}>
                                            {errors.gender.message}
                                        </p>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className={"row mt-16"}>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Số CMTND/ Căn cước (
                                    <span className="color-red">*</span>)
                                    <input
                                        type="text"
                                        className={cxInput("input__control")}
                                        {...register("identityNumber")}
                                        placeholder="Số CMTND/ Căn cước"></input>
                                    {errors.identityNumber && (
                                        <p className={cx("color-red", "mt-4")}>
                                            {errors.identityNumber.message}
                                        </p>
                                    )}
                                </span>
                            </div>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Ngày cấp (
                                    <span className="color-red">*</span>)
                                    <input
                                        type="date"
                                        className={cxInput("input__control")}
                                        {...register("identityIssuedDate")}
                                        placeholder="Ngày cấp"></input>
                                    {errors.identityIssuedDate && (
                                        <p className={cx("color-red", "mt-4")}>
                                            {errors.identityIssuedDate.message}
                                        </p>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className={"row mt-16"}>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Nơi cấp (
                                    <span className="color-red">*</span>)
                                    <input
                                        type="text"
                                        className={cxInput("input__control")}
                                        {...register("identityIssuedPlace")}
                                        placeholder="Nơi cấp"></input>
                                    {errors.identityIssuedPlace && (
                                        <p className={cx("color-red", "mt-4")}>
                                            {errors.identityIssuedPlace.message}
                                        </p>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className={"row mt-16"}>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Email (<span className="color-red">*</span>)
                                    <input
                                        type="email"
                                        className={cxInput("input__control")}
                                        {...register("email")}
                                        placeholder="Địa chỉ email"></input>
                                    {errors.email && (
                                        <p className={cx("color-red", "mt-4")}>
                                            {errors.email.message}
                                        </p>
                                    )}
                                </span>
                            </div>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Số điện thoại (
                                    <span className="color-red">*</span>)
                                    <input
                                        type="text"
                                        className={cxInput("input__control")}
                                        {...register("phoneNumber")}
                                        placeholder="Số điện thoại"></input>
                                    {errors.phoneNumber && (
                                        <p className={cx("color-red", "mt-4")}>
                                            {errors.phoneNumber.message}
                                        </p>
                                    )}
                                </span>
                            </div>
                        </div>

                        <p className={cx("modal__section", "mt-16")}>
                            B. Thông tin công việc:
                        </p>
                        <div className={"row mt-16"}>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Vị trí (<span className="color-red">*</span>
                                    )
                                </span>
                                <select
                                    className={cxInput("input__control")}
                                    {...register("positionId")}>
                                    {positions.map((position) => (
                                        <option
                                            value={position.id}
                                            key={position.id}>
                                            {position.positionName}
                                        </option>
                                    ))}
                                </select>
                                {errors.position && (
                                    <p className={cx("color-red", "mt-4")}>
                                        {errors.position.message}
                                    </p>
                                )}
                            </div>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Phòng ban (
                                    <span className="color-red">*</span>)
                                </span>
                                <select
                                    className={cxInput("input__control")}
                                    {...register("departmentId")}>
                                    {departments.map((department) => (
                                        <option
                                            value={department.id}
                                            key={department.id}>
                                            {department.departmentName}
                                        </option>
                                    ))}
                                </select>
                                {errors.department && (
                                    <p className={cx("color-red", "mt-4")}>
                                        {errors.department.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className={"row mt-16"}>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Mã số thuế cá nhân (
                                    <span className="color-red">*</span>)
                                </span>
                                <input
                                    type="text"
                                    className={cxInput("input__control")}
                                    {...register("taxCode")}
                                    placeholder="Mã số thuế cá nhân"></input>
                                {errors.taxCode && (
                                    <p className={cx("color-red", "mt-4")}>
                                        {errors.taxCode.message}
                                    </p>
                                )}
                            </div>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Lương cơ bản (
                                    <span className="color-red">*</span>)
                                    <input
                                        type="text"
                                        className={cxInput("input__control")}
                                        {...register("salary")}
                                        placeholder="Lương cơ bản"></input>
                                    {errors.salary && (
                                        <p className={cx("color-red", "mt-4")}>
                                            {errors.salary.message}
                                        </p>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className={"row mt-16"}>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Ngày gia nhập công ty (
                                    <span className="color-red">*</span>)
                                </span>
                                <input
                                    type="date"
                                    className={cxInput("input__control")}
                                    {...register("joiningDate")}
                                    placeholder="Ngày gia nhập công ty"></input>
                                {errors.joiningDate && (
                                    <p className={cx("color-red", "mt-4")}>
                                        {errors.joiningDate.message}
                                    </p>
                                )}
                            </div>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Tình trạng công việc (
                                    <span className="color-red">*</span>)
                                    <select
                                        className={cxInput("input__control")}
                                        {...register("workStatus")}>
                                        <option value="1">Đang làm việc</option>
                                        <option value="2">Thực tập</option>
                                        <option value="0">Nghỉ việc</option>
                                    </select>
                                    {errors.workStatus && (
                                        <p className={cx("color-red", "mt-4")}>
                                            {errors.workStatus.message}
                                        </p>
                                    )}
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}

export default AddEmployeeModal;

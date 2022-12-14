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
            title={"Th??m nh??n vi??n"}
            submitText={"L???p h??? s??"}
            submitIcon={faSave}
            handleClose={handleClose}
            submitType={"success"}>
            <div className={"row"}>
                <div className="col c-12">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        id="add-employee-form">
                        <p className={cx("modal__section")}>
                            A. Th??ng tin chung:
                        </p>
                        <div className={"row"}>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    M?? nh??n vi??n (
                                    <span className="color-red">*</span>)
                                    <input
                                        type="text"
                                        className={cxInput("input__control")}
                                        {...register("employeeCode")}
                                        placeholder="M?? nh??n vi??n"></input>
                                    {errors.employeeCode && (
                                        <p className={cx("color-red", "mt-4")}>
                                            {errors.employeeCode.message}
                                        </p>
                                    )}
                                </span>
                            </div>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    H??? v?? t??n (
                                    <span className="color-red">*</span>)
                                    <input
                                        type="text"
                                        className={cxInput("input__control")}
                                        {...register("employeeName")}
                                        placeholder="T??n nh??n vi??n"></input>
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
                                    Ng??y sinh (
                                    <span className="color-red">*</span>)
                                    <input
                                        type="date"
                                        className={cxInput("input__control")}
                                        {...register("dateOfBirth")}
                                        placeholder="Ng??y sinh"></input>
                                    {errors.dateOfBirth && (
                                        <p className={cx("color-red", "mt-4")}>
                                            {errors.dateOfBirth.message}
                                        </p>
                                    )}
                                </span>
                            </div>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Gi???i t??nh (
                                    <span className="color-red">*</span>)
                                    <select
                                        className={cxInput("input__control")}
                                        {...register("gender")}>
                                        <option value="0">N???</option>
                                        <option value="1">Nam</option>
                                        <option value="2">Kh??c</option>
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
                                    S??? CMTND/ C??n c?????c (
                                    <span className="color-red">*</span>)
                                    <input
                                        type="text"
                                        className={cxInput("input__control")}
                                        {...register("identityNumber")}
                                        placeholder="S??? CMTND/ C??n c?????c"></input>
                                    {errors.identityNumber && (
                                        <p className={cx("color-red", "mt-4")}>
                                            {errors.identityNumber.message}
                                        </p>
                                    )}
                                </span>
                            </div>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Ng??y c???p (
                                    <span className="color-red">*</span>)
                                    <input
                                        type="date"
                                        className={cxInput("input__control")}
                                        {...register("identityIssuedDate")}
                                        placeholder="Ng??y c???p"></input>
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
                                    N??i c???p (
                                    <span className="color-red">*</span>)
                                    <input
                                        type="text"
                                        className={cxInput("input__control")}
                                        {...register("identityIssuedPlace")}
                                        placeholder="N??i c???p"></input>
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
                                        placeholder="?????a ch??? email"></input>
                                    {errors.email && (
                                        <p className={cx("color-red", "mt-4")}>
                                            {errors.email.message}
                                        </p>
                                    )}
                                </span>
                            </div>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    S??? ??i???n tho???i (
                                    <span className="color-red">*</span>)
                                    <input
                                        type="text"
                                        className={cxInput("input__control")}
                                        {...register("phoneNumber")}
                                        placeholder="S??? ??i???n tho???i"></input>
                                    {errors.phoneNumber && (
                                        <p className={cx("color-red", "mt-4")}>
                                            {errors.phoneNumber.message}
                                        </p>
                                    )}
                                </span>
                            </div>
                        </div>

                        <p className={cx("modal__section", "mt-16")}>
                            B. Th??ng tin c??ng vi???c:
                        </p>
                        <div className={"row mt-16"}>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    V??? tr?? (<span className="color-red">*</span>
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
                                    Ph??ng ban (
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
                                    M?? s??? thu??? c?? nh??n (
                                    <span className="color-red">*</span>)
                                </span>
                                <input
                                    type="text"
                                    className={cxInput("input__control")}
                                    {...register("taxCode")}
                                    placeholder="M?? s??? thu??? c?? nh??n"></input>
                                {errors.taxCode && (
                                    <p className={cx("color-red", "mt-4")}>
                                        {errors.taxCode.message}
                                    </p>
                                )}
                            </div>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    L????ng c?? b???n (
                                    <span className="color-red">*</span>)
                                    <input
                                        type="text"
                                        className={cxInput("input__control")}
                                        {...register("salary")}
                                        placeholder="L????ng c?? b???n"></input>
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
                                    Ng??y gia nh???p c??ng ty (
                                    <span className="color-red">*</span>)
                                </span>
                                <input
                                    type="date"
                                    className={cxInput("input__control")}
                                    {...register("joiningDate")}
                                    placeholder="Ng??y gia nh???p c??ng ty"></input>
                                {errors.joiningDate && (
                                    <p className={cx("color-red", "mt-4")}>
                                        {errors.joiningDate.message}
                                    </p>
                                )}
                            </div>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    T??nh tr???ng c??ng vi???c (
                                    <span className="color-red">*</span>)
                                    <select
                                        className={cxInput("input__control")}
                                        {...register("workStatus")}>
                                        <option value="1">??ang l??m vi???c</option>
                                        <option value="2">Th???c t???p</option>
                                        <option value="0">Ngh??? vi???c</option>
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

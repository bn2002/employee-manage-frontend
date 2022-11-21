import { useForm } from "react-hook-form";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { Modal } from "~/components/Modal";
import stylesModal from "~/components/Modal/Modal.module.scss";
import stylesInput from "~/components/Input/Input.module.scss";
import { useEffect, useState } from "react";
import { getPositions } from "~/services/position";
import { getDepartments } from "~/services/department";
const cx = classNames.bind(stylesModal);
const cxInput = classNames.bind(stylesInput);
function AddEmployeeModal({ isOpen, handleClose }) {
    const [positions, setPositions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const {
        register,
        handleSubmit,
        watch,
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

    const onSubmit = (data) => console.log(data);
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
                                </span>
                            </div>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Họ và tên (
                                    <span className="color-red">*</span>)
                                    <input
                                        type="text"
                                        className={cxInput("input__control")}
                                        {...register("employeName")}
                                        placeholder="Tên nhân viên"></input>
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
                            </div>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Lương cơ bản (
                                    <span className="color-red">*</span>)
                                </span>
                                <input
                                    type="text"
                                    className={cxInput("input__control")}
                                    {...register("salary")}
                                    placeholder="Lương cơ bản"></input>
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
                            </div>
                            <div className="col c-6">
                                <span className={cxInput("input__label")}>
                                    Tình trạng công việc (
                                    <span className="color-red">*</span>)
                                </span>
                                <select
                                    className={cxInput("input__control")}
                                    {...register("workStatus")}>
                                    <option value="1">Đang làm việc</option>
                                    <option value="2">Thực tập</option>
                                    <option value="0">Nghỉ việc</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}

export default AddEmployeeModal;

import axios from "~/libs/axios";

const getAllEmployee = async ({
    keyword,
    department,
    position,
    currentPage,
    perPage,
}) => {
    try {
        const result = await axios.get(
            `/employee?keyword=${keyword}&position_id=${position}&department_id=${department}&page=${currentPage}&size=${perPage}`
        );
        return result.data;
    } catch (error) {
        console.log(error);
    }
};

const getHeaderTable = () => {
    return [
        {
            Header: "Mã nhân viên",
            accessor: "employeeCode",
        },
        {
            Header: "Họ và tên",
            accessor: "employeeName",
        },
        {
            Header: "Giới tính",
            accessor: "gender",
        },
        {
            Header: "Ngày sinh",
            accessor: "dateOfBirth",
        },
        {
            Header: "Điện thoại",
            accessor: "phoneNumber",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Chức vụ",
            accessor: "positionName",
        },
        {
            Header: "Phòng ban",
            accessor: "departmentName",
        },
        {
            Header: "Mức lương cơ bản",
            accessor: "salary",
        },
        {
            Header: "Tình trạng công việc",
            accessor: "workStatus",
        },
    ];
};

const createEmployee = async (data) => {
    return await axios.post("/employee", data);
};

const getEmployeeCode = async (data) => {
    try {
        let result = await axios.get("employee/get-new-employee-code");
        return result.data.data;
    } catch (error) {
        console.log(error);
    }
};
export { getAllEmployee, getHeaderTable, createEmployee, getEmployeeCode };

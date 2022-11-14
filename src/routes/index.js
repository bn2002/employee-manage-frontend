import Home from "~/pages/Home";
const publicRoutes = [
    {
        path: "/",
        component: Home,
        title: "Tổng quan",
        img: "dashboard.png",
    },
    {
        path: "/report",
        component: Home,
        title: "Báo cáo",
        img: "report.png",
    },
    {
        path: "/buy",
        component: Home,
        title: "Mua hàng",
        img: "document-online.png",
    },
    {
        path: "/manager-employee",
        component: Home,
        title: "Danh mục nhân viên",
        img: "dic-employee.png",
    },
    {
        path: "/setting",
        component: Home,
        title: "Thiết lập hệ thống",
        img: "setting.png",
    },
];

export { publicRoutes };

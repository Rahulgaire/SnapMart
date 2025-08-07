    import React from "react";
    import { NavLink, useNavigate } from "react-router-dom";
    import { MdDashboard } from "react-icons/md";
    import { IoIosAddCircle, IoMdQuote } from "react-icons/io";
    import { TbBrandBooking } from "react-icons/tb";
    import { IoLogOut } from "react-icons/io5";
    import { MdSupervisedUserCircle } from "react-icons/md";
    import toast from "react-hot-toast";
    import { FaUsers } from "react-icons/fa";
import { RiProductHuntLine } from "react-icons/ri";
    const Sidebar = () => {
    const navigate = useNavigate();

    const sidebarData = [
        { link: "/profile", icon: <MdSupervisedUserCircle />, text: "Admin Profile" },
        { link: "/", icon: <MdDashboard />, text: "Dashboard" },
        { link: "/products", icon: <RiProductHuntLine />, text: "All Products" },
        { link: "/users", icon: <FaUsers />, text: "Users" },
        { link: "/blogs", icon: <TbBrandBooking />, text: "Blogs" },
        { link: "/contact", icon: <IoMdQuote />, text: "Queries" },
        { link: "/add-product", icon: <IoIosAddCircle />, text: "Add Products" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast("Logged out successfully");
        navigate("/login");
    };

    return (
        <div
        className={`
            group 
            fixed h-full top-0 left-0 z-20 bg-gray-100 dark:bg-zinc-900
            shadow-md overflow-hidden
            transition-all duration-300
            w-16 hover:w-64
        `}
        >
        <nav className="flex flex-col mt-10">
            {sidebarData.map((item) => (
            <NavLink
                key={item.link}
                to={`/admin${item.link}`}
                className="flex items-center p-3 m-2 font-semibold transition-colors shadow-md shadow-blue-400 hover:bg-blue-700 rounded hover:text-white"
            >
                <span className="text-2xl text-white">{item.icon}</span>
                <span className="ml-4 opacity-0 group-hover:opacity-100 transition duration-200 text-white">
                {item.text}
                </span>
            </NavLink>
            ))}
        </nav>

        <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 shadow mt-auto rounded-lg text-red-600 hover:bg-red-100"
        >
            <IoLogOut className="text-2xl" />
            <span className="ml-4 opacity-0 group-hover:opacity-100 transition duration-200">
            Logout
            </span>
        </button>
        </div>
    );
    };

    export default Sidebar;

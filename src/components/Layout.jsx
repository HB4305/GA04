import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-100 via-white to-blue-300 font-sans flex flex-col md:flex-row">

            {/* Header cho Mobile (chứa nút toggle) */}
            <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Overlay: Chỉ hiển thị khi sidebar mở (trên mobile) */}
            <div
                id="menuOverlay"
                className={`fixed inset-0 bg-black bg-opacity-50 md:hidden z-30 transition-opacity duration-300
                    ${isSidebarOpen ? 'block' : 'hidden'}`}
                onClick={toggleSidebar} // Bấm vào overlay cũng sẽ đóng sidebar
            ></div>

            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <main
                className={`flex-1 flex flex-col justify-center items-center text-center p-4 md:p-8 pt-20 md:pt-8 transition-opacity duration-300
                    ${isSidebarOpen ? 'opacity-50 md:opacity-100' : 'opacity-100'}`} // Làm mờ main content khi sidebar mở
                id="mainContent"
            >
                {/* Outlet sẽ render Home hoặc Todos tùy vào URL */}
                <Outlet />
            </main>
        </div>
    );
}
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faClipboardList, faL } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'

// Nhận props từ Layout
export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
    const location = useLocation(); // Hook để biết đang ở trang nào
    const currentPath = location.pathname;

    // Lớp CSS chung cho link
    const linkClasses = "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition";
    // Lớp CSS cho link active
    const activeLinkClasses = "bg-blue-500 text-white shadow-md hover:bg-blue-600";
    // Lớp CSS cho link không active
    const inactiveLinkClasses = "text-gray-700 hover:bg-gray-100";

    return (
        <aside
            id="sidebar"
            className={`fixed lg:sticky top-0 flex flex-col w-64 bg-white shadow-xl p-8 h-screen z-40
                  overflow-y-auto transition-transform duration-300
                  ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
                  border-r border-gray-400`} // Dùng state để điều khiển
        >
            <div className="flex-1 mt-12 md:mt-0">
                <h2 className="text-3xl font-bold text-blue-600 mb-8">Bảng chọn</h2>

                <nav className="space-y-2">
                    {/* Dùng <Link> thay cho <a> và bấm vào sẽ đóng sidebar */}
                    <Link
                        to="/"
                        onClick={toggleSidebar} // Đóng sidebar khi bấm link
                        className={`${linkClasses} ${currentPath === '/' ? activeLinkClasses : inactiveLinkClasses}`}
                    >
                        <FontAwesomeIcon icon={faHouse} />
                        <span>Trang chủ</span>
                    </Link>
                    <Link
                        to="/todos"
                        onClick={toggleSidebar}
                        className={`${linkClasses} ${currentPath === '/todos' ? activeLinkClasses : inactiveLinkClasses}`}
                    >
                        <FontAwesomeIcon icon={faClipboardList} />
                        <span>Việc cần làm</span>
                    </Link>
                </nav>
            </div>

            <footer className="text-center text-gray-400 text-sm border-t pt-4 mt-auto">
                <p className="mb-2">Kết nối với tôi</p>
                <a
                    href="https://www.facebook.com/share/g/19oiQixM4S/"
                    target="_blank" // Thêm target_blank cho link ngoài
                    rel="noopener noreferrer"
                    className="text-blue-600 text-xl hover:text-blue-400 transition-colors duration-300"
                >
                    <FontAwesomeIcon icon={faFacebookF} />
                </a>
            </footer>
        </aside>
    );
}
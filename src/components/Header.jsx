import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

// Nhận props từ Layout
export default function Header({ isSidebarOpen, toggleSidebar }) {
  return (
    <button
      id="menuToggle"
      onClick={toggleSidebar}
      className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg transition-all duration-300"
    >
      {/* Thay đổi icon dựa trên state */}
      <FontAwesomeIcon
        icon={isSidebarOpen ? faXmark : faBars}
        className="text-xl"
      />
    </button>
  );
}

import { Link } from 'react-router-dom';

export default function Home() {
    const message = "Chào mừng đến với ứng dụng!";

    return (
        <div className="bg-white shadow-2xl rounded-3xl p-6 md:p-10 max-w-lg w-full transition-transform hover:scale-[1.02] border border-gray-400">
            <h1 className="text-3xl md:text-5xl font-extrabold text-blue-700 mb-4">
                {message}
            </h1>
            <p className="text-gray-600 mb-8 text-sm md:text-base">
                Ứng dụng được phát triển bởi nhóm PTUDW – lớp 23KTPM1. Thành viên: Hoài Bảo, Thái Bảo, Thế Anh, Hữu Khánh, Văn Khải.
            </p>
            <Link
                to="/todos"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
            >
                Xem danh sách việc cần làm
            </Link>
        </div>
    );
}
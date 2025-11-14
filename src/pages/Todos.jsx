import { useState, useEffect } from "react";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState(""); // Thêm state cho input

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );

        const data = await response.json();

        setTodos(data.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggleCompleted = async (id, completed) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: !completed }),
        }
      );
      if (response.ok) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !completed } : todo
          )
        );
      } else {
        alert("Cập nhật thất bại!");
      }
    } catch (error) {
      alert("Có lỗi xảy ra!");
    }
  };

  const RemoveTask = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } else {
        alert("Xóa thất bại!");
      }
    } catch (error) {
      alert("Có lỗi xảy ra!");
    }
  };

  // Hàm thêm todo mới
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newTitle,
            completed: false,
            userId: 1,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTodos((prevTodos) => [
          { ...data, id: Date.now() }, // jsonplaceholder trả về id 201, nên dùng Date.now() cho chắc
          ...prevTodos,
        ]);
        setNewTitle("");
      } else {
        alert("Thêm thất bại!");
      }
    } catch (error) {
      alert("Có lỗi xảy ra!");
    }
  };

  // Tính toán tiến độ
  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;
  const progress = totalCount
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

  return (
    <div className="bg-white/90 backdrop-blur-sm p-4 md:p-6 lg:p-8 rounded-3xl shadow-2xl mb-6 md:mb-8 border border-gray-100 max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl md:text-5xl font-extrabold text-blue-700 mb-4">
        Danh sách việc cần làm
      </h1>

      {/* Tiến độ hoàn thành */}
      <div className="mb-6 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium opacity-90 mb-1">
              Tiến độ hoàn thành
            </p>
            <p className="text-3xl font-bold">
              {completedCount} / {totalCount}
            </p>
          </div>
          <div className="text-6xl animate-bounce">
            {completedCount === totalCount && totalCount > 0 ? (
              <i className="fa-solid fa-trophy"></i>
            ) : (
              <i className="fa-solid fa-tasks"></i>
            )}
          </div>
        </div>
        <div className="relative">
          <div className="h-3 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-linear-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-700 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-right text-xs font-semibold mt-2 opacity-90">
            {progress}% hoàn thành
          </p>
        </div>
      </div>

      {/* Giao diện thêm todo mới giống file HTML */}
      <form
        className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6"
        onSubmit={handleAddTodo}
      >
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-2xl">
            <i className="fa-solid fa-pen"></i>
          </div>
          <input
            type="text"
            placeholder="Thêm việc mới..."
            required
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full pl-14 pr-4 py-3 md:py-4 text-base md:text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            id="title"
          />
        </div>
        <button
          type="submit"
          className="px-6 md:px-8 py-3 md:py-4 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white text-base md:text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <i className="fas fa-plus"></i>
          <span>Thêm việc</span>
        </button>
      </form>

      {loading ? (
        <p className="cursor-wait mt-8">Đang tải...</p>
      ) : (
        <div className="text-black text-2xl mt-8">
          <h2 className="text-left pl-2 font-extrabold mb-2">
            Những việc hiện tại:
          </h2>

          <ul className="space-y-2 text-left">
            {todos.length === 0 ? (
              <li className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-2 border-dashed border-blue-300">
                <div className="text-7xl mb-4 animate-pulse">
                  <i className="fas fa-clipboard-list"></i>
                </div>
                <p className="text-gray-600 text-xl font-medium mb-2">
                  Chưa có việc nào
                </p>
                <p className="text-gray-400 text-sm">Hãy thêm việc đầu tiên!</p>
              </li>
            ) : (
              todos.map((item) => (
                <li
                  key={item.id}
                  className={`group relative flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 ${
                    item.completed
                      ? "border-green-500 bg-gray-50"
                      : "border-blue-500"
                  }`}
                >
                  <span
                    className={`flex-1 text-lg font-medium ${
                      item.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {item.title}
                  </span>
                  <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      type="button"
                      className={`px-5 py-2.5 min-w-[110px] ${
                        item.completed
                          ? "bg-linear-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
                          : "bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      } text-white text-sm font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                      onClick={() =>
                        handleToggleCompleted(item.id, item.completed)
                      }
                    >
                      {item.completed ? (
                        <>
                          <i className="fas fa-undo mr-1"></i>Hoàn tác
                        </>
                      ) : (
                        <>
                          <i className="fas fa-check mr-1"></i>Xong
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className="px-5 py-2.5 min-w-[110px] bg-linear-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      onClick={() => RemoveTask(item.id)}
                    >
                      <i className="fas fa-trash mr-1"></i>Xóa
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

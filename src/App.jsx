import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Todos from './pages/Todos'

function App() {
    return (
        <Routes>
            {/* Mọi route bên trong đều dùng chung Layout */}
            <Route path="/" element={<Layout />}>
                {/* 'index' có nghĩa là route cho "/" */}
                <Route index element={<Home />} />
                <Route path="todos" element={<Todos />} />
            </Route>
        </Routes>
    )
}

export default App
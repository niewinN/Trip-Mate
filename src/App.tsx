import "./App.css"
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom"
import Main from "./pages/Main/Main"
import Login from "./pages/Login/Login"
import Hotels from "./pages/Hotels/Hotels"

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/login' element={<Login />} />{" "}
					<Route path='/hotels' element={<Hotels/>}/>
					<Route path='*' element={<Navigate to='/' />} />{" "}
				</Routes>
			</Router>
		</>
	)
}

export default App

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
import Flights from "./pages/Flights/Flights"
import Restaurants from "./pages/Restaurants/Restaurants"

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/login' element={<Login />} />{" "}
					<Route path='/hotels' element={<Hotels/>}/>
					<Route path='*' element={<Navigate to='/' />} />{" "}
					<Route path='/flights' element={<Flights/>}/>
					<Route path='/restaurants' element={<Restaurants/>}/>
				</Routes>
			</Router>
		</>
	)
}

export default App

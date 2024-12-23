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
import Attractions from "./pages/Attractions/Attractions"
import Plan from "./pages/Plan/Plan"
import { FlightSearchProvider } from "./contexts/FlightSearchContext"
import Summary from "./pages/Summary/Summary"
import Profile from "./pages/Profile/Profile"

function App() {
	return (
		<>
		<FlightSearchProvider>
			<Router>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/login' element={<Login />} />{" "}
					<Route path='/hotels' element={<Hotels/>}/>
					<Route path='*' element={<Navigate to='/' />} />{" "}
					<Route path='/flights' element={<Flights/>}/>
					<Route path='/restaurants' element={<Restaurants/>}/>
					<Route path='/attractions' element={<Attractions/>}/>
					<Route path='/plan' element={<Plan/>}/>
					<Route path='/summary' element={<Summary/>} />
					<Route path='profile' element={<Profile/>} />
				</Routes>
			</Router>
			</FlightSearchProvider>
		</>
	)
}

export default App

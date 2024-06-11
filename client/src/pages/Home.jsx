import HomePage from "../components/home/home";
import Landing from "../components/landing/landing";
import Auth from '../utils/auth';

const Home = () =>{
    if(!Auth.loggedIn()){
        return <Landing />
    } else {
        return <HomePage />
    }
}

export default Home;
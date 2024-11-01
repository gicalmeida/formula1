import { Routes, Route} from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import Information from "../Information/Information";
import Calendar from "../Calendar/Calendar";

function RoutesMain(){
    return(
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/information" element={<Information/>}/>
            <Route path="/calendar" element={<Calendar/>}/>
        </Routes>
    );
}

export default RoutesMain;
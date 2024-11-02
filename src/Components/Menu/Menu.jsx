import { Link } from "react-router-dom";

function Menu(){
    return(
        <header>
            <nav>
                <ul>
                    <li><Link to={"/"}>Main Page</Link></li>
                    <li><Link to={"/information"}>Information</Link></li>
                    <li><Link to={"/calendar"}>Calendar</Link></li>
                </ul>
            </nav>
        </header>    
    )
}

export default Menu;
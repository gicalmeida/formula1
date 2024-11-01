import { Link } from "react-router-dom";

function Menu(){
    return(
        <header>
            <nav>
                <ul>
                    <li><Link to={"/"}></Link>Main Page</li>
                    <li><Link to={"/information"}></Link>Information</li>
                    <li><Link to={"/calendar"}></Link>Calendar</li>
                </ul>
            </nav>
        </header>    
    )
}

export default Menu;
import { Image } from "react-bootstrap";
import wallpaper from "../assets/img/wallpaper.jpg";

export default function Wallpaper() {
    return(
        <div className="wallpaper-container">
            <Image className="wallpaper" src={wallpaper} alt="wallpaper"/>
        </div>
    )
}
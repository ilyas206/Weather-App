import { Image } from "react-bootstrap";
import wallpaper from "../assets/img/wallpaper.jpg";

export default function Wallpaper() {
    return(
        <div className="fixed top-0 right-0 left-0 bottom-0 -z-10 opacity-80">
            <Image className="bg-cover w-screen h-screen" src={wallpaper} alt="wallpaper"/>
        </div>
    )
}
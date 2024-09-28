import { BsFillWrenchAdjustableCircleFill } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_logo_elite.svg"


export default function Header(){


    return(
        <div className="flex flex-col border-b-2 shadow-md px-6 ">
            <div className="bg-transparent p-1 flex items-center justify-between gap-x-4 w-full">
                <div className="flex items-center gap-2 max-h-[6rem] max-w-[6rem] bg-transparent">
                    <img src={logo} alt="Elite" className="w-max h-max"/><span className="text-nowrap text-xl font-semibold">Elite automotiva</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <Link to={'/'}><span className="flex flex-col items-center justify-center"><BsFillWrenchAdjustableCircleFill size={33}/></span></Link>
                    <Link to={'/report'}><span className="flex flex-col items-center justify-center"><TbReportSearch size={38}/></span></Link>
                </div>
            </div>
        </div>
    )
}
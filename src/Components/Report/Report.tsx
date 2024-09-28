import Background from "../Background/background";
import TableRegister from "./TableReport";
import { IoMdArrowDropright } from "react-icons/io";

export default function Report(){


    return(
        <div>
            <Background/>
            <div className="flex items-center p-1 mt-8 ml-8">
                <span><IoMdArrowDropright size={30}/></span>
                <h2 className="text-xl font-[#171717] font-bold">Histórico de serviços</h2>
            </div>
            <div>
                <TableRegister/>
            </div>
        </div>
    )
}
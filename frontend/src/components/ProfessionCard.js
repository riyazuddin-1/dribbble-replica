import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const ProfessionCard = ({cardData, setRoles, cardKey}) => {
    const [selected, setSelect] = useState(false);

    const style = {
        width: "240px",
        height: "210px"
    }

    useEffect(() => {
        setRoles(cardKey, selected ? "add" : "delete");
    }, [selected]);
    return ( 
        <div className={`flex flex-col border rounded-xl text-center mt-20 mx-auto p-4 cursor-pointer ${selected ? "border-pink-500 border-2" : "border-gray-200"}`} style={style} onClick={() => setSelect(!selected)}>
            <div className="relative h-full text-center">
                <div className="absolute bottom-4 right-auto w-full">
                    <img className="h-24 m-auto" src="../assets/sign_up_illustration-nobg.png"/>
                    <p className="font-bold">{ cardData.label }</p>
                    { selected && <p className="text-sm text-slate-500">{ cardData.description }</p>}
                </div>
            </div>
            <div style={{height: "30px"}} className="flex-1 relative m-auto">
            <span style={{height: "30px"}} className={`grid place-content-center rounded-full p-2 text-slate-50 focus:ring-pink-500 border border-gray-500 ${selected ? "bg-pink-500 border-pink-500" : ""}`}><FontAwesomeIcon className="" icon={faCheck}/></span>
            </div>
        </div>
     );
}
 
export default ProfessionCard;
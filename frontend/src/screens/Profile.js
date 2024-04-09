import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import Navbar from "../components/Navbar";
import ProfessionCard from "../components/ProfessionCard";

import config from "../config.json";

const ProfileProgress = ({userInfo}) => {
    const [stage, setStage] = useState(1);
    const [imageUrl, setImageUrl] = useState('');
    const [locationValid, setLocation] = useState(false);

    const moveToNext = () => {
        // const avatar = document.getElementById("avatar-file").files[0];
        const location = document.getElementById("location").value;
        localStorage.setItem("username", userInfo.username);
        localStorage.setItem("location", location);
        setStage(2);
    }

    let rolesArray = [];
    let rolesObject = {}

    const setRoles = (key, operation) => {
        if(operation == "add")
            rolesObject[key] = true;
        else
            delete rolesObject[key];
        console.log(rolesObject);
    }

    let profile = new FormData();
    function dataURItoFormData(formData, dataURI) {
        // Extract data and filename (optional)
        const regex = /^data:(.+);base64,(.+)$/;
        const match = dataURI.match(regex);
        const mimeType = match[1];
        const base64Data = match[2];
      
        // Convert base64 to Blob
        const byteString = atob(base64Data);
        const buffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(buffer);
        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([uint8Array], { type: mimeType });
      
        // Create File object (optional)
        // You can provide a desired filename here
        const filename = 'image.jpg'; // Replace with your preferred filename
        const file = new File([blob], filename, { type: mimeType });
      
        // Append file or Blob to FormData
        formData.append('avatar', file); // Or formData.append('myFile', blob);
    }

    const submitProfile = (e) => {
        profile = new FormData();
        profile.append("username", localStorage.getItem("username"));
        profile.append("location", localStorage.getItem("location"));
        dataURItoFormData(profile, localStorage.getItem("avatar"));

        Object.keys(rolesObject).forEach(key => {
            rolesArray.push(rolesData[key]);
        })

        profile.append("options", JSON.stringify(rolesArray));
        for (var pair of profile.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        localStorage.clear();
        fetch(config.backend_server + "/profile/save-profile", {
            method: 'POST',
            body: profile
        }).then(async (response) => {
            if(response.ok) {
                const result = await response.json();
                if(result.profileComplete)
                    window.location.reload();
            }
        })
    }

    const handleImageChange = (event) => {
        try {
            const selectedFile = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (readerEvent) => {
            setImageUrl(readerEvent.target.result);
            // console.log(readerEvent.target.result);
            localStorage.setItem("avatar", readerEvent.target.result);
            };

            reader.readAsDataURL(selectedFile);
        } catch {
            console.log("File not selected");
        }
    };

    const handleLocationChange = (e) => {
        const field = e.currentTarget;
        setLocation(field.value.length);
    }

    const rolesData = [
        {
            role: "learner", 
            label: "I'm looking for design inspiration",
            description: "With over 7 million shots from vast community of designers, Dribble is the leading source for design inspiration"
        },
        {
            role: "learner", 
            label: "I'm looking for design inspiration",
            description: "With over 7 million shots from vast community of designers, Dribble is the leading source for design inspiration"
        },
        {
            role: "learner", 
            label: "I'm looking for design inspiration",
            description: "With over 7 million shots from vast community of designers, Dribble is the leading source for design inspiration"
        }
    ]

    const style = {
        width: "120px",
        aspectRatio: "1/1"
    }
    
    imageUrl ? 
        style["backgroundImage"] = "url("+ imageUrl +")" : 
        delete style["backgroundImage"];
    
    return ( 
        <div className="h-screen flex flex-col">
        <Navbar/>
        { stage == 1 ? <div className="grid place-content-center gap-12 mb-4 p-6 w-full max-w-xl h-full m-auto">
            <div>
                <p className="text-3xl font-extrabold">Welcome! Let's create your profile</p>
                <p className="text-slate-500">Let others get to know you better! You can do these later</p>
            </div>
                <div>
                <p className="font-bold">Add an Avatar</p>
                <div className="flex space-x-4 my-4">
                    <div className="grid place-content-center bg-cover bg-center border-dashed border-2 border-gray-400 rounded-full" style={style}>
                        { !imageUrl && <FontAwesomeIcon className="text-slate-500" icon={faCamera} /> }
                    </div>
                    <div className="grid place-content-center p-4">
                        <div>
                            <label htmlFor="avatar-file" className="cursor-pointer">
                                <p className="px-2 py-1 text-sm border border-gray-300 rounded-md w-fit">Choose Image</p>
                                <input id="avatar-file" type="file" className="hidden" onChange={ handleImageChange } name="avatar" accept="image/*" required/>
                            </label>
                        </div>
                        <p className="text-sm text-slate-500 my-2">&gt; Or choose one of our defaults</p>
                    </div>
                </div>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">Add your location</p>
                    <input id="location" type="text" className="my-2 py-1 border-b-2 border-grey-400 outline-none" onInput={handleLocationChange} placeholder="Enter a location" name="location" required/>
                </div>
                <div className="w-fit flex flex-col gap-1">
                    <button className="w-fit h-10 px-20 rounded-md bg-pink-600 text-white disabled:bg-pink-300" onClick={() => moveToNext()} disabled={ !(imageUrl && locationValid) }>Next</button>
                    <p className="text-sm text-slate-500 m-auto">or Press Return</p>
                </div>
        </div> : 
        <div className="grid mb-4 p-6 w-full max-w-4xl text-center h-full m-auto">
            <p className="text-2xl font-bold">What brings you to Dribbble?</p>
            <p className="text-sm text-slate-500">Select the options that best describe you. Don't worry, you can explore other options later.</p>
            <div className="flex flex-wrap gap-4 m-auto">
                <ProfessionCard cardData={rolesData[0]} setRoles={setRoles} cardKey={0}/>
                <ProfessionCard cardData={rolesData[0]} setRoles={setRoles} cardKey={1}/>
                <ProfessionCard cardData={rolesData[0]} setRoles={setRoles} cardKey={2}/>
            </div>
            <div>
                <p className="font-bold">Anything else? You can select multiple</p>
                <button className="h-10 my-2 px-8 rounded-md bg-pink-600 text-white disabled:bg-pink-300" onClick={submitProfile}>Finish</button>
                <p className="text-sm text-slate-500 m-auto">or Press <span className="cursor-pointer hover:underline" onClick={() => setStage(1)}>Return</span></p>
            </div>
        </div>
        }
        </div>
     );
}
 
export default ProfileProgress;
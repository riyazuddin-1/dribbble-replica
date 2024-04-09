import ProfileProgress from "./Profile";
import UserProfile from "./UserProfile";

import { isSignedIn, getAuthCredentials } from "../utils";
import { useEffect, useState } from "react";

import config from "../config.json";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [profileProgress, setProfileProgress] = useState("incomplete");
    const [profileData, setProfileData] = useState({});

    if(!isSignedIn)
        window.location = '/get-access';

    var userInfo = getAuthCredentials();
    if(typeof(userInfo) == "string"){
        userInfo = JSON.parse(userInfo);
    }
    useEffect(() => {
        if(isSignedIn) {
            fetch(config.backend_server+"/profile/get-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: userInfo.username })
            }).then( async (response) => {
                if(response.ok) {
                    const result = await response.json();
                    setLoading(false);
                    if(result.profileComplete) {
                        setProfileProgress("complete");
                        setProfileData(result.userProfile);
                    }
                }
            })
        }
    }, [])
    return ( 
        <>
        { loading ? <>
        <p>loading...</p>
        </> : 
             profileProgress !== "complete" ? 
            <ProfileProgress userInfo={userInfo}/> : 
            <UserProfile profileData={{ ...userInfo, avatar: profileData.avatar }}/>
           }
        </>
     );
}
 
export default Dashboard;
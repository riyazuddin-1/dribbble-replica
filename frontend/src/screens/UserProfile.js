import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDribbble, faTwitter, faFacebook, faInstagram, faPinterest } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { showMessage } from "../utils";

import Navbar from "../components/Navbar";

import config from "../config.json";

const UserProfile = ({profileData}) => {
    const [valid, setValidation] = useState(false);
    const [verified, setVerified] = useState(profileData.verified);
    console.log(verified);

    console.log({ mail: profileData.mail });
    const sendMail = () => {
        fetch(config.backend_server + "/mail/send-mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mail: profileData.mail })
        }).then(response => {
            if(response.ok) {
                setValidation(true);
                showMessage("Email sent!");
            } else {
                setValidation(false);
                showMessage("The email is not valid")
            }
        })
    }

    const changeMailID = () => {
        setValidation(false);
        showMessage("This feature is not developed yet")
    }
    return ( 
        <>
        <Navbar avatar = {profileData.avatar}/>
        <p className={ "text-center " + `${!valid ? "text-red-400" : "text-green-400"}`} id="notify"></p>
        { !verified ? <div className="flex flex-col gap-3 p-6 py-20 w-full max-w-2xl h-full m-auto text-center">
            <p className="text-2xl font-bold text-black">Please verify your email...</p>
            <img className="m-auto w-52" src="../assets/email_icon.png"/>
            <p className="text-slate-500">Please verify your email address. We've sent a confirmation email to:</p>
            <p className="font-bold text-black">{ profileData.mail }</p>
            <p className="text-slate-500">Click the confirmation link in that email to begin using Dribbble.</p>
            <p className="text-slate-500">Didn't receive the email? Check your Spam folder, it may have been caught by a filter. If you still don't see it. you can <span className="font-bold text-pink-500 cursor-pointer" onClick={sendMail}>resend the confirmation email</span>.</p>
            <p className="text-slate-500">Wrong email address? <span className="font-bold text-pink-500 cursor-pointer" onClick={changeMailID}>Change it</span></p>
        </div> : 
        <div>
            <p className="font-bold text-2xl">Thank you for choosing Dribbble😊</p>
        </div>
        }
        <div className="bg-slate-200 lg:px-8">
            <div className="flex flex-col md:flex-row gap-2 p-2 w-full">
                <div className="flex flex-col gap-2 sm:w-1/5">
                    <img className="w-24" src="../assets/dribble_icon_pink.png"/>
                    <p className="text-sm text-slate-500">
                    Dribbble is the world's leading community for creatives to share, grow, and get hired.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <FontAwesomeIcon icon={faDribbble}/>
                        <FontAwesomeIcon icon={faTwitter}/>
                        <FontAwesomeIcon icon={faFacebook}/>
                        <FontAwesomeIcon icon={faInstagram}/>
                        <FontAwesomeIcon icon={faPinterest}/>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex flex-wrap text-slate-500 text-sm">
                        <div className="flex flex-col gap-2 p-2 md:w-1/5">
                            <p className="font-bold text-black">For designers</p>
                            <a href="">Go Pro!</a>
                            <a href="">Explore desinng work</a>
                            <a href="">Design blog</a>
                            <a href="">Overtime podcast</a>
                            <a href="">Playoffs</a>
                            <a href="">Weekly Warm-up</a>
                            <a href="">Refer a Friend</a>
                            <a href="">Code of conduct</a>
                        </div>
                        <div className="flex flex-col gap-2 p-2 md:w-1/5">
                            <p className="font-bold text-black">Hire Designers</p>
                            <a href="">Post a job opening</a>
                            <a href="">Post a freelance project</a>
                            <a href="">Search for Designers</a>
                            <p className="font-bold text-black">Brands</p>
                            <a href="">Advertise with us</a>
                        </div>
                        <div className="flex flex-col gap-2 p-2 md:w-1/5">
                            <p className="font-bold text-black">Company</p>
                            <a href="">About</a>
                            <a href="">Careers</a>
                            <a href="">Support</a>
                            <a href="">Media kit</a>
                            <a href="">Testimonials</a>
                            <a href="">API</a>
                            <a href="">Terms of service</a>
                            <a href="">Privacy policy</a>
                            <a href="">Cookie policy</a>
                        </div>
                        <div className="flex flex-col gap-2 p-2 md:w-1/5">
                            <p className="font-bold text-black">Directories</p>
                            <a href="">Design jobs</a>
                            <a href="">Designers for free</a>
                            <a href="">Freelance designers for hire</a>
                            <a href="">Tags</a>
                            <a href="">Places</a>
                            <p>Design assets</p>
                            <a href="">Dribbble Marketplace</a>
                            <a href="">Creative Market</a>
                            <a href="">Fontspring</a>
                            <a href="">Font squirrel</a>
                        </div>
                        <div className="flex flex-col gap-2 p-2 md:w-1/5">
                            <p className="font-bold text-black">Design Resources</p>
                            <a href="">Freelancing</a>
                            <a href="">Design Hiring</a>
                            <a href="">Design Portfolio</a>
                            <a href="">Design Education</a>
                            <a href="">Creative Process</a>
                            <a href="">Design Industry Trends</a>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-2 h-px bg-gray-500"/>
            <div className="flex md:flex-col py-4 text-sm text-slate-500">
                <p>&copy; 2023 Dribbble. All rights reserved.</p>
                <p className="ms-auto"><span className="font-bold text-black">No</span> shots dribbbled <FontAwesomeIcon className="text-pink-500" icon={faDribbble}/></p>
            </div>
        </div>
        </>
     );
}
 
export default UserProfile;
const config = require('./config.json');

const utilities = {}

utilities.getAuthCredentials = () => {
    return sessionStorage.getItem('Credentials');
}

utilities.setAuthCredentials = (data) => {
    sessionStorage.setItem('Credentials', JSON.stringify(data));
    window.location.reload();
}

utilities.isSignedIn = sessionStorage.getItem('Credentials') ? true : false;

utilities.showMessage = (message) => {
    const msgField = document.getElementById('notify');
    msgField.innerHTML = "&#x2022; " + message;
    setTimeout(()=>{
        msgField.innerHTML = '';
    }, 10000)
}

utilities.generateOTP = () => {
    var digits = '0123456789';
    var OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

utilities.verifyOtp = (otp, val) => {
    return otp.length ? otp==val : false;
}

module.exports = utilities;
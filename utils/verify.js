const {run} = require("hardhat");

const verify = async (contactAddress, args) => {
    console.log("Verifying Contract");
    try{
        await run("verify:verify", {
            address: contactAddress,
            constructotArguments: args
        })
    }
    catch(e){
        if(e.message.toLowerCase.includes("already verified")){
            console.log("Already Verified!")
        }else{
            console.log(e)
        }
    }
}

module.exports = { verify}
const adminAuth = (req,res,next)=>
{
    const token="xyzxyzxyz!!!@@@###$$$";
    const isAuthenticated= token ==="xyzxyzxyz!!!@@@###$$$";
    if(!isAuthenticated)
    {
        res.status(401).send("UnAuthorized Request For Admin");
    }
    else
    {
        next();
    }
}

const userAuth = (req,res,next)=>
    {
        const token="xyzxyzxyz!!!@@@###$$$";
        const isAuthenticated= token ==="xyzxyzxyz!!!@@@###$$$";
        if(!isAuthenticated)
        {
            res.status(401).send("UnAuthorized Request For User");
        }
        else
        {
            next();
        }
    }

module.exports = {
    adminAuth,
    userAuth
}
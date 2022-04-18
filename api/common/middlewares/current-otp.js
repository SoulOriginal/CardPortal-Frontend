const jwt = require ('jsonwebtoken');
// @ts-ignore
export const currentOtp = (req,res,next) => {
    if (!req.session.phoneJwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.phoneJwt, process.env.JWT_PHONE);
        req.currentOtp = payload;
    } catch (err) {}
    next();
}
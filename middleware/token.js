module.exports = (req, res, next) => {
       
    if(!req.session.admin){
        res.status(401).send('you are not an admin')
    } else {
        next();
    }
}
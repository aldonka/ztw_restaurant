/**
 * Created by Dominika on 2016-12-07.
 */
function handleResponse(error, data, req, res, msg){
    if (error) {
        res.status(500).send(error);
        return
    }
    res.status(200).json(data);
}

function andRestrictTo(role) {
    return function(req, res, next) {
        if (req.authenticatedUser.role == role) {
            next();
        } else {
            next(new Error('Unauthorized'));
        }
    }
}

exports.handleResponse = handleResponse;
exports.restrictedTo = andRestrictTo;
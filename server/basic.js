/**
 * Created by Dominika on 2016-12-07.
 */
function handleResponse(error, data, req, res, msg){
    if (error) {
        log.error(error, msg);
        res.status(500).send(error);
        return
    }
    res.status(200).json(data);
}

exports.handleResponse = handleResponse;
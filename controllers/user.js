const { response, request } = require('express');




const getAll = async ( req = request, res = response ) => {
    res.status(200).json({
        msg: 'get Users'
    });
}



const create = async( req = request, res = response ) => {

    const body = req.body;

    res.status(200).json({
        msg: 'post create user',
        body
    });
}



const getById = async ( req = request, res = response ) => {

    const { id } = req.params;

    res.status(200).json({
        msg: 'get User id',
        id
    });
}




const update = async( req = request, res = response ) => {

    const { id } = req.params;
    const body = req.body;

    res.status(200).json({
        msg: 'put update user ',
        id,
        body
    });
}




const deleteUser = async( req = request, res = response ) => {
    const { id } = req.params;

    res.status(200).json({
        msg: 'delete user or update state users',
        id
    });
}


const getParams = async( req = request, res = response ) => {

    const query = req.query;

    
    res.status(200).json({
        msg: 'delete user or update state users',
        query
    });
}



module.exports = {
    getAll,
    getById,
    update,
    deleteUser,
    create,
    getParams
}
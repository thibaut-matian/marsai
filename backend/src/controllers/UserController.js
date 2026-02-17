const { Op } = require('sequelize');
const { User, Role } = require('../models');

const getAllJuries = async (req, res) => {
    try {
        const juries = await User.findAll({
            where: { role_id: 3 }, // role_id 3 = jury
            include: [{
                model: Role,
                as: "role",
                attributes: ["id", "name"]
            }],
            attributes: { exclude: ['password', 'token'] }
        });

        res.status(200).json({
            success: true,
            count: juries.length,
            data: juries
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des jurys",
            error: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const countUsers = await User.count();
        const users = await User.findAll({
            include: [{
                model: Role,
                as: "role",
                attributes: ["id", "name"]
            }],
            attributes: { exclude: ['password', 'token'] }
        });

        res.status(200).json({
            success: true,
            count: countUsers,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des users",
            error: error.message
        });
    }
};

const getAllAdmin = async (req, res) => {
    try {
        UserModel.findAll({
                where: {
                role_id: 2,
            },
        });
    }
    catch (error) {

    }
};

const createUser = async (req, res) => {};
const deleteUser = async (req, res) => {};
const updateUser = async (req, res) => {};

module.exports = {
    getAllUsers,
    getAllJuries,
    getAllAdmin,
    createUser,
    deleteUser,
    updateUser
};
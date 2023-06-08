const express = require('express');
const { Router } = require('react-router-dom');
const { getUsers, getUserById, createUser, updateProfile, updateAvatar } = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/users/me', updateProfile);
usersRouter.patch('/users/me/avatar', updateAvatar);



module.exports = usersRouter;
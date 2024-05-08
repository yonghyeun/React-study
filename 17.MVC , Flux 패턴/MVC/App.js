import View from './View.js';
import Model from './Model.js';
import Controller from './Controller.js';

const user = new Model('John Doe');
const view = new View();
const controller = new Controller(user, view);

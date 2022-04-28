import {format, register } from 'timeago.js';
import tr from "../node_modules/timeago.js/esm/lang/tr";

const timeago = function(date){
    register('tr',tr) 
    return format(date,'tr')
}

export default timeago;
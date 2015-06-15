/**
 * Created by tom on 02/06/15.
 */

import EventEmitter             from 'eventemitter3';
import {ObjectHelper}           from 'arva-utils/ObjectHelper';

export class BaseDevice extends EventEmitter {

    constructor(){
        super();
        ObjectHelper.bindAllMethods(this, this);
    }

    /**
     * Returns a view for a group of devices of the same device class.
     * @param {Array} groupItems Array of device instances in the group.
     */
    static groupView(groupItems){}

    /**
     * Returns a view for one specific type of device.
     */
    deviceView(){}
}
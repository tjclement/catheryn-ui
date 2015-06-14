/**
 * Created by tom on 02/06/15.
 */

import {ObjectHelper}           from 'arva-utils/ObjectHelper';

export class BaseDevice {

    constructor(){
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
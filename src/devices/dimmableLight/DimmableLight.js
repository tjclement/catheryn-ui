import {GetRequest}             from 'arva-utils/request/RequestClient';
import {BaseDevice}             from '../BaseDevice';
import {DimmableLightView}      from './DimmableLightView';

export class DimmableLight extends BaseDevice {

    get name() { return this._name; }

    constructor(name, ip, port = 80) {
        super();
        this._ip = ip;
        this._port = port;
        this._name = name;

        this.deviceView = new DimmableLightView(this);
    }

    onUserInput(value) {
        return this.fadeTo(value);
    }

    async getState() {
        let response = await GetRequest(`http://${this._ip}:${this._port}/?getPwmDuty`);
    }

    async setTo(newValue) {
        let response = await GetRequest(`http://${this._ip}:${this._port}/?setTo=${newValue}`);
    }

    async fadeTo(newValue) {
        let response = await GetRequest(`http://${this._ip}:${this._port}/?fadeTo=${newValue}`);
    }
}
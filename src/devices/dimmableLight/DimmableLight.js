
import Timer                    from 'famous/utilities/Timer';
import {GetRequest}             from 'arva-utils/request/RequestClient';
import {BaseDevice}             from '../BaseDevice';
import {DimmableLightView}      from './DimmableLightView';

export class DimmableLight extends BaseDevice {

    get name() { return this._name; }
    get value() { return this._value; }

    constructor(name, ip, port = 80) {
        super();
        this._ip = ip;
        this._port = port;
        this._name = name;

        this.deviceView = new DimmableLightView(this);
        Timer.setInterval(this.getState, 1000);
    }

    onUserInput(event) {
        return this.fadeTo(event.currentTarget.value);
    }

    async getState() {
        let response = await GetRequest(`http://${this._ip}:${this._port}/?getPwmDuty`);
        if(this._value !== response) {
            this._value = response;
            this.emit('value', this._value | 0);
        }
        return response;
    }

    async setTo(newValue) {
        let response = await GetRequest(`http://${this._ip}:${this._port}/?setTo=${newValue}`);
    }

    async fadeTo(newValue) {
        let response = await GetRequest(`http://${this._ip}:${this._port}/?fadeTo=${newValue}`);
    }
}
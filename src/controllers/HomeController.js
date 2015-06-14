/**
 * Created by tom on 14/06/15.
 */

import {Controller}             from 'arva-mvc/core/Controller';
import {DimmableLight}          from '../devices/dimmableLight/DimmableLight';
import {HomeView}               from '../views/home/HomeView';

export class HomeController extends Controller {
    constructor(router, context) {
        super(router, context);

        window.devices = this.devices = {
            'Lighting': {
                type: DimmableLight,
                devices: [
                    new DimmableLight('Living Room', '10.0.3.29')
                ]
            }
        };

        this.mainView = new HomeView();
    }

    Main() {
        return this.mainView;
    }
}
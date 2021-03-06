/**
 * Created by tom on 15/06/15.
 */

import Surface              from 'famous/core/Surface';
import InputSurface         from 'famous/surfaces/InputSurface';
import {View}               from 'arva-mvc/views/View';

export class DimmableLightGroupView extends View {
    constructor(name, devices, options) {
        super(options);

        this.devices = devices;
        this.renderables.title = new Surface({content: name});
        this.renderables.slider = new InputSurface({
            type: 'range',
            attributes: {
                min: 0,
                max: 1023
            }
        });

        this._setupValueHandlers();

        this.layouts.push((context) => {
            context.set('title', {
                size: [context.size[0] * 0.2, context.size[1]],
                origin: [0, 0.5],
                align: [0, 0.5],
                translate: [0, 0, 5]
            });

            context.set('slider', {
                size: [context.size[0] * 0.8, context.size[1]],
                origin: [0, 0.5],
                align: [0.2, 0.5],
                translate: [0, 0, 5]
            });
        });

        this.build();
    }

    setValue(value) {
        if(this.renderables.slider._currentTarget) {
            this.renderables.slider._currentTarget.value = value;
        }
    }

    _setupValueHandlers(){
        this.renderables.slider.on('change', function (value) {
            for(let device of this.devices) {
                device.onUserInput(value);
            }
        }.bind(this));

        for(let device of this.devices) {
            device.on('value', this._recalcGroupAverage);
        }
    }

    _recalcGroupAverage(){
        let average = 0;
        for(let device of this.devices) {
            average += device.value;
        }
        average /= this.devices.length;
        this.setValue(average);
    }
}
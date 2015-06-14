/**
 * Created by tom on 14/06/15.
 */

import Surface         from 'famous/core/Surface';
import InputSurface         from 'famous/surfaces/InputSurface';
import {View}               from 'arva-mvc/views/View';

export class DimmableLightView extends View {
    /**
     * @param {DimmableLight} device
     * @param {Object} options
     */
    constructor(device, options) {
        super(options);

        this.renderables.title = new Surface({content: device.name});
        this.renderables.slider = new InputSurface({
            type: 'range',
            attributes: {
                min: 0,
                max: 1023
            }
        });

        this.renderables.slider.on('change', (value) => {device.onUserInput(value)});

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
}
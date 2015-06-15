/**
 * Created by tom on 14/06/15.
 */

import CollectionLayout             from 'famous-flex/src/layouts/CollectionLayout';
import FlexScrollView               from 'famous-flex/src/FlexScrollView';
import {View}                       from 'arva-mvc/views/View';
import {DimmableLightView}          from '../../devices/dimmableLight/DimmableLightView';
import {DimmableLightGroupView}     from '../../devices/dimmableLight/DimmableLightGroupView';

const views = {
    'DimmableLight': {
        'device': DimmableLightView,
        'group': DimmableLightGroupView
    }
};

export class HomeView extends View {
    constructor(groups, options) {
        super(options);

        this.groups = groups;
        this.renderables.scrollView = new FlexScrollView({
            autoPipeEvents: true,
            layout: CollectionLayout,
            layoutOptions: {
                isSectionCallback: function (renderNode) {
                    return Object.getPrototypeOf(renderNode).constructor.name.indexOf('Group') !== 1;
                },
                itemSize: [undefined, 25],
                margins: [20, 10, 20, 10],
                spacing: [10, 10]
            },
            flow: true,             // enable flow-mode (can only be enabled from the constructor)
            flowOptions: {
                spring: {               // spring-options used when transitioning between states
                    dampingRatio: 0.8,  // spring damping ratio
                    period: 1000        // duration of the animation
                },
                insertSpec: {           // render-spec used when inserting renderables
                    size: [0, 0]
                }
            }
        });

        for (let groupName in groups) {
            let group = groups[groupName];
            let groupViewType = views[group.type].group;
            let groupView = new groupViewType(groupName, group.devices);
            this.renderables.scrollView.push(groupView);

            for (let device of group.devices) {
                let deviceViewType = views[group.type].device;
                let deviceView = new deviceViewType(device);
                this.renderables.scrollView.push(deviceView);
            }
        }

        this.layouts.push((context) => {
            context.set('scrollView', {
                size: [context.size[0] * 0.9, context.size[1] * 0.9],
                origin: [0.5, 0.,5],
                align: [0.5, 0.5],
                translate: [0, 0, 5]
            });
        });

        this.build();
    }
}
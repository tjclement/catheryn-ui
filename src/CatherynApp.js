/**

 @author: Hans van den Akker (mysim1)
 @license Private
 @copyright Bizboard, 2015
 */

import {Inject}                     from 'di.js';
import {App}                        from 'arva-mvc/core/App';
import Context                      from 'famous/core/Context';
import {Router}                     from 'arva-mvc/core/Router';

// Application controllers
import {HomeController}             from './controllers/HomeController';


@Inject(Router, Context, HomeController)
export class CatherynApp extends App {

    constructor(router, context) {

        // make one of the controllers default
        router.setDefault(HomeController, 'Main');

        // have the router initialize
        super(router, context);

        router.on('dialog', (dialog) => {
            this.dialogManager.show(dialog);
        });
    }
}

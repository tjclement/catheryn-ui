/**
 * Created by tom on 03/06/15.
 */
import {CatherynApp}                            from './CatherynApp';
import {reCreateDefaultContext}                 from 'arva-mvc/DefaultContext';

/* Importing CSS in jspm bundled builds injects them into the DOM automagically */
import famousCSS                                from 'famous/core/famous.css!';

// Your main that creates a DI context and uses that context to load your application. We can provide the
// router, but also the datasource provider.

start();

async function start() {
    await waitUntilReadyFired();

    let context = reCreateDefaultContext();

    context.get(CatherynApp);
}

function waitUntilReadyFired() {
    return new Promise((resolve) => {
        document.addEventListener('deviceready', () => {resolve();});
    });
}
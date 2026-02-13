import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { createServer } from '@inertiajs/react/server';
import { renderToString } from 'react-dom/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        resolve: (name) => resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx')
        ),
        setup: ({ App, props }) => <App {...props} />,
        title: (title) => title ? `${title} - ${appName}` : appName,
    })
);
(window as any).global = window;
(window as any).process = require('process/browser');
import 'zone.js/dist/zone';  // Included with Angular CLI.
global.Buffer = global.Buffer || require('buffer').Buffer;
import { hooks } from "../../dep/hooks.js";
import app from "../../app.js";
import pts from "../../dep/pts.js";
import pipeline from "../pipeline.js";
import zoom from "./zoom.js";
import clod from "../clod.js";
import tile from "../objects/tile.js";
import glob from "../../dep/glob.js";
var pan;
(function (pan_1) {
    function register() {
        hooks.addListener('romeComponents', step);
        startup();
    }
    pan_1.register = register;
    async function step() {
        functions();
        return false;
    }
    let begin = [0, 0];
    let before = [0, 0];
    pan_1.wpos = [0, 0];
    pan_1.rpos = [0, 0];
    let stick = undefined;
    const startWtorpos = true;
    const alignFullPixels = false;
    var marker;
    function startup() {
        marker = new tile({
            _wpos: [0, 0, 0],
            colorOverride: 'purple',
            lonely: true,
        });
        marker.create();
        window['panMarker'] = marker;
    }
    function functions() {
        follow();
        // Pan the rpos
        pan();
        sideways();
        // Make a wpos from the nearest full pixel rpos
        pan_1.wpos = clod.unproject(pan_1.rpos);
        marker.wpos = pan_1.wpos;
        marker.wtorpos();
        marker.update();
        // Jump to nearest full pixel
        if (alignFullPixels)
            pan_1.rpos = pts.round(pan_1.rpos);
        set_camera();
        //lod.gworld.update(wpos);
    }
    function follow() {
        if (stick) {
            let wpos = stick.wpos;
            // Todo .5 ?
            wpos = pts.add(wpos, [.5, .5]);
            pan_1.rpos = clod.project(wpos);
        }
        else {
            if (startWtorpos)
                pan_1.rpos = clod.project(pan_1.wpos);
            // rpos = pts.add(rpos, clod.project([.5, .5]));
        }
    }
    function sideways() {
        if (app.key('arrowright')) {
            pan_1.rpos[0] += 1 * glob.scale;
            glob.rerenderGame = true;
        }
        if (app.key('arrowleft')) {
            pan_1.rpos[0] -= 1 * glob.scale;
            glob.rerenderGame = true;
        }
        if (app.key('arrowup')) {
            pan_1.rpos[1] += 1 * glob.scale;
            glob.rerenderGame = true;
        }
        if (app.key('arrowdown')) {
            pan_1.rpos[1] -= 1 * glob.scale;
            glob.rerenderGame = true;
        }
    }
    function pan() {
        let continousMode = false;
        const continuousSpeed = -100;
        const panDivisor = -1;
        if (app.button(1) == 1) {
            let mouse = app.mouse();
            mouse[1] = -mouse[1];
            begin = mouse;
            before = pts.copy(pan_1.rpos);
        }
        if (app.button(1) >= 1) {
            glob.rerenderGame = true;
            let mouse = app.mouse();
            mouse[1] = -mouse[1];
            let dif = pts.subtract(begin, mouse);
            if (continousMode) {
                dif = pts.divide(dif, continuousSpeed);
                pan_1.rpos = pts.add(pan_1.rpos, dif);
            }
            else {
                dif = pts.divide(dif, panDivisor);
                // necessary mods
                dif = pts.mult(dif, pipeline.dotsPerInch);
                dif = pts.mult(dif, zoom.actualZoom());
                dif = pts.subtract(dif, before);
                pan_1.rpos = pts.inv(dif);
            }
        }
        else if (app.button(1) == -1) {
            console.log('release');
            pan_1.rpos = pts.round(pan_1.rpos);
        }
    }
    function set_camera() {
        const rpos2 = pts.add(pan_1.rpos, pts.divide([0, glob.hexSize[1]], 2));
        pipeline.groups.camera.position.x = rpos2[0];
        pipeline.groups.camera.position.y = rpos2[1];
        pipeline.groups.camera.updateMatrix();
        pipeline.camera.updateProjectionMatrix();
    }
})(pan || (pan = {}));
export default pan;

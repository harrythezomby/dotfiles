import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';


const Apps = () => Widget.Button({
    className: 'apps',
    onClicked: () =>  Utils.execAsync(['bash', '-c', 'rofi -show drun']),
    child: Widget.Label({
        label: '󰣇',
    }),
});

export default () => Apps({})
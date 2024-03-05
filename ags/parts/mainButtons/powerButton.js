import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';


const Power = () => Widget.Button({
    className: 'power',
    onClicked: () =>  Utils.execAsync(['bash', '-c', 'rofi -show power-menu -modi power-menu:rofi-power-menu']),
    child: Widget.Label({
        label: '',
    }),
});

export default () => Power({})
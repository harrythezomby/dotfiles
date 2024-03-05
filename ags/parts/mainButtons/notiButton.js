
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';

const Notification = () => Widget.Button({
    hpack: 'center',
    vpack: 'center',
    className: 'notibutton',
    onClicked: () =>  Utils.execAsync(['bash', '-c', 'swaync-client -t']),
    child: Widget.Label({
        label: '󰒓',
    }),
})

export default () => Notification({})
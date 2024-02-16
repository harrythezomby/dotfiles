import Bluetooth from 'resource:///com/github/Aylur/ags/service/bluetooth.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import { exec, execAsync } from 'resource:///com/github/Aylur/ags/utils.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';


const BT = () => Widget.Button({
    className: 'bluetooth',
    onClicked: () => Utils.execAsync(['blueman-manager'])
    .then(out => print(out))
    .catch(err => print(err)),
    child: Widget.Box({
        spacing: 8,
        homogeneous: false,
        vertical: false,
        children: [
            Widget.Icon({
                binds: [['icon', Bluetooth, 'enabled', on =>
                    `bluetooth-${on ? 'active' : 'disabled'}-symbolic`]],
            }),
            Widget.Box({
                connections: [[Bluetooth, self => {
                    self.children = Bluetooth.connectedDevices
                        .map(({iconName, name}) => Label({
                            indicator: Widget.Icon(iconName+'-symbolic'),
                            child: Widget.Label(name),
                        }));
            
                    self.visible = Bluetooth.connectedDevices.length > 0;
                }, 'notify::connected-devices']],
            }),
            Widget.Label({
                connections: [[Bluetooth, self => {
                    self.label = `${Bluetooth.connectedDevices.length}`;
            }]]

            })
        ],
    }),
});

export default () => BT({})
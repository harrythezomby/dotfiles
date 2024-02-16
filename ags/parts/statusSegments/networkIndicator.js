import Network from 'resource:///com/github/Aylur/ags/service/network.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import { exec, execAsync } from 'resource:///com/github/Aylur/ags/utils.js';

const networkIndicator = () => Widget.Button({
    className: 'network',
    onClicked: () => Utils.execAsync(['nm-connection-editor'])
    .then(out => print(out))
    .catch(err => print(err)),
    child: Widget.Box({
        spacing: 8,
        homogeneous: false,
        vertical: false,
        children: [
            Widget.Stack({
                items: [
                    ['wifi', Widget.Icon({
                        connections: [[Network, self => {
                            self.icon = Network.wifi?.iconName || '';
                        }]],
                    })],
                    ['wired', Widget.Icon({
                        connections: [[Network, self => {
                            self.icon = Network.wired?.iconName || '';
                        }]],
                    })],
                ],
                binds: [['shown', Network, 'primary', p => p || 'wifi']],
            }),
            Widget.Label({
                connections: [[Network, self => {
                    const label = Network.wifi?.ssid || '';
                    self.label = label.substring(0, 7)
                }]],
            }),
        ],
    }),
});

export default () => networkIndicator({})
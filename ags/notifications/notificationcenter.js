import {
    NotificationList, DNDSwitch, ClearButton, PopupList,
} from './notificationswidgets.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import { execAsync, timeout } from 'resource:///com/github/Aylur/ags/utils.js';
import SysTray from '../parts/tray/tray.js'
import Media from '../parts/media/media.js'

const WINDOW_NAME = 'testing';

const Date = () => Widget.Box({
    children: [
        Widget.Label({
            className: 'largetitle',
            connections: [
                [1000, self => execAsync(['date', '+%a %b %e'])
                    .then(date => self.label = "󰃰 " + date).catch(console.error)],
            ],
        }),
    ]
})

const Header = () => Widget.Box({
    //className: 'header',
    children: [
        Widget.Label({
            label: '󰎟 Notifications',
            className: 'mediumtitle',
        }),
        Widget.Label('               '),
        DNDSwitch(),
        ClearButton(),
    ],
});

const seperatorHeader = () => Widget.Box({
    className: 'header',
    children: [
        Widget.Box({ hexpand: false }),
    ],
});

const NotificationCenter = () => Widget.Window({
    name: WINDOW_NAME,
    className: 'notificationCenterWindowOuter',
    visible: false,
    anchor: ['right', 'top'],
    popup: true,
    focusable: true,
    child: Widget.Box({
        children: [
            Widget.EventBox({
                hexpand: true,
                connections: [['button-press-event', () =>
                    App.closeWindow(WINDOW_NAME)]]
            }),
            Widget.Box({
                className: 'notificationCenterWindow',
                homogeneous: false,
                vertical: true,
                children: [
                    Widget.Box({
                        className: "notificationCenterControls",
                        hpack: 'center',
                        //spacing: 350,
                        vertical: true,
                        homogeneous: false,
                        children: [
/*                             Widget.Button({
                                className: 'notificationcenterclosebutton',
                                hexpand: true,
                                onClicked: () =>  App.toggleWindow('testing'),
                                child: Widget.Label({
                                    className: 'smalltitle',
                                    label: ' Close'
                                })
                            }), */
                            Date(),
                        ]
                    }),
                    
                    SysTray(),
                    seperatorHeader(),
                    Media(),
                    seperatorHeader(),
                    Header(),
                    NotificationList(),
                ],
            }),
        ],
    }),
});

export default NotificationCenter({
    name: WINDOW_NAME,
    popup: true,
    focusable: true,
    layer: 'overlay',

})
import Notifications from 'resource:///com/github/Aylur/ags/service/notifications.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';


const Notification = () => Widget.Button({
    hpack: 'center',
    vpack: 'center',
    className: 'notibutton',
    onClicked: () =>  App.toggleWindow('testing'),
    child: Widget.Box({
        hpack: 'center',
        className: 'notification',
        children: [
            Widget.Icon({
                className: 'notificationbuttonalert',
                icon: 'preferences-system-notifications-symbolic',
                connections: [
                    [Notifications, self => self.visible = Notifications.popups.length > 0],
                ],
            }),
            Widget.Label({
                hpack: 'center',
                className: 'notibuttondefaulticon',
                label: '󰒓',
                connections: [
                    [Notifications, self => self.visible = Notifications.popups.length < 1],
                ],
            }),
            Widget.Label({
                maxWidthChars: 15,
                truncate: 'end',
                wrap: false,
                className: 'notificationbuttonalert',
                connections: [[Notifications, self => {
                    self.label = Notifications.popups[0]?.appName || '';
                }]],
            }),
        ],
    })
})

export default () => Notification({})
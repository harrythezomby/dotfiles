import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { lookUpIcon, timeout } from 'resource:///com/github/Aylur/ags/utils.js';

const NotificationIcon = ({ appEntry, appIcon, image }) => {
    if (image) {
        return Widget.Box({
            valign: 'start',
            hexpand: false,
            className: 'icon img',
            css: `
                background-image: url("${image}");
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                min-width: 150px;
                min-height: 150px;
            `,
        });
    }

    let icon = 'dialog-information-symbolic';
    if (lookUpIcon(appIcon))
        icon = appIcon;

    if (lookUpIcon(appEntry))
        icon = appEntry;

    return Widget.Box({
        valign: 'start',
        hexpand: false,
        className: 'icon',
        css: `
            min-width: 78px;
            min-height: 78px;
        `,
        children: [Widget.Icon({
            icon, size: 58,
            halign: 'center', hexpand: true,
            valign: 'center', vexpand: true,
        })],
    });
};

export const Notification = n => Widget.EventBox({
    className: `notification ${n.urgency}`,
    onPrimaryClick: () => n.dismiss(),
    properties: [['hovered', false]],
    onHover: self => {
        if (self._hovered)
            return;

        // if there are action buttons and they are hovered
        // EventBox onHoverLost will fire off immediately,
        // so to prevent this we delay it
        timeout(300, () => self._hovered = true);
    },
    onHoverLost: self => {
        if (!self._hovered)
            return;

        self._hovered = false;
        n.dismiss();
    },
    vexpand: false,
    child: Widget.Box({
        vertical: true,
        children: [
            Widget.Box({
                children: [
                    NotificationIcon(n),
                    Widget.Box({
                        hexpand: true,
                        vertical: true,
                        children: [
                            Widget.Box({
                                children: [
                                    Widget.Label({
                                        className: 'smalltitle',
                                        //xalign: 'left',
                                        justification: 'left',
                                        hexpand: true,
                                        vexpand: false,
                                        maxWidthChars: 50,
                                        truncate: 'end',
                                        wrap: true,
                                        label: n.summary,
                                        useMarkup: true,
                                    }),
                                    Widget.Button({
                                        className: 'close-button',
                                        valign: 'start',
                                        halign: 'left',
                                        child: Widget.Icon('window-close-symbolic'),
                                        onClicked: n.close.bind(n),
                                    }),
                                ],
                            }),
                            Widget.Label({
                                className: 'smallertitle',
                                hexpand: true,
                                useMarkup: true,
                                //xalign: 'left',
                                justification: 'left',
                                label: n.body,
                                wrap: true,
                            }),
                        ],
                    }),
                ],
            }),
            Widget.Box({
                className: 'actions',
                children: n.actions.map(({ id, label }) => Widget.Button({
                    className: 'action-button',
                    onClicked: () => n.invoke(id),
                    hexpand: true,
                    child: Widget.Label(label),
                })),
            }),
        ],
    }),
});
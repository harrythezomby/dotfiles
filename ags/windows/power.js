import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';

const WINDOW_NAME = 'powermenu';

function sh(cmd) {
    return function() {
      Utils.execAsync(['bash', '-c', cmd]);
    }; 
  }

// widget representing a power menu item
const PowerMenuItem = item => Widget.Button({
    className: 'powermenuButtons',
    onClicked: item.onClicked,
    child: Widget.Box({
        children: [
            Widget.Icon({
                className: 'powermenuIcons',
                icon: item.icon,
                size: 42,
            }),
            Widget.Label({
                label: item.label,
                className: 'smalltitle',
            }),
        ],
    }),
});

// widget showing a list of PowerMenuItems
const PowerMenu = ({ items }) => {
    const list = Widget.Box({
        
        vertical: true,
        spacing: 12,
    });

    list.children = items.map(item => PowerMenuItem(item));

    return Widget.Box({
        vertical: true,
        css: `margin: 12px;`,
        child: list,
    });
};

// the window containing the PowerMenu
export default Widget.Window({
    name: WINDOW_NAME,
    className: 'powermenuwindow',
    popup: true,
    focusable: true,
    visible: false,
    anchor: ['top', 'left'],
    child: Widget.Box({
        vertical: true,
        children: [
            Widget.Label({
                className: 'smalltitle',
                label: '⏻ Power Menu'
            }),
            PowerMenu({
                items: [
/*                     {
                        label: ' Close',
                        //icon: 'window-close',
                        onClicked: () =>  App.closeWindow('powermenu'),
                    }, */
                    {
                        label: '󰐥 Shutdown',
                        //icon: 'system-shutdown',
                        onClicked: sh('systemctl poweroff'),
                    },
                    {
                        label: ' Restart',
                        //icon: 'system-reboot',
                        onClicked: sh('systemctl reboot'),
                    },
                    {
                        label: '󰤄 Suspend',
                        //icon: 'go-down',
                        onClicked: sh('systemctl suspend'),
                    },
                    {
                        label: '  Sway Lock',
                        //icon: 'system-lock-screen',
                        onClicked: sh('ags -t powermenu && sleep 1 && swaylock \
	--screenshots \
	--clock \
	--indicator \
	--indicator-radius 100 \
	--indicator-thickness 7 \
	--effect-blur 7x5 \
	--effect-vignette 0.5:0.5 \
	--ring-color bb00cc \
	--key-hl-color 880033 \
	--line-color 00000000 \
	--inside-color 00000088 \
	--separator-color 00000000 \
	--grace 2 \
	--fade-in 0.2'),
                    },
                    {
                        label: '  Hibernate',
                        //icon: 'media-floppy',
                        onClicked: sh('systemctl hibernate'),
                    },
                    {
                        label: '  Log Out',
                        //icon: 'system-log-out',
                        onClicked: sh('hyprctl dispatch exit'),
                    },
                    {
                        label: '󱧥 iGPU',
                        //icon: 'system-log-out',
                        onClicked: sh('supergfxctl -m Integrated && hyprctl dispatch exit'),
                    },
                    {
                        label: ' dGPU',
                        //icon: 'system-log-out',
                        onClicked: sh('supergfxctl -m Hybrid && hyprctl dispatch exit'),
                    },
                ],
            }),]
        }),  
    })
    

//AGS Stuff 
import App from 'resource:///com/github/Aylur/ags/app.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';

// GDK
import Gdk from "gi://Gdk"

// Bar main buttons
import Power from './parts/mainButtons/powerButton.js'
import Apps from './parts/mainButtons/appsButton.js'
import VM from './parts/mainButtons/vmButton.js'
import Notification from './parts/mainButtons/notiButton.js'

// Bar status segment
import brightness from './parts/statusSegments/brightness.js'
import Clock from './parts/statusSegments/clock.js'
import Volume from './parts/statusSegments/volume.js'
import networkIndicator from './parts/statusSegments/networkIndicator.js'
import BT from './parts/statusSegments/bt.js'
import batteryProgress from './parts/statusSegments/batteryProgress.js'

// Hyprland
import Workspaces from './parts/hyprland/workspaces.js'
import ClientTitle from './parts/hyprland/clientTitle.js'

// Sys Monitor
import cpuLabel from './parts/variables/cpuslim.js'
import ramLabel from './parts/variables/ram.js'
import tempLabel from './parts/variables/temp.js'

// Sys Tray
import Tray from './parts/tray/tray.js'


// layout of the bar
const Left = () => Widget.Box({
    children: [
        Power(),
        Apps(),
        VM(),
        Workspaces(),
        tempLabel(),
        ramLabel(),
        cpuLabel(),

        
    ],
});

const Center = () => Widget.Box({
    children: [
        ClientTitle(),
        
    ],
});

const Right = () => Widget.Box({
    hpack: 'end',
    children: [
        Tray(),
        Volume(),
        networkIndicator(),
        BT(),
        batteryProgress(),
        brightness(),
        Clock(),
        Notification(),
    ],
});

const Bar = ({ monitor } = {}) => Widget.Window({
    name: `bar-${monitor}`, // name has to be unique
    className: 'bar',
    monitor,
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
    child: Widget.CenterBox({
        startWidget: Left(),
        centerWidget: Center(),
        endWidget: Right(),
    }),
})

// exporting the config so ags can manage the windows
export default {
    maxStreamVolume: 1,
    style: App.configDir + '/style.css',
    windows: [
        //Bar(),

        // you can call it, for each monitor
        //FloatingDock({monitor: 1}),
        Bar({ monitor: 0 }),
        Bar({ monitor: 1 }),
        Bar({ monitor: 2 }),
    ],
};

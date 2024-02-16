//AGS Stuff 
import App from 'resource:///com/github/Aylur/ags/app.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { exec, execAsync } from 'resource:///com/github/Aylur/ags/utils.js';
import Network from 'resource:///com/github/Aylur/ags/service/network.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import Variable from 'resource:///com/github/Aylur/ags/variable.js';

//Windows
import applauncher from './windows/applauncher.js';
import power from './windows/power.js';
import vmmenu from './windows/vmlauncher.js';

// Notifications
import testing from './notifications/notificationcenter.js';
import notificationpopup from './notifications/notificationpopup.js';
import Notification from './parts/notification/notification.js'

// Bar main buttons
import Power from './parts/mainButtons/powerButton.js'
import Apps from './parts/mainButtons/appsButton.js'
import VM from './parts/mainButtons/vmButton.js'

// Bar status segment
import brightness from './parts/statusSegments/brightness.js'
import Clock from './parts/statusSegments/clock.js'
import Volume from './parts/statusSegments/volume.js'
import networkIndicator from './parts/statusSegments/networkIndicator.js';
import BT from './parts/statusSegments/bt.js'
import batteryProgress from './parts/statusSegments/batteryProgress.js';

// Hyprland
import Workspaces from './parts/hyprland/workspaces.js'
import ClientTitle from './parts/hyprland/clientTitle.js'


const command = "grep 'cpu MHz' '/proc/cpuinfo' | awk '{total += $4} END {print total / NR / 1000}'";

const ram = Variable('0', {
    poll: [1000, ['bash', '-c', 'free -h | awk \'/^Mem:/ {print $3 \"/\" $2}\'']],
  });

  const ramLabel = () => Widget.Box({
    className: 'ram',
    hpack: 'center',
    children: [
        Widget.Label({
            label: "  ",
            hpack: 'center',
        }),
        Widget.Label({
            binds: [['label', ram]],
            hpack: 'center',
        })
    ]
})

const cpughz = Variable('0', {
    poll: [1000, ['bash', '-c', 'awk \'/cpu MHz/ {sum+=$4; count++} END {printf "%.2f GHz", sum/count/1000}\' /proc/cpuinfo']],
  });

const cpuutil = Variable('0', {
    poll: [1000, ['bash', '-c', 'top -bn1 | grep "%Cpu(s)" | awk \'{print $2 + $4}\' | awk -F. \'{print $1"%"}\'']],
  });

const cputemp = Variable('0', {
    //Change CPUTIN to Tctl on laptop
    poll: [10000, ['bash', '-c', 'sensors | awk \'/CPUTIN/ {print $2}\' | sed \'s/+//\'']],
});

const cpufan = Variable('0', {
    poll:[5000, ['bash', '-c', 'sensors | awk \'/fan1/ {print $2 " rpm"}\' | sed \'s/+//\'']],
})

const kernelver = Variable('0', {
    poll:[999999, ['bash', '-c', 'uname -r | cut -c -5']],
})

  const cpughzLabel = () => Widget.Label({
    binds: [['label', cpughz]],
    hpack: 'center',
  });

  const cpuutilLabel = () => Widget.Label({
    binds: [['label', cpuutil]],
    hpack: 'center',
  });

  const cputempLabel = () => Widget.Label({
    binds: [['label', cputemp]],
  });

  const cpufanLabel = () => Widget.Label({
    binds: [['label', cpufan]],
  });

const cpuLabel = () => Widget.Box ({
    hpack: 'center',
    className: 'cpu',
    children: [
        Widget.Label({
            hpack: 'center',
            label: "  "
        }),
        cpuutilLabel({
            hpack: 'center',
        }),
        Widget.Label ({
            hpack: 'center',
            label: " | "
        }),
        cpughzLabel({
            hpack: 'center',
        }),
    ]
})

const tempLabel = () => Widget.Box({
    hpack: 'center',
    className: 'temp',
    children: [
        Widget.Label(" "),
        cputempLabel(),
    ]
})

const fanLabel = () => Widget.Box({
    hpack: 'center',
    className: 'fan',
    children: [
        Widget.Label("󰈐 "),
        cpufanLabel(),
    ]
})

const kernelLabel = () => Widget.Label({
    hpack: 'center',
    binds: [['label', kernelver]],
  });

const kernel = () => Widget.Button({
    className: 'kernel',
    hpack: 'center',
    child: Widget.Box({
        hpack: 'center',
        children: [
            Widget.Label(" "),
            kernelLabel(),
    
        ]
    }),
})

// layout of the bar
const Left = () => Widget.Box({
    children: [
        Power(),
        Apps(),
        VM(),
        Workspaces(),
        ramLabel(),
        cpuLabel(),
        tempLabel(),
        fanLabel(),
        
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
        Volume(),
        networkIndicator(),
        BT(),
        batteryProgress(),
        brightness(),
        kernel(),
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

        applauncher,
        power,
        vmmenu,
        testing,
        notificationpopup,
    ],
};

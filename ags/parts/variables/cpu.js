import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Variable from 'resource:///com/github/Aylur/ags/variable.js';

const cpughz = Variable('0', {
    poll: [1000, ['bash', '-c', 'awk \'/cpu MHz/ {sum+=$4; count++} END {printf "%.2f GHz", sum/count/1000}\' /proc/cpuinfo']],
  });

  const cpuutil = Variable('0', {
    poll: [1000, ['bash', '-c', 'top -bn1 | grep "%Cpu(s)" | awk \'{print $2 + $4}\' | awk -F. \'{print $1"%"}\'']],
  });

  const cpughzLabel = () => Widget.Label({
    binds: [['label', cpughz]],
    hpack: 'center',
  });

  const cpuutilLabel = () => Widget.Label({
    binds: [['label', cpuutil]],
    hpack: 'center',
  });

export default () => Widget.Box ({
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
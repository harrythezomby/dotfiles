import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Variable from 'resource:///com/github/Aylur/ags/variable.js';

  const cpuutil = Variable('0', {
    poll: [1000, ['bash', '-c', 'top -bn1 | grep "%Cpu(s)" | awk \'{print $2 + $4}\' | awk -F. \'{print $1"%"}\'']],
  });

  const cpuutilLabel = () => Widget.Label({
    binds: [['label', cpuutil]],
    justification: 'left',
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
    ]
})
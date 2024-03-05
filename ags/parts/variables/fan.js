import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Variable from 'resource:///com/github/Aylur/ags/variable.js';

const cpufan = Variable('0', {
    poll:[5000, ['bash', '-c', 'sensors | awk \'/fan1/ {print $2 " rpm"}\' | sed \'s/+//\'']],
})

const cpufanLabel = () => Widget.Label({
    binds: [['label', cpufan]],
  });

export default () => Widget.Box({
    hpack: 'center',
    className: 'fan',
    children: [
        Widget.Label("󰈐 "),
        cpufanLabel(),
    ]
})
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Variable from 'resource:///com/github/Aylur/ags/variable.js';

const cputemp = Variable('0', {
    //Change CPUTIN to Tctl on laptop
    poll: [10000, ['bash', '-c', 'sensors | awk \'/CPUTIN/ {printf \"%d°C\\n\", $2}\' | sed \'s/+//\'']],
});

const cputempLabel = () => Widget.Label({
    binds: [['label', cputemp]],
  });

export default () => Widget.Box({
    hpack: 'center',
    className: 'temp',
    children: [
        Widget.Label(" "),
        cputempLabel(),
    ]
})
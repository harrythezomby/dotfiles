import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Variable from 'resource:///com/github/Aylur/ags/variable.js';

const kernelver = Variable('0', {
    poll:[999999, ['bash', '-c', 'uname -r | cut -c -5']],
})

const kernelLabel = () => Widget.Label({
    hpack: 'center',
    binds: [['label', kernelver]],
  });

export default () => Widget.Button({
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
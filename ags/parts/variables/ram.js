import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Variable from 'resource:///com/github/Aylur/ags/variable.js';

const ram = Variable('0', {
    poll: [1000, ['bash', '-c', 'free | awk \'/Mem/ {printf(\"%.0f%\\n\", $3/$2*100)}\'']],
});

export default () => Widget.Box({
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
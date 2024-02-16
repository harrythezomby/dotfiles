import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { exec, execAsync } from 'resource:///com/github/Aylur/ags/utils.js';

const Clock = () => Widget.Box({
    className: 'clock',
    children: [
        Widget.Label({
            label: "  ",
        }),
        Widget.Label({
            setup: self => self
            .poll(1000, self => execAsync(['date', '+%l:%M %p'])
            .then(date => self.label = date)),
        }),
    ]
})

export default () => Clock({})
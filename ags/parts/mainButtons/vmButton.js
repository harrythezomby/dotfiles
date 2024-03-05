import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';

const VM = () => Widget.Button({
    className: 'vm',
    onClicked: () =>  Utils.execAsync(['bash', '-c', '~/.config/ags/scripts/rofi-vmmenu.sh'])
        .catch(error => console.error('An error occurred:', error)),
    child: Widget.Label({
        label: '',
    }),
});

export default () => VM({})
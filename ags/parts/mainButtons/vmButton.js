import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';


const VM = () => Widget.Button({
    className: 'vm',
    onClicked: () =>  App.openWindow('vmmenu'),
    child: Widget.Label({
        label: '',
    }),
});

export default () => VM({})
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';


const Power = () => Widget.Button({
    className: 'power',
    onClicked: () =>  App.openWindow('powermenu'),
    child: Widget.Label({
        label: '',
    }),
});

export default () => Power({})
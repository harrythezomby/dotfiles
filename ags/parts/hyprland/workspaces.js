import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import execAsync from 'resource:///com/github/Aylur/ags/utils.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';

const dispatch = ws => Utils.execAsync(`hyprctl dispatch workspace ${ws}`);

const Workspaces = () => Widget.EventBox({
    className: 'workspaces',
    onScrollUp: () => dispatch('+1'),
    onScrollDown: () => dispatch('-1'),
    child: Widget.Box({
        className: 'workspacebackground',
        children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button({
            setup: btn => btn.id = i,
            label: `${i}`,
            onClicked: () => dispatch(i),
        })),

        // remove this connection if you want fixed number of buttons
        connections: [[Hyprland, box => box.children.forEach(btn => {
            btn.visible = Hyprland.workspaces.some(ws => ws.id === btn.id);
            btn.toggleClassName('focused', Hyprland.active.workspace.id === btn.id);
            
        })]],
    }),
});

export default () => Workspaces({})
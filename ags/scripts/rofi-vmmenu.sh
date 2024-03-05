#!/bin/bash

# Define the options to be displayed
options=("  Power On" "  View" "󱇽  Looking Glass" "⏼  Shut Down" "  Virt-Manager")

# Use rofi to display a menu and store the user's selection
choice=$(echo -e "${options[0]}\n${options[1]}\n${options[2]}\n${options[3]}\n${options[4]}" | rofi -dmenu -i -p "Select an option")

# Execute the appropriate command based on the user's selection
case $choice in
"  Power On")
	virsh --connect qemu:///system start "win11"
	;;
"  View")
	virt-viewer -c qemu:///system "win11"
	;;
"󱇽  Looking Glass")
	looking-glass-client
	;;
"⏼  Shut Down")
	echo "Shutting down..."
	;;
"  Virt-Manager")
	virt-manager
	;;
esac

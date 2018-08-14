/* -*- mode: js2; js2-basic-offset: 4; indent-tabs-mode: nil -*- */

const Clutter = imports.gi.Clutter;
const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const St = imports.gi.St;

const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Panel = imports.ui.panel;

const IndicatorName = "DNSSEC-Trigger";

function _showHello() {
    if (!text) {
        text = new St.Label({ style_class: 'helloworld-label', text: "Hello, world!" });
        Main.uiGroup.add_actor(text);
    }

    text.opacity = 255;

    let monitor = Main.layoutManager.primaryMonitor;

    text.set_position(monitor.x + Math.floor(monitor.width / 2 - text.width / 2),
                      monitor.y + Math.floor(monitor.height / 2 - text.height / 2));

    Tweener.addTween(text,
                     { opacity: 0,
                       time: 2,
                       transition: 'easeOutQuad',
                       onComplete: _hideHello });
}

const PlaceMenuItem = new Lang.Class({
    Name: IndicatorName,
    Extends: PopupMenu.PopupBaseMenuItem,

    _init: function(text) {
	this.parent();

        this._label = new St.Label({ text: text });
        this.actor.add_child(this._label);
    },

    activate: function(event) {
	this._info.launch(event.get_time());

	this.parent(event);
    }
});

const PlacesMenu = new Lang.Class({
    Name: 'PlacesMenu.PlacesMenu',
    Extends: PanelMenu.Button,

    _init: function() {
        this.parent(0.0, _("Dnsec"));

        let hbox = new St.BoxLayout({ style_class: 'panel-status-menu-box' });
        let icon = new St.Icon({ icon_name: 'system-run-symbolic',
                             style_class: 'system-status-icon' });

        let label = new St.Label({ text: _("Dnsec"),
                                   y_expand: true,
                                   y_align: Clutter.ActorAlign.CENTER });
        hbox.add_child(icon);
        hbox.add_child(PopupMenu.arrowIcon(St.Side.BOTTOM));
        this.actor.add_actor(hbox);

	this.menu.addMenuItem(new PlaceMenuItem('Reprobe')); // new PopupMenu.PopupBaseMenuItem('label')
	this.menu.addMenuItem(new PlaceMenuItem('Hotspot sign-on')); // new PopupMenu.PopupBaseMenuItem('label')
	this.menu.addMenuItem(new PlaceMenuItem('Status window'));
    }
});

function init() {
}

let _indicator;
let text, button;

function enable() {
    _indicator = new PlacesMenu;

    /*button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });*/
    let icon = new St.Icon({ icon_name: 'system-run-symbolic',
                             style_class: 'system-status-icon' });

    //button.set_child(icon);
    //button.connect('button-press-event', _indicator);

    //let pos = 1;
    //if ('apps-menu' in Main.panel.statusArea)
	//pos = 2;
    Main.panel.addToStatusArea(IndicatorName, _indicator, 0, 'right');
    //Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    _indicator.destroy();
    Main.panel._rightBox.remove_child(button);
}
/*
function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}*/

/*
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

let text, button;

function _hideHello() {
    Main.uiGroup.remove_actor(text);
    text = null;
}

function _showHello() {
    if (!text) {
        text = new St.Label({ style_class: 'helloworld-label', text: "Hello, world!" });
        Main.uiGroup.add_actor(text);
    }

    text.opacity = 255;

    let monitor = Main.layoutManager.primaryMonitor;

    text.set_position(monitor.x + Math.floor(monitor.width / 2 - text.width / 2),
                      monitor.y + Math.floor(monitor.height / 2 - text.height / 2));

    Tweener.addTween(text,
                     { opacity: 0,
                       time: 20,
                       transition: 'easeOutQuad',
                       onComplete: _hideHello });
}

function init() {
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let icon = new St.Icon({ icon_name: 'system-run-symbolic',
                             style_class: 'system-status-icon' });

    button.set_child(icon);
    button.connect('button-press-event', _showHello);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
*/

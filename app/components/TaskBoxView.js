var React       = require('react')
var $           = React.DOM
var _           = require('lodash')
var flux        = require('fluxify')
var keyboard    = require('../io/KeyboardIO')
var TaskStore  = require('../stores/TaskStore')
var TaskBoxItem = React.createFactory(require('./TaskBoxView/TaskBoxItem'))

var getStateFromStores = function(mailbox) {
    return {
//        tasks : TaskStore.tasks()
    }
}

var TaskBoxView = React.createClass({
    render : function() {
//        var email = this.state.mailboxes[this.props.selectedMailBox].map(function(email,index) { 
//            return MailBoxItem({ 
//                key      : 'MailBoxItem'+index,
//                email    : email,
//                selected : this.state.selectedIndex === index,
//                openMail : this.props.openMail
//            })
//        }.bind(this))
        return $.ul({
            key       : 'TaskBoxView',
            className : 'TaskBoxView'
        },[])
    },
    getInitialState : function() {
        return _.assign(getStateFromStores(), {
            selectedIndex : -1 
        })
    },
    moveSelected : function(e) {
        switch(e.which) {
            case 38:
                if (this.state.selectedIndex > -1) this.setState({ selectedIndex : this.state.selectedIndex-1 })
                break
            case 40:
                if (this.state.selectedIndex < this.state.email.length-1) this.setState({ selectedIndex : this.state.selectedIndex+1 })
                break
        }
    },
    isValidSelectedIndex : function() {
        var index = this.state.selectedIndex
        var email = this.state.email
        return (index >= 0 && index <= email.length)
    },
    getSelectedEmail :  function() {
        if (this.isValidSelectedIndex()) return this.state.email[this.state.selectedIndex]
    },
    openMail : function() {
    },
    archiveMail : function() {
    },
    deleteMail : function() {
    },
    reloadMail : function() {
    },
    onStoreChange : function() {
        this.setState(getStateFromStores())
    },
    componentDidMount : function() {
        TaskStore.on('change', this.onStoreChange)
        keyboard.bind('down',   this.moveSelected)
        keyboard.bind('up',     this.moveSelected)
        keyboard.bind('right',  this.archiveMail)
        keyboard.bind('enter',  this.openMail)
        keyboard.bind('ctrl+backspace',  this.deleteMail)
        this.props.emitter.on('reload', this.reloadMail)
    },
    componentWillUnmount : function() {
        TaskStore.removeListener('change', this.onStoreChange)
        keyboard.unbind('down')
        keyboard.unbind('up')
        keyboard.unbind('right')
        keyboard.unbind('enter')
        keyboard.unbind('ctrl+backspace')
        this.props.emitter.removeListener('reload', this.reloadMail)
    }
})

module.exports = TaskBoxView 
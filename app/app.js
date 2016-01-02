import React           from 'react'
import ReactDOM        from 'react-dom'
import { Provider }    from 'react-redux'
import Router          from 'tiny-react-router'
import FastClick       from 'fastclick'
import Style           from '@asbjornenge/react-style'
import TaskBox         from './screens/TaskBox'
import MailBox         from './screens/MailBox'
import TweetBox        from './screens/TweetBox'
import Settings        from './screens/Settings'
import Task            from './screens/Task'
import Mail            from './screens/Mail'
import Header          from './screens/shared/components/Header'
import Footer          from './screens/shared/components/Footer'
import store           from './redux'
import { emitter }     from './redux'
import loops           from './loops'
import taskboxStyle    from './app.styl'

let routes = {
    '/'            : TaskBox,
    '/taskbox'     : TaskBox,
    '/taskbox/:id' : Task,
    '/mailbox'     : MailBox, 
    '/mailbox/:id' : Mail,
    '/tweetbox'    : TweetBox,
    '/settings'    : Settings 
}

class TaskBoxApp extends React.Component {
    render() {
        return (
            <div className="TaskBoxApp">
                <Style style={taskboxStyle} />
                <Header emitter={emitter} />
                <Provider store={store}>
                    <Router routes={routes} />
                </Provider>
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(<TaskBoxApp />, document.querySelector('#app'))

loops(store)

window.addEventListener('load', () => {
  FastClick(document.body);
})

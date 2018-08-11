import React, {Component} from 'react';
import Formulaire from './Formulaire';
import Message from './Message';
import base from '../base';
// CSS
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../animation.css';

class App extends Component {

    state = {
        messages: {}
    }

    /* componentWillMount() {
      this.ref = base.syncState('/', {
          context: this,
          state: 'messages'
      });
    } */

    componentDidUpdate(){
        //Mettre le scroll en bas
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    addMessage = (message) => {
        // Copier le state
        const messages = {
            ...this.state.messages
        };
        // On ajoute le message avec une clé timestamp
        const timestamp = Date.now();
        messages[`message-${timestamp}`] = message;
        // On supprime si plus de 10 messages problème à régler
        Object
            .keys(messages)
            .slice(0, -10)
            .map(key => messages[key] = null)
        // Mettre à jour notre state
        this.setState({messages});
    };

    isUser = (pseudo) => {
        return pseudo === this.props.params.pseudo
    }

    render() {

        const messages = Object
            .keys(this.state.messages)
            .map(key => <Message key={key} details={this.state.messages[key]} isUser={this.isUser}/>);
        console.log(messages);

        return (
            <div>
                <div className="box">
                    <div className="messages" ref={input => this.messages = input}>
                        <ReactCSSTransitionGroup
                        component="div"
                        className="message"
                        transitionName="message"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        >
                            {messages}
                        </ReactCSSTransitionGroup>
                    </div>
                    <Formulaire
                        addMessage={this.addMessage}
                        pseudo={this.props.params.pseudo}
                        length={140}/>
                </div>
            </div>
        );

    }

    static propTypes = {
        params: React.PropTypes.object.isRequired
    }
}

export default App;
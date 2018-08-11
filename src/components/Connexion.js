import React from 'react'

class Connexion extends React.Component {

    goToChat = event => {
        event.preventDefault()
        // Récupérer le pseudo
        const pseudo = this.pseudoInput.value;
        // Changer l'url
        this.context.router.transitionTo(`/pseudo/${pseudo}`)

    };

    render() {
        return (
            <div className="connexionBox">
                <form className="connexion" onSubmit={e => this.goToChat(e)}>
                    <input type="text" placeholder="Pseudo" required 
                    ref={input => {this.pseudoInput = input}}/>
                    <button type="submit">GO</button>
                </form>
            </div>
        )
    }

    static contextTypes = {
        router: React.PropTypes.object
    }
}

export default Connexion;
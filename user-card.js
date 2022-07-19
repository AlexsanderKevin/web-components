const template = document.createElement('template')
template.innerHTML = `
    <style>
        h3 {
            color: coral;
        }
    </style>
    <div class="user-card">
        <img>
        <div>
            <h3></h3>
            <div class="info">
                <p>EMAIL</p>
                <p>PHONE</p>
            </div>
            <button id="toggle-info">Hide Info</button>
        </div>
    </div>
`

class UserCard extends HTMLElement {
    constructor() {
        super()
        
        // Neste caso 'this' se refere ao componente customizado que está sendo criado
        // Se os estilos fossem simplesmente aplicados ao innerHTML, esses estilos influenciariam o documento todo, porque não está sendo utilizado um shadow Dom
        // Uma vez que a shadow DOM é definida, este componente desaparece do documento porque não é assim que a shadow DOM lida com os elementos
        // this.innerHTML = `<h3>${this.getAttribute('name')}</h3>`
        
        this.attachShadow({mode: 'open'})
        // Se o valor de 'cloneNode' for true, os descendentes do template também serão clonados
        // o 'template' no qual está sendo feito o append é o que foi definido acima
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name')

        this.avatar = this.shadowRoot.querySelector('img')
        this.avatar.src = this.getAttribute('avatar')
    }
}

window.customElements.define('user-card', UserCard)

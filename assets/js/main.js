class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario');
    this.eventos();
  } // aqui temos o constructor da classe, a partir dele iremos definir a seleção do formulário, e a execução dos eventos.

  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e);
    });
  } // aqui executamos os eventos, que no caso é enviar o formulário ao pressionar o botão de submit, sendo o evento o handleSubmit.

  handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas();

    if(camposValidos && senhasValidas) {
      alert('Formulário enviado.');
      this.formulario.submit();
    }
  } // Ao enviar o formulário, iremos executar os métodos que irão validar os campos de acordo com as condições que nós colocamos, se ambos forem true, da um pop no alert confimando o envio.

  senhasSaoValidas() {
    let valid = true;

    const senha = this.formulario.querySelector('.senha');
    const repetirSenha = this.formulario.querySelector('.repetir-senha');

    if(senha.value !== repetirSenha.value) {
      valid = false;
      this.criaErro(senha, 'Campos senha e repetir senha precisar ser iguais.');
      this.criaErro(repetirSenha, 'Campos senha e repetir senha precisar ser iguais.');
    }

    if(senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.criaErro(senha, 'Senha precisa estar entre 6 e 12 caracteres.');
    }

    return valid;
  } // Essa função irá validar as senhas. Primeiro criamos a flag que serve de controle, sendo uma let que será de início true, mas se alguma condição não for atendida irá voltar false, depois associamos os inputs dos htmls a variaveis senha e repetirSenha. A partir disso vamos as condições, a primeira é que se as senhas forem diferentes a flag agora será false, portanto iremos executar a função criaErro para senha e repetirSenha, aplicando uma div com o texto desejado. A segunda condição é o tamanho da senha, nela definimos que o tamanho deve ser maior que 6 e menor que 12, caso contrário, retorna falso para a flag. Se tudo for atendido, retornamos a flag como true.

  camposSaoValidos() {
    let valid = true;

    for(let errorText of this.formulario.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for(let campo of this.formulario.querySelectorAll('.validar')) {
      const label = campo.previousElementSibling.innerText;

      if(!campo.value) {
        this.criaErro(campo, `Campo "${label}" não pode estar em branco.`);
        valid = false;
      }

      if(campo.classList.contains('cpf')) {
        if(!this.validaCPF(campo)) valid = false;
      }

      if(campo.classList.contains('usuario')) {
        if(!this.validaUsuario(campo)) valid = false;
      }

    }

    return valid;
  } // Aqui iremos validar os demais campos, aplicando a flag valid, e de começo usaremos um for para que toda vez que for validar, ele irá apagar as mensagens de erro para que elas não se acumulem, verificando por meio da nova classe error-text. Usaremos o segundo for para validar os demais campos. Primeiro ele irá checar todos os campos com classe validar. na const label, iremos usar para selecionar a label vizinha anterior para podermos automatizar a mensagem de campo vazio. No primeiro if, temos que, se os valores dos campos estiverem vazios, retorna a mensagem informando isso, e altera a flag. No segundo if, caso tenha a classe cpf iremos usar a função valida cpf, nesse caso se for falso, alteramos a flag. no terceiro if usaremos o mesmo so que para validar o usuario.

  validaUsuario(campo) {
    const usuario = campo.value;
    let valid = true;

    if(usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres.');
      valid = false;
    }

    if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(campo, 'Nome de usuário precisar conter apenas letras e/ou números.');
      valid = false;
    }

    return valid;
  } // Nessa função, criamos a const usuario sendo igual ao valor do campo, e a flag. A primeira condição é que ele tenha entre 3 e 12 caracteres, do contrario invocamos a função criaErro e mudamos a flag. A segunda condição é que o usuario só contenha letras e/ou numeros, do contrario, criaErro.

  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value);

    if(!cpf.valida()) {
      this.criaErro(campo, 'CPF inválido.');
      return false;
    }

    return true;
  } // Para validar o cpf iremoschamar a classe ValidaCPF, aplicando em seu argumento o campo.value. A condição vai ser a da função já criada, se o cpf for diferente do valida, então criaErro e retorna false.

  criaErro(campo, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    campo.insertAdjacentElement('afterend', div);
  }
}// a função cria erro tem dois parâmetros, o campo do input, e a mensagem a ser exibida. Começamos criando uma variavel div, que cria um elemento chamado div. Dentro desta variavel, aplicamos no innerHTML o parâmetro msg, que iremos introduzir nesse elemento html a msg. Adicionamos a classe error-text para podermos trabalhar em cima dela. e aplicamos campo.insertAdjacentElement('afterend', div) dessa forma após o campo criaremos uma div e nela que irá receber os textos dos erros.

//Perceba  que o campo será acessado de acordo com o queryselector, quando atribuimos ele a uma variável e passamos essa variável como argumento desta função, linkando então o queryselector do campo com o parâmetro da função.

const valida = new ValidaFormulario();

const limparFormulario = () => {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';}

const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async() => {
    limparFormulario();
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    if(cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        preencherFormulario(endereco);
        if (endereco.hasOwnProperty('erro'))
        {
            document.getElementById('endereco').value = 'CEP não encontrado'
        }
        else {preencherFormulario(endereco);}} 
    else
    {
        document.getElementById('endereco').value = 'CEP incorreto'
    }
};

const botaoAcao = document.getElementById('acao');
const pMensagem = document.getElementById('mensagem');

botaoAcao.addEventListener('click', () => {
    const msg = `Seu nome é ${nome.value}, seu e-mail é ${email.value}. E você mora no(a) ${endereco.value}, número ${numero.value}, no bairro ${bairro.value}, cidade de ${cidade.value}, estado de ${estado.value} no CEP: ${cep.value}.`
    console.log(msg)
    //pMensagem.innerHTML = msg
})

document.getElementById('cep').addEventListener('focusout', pesquisarCep);

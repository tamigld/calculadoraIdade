// 1. pegar os valores OK
// 2. calcular a idade com base no ano OK
// 3. gerar a faixa etária:
//   Resultado            Faixa
//    0 à 12               Criança
//    13 à 17              Adolescente
//    18 à 65              Adulto
//    Acima de 65          Idoso
// 4. Organizar o objeto pessoa para salvar na lista OK
// 5. Cadastrar a pessoa na lista OK
// 6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
// 7. Renderizar o conteúdo da tabela com as pessoas cadastradas
// 8. Botão para limpar os registros;

function calcular(event){
    event.preventDefault()

    console.log("Foi executada a função calcular.")

    let usuario = receberValores()
    // 1. recebe os valores
    
    let idade = calcularIdade(usuario.anoNasc)
    // 2. calcula a idade com base no ano e retorna o valor no console

    let faixaEtaria = gerarFaixaEtaria(idade)
    // 3. gera a faixa etária

    usuario = organizarDados(usuario, idade, faixaEtaria)

    cadastrarUsuario(usuario)

    carregarLista()
}

function receberValores(){
    let nomeRecebido = document.getElementById('nome').value.trim()
    let diaNascRecebido = document.getElementById('dia-nascimento').value
    let mesNascRecebido = document.getElementById('mes-nascimento').value
    let anoNascRecebido = document.getElementById('ano-nascimento').value

    let dadosUsuario = {
        nome: nomeRecebido,
        diaNasc: diaNascRecebido,
        mesNasc: mesNascRecebido,
        anoNasc: anoNascRecebido,
    }

    console.log(dadosUsuario)

    return dadosUsuario
}

// calcular idade com base no ano
function calcularIdade(anoNasc){
    let dataAtual = new Date();
    let anoAtual = dataAtual.getFullYear();

    let idade = anoAtual - anoNasc
    return idade
    console.log(idade)
}

// 3. gerar a faixa etária
function gerarFaixaEtaria(idade){
    if(idade >= 0 && idade <= 12){
        console.log("Criança")
        return "Criança"
    } else if(idade >= 13 && idade <= 17){
        console.log("Adolescente")
        return "Adolescente"
    } else if(idade >= 18 && idade <= 65){
        console.log("Adulto")
        return "Adulto"
    } else if(idade > 65){
        console.log("Idoso")
        return "Idoso"
    }
}

// 4. organizar os dados do usuário
function organizarDados(dadosUsuario, idade, faixaEtaria){
    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        idade: idade,
        faixaEtaria: faixaEtaria,
    }

    return dadosUsuarioAtualizado
}

// 5. cadastrar a pessoa na lista
function cadastrarUsuario(dadosUsuario){
    let listaUsuarios = []

    
    if(localStorage.getItem("usuariosCadastrados") != null){
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }
    // se houver uma lista de usuários no localStorage, carregar isso para a variável listaUsuarios.
    // COM ISSO, EVITAMOS O ERRO DE ARMAZENAR APENAS UM VALOR
    // JSON.parse converte novamente para OBJETO

    listaUsuarios.push(dadosUsuario)
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
}

// 6. função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
function carregarLista(){
    let listaCarregada = []

    if(localStorage.getItem("usuariosCadastrados") != null){
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }
    // carrega a lista para o array listaCarregada

    if(listaCarregada.length === 0){
        document.getElementById("corpo-tabela").innerHTML = `<tr class="linha-mensagem">
        <td colspan="6">Nenhum usuário cadastrado 😥</td>
        <tr> `
    } else{
        montarTabela(listaCarregada)
    }
}

window.addEventListener("DOMContentLoaded", () => carregarLista())
// chamando a função sempre que a página é recarregada
// ouvinte de eventos
// (parâmetro: quando acontece algo, chamar tal função)
// isso tb chama a função que adiciona o texto "nenhum usuário cadastrado" à tabela SE não tiver nada na lista no localStorage

// CHAMA A FUNÇÃO QUE CARREGA A LISTA DE USUÁRIOS QUE ESTÁ SALVA NO LOCALSTORAGE

function montarTabela(listaUsuarios){
    let tabela = document.getElementById("corpo-tabela")

    let template = ""
    listaUsuarios.forEach(usuario =>{
        // PARA CADA USUÁRIO CADASTRADO, VAI INSERIR MAIS UM EMBAIXO DO ANTERIOR
        // na listaUsuarios paraCada usuário cadastrado => irá fazer...
        template+= `<tr> 
        <td data-cell="nome">${usuario.nome}</td>
        <td data-cell="data de nascimento">${usuario.diaNasc}/${usuario.mesNasc}/${usuario.anoNasc}</td>
        <td data-cell="idade">${usuario.idade} anos</td>
        <td data-cell="faixa etária">${usuario.faixaEtaria}</td>
        `
    })

    tabela.innerHTML = template
}

function limparRegistros(){
    localStorage.removeItem("usuariosCadastrados")
    location.reload()
}

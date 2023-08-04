const entrada = document.querySelector('.novaTarefa');
const botao = document.querySelector('.addTarefa');
const lista = document.querySelector('.tarefas');

function limpaInput(){
    entrada.value = '';
    entrada.focus();
}

//Essa função cria a tag li, para adicionar o valor na lista
function criaLi(){
    const li = document.createElement('li');
    return li;
}

//Essa função cria um botão de apagar, pera aparecer do lado do elemento que vai ser adicionado a lista
function criaBotaoApagar(li){
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';

    //A linha abaixo, é um exemplo para criar uma classe para o botão que é criado nesta função
    //botaoApagar.classList.add('apagar');

    //Este é outro exemplo, que vai ser utilizado:
    //Além de definir uma classe, ele da um nome
    botaoApagar.setAttribute('class', 'apagar');

    li.appendChild(botaoApagar);
}

//Função que salva as informações
function salvarTarefa(){
    //Aqui é um nodeList, para pegar todas as tags li, dentro da ul
    const liTarefas = lista.querySelectorAll('li');
    const listaDeTarefas = [];

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        //A função trim() serve para remover o espaço desnecessario
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        //Aqui ta adicionando os valores no Array
        listaDeTarefas.push(tarefaTexto);
    }

    //Aqui vai salvar as informações em um JSON
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

//Essa função, cria a tarefa, e exibe o valor
function criaTarefa(textoValue){
    //Aqui o valor li esta recebendo o valor da função anterior
    const li = criaLi();
    li.innerHTML = textoValue;
    //Aqui esta adicionando as tags <li> que foram criadas, na lista
    //Usou o parametro li, já que é ele que cria os elementos e adiciona eles na lista
    //Ai a variavel li é igual a função, por conta do código da linha 28
    lista.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);

    //Essa função, serve para que quando sair do navegador, as informações fiquem salvas
    salvarTarefa();
}

//Essa função vai verificar qual foi a tecla pressionada no input
entrada.addEventListener('keypress', function(e){
    //Se a tecla ENTER foi pressionada, o elemento na lista será adiconado
    if(e.keyCode === 13){
        if(!entrada.value) return;
        criaTarefa(entrada.value);
    }
});

//Essa é outra forma de captar o clique no botão
botao.addEventListener('click', function() {
    //Se não tiver nada no input, não vai retornar nada
    if(!entrada.value) return;
    
    criaTarefa(entrada.value);
});

//A função abaixo, serve para verificar onde esta sendo clicado na pagina HTML
//Tem que ter o e, para fazer a veirficação
document.addEventListener('click', function(e) {
    const el = e.target;

    //Aqui verifica se clicou no componente, com a class apagar (que no caso é o botão)
    if(el.classList.contains('apagar')){
        //Aqui é para remover o elemento
        el.parentElement.remove();
        salvarTarefa();
    }
});

//Aqui é para quando abrir o navegador, as informações sejam carregadas
function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');

    //Aqui vai converter as tarefas, para um Array novamente
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();
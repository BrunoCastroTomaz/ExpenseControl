function showLoading() {
    const div = document.createElement("div");
    div.classList.add("loading", "centralize");
    
    const label = document.createElement("label");
    //inner text texto interno
    label.innerText = "Carregando...";

    div.appendChild(label);
    document.body.appendChild(div);

    //setTimeout(() => hideLoading(), 2000); //adiciona um tempo de espera e chama a função hideLoading após 2 segundos
}
function hideLoading() {
    const loadings = document.getElementsByClassName("loading"); // retrna lista com todos os elementos que possuem essa classe
    if (loadings.length) { //se a lista nao for vazia
        loadings[0].remove(); //remover primeiro elemento da lista
    }
}
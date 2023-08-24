document.getElementById('form-localizacao').addEventListener('submit', function(event) {
    event.preventDefault();
    var localizacao = document.getElementById('localizacao').value;
    buscarRotas(localizacao);
});

function buscarRotas(localizacao) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/rotas', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            exibirRotas(JSON.parse(xhr.responseText));
        }
    };
    xhr.send('localizacao=' + encodeURIComponent(localizacao));
}

function exibirRotas(rotas) {
    var rotasContainer = document.getElementById('rotas-container');
    rotasContainer.innerHTML = '';
    if (rotas.length > 0) {
        var ul = document.createElement('ul');
        rotas.forEach(function(rota) {
            var li = document.createElement('li');
            li.textContent = rota;
            ul.appendChild(li);
        });
        rotasContainer.appendChild(ul);
    } else {
        rotasContainer.textContent = 'Nenhuma rota disponível.';
    }
}
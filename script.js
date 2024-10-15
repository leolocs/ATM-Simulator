// Você trabalha em um banco e foi solicitado a desenvolver uma parte da interface de um caixa eletrônico para o site do banco.
// Crie um código HTML e JavaScript que simule a tela de operações do caixa eletrônico.

// Na tela, deve haver um título 'Simulador de Caixa Eletrônico', um menu suspenso com opções para 'Consultar Saldo', 'Sacar' e 'Depositar',
// um campo de entrada onde o cliente possa inserir o valor da transação e um botão 'Realizar'.
// O resultado da operação deve ser exibido em um parágrafo.

// Use JavaScript para implementar as ações selecionadas.
// Defina um saldo inicial fictício de R$ 1000. Certifique-se de que o código trate erros, como valores inválidos e saldos insuficientes.

let saldo = 1000;
const consultarSaldo = document.querySelector("#consultar");
const sacar = document.querySelector("#sacar");
const depositar = document.querySelector("#depositar");
const saldo_txt = document.querySelector("#saldo_txt");
const mensagem = document.querySelector("#mensagem")
const valorInput = document.querySelector("#valorInput")



consultarSaldo.addEventListener("click", (e) => {
    e.preventDefault();
    if (consultarSaldo.textContent === "Mostrar Saldo"){
        // saldo_txt.textContent.style.display = "block"
        saldo_txt.textContent = `R$ ${saldo.toFixed(2)}`;
        consultarSaldo.textContent = "Esconder Saldo"
    }else{
        saldo_txt.textContent = "••••"
        consultarSaldo.textContent = "Mostrar Saldo"
    }
});


depositar.addEventListener("click", (e) => {
    e.preventDefault();
    mensagem.textContent = `Digite o valor que deseja depositar:`;
    valorInput.style.display = 'block';
    valorInput.value = "";
    valorInput.focus();

    const sacar_btn = document.querySelector("#sacar_btn")
    if (sacar_btn){
        sacar_btn.remove();
    }

    // VERIFICA SE O BOTÃO DE DEPOSITAR JÁ EXISTE, CASO NÃO O BOTÃO É CRIADO
    if (!document.querySelector("#depositar_btn")) {
        const depositar_btn = document.createElement("button")
        depositar_btn.id = "depositar_btn";
        depositar_btn.textContent = "Realizar Deposito";

        // INSERE O BOTÃO REALIZAR DEPÓSITO APÓS O INPUT DE VALOR DO USUÁRIO:
        valorInput.insertAdjacentElement('afterend', depositar_btn);

        // AO CLICAR NO BOTÃO REALIZAR DEPÓSITO, A FUNÇÃO REALIZAR DEPÓSITO É ACIONADA:
        depositar_btn.addEventListener("click", realizarDeposito);

    }

    function realizarDeposito(){
        try {
            const valor = parseFloat(valorInput.value);
            if (isNaN(valor) || valor <= 0) {
                throw new Error("Insira um valor válido para depósito.");
            }
            saldo += valor;
            saldo_txt.textContent = `R$ ${saldo.toFixed(2)}`;
            mensagem.textContent = `Depósito no valor de R$ ${valor.toFixed(2)} realizado com sucesso!`
            // valorInput.value = "";

            // REMOVE O BOTÃO REALIZAR DEPOSITO APÓS A TRANSAÇÃO CONCLUIDA
            const depositar_btn = document.querySelector("#depositar_btn");
            if (depositar_btn) {
                depositar_btn.remove();
            }

            valorInput.style.display = "none";

        }
        catch (error) {
            mensagem.textContent = error.message;
        }

    };

});


sacar.addEventListener("click", (e) => {
    e.preventDefault();
    mensagem.textContent = "Digite o valor que deseja sacar:"
    valorInput.style.display = 'block';
    valorInput.value = ''
    valorInput.focus();

    const depositar_btn = document.querySelector("#depositar_btn")
    if(depositar_btn){
        depositar_btn.remove();
    }

    // VERIFICA SE O BOTÃO DE SACAR JÁ EXISTE, CASO NÃO O BOTÃO É CRIADO
    if (!document.querySelector("#sacar_btn")){
        const sacar_btn = document.createElement("button")
        sacar_btn.id = "sacar_btn";
        sacar_btn.textContent = "Realizar Saque";

        valorInput.insertAdjacentElement('afterend', sacar_btn);

        sacar_btn.addEventListener("click", realizarSaque);
    }

    function realizarSaque() {
        try {
            const valor = parseFloat(valorInput.value);
            if (isNaN(valor) || valor <= 0) {
                mensagem.textContent = "Digite um valor válido para deposito"
                // throw new Error("INSIRA UM VALOR VÁLIDO PARA DEPÓSITO.");
            } else {
                if (valor > saldo) {
                    mensagem.textContent = `SALDO INSUFICIENTE PARA REALIZAR SAQUE!`
                } else {
                    saldo -= valor;
                    saldo_txt.textContent = `R$ ${saldo.toFixed(2)}`;
                    mensagem.textContent = `Saque no valor de R$ ${valor.toFixed(2)} realizado com sucesso!`
                }
            }
            
            // REMOVE O BOTÃO REALIZAR DEPOSITO APÓS A TRANSAÇÃO CONCLUIDA
            const sacar_btn = document.querySelector("#sacar_btn");
            if (sacar_btn) {
                sacar_btn.remove();
            }

            valorInput.style.display = "none";

        } catch (error) {
            mensagem.textContent = error.message;
        }

    };

});

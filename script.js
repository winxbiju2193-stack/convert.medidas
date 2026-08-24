// Função para alternar entre os conversores pelo menu geral
function mudarConversor(tipo) {
    const botoes = document.querySelectorAll('.btn-menu');
    const paineis = document.querySelectorAll('.painel');

    botoes.forEach(btn => btn.classList.remove('ativo'));
    paineis.forEach(painel => painel.classList.remove('ativo'));

    if (tipo === 'temperatura') {
        document.querySelector('.menu-selecao button:nth-child(1)').classList.add('ativo');
        document.getElementById('painel-temperatura').classList.add('ativo');
    } else if (tipo === 'distancia') {
        document.querySelector('.menu-selecao button:nth-child(2)').classList.add('ativo');
        document.getElementById('painel-distancia').classList.add('ativo');
    }
}

// Lógica de Conversão de Temperatura
function converterTemperatura() {
    const valor = parseFloat(document.getElementById('valor-temp').value);
    const de = document.getElementById('de-temp').value;
    const para = document.getElementById('para-temp').value;
    const resultadoEl = document.getElementById('resultado-temp');

    if (isNaN(valor)) {
        resultadoEl.textContent = '--';
        return;
    }

    let celsius;

    // Converter entrada para Celsius como base
    if (de === 'celsius') {
        celsius = valor;
    } else if (de === 'fahrenheit') {
        celsius = (valor - 32) * (5 / 9);
    } else if (de === 'kelvin') {
        celsius = valor - 273.15;
    }

    let resultado;

    // Converter de Celsius para a unidade de destino
    if (para === 'celsius') {
        resultado = celsius;
    } else if (para === 'fahrenheit') {
        resultado = (celsius * 9 / 5) + 32;
    } else if (para === 'kelvin') {
        resultado = celsius + 273.15;
    }

    resultadoEl.textContent = resultado.toFixed(2) + ' ' + obterSimboloTemp(para);
}

function obterSimboloTemp(unidade) {
    if (unidade === 'celsius') return '°C';
    if (unidade === 'fahrenheit') return '°F';
    if (unidade === 'kelvin') return 'K';
    return '';
}

// Lógica de Conversão de Distância (Base em Metros)
const taxasDistancia = {
    metro: 1,
    quilometro: 1000,
    centimetro: 0.01,
    milimetro: 0.001,
    milha: 1609.34,
    jarda: 0.9144
};

function converterDistancia() {
    const valor = parseFloat(document.getElementById('valor-dist').value);
    const de = document.getElementById('de-dist').value;
    const para = document.getElementById('para-dist').value;
    const resultadoEl = document.getElementById('resultado-dist');

    if (isNaN(valor)) {
        resultadoEl.textContent = '--';
        return;
    }

    // Converter entrada para metros
    const valorEmMetros = valor * taxasDistancia[de];

    // Converter de metros para a unidade de destino
    const resultado = valorEmMetros / taxasDistancia[para];

    resultadoEl.textContent = resultado.toLocaleString('pt-BR', { maximumFractionDigits: 4 }) + ' ' + obterSimboloDist(para);
}

function obterSimboloDist(unidade) {
    const simbolos = {
        metro: 'm',
        quilometro: 'km',
        centimetro: 'cm',
        milimetro: 'mm',
        milha: 'mi',
        jarda: 'yd'
    };
    return simbolos[unidade] || '';
}
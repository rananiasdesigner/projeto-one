//animação de texto
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Criatividade", "Desafios", "Empenho", "Aprendizagem"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});

var botaoCriptografar = document.querySelector("#btn-cripto");
botaoCriptografar.addEventListener("click", function (event) {
	event.preventDefault();

	var inserirTexto = document.querySelector("#input-texto");
	
	var texto = inserirTexto.value;

	var erros = validaTexto(texto);
	
	if (erros.length > 0) {
		exibeMensagemDeErro(erros);
		return;
	}
	var textoCriptografado = codificador(texto);

	var mensagemCriptografada = document.querySelector("#msg");
	mensagemCriptografada.value = textoCriptografado;

	inserirTexto.value = "";

	var mensagensErro = document.querySelector("#mensagens-erro");
	mensagensErro.innerHTML = "";
	
});

function validaTexto(texto) {
	var erros = [];
	/*var acentos = new RegExp("áàãâäéèêëíìîïóòõôöúùûüÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜ");*/
	if (/[A-Z]/.test(texto)) {
		erros.push("O texto não pode conter letras maiúsculas");
	}
	if (texto.length == 0) {
		erros.push("O texto não pode ficar em branco");
	}
	if (/[0-9]/.test(texto)) {
			erros.push("O texto não pode conter números");
	}
	if (/[áàãâäéèêëíìîïóòõôöúùûüÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜ]/.test(texto)) {
			erros.push("O texto não pode conter acentos");
	}
	return erros;	
}

function exibeMensagemDeErro(erros) {
		var ul = document.querySelector("#mensagens-erro");
		ul.innerHTML ="";

		erros.forEach(function(erro){
			var li = document.createElement("li");
			li.textContent = erro;
			ul.appendChild(li);
		});
}
function codificador(texto) {
	
	texto = texto.split("");
	var textoCriptografado = "";

	for (var i = 0; i < texto.length; i++) {
		if(texto[i] == "e"){
			textoCriptografado += "enter";
		}else if (texto[i] == "i") {
			textoCriptografado += "imes";
		}else if (texto[i] == "a") {
			textoCriptografado += "ai";
		}else if (texto[i] == "o") {
			textoCriptografado += "ober";
		}else if (texto[i] == "u") {
			textoCriptografado += "ufat";
		}else {
			textoCriptografado += texto[i];
		}	
	}
	return textoCriptografado;	
}

var botaoDescriptografar = document.querySelector("#btn-descripto");
botaoDescriptografar.addEventListener("click", function (event) {
	event.preventDefault();
	
	var inserirTexto = document.querySelector("#input-texto");
	var texto = inserirTexto.value;

	var erros = validaTexto(texto);
	
	console.log(erros);

	if (erros.length > 0) {
		exibeMensagemDeErro(erros);
		return;
	}
	var textoDescriptografado = decodificador(texto);

	var mensagemDescriptografada = document.querySelector("#msg");
	mensagemDescriptografada.value = textoDescriptografado;

	inserirTexto.value = "";

	var mensagensErro = document.querySelector("#mensagens-erro");
	mensagensErro.innerHTML = "";	
});

function decodificador(texto) {
	
	var textoDescriptografado;
	
	textoDescriptografado = texto.replace(/enter/g, "e");
	textoDescriptografado = textoDescriptografado.replace(/imes/g, "i");
	textoDescriptografado = textoDescriptografado.replace(/ai/g, "a");
	textoDescriptografado = textoDescriptografado.replace(/ober/g, "o");
	textoDescriptografado = textoDescriptografado.replace(/ufat/g, "u");
	

	return textoDescriptografado;	
}

var botaoCopiar = document.querySelector("#btn-copy");
botaoCopiar.addEventListener('click', function(){
  navigator.clipboard.writeText(document.querySelector("#msg").value)
  
});
/* Regras Codificador: 
"e" é convertido para "enter" 
"i" é convertido para "imes"
"a" é convertido para "ai"
"o" é convertido para "ober"
"u" é convertido para "ufat"
Apenas letras minúsculas
Não permite acentuação   
*/

/* Regras Decodificador: 
"enter" é convertido para "e" 
"imes" é convertido para "i"
"ai" é convertido para "a"
"ober" é convertido para "o"
"ufat" é convertido para "u"
Apenas letras minúsculas
Não permite acentuação     
*/
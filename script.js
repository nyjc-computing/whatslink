'use strict';

function copyToClipboard() {

}

function wa_numbers() {
    let element = document.getElementById("wa_number");
    if (element.value === "") {
        return new Array();
    } else {
        return element.value.split("\n");
    }
}

function wa_text() {
    let element = document.getElementById("message");
    return element.value;
}

function prependMobile(num) {
    // add 65 in front of number if it is valid SG mobile number
    // not handling other region moble number yet
    if (num.length === 8 && (num.startsWith("8") || num.startsWith("9"))) {
        return '65' + num;
    } else {
        return num
    }
}

function makeWameLink (num, text) {
    // generate wa.me link from num & text
    let link = "https://wa.me/";
    if (num !== "") {
        link += prependMobile(num);
    }
    if (text !== "") {
        link += '?';
        link += 'text=';
        link += encodeURIComponent(text);
    }
    return link;
}

function makeWebLink (num, text) {
    // generate WhatsApp Web link from num & text
    let sep = "?";
    let link = "https://web.whatsapp.com/send";
    if (num !== "") {
        link += sep; sep = "&";
        link += "phone="
        link += prependMobile(num);
    }
    if (text !== "") {
        link += sep; sep = "&";
        link += 'text=';
        link += encodeURIComponent(text);
    }
    return link;
}

function makeLink(input) {
    let num = input.has('number') ? input.get('number') : ""
    let text = input.has('text') ? input.get('text') : ""
   if (document.getElementById("wame").checked) {
        return makeWameLink(num, text);
    } else if (document.getElementById("web").checked) {
        return makeWebLink(num, text);
    }
}

function addLink(link) {
    let target = document.getElementById("wa_links");
    let element = document.createElement("DIV");
    let it = document.createElement("A");
    it.setAttribute("href", link)
    it.setAttribute("target", "_blank");
    it.innerHTML = link;
    element.appendChild(it);
    target.appendChild(element);
}

function generate() {
    document.getElementById("wa_links").innerHTML = "";
    let numbers = wa_numbers();
    let input = new Map();
    if (wa_text() !== "") {
        input.set('text', wa_text());
    }
    if (numbers.length > 0) {
        for (const num of numbers) {
            input.set('number', num);
            addLink(makeLink(input));
        }
    } else {
        addLink(makeLink(input));
    }
}

function clearLinks() {
    document.getElementById("wa_links").innerHTML = "";
    document.getElementById("message").value = "";
    document.getElementById("wa_number").value = "";
  }
  
const $ = document.querySelector.bind(document);

function showImage(event)
{
    var breed = this.innerText;
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(r => r.json)
    .then(data => console.log( data));
}

function createButton(txt)
var btn = document.createElement('button');
btn.innerText = txt;
$('#buttons').appendChild(btn);
btn.onclick = showImage;

window.onload = function()
{
    this.fetch(`https://dog.ceo/api/breeds/list/all`)
    .then(r=>r.json())
    .then(data => {
        Object.keys(data.message)
        .forEach(createButton);
    });
}
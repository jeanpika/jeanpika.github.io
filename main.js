const $ = document.querySelector.bind(document);

function showImage(event)
{
    var breed = this.innerText;
    var priorSelected = $('.selected');
    if(priorSelected){
        priorSelected.className= '';
    }
    this.className = 'selected';
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(r => r.json())
    .then(data => {
        console.log(data.message, breed)
        $('#dog').src = data.message;
    });

}

function createButton(txt)
{
    var btn = document.createElement('button');
    btn.innerText = txt;
    $('#buttons').appendChild(btn);
    btn.onclick = showImage;
}

function createComment( commentDoc ){
    var div = document.createElement('div');
    div.innerText = commentDoc.comment;
    $('#comments').appendChild(div);
    div.className = 'comment';
}

window.onload = function()
{
    this.fetch(`https://dog.ceo/api/breeds/list/all`)
    .then(r=>r.json())
    .then(data => {
        Object.keys(data.message)
        .forEach(createButton);
    });

     // check if user is logged in
     onLogin( user => {
        if(user){
            //user just logged in
            $('#addCommentDiv').style.display = 'block';
            $('#loginDiv').style.display = 'none';
            $('#signupDiv').style.display = 'none';
        }else{
            //user just logged out
            $('#loginDiv').style.display = 'block';
            $('#addCommentDiv').style.display = 'none';
        }
    });

        // show comments
        forEachComment( createComment );


    $('#loginLink').onclick = function(){
        $('#loginDiv').style.display = 'block';
        $('#signupDiv').style.display = 'none';
    }

    $('#signUpLink').onclick = function(){
        $('#loginDiv').style.display = 'none';
        $('#signupDiv').style.display = 'block';
    }

    $('#slattbratha').onclick = function(){
        logout();
    }

    $('#loginBtn').onclick = function(){
        login($('#email').value, $('#password').value)
        .catch(err => $('.error').innerText =err.message);
    }

    $('#registerBtn').onclick = function(){
        signup( $('#emailReg').value, $('#passwordReg').value )
        .catch( err => $('.error').innerText = err.message );
    }

    $('#addCommentBtn').onclick = function(){
        addComment( $('#newComment').value )
        .then( () => {
            createComment({comment: $('#newComment').value});
            $('#newComment').value = '';
        })
        .catch( err => $('.error').innerText = err.message )
    }
}
window.onload = function() {
    let site, pass;
    let size = 4;
    createField(size);
    document.getElementById('site').addEventListener('input', function(){
        site = this.value;
    })
    document.getElementById('password').addEventListener('input', function(){
        pass = this.value;
    })
    document.getElementById('savePass').addEventListener('click', function(){setPassword(site, pass)});
};

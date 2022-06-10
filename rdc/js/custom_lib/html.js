var select = function (elementSelectorCSS, AllElements) {
    elementSelectorCSS.trim();
    return (AllElements) ? document.querySelectorAll(elementSelectorCSS) : document.querySelector(elementSelectorCSS);
};

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

(function(global, x){
    var searchMtrlButton  = select('#search_mtrl');
    var saveButton        = select('#save');
    var codeField         = select('#code');
    var searchMessageArea = select('.message');
    var Html5Field        = select('#html');
    var productId         = 0;
    var getMtrl = function (code){
        var ds=x.GETSQLDATASET("SELECT TOP 1 * FROM Mtrl WHERE COMPANY="+x.SYS.COMPANY+" AND Code='"+code+"';");
        if (ds.RECORDCOUNT>0) {
            return ds.Mtrl;
        }
        return 0;
    };
    var updateHTML5Mtrl = function(id, HtmlField, HtmlText ){
        try{
            alert(HtmlText.replace("'","''",'g'));
            var sql = "UPDATE Mtrl SET "+ HtmlField +"='"+HtmlText.replace("'","''",'g')+"' WHERE SODTYPE=51 AND COMPANY="+x.SYS.COMPANY+" AND Mtrl="+id+";";
            alert(sql);
            x.RUNSQL(sql);
            searchMessageArea.textContent = 'Html Field Updated to Mtrl'+id;
            return 1;
        }
        catch (e){
            return e.message;
        }

    };
    var checkCodeField = function (){
        if (searchMessageArea.textContent.length>1){
            searchMessageArea.textContent = '';
            searchMessageArea.classList.remove('alert-danger');
        }
        if(codeField.value.length === 0) {
            searchMessageArea.textContent = 'The code input must not be empty';
            searchMessageArea.classList.add('alert-danger');
            searchMtrlButton.classList.add('disabled');
        } else {
            searchMtrlButton.classList.remove('disabled');
        }
    };
    var lookInsideS1 = function (evt) {
        if( searchMtrlButton.classList.contains('disabled')){
            checkCodeField();
        }
        else {
            evt.preventDefault();
            if ((codeField.value).trim()){
              productId = getMtrl(codeField.value);
              if (parseInt(productId)>0) {
                  searchMessageArea.classList.add('alert-success');
                  searchMessageArea.textContent = 'i located the item in SoftOne with Mtrl='+productId;
              }
              else {
                  searchMessageArea.classList.add('alert-danger');
                  searchMessageArea.textContent = 'Couldn\'t locate the sku on SoftOne';
              }
            }
        }
    };
    var saveHTMLToDB = function(evt) {
        if( searchMtrlButton.classList.contains('disabled')){
            checkCodeField();
        }
        else{
            evt.preventDefault();
            var xe = updateHTML5Mtrl(productId, 'CCC1007ShortDescr', Html5Field.value.toString());
            alert(xe);
        }
    };

    document.addEventListener("DOMContentLoaded", function (){
        codeField.addEventListener('blur',checkCodeField);
        searchMtrlButton.addEventListener("click", lookInsideS1);
        saveButton.addEventListener("click", saveHTMLToDB);
    });
})(window, external);
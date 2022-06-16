var select = function (elementSelectorCSS, AllElements) {
    elementSelectorCSS.trim();
    return (AllElements) ? document.querySelectorAll(elementSelectorCSS) : document.querySelector(elementSelectorCSS);
};
// function htmlEntities(str) {
//     return String(str)
//         .replace(/&/g, '&amp;')
//         .replace(/</g, '&lt;')
//         .replace(/>/g, '&gt;')
//         .replace(/"/g, '&quot;');
// }
(function(global, x){
    var searchMtrlButton  = select('#search_mtrl');
    var saveButton        = select('#save');
    var codeField         = select('#code');
    var searchMessageArea = select('.message ');
    var Html5ShortDescr   = select('#htmlShort');
    var Html5LongDescr    = select('#htmlLong');
    var productId         = 0;
    var getMtrl = function (code){
        try{
            var ds=x.GETSQLDATASET("SELECT TOP 1 * FROM Mtrl WHERE COMPANY="+x.SYS.COMPANY+" AND Code='"+code+"';");
            if (ds.RECORDCOUNT>0) {
                return ds.Mtrl;
            }
        }
        catch (e) {
            return e.message;
        }
        return 0;
    };
    var getHTML5 = function (id, HtmlField){
        try{
            var ds=x.GETSQLDATASET("SELECT "+ HtmlField +" AS Html FROM Mtrl WHERE SODTYPE=51 AND COMPANY="+x.SYS.COMPANY+" AND Mtrl="+id+";");
            if (ds.RECORDCOUNT>0) {
                return ds.html;
            }
        }
        catch (e) {
            return e.message;
        }
        return 0;
    };
    var updateHTML5Mtrl = function(id, HtmlField, HtmlText ){
        try{
            var sql = "UPDATE Mtrl SET "+ HtmlField +"=:1 WHERE SODTYPE=51 AND COMPANY="+x.SYS.COMPANY+" AND Mtrl="+id+";";
            x.RUNSQL(sql, (HtmlText));
            searchMessageArea.textContent = 'Html Field Updated to Mtrl'+id;
            return 1;
        }
        catch (e){
            return e.message;
        }

    };
    var checkCodeField = function (){
        if(codeField.value.length === 0) {
            searchMessageArea.classList.add('alert-enable');
            searchMessageArea.textContent = 'The code input must not be empty';
            searchMessageArea.classList.add('alert-danger');
            searchMtrlButton.classList.add('disabled');
            saveButton.classList.add('disabled');
        }
        else if (searchMessageArea.textContent.length>1){
            searchMessageArea.textContent = '';
            searchMessageArea.classList.remove('alert-danger');
            searchMessageArea.classList.remove('alert-success');
            searchMessageArea.classList.remove('alert-enable');
        } else {
            searchMtrlButton.classList.remove('disabled');
            saveButton.classList.remove('disabled');
        }
    };
    var lookInsideS1 = function (evt) {
        if(searchMtrlButton.classList.contains('disabled')){
            checkCodeField();
        }
        else {
            evt.preventDefault();
            if ((codeField.value).trim()){
              productId = getMtrl(codeField.value);
              if (parseInt(productId)>0) {
                  searchMessageArea.classList.add('alert-enable');
                  searchMessageArea.classList.add('alert-success');
                  searchMessageArea.textContent = 'Item Located in SoftOne with Mtrl='+productId;
                  var ObjectShort = Object.getOwnPropertyNames(Html5ShortDescr)[1];
                  Html5ShortDescr[ObjectShort].wysihtml5.editor.setValue(getHTML5(productId,'CCC1007ShortDescr'));
                  var ObjectLong = Object.getOwnPropertyNames(Html5LongDescr)[1];
                  Html5LongDescr[ObjectLong].wysihtml5.editor.setValue(getHTML5(productId,'CCC1007LongDescr'));
              }
              else {
                  searchMessageArea.classList.add('alert-enable');
                  searchMessageArea.classList.add('alert-danger');
                  searchMessageArea.textContent = 'Couldn\'t locate the sku on SoftOne';
              }
            }
        }
    };
    var saveHTMLToDB = function(evt) {
        if(searchMtrlButton.classList.contains('disabled') || saveButton.classList.contains('disabled') ){
            checkCodeField();
        }
        else{
            evt.preventDefault();
            if (productId === 0){
                checkCodeField();
                searchMessageArea.classList.add('alert-enable');
                searchMessageArea.classList.add('alert-danger');
                searchMessageArea.textContent = "The Html wasn't saved because sku doesn't exist.";
            }
            else{
                var updateShort = updateHTML5Mtrl(productId, 'CCC1007ShortDescr', Html5ShortDescr.value.toString());
                var updateLong = updateHTML5Mtrl(productId, 'CCC1007LongDescr', Html5LongDescr.value.toString());
                if (updateShort === 1 || updateLong === 1) {
                    searchMessageArea.classList.add('alert-enable');
                    searchMessageArea.classList.add('alert-success');
                    searchMessageArea.textContent = "The Html was saved on product's view";
                }
                else{
                    checkCodeField();
                    searchMessageArea.classList.add('alert-enable');
                    searchMessageArea.classList.add('alert-danger');
                    searchMessageArea.textContent = "The Html wasn't saved.";
                }
            }
        }
    };
    document.addEventListener("DOMContentLoaded", function (){
        codeField.addEventListener('blur',checkCodeField);
        searchMtrlButton.addEventListener("click", lookInsideS1);
        saveButton.addEventListener("click", saveHTMLToDB);
    });
})(window, external);
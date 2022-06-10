var select = function(elementSelectorCSS, AllElements ){
    elementSelectorCSS.trim();
    return (AllElements) ? document.querySelectorAll(elementSelectorCSS) : document.querySelector(elementSelectorCSS);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var userName = select('.user-name');
userName.textContent = 'hi';
////////////////////////////////////////////////////////////////
// (function(global){
//     // var x = external;
//     //
//     // var userName = document.querySelector('.user-name');
//     //
//     // var ds = x.GETSQLDATASET("SELECT NAME FROM COMPANY WHERE COMPANY="+x.SYS.COMPANY);
//     // userName.textContent = ds.NAME;
//     //
//     // function getProduct(){
//     //     var products = {};
//     //
//     //     var ds = x.GETSQLDATASET("SELECT * FROM CCCT1007SWMtrl WHERE RunId=0");
//     //     if (ds.RECORDCOUNT>0) {
//     //         ds.first;
//     //         while(!ds.EOF){
//     //             var temp = {};
//     //             temp.id   = ds.Mtrl;
//     //             temp.name = ds.Name;
//     //             temp.sku  = ds.Code;
//     //             temp.updatedDate = ds.Trfdate;
//     //             temp.firstSentDate = ds.TrffDate;
//     //             products.push(temp);
//     //             ds.next;
//     //         }
//     //     }
//     //     return products;
//     // }
//
//
//
// })(window);
// var products = [
//     [
//         id:1,
//         code: 'abc',
//         name: 'test1'
//     ],
//     [
//         id:2,
//         code: 'abc2',
//         name: 'test2'
//     ]
// ];
// var table = select('#swmtrl');
//
//
//
// function buildProductsTableHTML(products, table){
//     var tableBody = table.getElementsByTagName('tbody')[0];
//     for(var product in products){
//         var newTR = document.createElement('tr');
//         for(var i=0; i<product.length; i++){
//             var newTd = document.createElement('td');
//             td.textContent = product
//         }
//
//
//
//     }
// }
(function(global){
    var x = external;
    var userName = document.querySelector('.user-name');
    userName.textContent = 'dasdas';

    var sql = "SELECT NAME FROM COMPANY WHERE COMPANY=1001";
    var ds = x.GETSQLDATASET(sql, x.SYS.COMPANY);
    userName.textContent = ds.NAME;
})(window);
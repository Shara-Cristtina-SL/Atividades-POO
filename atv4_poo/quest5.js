function exibir() {
    var strings = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        strings[_i] = arguments[_i];
    }
    strings.forEach(function (str) {
        console.log(str);
    });
}
exibir("a", "ab", "abc");
exibir("a", "b");
exibir("a1");
exibir("1", "2", "3", "4", "5");

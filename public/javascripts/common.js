function page_move(url, some_data) {
    let form = document.createElement("form");
    let parm = new Array();
    let input = new Array();

    form.action = url;
    form.method = "post";

    // parm.push( ['some_key1', 'some_value1'] );
    // parm.push( ['some_key2', 'some_value2'] );
    parm.push( ['some_data', JSON.stringify(some_data)] );

    for (var i = 0; i < parm.length; i++) {
        input[i] = document.createElement("input");
        input[i].setAttribute("type", "hidden");
        input[i].setAttribute('name', parm[i][0]);
        input[i].setAttribute("value", parm[i][1]);
        form.appendChild(input[i]);
    }

    document.body.appendChild(form);
    form.submit();
}

// <a href="#" onclick="javascript:page_move('http://httpbin.org/post', 'foobar');">click</a>
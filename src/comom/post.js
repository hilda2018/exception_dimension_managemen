

// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
const obj2params = (obj) =>  {
    let result = '';
    let item;
    for (item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }

    if (result) {
        result = result.slice(1);
    }

    return result;
};


// 发送 post 请求
export  const  post = (url, paramsObj) => {
    console.log(JSON.stringify(paramsObj));
    const result = fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: obj2params(paramsObj)
    });

    return result;
};

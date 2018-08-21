const getToken = (c) => {
    const d = {};
    const cookies =  c.split(';');
    if (cookies && cookies.length > 0) {
        cookies.forEach((e) => {
            const item = e.split('=');
            d[item[0].trim()] = item[1];
        });
        return d.token;
    } else {
        return undefined;
    }
};

export default getToken;

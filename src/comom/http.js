import getToken from './getToken';

export const http = (url, form) => {
    const options = { method: 'POST', credentials: 'same-origin' };

    let formData = form;

    if (!formData) {
        formData = new FormData();
    }

    const token = getToken(document.cookie);
    if (token) {
        formData.append('token', token);
    }

    formData.append('app', '1');
    formData.append('fp-timestamp-ext', Math.random() * 100000000000000000);
    options.body = formData;

    return fetch(url, options)
        .then((res) => res.json())
        .then((ret) => {
            if (!ret.result && ret.expired) {
                if (window.location.hostname === 'wwwtest.freshport.com') {
                    top.location.href =
                        'https://wwwtest.freshport.com/fp-online-infoshow/member/login';
                } else if (window.location.hostname === '118.31.6.143') {
                    top.location.href = 'http://118.31.6.143/pages/account/login.jsp';
                } else {
                    top.location.href = 'https://www.freshport.com/fp-online-infoshow/member/login';
                }
            }
            return ret;
        });
};

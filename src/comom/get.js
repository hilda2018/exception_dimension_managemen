

export const  get = (url) =>  {
    const result = fetch(url, {
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*'
        }
    });

    return result;
};



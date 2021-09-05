import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const url = 'http://localhost:8080/accounts/register';
    const payload = JSON.stringify({
        fullname: "testLoad",
        email: "testLoad@gmail.com",
        password: "123456",
        confirm_password: "123456"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    http.post(url, payload, params);

}


export let options = {
    vus: 1,
    duration: '5s',
    // thresholds: {
    //     'failed requests': ['rate<0.02'],
    //     http_req_duration: ['p(95)<500'],
    //     http_reqs: ['count>6000']
    // },
};
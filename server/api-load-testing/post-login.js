import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const url = 'http://localhost:8080/accounts/login';
    const payload = JSON.stringify({
        email: "string@gmail.com",
        password: "123456"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params);
    check(response, {
        "is status 200": (r) => r.status === 200,
    })
}


export let options = {
    vus: 20,
    duration: '5s',
    // thresholds: {
    //     'failed requests': ['rate<0.02'],
    //     http_req_duration: ['p(95)<500'],
    //     http_reqs: ['count>6000']
    // },
};
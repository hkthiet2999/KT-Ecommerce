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
        "is generated token": r.json('token') !== ''
    })
}


// export let options = {
//     vus: 20,
//     duration: '5s',
//     // thresholds: {
//     //     'failed requests': ['rate<0.02'],
//     //     http_req_duration: ['p(95)<500'],
//     //     http_reqs: ['count>6000']
//     // },
// };


export let options = {
    stages: [
        { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
        { duration: '5m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
}
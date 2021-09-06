// import http from 'k6/http';
// import { check } from 'k6';

// export default function () {
//     const google_uri = 'https://accounts.google.com/o/oauth2/v2/auth'
//     const google_body = {
//         'client_secrect': 'NuGDq8U4euU-vQB-j2VtaiqS',
//         'client_id': '498160978863-vsfnulg0j0g2v4lolbtkjth0l8dk38mh.apps.googleusercontent.com'
//     }
//     const response_google = http.post(google_uri, google_body);
//     // check(response_google, {
//     //     "is status 200": (r) => r.status === 200,
//     // })
//     const url = 'http://localhost:8080/accounts/google-login';
//     const payload = JSON.stringify({
//         token: 'ya29.a0ARrdaM-dgc_xV_mUQ6akxEzTaTisO-Nh5z2pMT4kUOuImFt-RLf9C0SaKJ1ZT3WPSTd3cplvoTY67AbifHM3UKYnXxsoZyfM6NMpAbzDiKdIQQ1wb0koz5drpzKYuZjbLl4_zsXsWJjJYN9yUBdvvC-DtZ6h'
//     });

//     const params = {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     };

//     const response = http.post(url, payload, params);

//     check(response, {
//         "is status 200": (r) => r.status === 200,
//         "is generated token": r.json('token') !== ''
//     })
// }


// export let options = {
//     vus: 20,
//     duration: '5s',
// };


// // export let options = {
// //     stages: [
// //         { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
// //         { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
// //         { duration: '5m', target: 0 }, // ramp-down to 0 users
// //     ],
// //     thresholds: {
// //         http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
// //         'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
// //     },
// // }
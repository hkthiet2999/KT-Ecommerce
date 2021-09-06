import http from 'k6/http';
import { check, group, sleep } from 'k6';

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
};

export default () => {
  const url = 'http://localhost:8080/accounts/login';
  const payload = JSON.stringify({
    email: "testLoad@gmail.com",
    password: "123456"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const loginRes = http.post(url, payload, params);

  check(loginRes, {
    'logged in successfully': (r) => r.json('token') !== '',
  });

  console.log(loginRes)

  let authHeaders = {
    headers: {
      token: `${loginRes.json('token')}`,
    },
  };

  let getAllProducts = http.get(`http://localhost:8080/products/getAll-product`, authHeaders).json();

  check(getAllProducts, { 'getAllProducts successful': (r) => r.status === true });

  sleep(1);
};

// export let options = {
//   vus: 1,
//   duration: '5s',
// };
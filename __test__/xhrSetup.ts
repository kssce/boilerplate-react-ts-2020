import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { URI_DEVICE_TOKEN } from '../src/lib/constants/api';

const mock = new MockAdapter(axios);

// [ auth ]
mock.onGet(URI_DEVICE_TOKEN).reply(200, 'Dummy token for test.');

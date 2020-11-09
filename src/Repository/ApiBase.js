import axios from 'axios';

import {ApiUrl} from '../Enums/config';

export default axios.create({
  baseURL: ApiUrl,
});

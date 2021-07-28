import {
  createAction
} from '@reduxjs/toolkit';

export const fetchSuccess = createAction<object>('QUERY_RESULT/FETCH_SUCCESS');
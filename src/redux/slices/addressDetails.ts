import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// UTU Updated GraphQL URL
const API_URL = '/api/address-details';

export interface AddressDetailsState {
  addressDetails: {
    id: string;
    status: 'Confirmed' | 'Pending' | 'Failed';
    details: string;
    address: string;
    signal: string; // e.g., '4.7 UTU Stars'
    actions: string[]; // e.g., ['Give Feedback', 'Show Feedback', 'Share']
  }[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AddressDetailsState = {
  addressDetails: [],
  status: 'idle',
  error: null,
};

// Thunk to fetch address details might need to add apollo query for the subgraph once up
export const fetchAddressDetails = createAsyncThunk(
  'addressDetails/fetchAddressDetails',
  async () => {
    const response = await axios.get(`${API_URL}`);
    // TODO Transform data here if necessary
    return response.data;
  }
);

export const addressDetailsSlice = createSlice({
  name: 'addressDetails',
  initialState,
  reducers: {
    // TODO Add reducers for handling actions here
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAddressDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddressDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // TODO Add any payload transformation if needed
        state.addressDetails = action.payload;
      })
      .addCase(fetchAddressDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

// export const {} = addressDetailsSlice.actions;

export default addressDetailsSlice.reducer;

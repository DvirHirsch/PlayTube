import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentUser: null,
	loading: false,
	error: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginStart: (state) => {
			state.loading = true;
		},
		loginSuccess: (state, action) => {
			state.loading = false;
			state.currentUser = action.payload;
		},
		loginFailure: (state) => {
			state.loading = false;
			state.error = true;
		},
		logout: (state) => {
			state.currentUser = null;
			state.loading = false;
			state.error = false;
		},
		subscription: (state, action) => {
			// if i didnt sub before and click the sub button i'll add the channel id(action.payload) inside subscribedUsers, else will do the opposite
			if (state.currentUser.subscribedUsers.includes(action.payload)) {
				state.currentUser.subscribedUsers.splice(
					state.currentUser.subscribedUsers.findIndex(
						(channelId) => channelId === action.payload
					),
					1
				);
			} else {
				state.currentUser.subscribedUsers.push(action.payload);
			}
		},
	},
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
	userSlice.actions;

export default userSlice.reducer;

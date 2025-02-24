import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    todayEvents: []
}

const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        setTodayEvents(state, action) {
            state.todayEvents = action?.payload || []
        }
    }
});


export const {setTodayEvents} = eventsSlice.actions;

export default eventsSlice.reducer;
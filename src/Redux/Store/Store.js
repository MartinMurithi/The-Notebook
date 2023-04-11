import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "../Features/Slice";

export const store = configureStore({
    reducer: {
        notes: notesSlice
    }
})

export default store;
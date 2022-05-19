import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface IUI {
    currentCard: number,
}

const initialState: IUI = {
    currentCard: 0
}


export const uiSLice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setCurrentCard: (state, action: PayloadAction<any>) => {
            state.currentCard = action.payload;
        }
    }
});

export const {
    setCurrentCard
} = uiSLice.actions;



export default uiSLice.reducer;
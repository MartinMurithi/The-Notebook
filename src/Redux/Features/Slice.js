import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../Config/Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useDispatch } from "react-redux";

const initialState = {
  loading: false,
  notesArr: [],
  error: "",
};

const dbRef = collection(db, "notes");
// const dispatch = useDispatch();

export const fetchNotes = createAsyncThunk(
  "notes/fetchnotes",
  async (_, thunkApi) => {
    try {
      const response = await getDocs(dbRef);
      const notes = response.docs.map((note) => ({
        ...note.data(),
        id: note.id,
      }));
      return notes;
    } catch (error) {
      thunkApi.rejectWithValue(error);
      console.error(error.message);
    }
  }
);

export const editNotes = createAsyncThunk(
  "edit/notes",
  async (payload, thunkApi) => {
    try {
      const note = doc(dbRef, payload.id);
      await updateDoc(note, { ...payload });
      console.log(note);
    } catch (error) {
      thunkApi.rejectWithValue(error);
      console.log(error);
    }
  }
);

export const deleteNotes = createAsyncThunk(
  "delete/notes",
  async (payload, thunkApi) => {
    try {
      let note = doc(dbRef, payload.id);
      await deleteDoc(note);
    } catch (error) {
      thunkApi.rejectWithValue(error);
      console.error(error.message);
    }
  }
);

export const addNote = createAsyncThunk(
  "add/notes",
  async (payload, thunkApi) => {
    try {
      const note = await addDoc(dbRef, { ...payload });
      console.log(note);
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNote.pending, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(addNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchNotes.pending, (state, action) => {
        state.loading = true;
        state.notes = [];
        state.error = "";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
        state.error = "";
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.notes = [];
        state.error = action.payload;
      })
      .addCase(editNotes.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(editNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(editNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteNotes.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(deleteNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default notesSlice.reducer;

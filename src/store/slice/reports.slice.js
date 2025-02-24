import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    groups: [],
    reportFilters: {},
    reportData: [],
    selectedMachines: [],
}

const reportsSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {
        setReportGroups(state, action) {
            state.groups = action?.payload || []
        },
        setReportFilters(state, action) {
            state.reportFilters = action?.payload || {}
        },

        setReportData(state, action) {
            state.reportData = action?.payload || []
        },

        toggleGroupSelect(state, action) {
            const { id: groupId, checked } = action.payload;
            const group = state.groups.find(g => g.id === groupId);

            if (!group || Object.keys(group?.__vehicles__).length === 0)
                return;

            const groupMachines = Object.values(group?.__vehicles__);

            groupMachines.forEach((machine) => {
                // const groupMachineIds = group.vehiclesIds;
                const exists = state.selectedMachines?.findIndex(selected => selected.id === machine.id)

                if (exists === -1 && checked) {
                    state.selectedMachines.push(machine);
                } else if(exists > -1 && !checked) {
                    state.selectedMachines.splice(exists, 1);
                }
            })

            group.selected = !group.selected
        },

        toggleMachineSelect(state, action) {
            const { machine } = action?.payload;

            if (!machine) return;

            const exists = state.selectedMachines?.findIndex(selected => selected?.id === machine?.id);

            if (exists === -1) {
                state.selectedMachines.push(machine);
            } else {
                state.selectedMachines.splice(exists, 1);
            }
        }
    }
});


export const { setReportFilters, setReportData, setReportGroups, toggleGroupSelect, toggleMachineSelect } = reportsSlice.actions;

export default reportsSlice.reducer;
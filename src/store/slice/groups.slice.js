import { createSlice } from '@reduxjs/toolkit'
import { getStorage, setStorage } from '../../services/LocalStorage'
import { __position_filtering, countVehicleState } from '../../services/position';

const initialState = {
  groups: [],
  cloneGroups: [],
  machines: [],
  counts: [],
  markers: [],
  isSocketConnected: false,
  updatedMachines: [],
  activeMachine: null,
}

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups(state, action) {
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        state.groups = action.payload;
        setStorage("__groups__", action.payload, 'object');
      }
    },

    setSocketConnection(state, action) {
      state.isSocketConnected = action.payload;
    },

    setPositions(state, action) {
      let groupClone = [...state.groups];
      let v = new Map(state.machines?.map((machine) => [machine.id, machine]));
      let cnt = [];

      const { positions } = action.payload;

      for (
        let positionIndex = 0;
        positionIndex < positions?.length;
        positionIndex++
      ) {
        let position = positions?.[positionIndex];

        const iotDeviceIds = getStorage("iotDeviceIds", 'object');

        // if it is not a iotDevice skip it.
        if (!iotDeviceIds?.includes(String(position?.deviceId)))
          continue;

        position = __position_filtering(position);

        // Extract Groups
        for (let groupIndex = 0; groupIndex < groupClone.length; groupIndex++) {
          const group = groupClone[groupIndex];

          if (group.__vehicles__[position.deviceId]) {

            if (!state.activeMachine) {
              state.activeMachine = group?.__vehicles__[position.deviceId];
            }

            group.__vehicles__[position.deviceId].position = position;
            v.set(position.deviceId, {
              ...group.__vehicles__[position.deviceId],
              position,
            });
          }
        }
      }

      // COUNT
      for (let groupIndex = 0; groupIndex < groupClone.length; groupIndex++) {
        const group = groupClone[groupIndex];
        cnt = cnt.concat(Object.values(group.__vehicles__));
      }

      var counts = countVehicleState(cnt);

      state.markers = positions;
      state.groups = groupClone;
      state.cloneGroups = groupClone;
      state.machines = Array.from(v.values());
      state.counts = counts;
    },

    updatePositions(state, action) {
      const _groupClone = [...state.groups];
      let vhl = [];

      const { positions } = action.payload;
      for (let index = 0; index < positions?.length; index++) {
        let position = positions[index];

        position = __position_filtering(position);

        // if it is not a iotDevice skip it.
        if (!_groupClone.vehiclesIds?.include(position?.deviceId))
          continue;

        // Check in Groups
        for (let gIndex = 0; gIndex < _groupClone.length; gIndex++) {
          const gp = _groupClone[gIndex];

          if (gp.__vehicles__[position.deviceId]) {
            gp.__vehicles__[position.deviceId].position = position;
          }
        }
      }

      // COUNT
      for (let groupIndex = 0; groupIndex < _groupClone.length; groupIndex++) {
        const group = _groupClone[groupIndex];
        vhl = vhl.concat(Object.values(group.__vehicles__));
      }

      const counts = countVehicleState(vhl);

      state.updatedMachines = positions;
      state.counts = counts;
      state.groups = _groupClone;
    },

    setActiveMachine(state, action) {
      if (action.payload) {
        state.activeMachine = action.payload;
      }
    },

    toggleGroupMarkers(state, action) {
      const groupCloneForMapMarker = JSON.parse(
        JSON.stringify([...state.groups])
      );
      const groupIndex = groupCloneForMapMarker.findIndex(
        (g) => g.id === action.payload.id
      );

      console.log(action.payload.id)

      const vcls = Object.keys(groupCloneForMapMarker[groupIndex].__vehicles__);
      groupCloneForMapMarker[groupIndex].selected = action.payload.checked;

      const ids = [];

      for (let vIndex = 0; vIndex < vcls.length; vIndex++) {
        const vehicleKey = vcls[vIndex];
        groupCloneForMapMarker[groupIndex].__vehicles__[vehicleKey].showInMap =
          action.payload.checked;
        ids.push(groupCloneForMapMarker[groupIndex].__vehicles__[vehicleKey]);
      }

      if (state?.activeMachine?.groupId === action?.payload?.id)
        state.activeMachine.showInMap = action?.payload?.checked;

      state.groups = groupCloneForMapMarker;
    }
  },
});

export const {
  setGroups,
  setPositions,
  updatePositions,
  setSocketConnection,
  setActiveMachine,
  toggleGroupMarkers } = groupSlice.actions;

export default groupSlice.reducer;
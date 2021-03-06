import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis } from "../types";

import { Action } from "./reducer";

export const setPatientList = (patientListFromApi: Patient[]): Action => ({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
export const setPatient = (patient: Patient): Action => ({ type: "SET_PATIENT", payload: patient });
export const addPatient = (newPatient: Patient): Action => ({ type: "ADD_PATIENT", payload: newPatient });
export const setDiagnosisList = (diagnosisListFromApi: Diagnosis[]): Action => ({ type: "SET_DIAGNOSIS_LIST", payload: diagnosisListFromApi });

export type State = {
  patients: { [id: string]: Patient };
  diagnosis: { [id: string]: Diagnosis }
};

const initialState: State = {
  patients: {},
  diagnosis: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

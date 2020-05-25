import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  |  {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  |  {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    };
    
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...action.payload,
            completeInfo: true,
          }
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, d) => ({ ...memo, [d.code]: d }),
            {}
          ),
          ...state.diagnosis
        }
      };
    default:
      return state;
  }
};

import axios from "axios";
import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from './types'
import { Action } from './state/reducer'
import { setPatientList, setDiagnosisList, setPatient } from "./state";

export const fetchPing = async (): Promise<any> => {
  axios.get<void>(`${apiBaseUrl}/ping`);
};

export const fetchDiagnosis = async (dispatch: React.Dispatch<Action>): Promise<any> => {
  try {
    const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
      `${apiBaseUrl}/diagnosis`
    );
    dispatch(setDiagnosisList(diagnosisListFromApi));
  } catch (e) {
    console.error(e);
  }
};

export const fetchPatientList = async (dispatch: React.Dispatch<Action>): Promise<any> => {
  try {
    const { data: patientListFromApi } = await axios.get<Patient[]>(
      `${apiBaseUrl}/patients`
    );
    dispatch(setPatientList(patientListFromApi));
  } catch (e) {
    console.error(e);
  }
};

export const fetchPatientInfo = async (id: string, dispatch: React.Dispatch<Action>): Promise<any> => {
  try {
    const { data: patientInfo } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${id}`
    );
    dispatch(setPatient(patientInfo));
  } catch (e) {
    console.error(e);
  }
};
import React, { useEffect } from "react";
import axios from "axios";
import { Container, Table, Button } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";
import { Patient } from "../types";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const patient: Patient | undefined = patients[id];

  useEffect(() => {
    
    if(!patient || !patient.completeInfo) {

      const fetchPatientInfo = async () => {
        try {
          const { data } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          console.log(data)
          dispatch(setPatient(data));
        } catch (e) {
          console.error(e);
        }
      };
      fetchPatientInfo();
    }
  }, [id, patient, dispatch]);

  if(!patient) return null;

  return (
    <div className="App">
      <Container textAlign="left">
        <h3>{patient.name}</h3>
        <div>
          ssn: {patient.ssn}
        </div>
        <div>
          occupation: {patient.occupation}
        </div>
      </Container>
    </div>
  )
}

export default PatientPage;
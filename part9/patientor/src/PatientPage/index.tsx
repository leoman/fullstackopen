import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { useStateValue } from "../state";
import { fetchPatientInfo } from '../service'
import { Patient, Entry } from "../types";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnosis }, dispatch] = useStateValue();
  const patient: Patient | undefined = patients[id];

  const findDiagnosis = (code: string) => {
    if (Object.keys(diagnosis).length) {
      return diagnosis[code].name
    }
  }
  
  const renderEntry = (entry: Entry) => {
    return (
      <div key={entry.id}>
        <p>{entry.date} {entry.description}</p>
        <ul>
          {entry.diagnosisCodes?.map(code => {
            return <li key={code}>{code} {findDiagnosis(code)}</li>
          })}
        </ul>
      </div>
    )
  }

  useEffect(() => {
    
    if(!patient || !patient.completeInfo) {
      fetchPatientInfo(id, dispatch);
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
        <br />
        <div>
          <h4>entries</h4>
          <div>
            {patient.entries.map((entry: Entry) => {
              return renderEntry(entry)
            })}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default PatientPage;
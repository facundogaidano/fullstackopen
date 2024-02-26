import { useParams } from "react-router-dom";
import { Patient, Diagnosis } from "../../types";
import { Box, Button, Container, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import CircleIcon from '@mui/icons-material/Circle';
import EntryDetails from "./EntryDetails";

interface Props {
  patients : Patient[]
  diagnoses: Diagnosis[]
}

const PatientInfo = ({ patients, diagnoses }: Props) => {
  const { id } = useParams();
  const patient = patients.find(p => p.id === id)
  let icon = null

  if (!patient) {
    return <div>Paciente no encontrado</div>;
  }

  // @ts-ignore
  if (patient.gender === 'Male') {
    icon = <MaleIcon />;
  } else {
    icon = <FemaleIcon />;
  }

  

  return (
    <>
      <Box>
        <Typography variant="h5" style={{ marginBottom: '0.5em', marginTop: '1em' }}>
          <strong>{patient.name} {icon}</strong>
        </Typography>
      </Box>
      <Container>
        <Typography variant="body1">
          SSH: {patient.ssn}
          <br />
          Occupation: {patient.occupation}
        </Typography>
      </Container>
      <Typography variant="h6" style={{ marginBottom: '0.5em', marginTop: '1em' }}>
        <strong>Entries</strong>
      </Typography>
      <Container>
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          <EntryDetails entry={entry} />
          <List>
          {(entry.diagnosisCodes || []).length >  0 && (
              <Typography variant="h6">Diagnosis codes:</Typography>
            )}
            {entry.diagnosisCodes?.flat().map((code) => {
              const diagnosis = diagnoses.find(d => d.code === code);
              return (
                <Box key={code} mb={-1}>
                  <ListItem>
                    <ListItemIcon>
                      <CircleIcon color="info" />
                    </ListItemIcon>
                    <Typography variant="body1">
                      {code}. {diagnosis ? diagnosis.name : 'Descripción desconocida'}
                    </Typography>
                  </ListItem>
                </Box>
              );
            })}
          </List>
        </div>
      ))}
      <Button variant="contained">Add new Entry</Button>
      </Container>
    </>
  )
}

export default PatientInfo
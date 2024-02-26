import { Box, Card, CardContent, Typography } from "@mui/material";
import { Entry, HealthCheckRating } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  
  const getHealthCheckIcon = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return <FavoriteIcon color="success" />;
      case HealthCheckRating.LowRisk:
        return <FavoriteIcon style={{ color: '#ffc400' }} />;
      case HealthCheckRating.HighRisk:
        return <FavoriteIcon color="warning" />;
      case HealthCheckRating.CriticalRisk:
        return <FavoriteIcon color="error" />;
    }
  }

  const getEntryType = (entry: Entry) => {
    switch (entry.type) {
      case 'Hospital':
        return <MedicalInformationIcon />
      case 'OccupationalHealthcare':
        return <WorkIcon />;
      case 'HealthCheck':
        return <MedicalServicesIcon />;
    
    }
  }

  const checkIfRating = () => {
    if ('healthCheckRating' in entry) {
      return getHealthCheckIcon(entry.healthCheckRating);
    }
  }
  

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{entry.date} {getEntryType(entry)}</Typography>
        <Typography variant="body1"><em>{entry.description}</em></Typography>
        <Box>
          {checkIfRating()}
        </Box>
        <Typography variant="body1">Diagnosed by {entry.specialist}</Typography>
      </CardContent>
    </Card>
  )
}

export default EntryDetails
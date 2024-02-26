import { Gender, NewPatientEntry, HealthCheckRating, SickLeave, Entry, OccupationalHealthcareEntry, HealthCheckEntry, HospitalEntry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect name ' + name)
  }
  return name
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date ' + date)
  }
  return date
}

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect ssn ' + ssn)
  }
  return ssn
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect ssn ' + gender)
  }
  return gender
}

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect ssn ' + occupation)
  }
  return occupation
}

const parseEntries = (entries: unknown[]): Entry[] => {
  const parsedEntries: Entry[] = [];

  entries.forEach(entry => {
    if (!entry || typeof entry !== 'object') {
      throw new Error('Incorrect or missing data');
    }

    const entryObject = entry as Record<string, unknown>;

    // Determinar el tipo de entrada basado en las propiedades del objeto
    if ('healthCheckRating' in entryObject) {
      // Asumiendo que 'healthCheckRating' es una propiedad única de HealthCheckEntry
      const healthCheckEntry: HealthCheckEntry = {
        type: "HealthCheck",
        date: entryObject.date as string,
        healthCheckRating: entryObject.healthCheckRating as HealthCheckRating,
        id: typeof entryObject.id === 'string' ? entryObject.id : 'default-id',
        description: entryObject.description as string || '', // Use provided description or an empty string
        specialist: entryObject.specialist as string || '', // Use provided specialist or an empty string
      };
      parsedEntries.push(healthCheckEntry);
    } else if ('employerName' in entryObject) {
      // Asumiendo que 'employerName' es una propiedad única de OccupationalHealthcareEntry
      const occupationalHealthcareEntry: OccupationalHealthcareEntry = {
        type: 'OccupationalHealthcare',
        date: entryObject.date as string,
        employerName: entryObject.employerName as string,
        sickLeave: {
          startDate: (entryObject.sickLeave as SickLeave).startDate as string,
          endDate: (entryObject.sickLeave as SickLeave).endDate as string,
        },
        id: "",
        description: "",
        specialist: ""
      };
      parsedEntries.push(occupationalHealthcareEntry);
    } else if ('description' in entryObject) {
      // Asumiendo que 'description' es una propiedad única de HospitalEntry
      const hospitalEntry: HospitalEntry = {
        type: 'Hospital',
        date: entryObject.date as string,
        description: entryObject.description as string,
        specialist: entryObject.specialist as string,
        diagnosisCodes: entryObject.diagnosisCodes as string[],
        discharge: {
          date: "",
          criteria: ""
        },
        id: ""
      };
      parsedEntries.push(hospitalEntry);
    } else {
      throw new Error('Invalid entry type');
    }
  });

  return parsedEntries;
};


const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }
  const objectWithEntries = object as Record<"name" | "dateOfBirth" | "ssn" | "gender" | "occupation" | "entries", unknown>;
  if ('name' in objectWithEntries && 'dateOfBirth' in objectWithEntries && 'ssn' in objectWithEntries && 'gender' in objectWithEntries && 'occupation' in objectWithEntries && 'entries' in objectWithEntries) {
    const newPatientEntry: NewPatientEntry = {
      name: parseName(objectWithEntries.name),
      dateOfBirth: parseDate(objectWithEntries.dateOfBirth),
      ssn: parseSSN(objectWithEntries.ssn),
      gender: parseGender(objectWithEntries.gender),
      occupation: parseOccupation(objectWithEntries.occupation),
      entries: Array.isArray(objectWithEntries.entries) ? parseEntries(objectWithEntries.entries) : []
    }
    return newPatientEntry
  }

  throw new Error('Incorrect data: a field missing');
}
export default toNewPatientEntry
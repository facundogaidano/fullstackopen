import { EntriesProps } from "../types"

const Entries: React.FC<EntriesProps> = ({ diary }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diary.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <label>Weather: {entry.weather}</label>
          <br />
          <label>Visibility: {entry.visibility}</label>
          <br />
          {entry.comment && <label>Comment: {entry.comment}</label>}
        </div>
      ))}
    </div>
  )
}

export default Entries
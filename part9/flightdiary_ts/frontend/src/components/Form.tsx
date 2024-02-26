import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

interface FormProps {
  onSubmit: (entry: NewDiaryEntry) => void
}


const Form = ({ onSubmit }: FormProps) => {
  const [formData, setFormData] = useState<NewDiaryEntry>({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData({
      date: '',
      weather: Weather.Sunny,
      visibility: Visibility.Great,
      comment: '',
    })
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </label>
        <br />
        <label>
          Visibility:
            <label>
              <input type="radio" value="great" name="visibility" onChange={handleChange} defaultChecked />Great
            </label>
            <label>
              <input type="radio" value="good" name="visibility" onChange={handleChange} />Good
            </label>
            <label>
              <input type="radio" value="ok" name="visibility" onChange={handleChange} />Ok
            </label>
            <label>
              <input type="radio" value="poor" name="visibility" onChange={handleChange} />Poor
            </label>
        </label>
        <br />
        <label>
          Weather:
            <label>
              <input type="radio" value="sunny" name="weather" defaultChecked onChange={handleChange} />Sunny
            </label>
            <label>
              <input type="radio" value="rainy" name="weather" onChange={handleChange} />Rainy
            </label>
            <label>
              <input type="radio" value="cloudy" name="weather" onChange={handleChange} />Cloudy
            </label>
            <label>
              <input type="radio" value="stormy" name="weather" onChange={handleChange} />Stormy
            </label>
            <label>
              <input type="radio" value="windy" name="weather" onChange={handleChange} />Windy
            </label>
        </label>
        <br />
        <label>
          Comment <input type="text" name="comment" value={formData.comment} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default Form
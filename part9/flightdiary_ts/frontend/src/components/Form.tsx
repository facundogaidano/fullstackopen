import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

interface FormProps {
  onSubmit: (entry: NewDiaryEntry) => void;
}


const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<NewDiaryEntry>({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: '',
  });

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      date: event.target.value,
    }));
  };

  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWeather = event.target.value as Weather;
    setFormData(prevState => ({
      ...prevState,
      weather: newWeather,
    }));
  };

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVisibility = event.target.value as Visibility;
    setFormData(prevState => ({
      ...prevState,
      visibility: newVisibility,
    }));
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      comment: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData({
      date: '',
      weather: Weather.Sunny,
      visibility: Visibility.Great,
      comment: '',
    })
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date <input type="date" name="date" value={formData.date} onChange={handleDateChange} />
        </label>
        <br />
        <label>
          Visibility:
            <label>
              <input type="radio" value="great" name="visibility" onChange={handleVisibilityChange} defaultChecked />Great
            </label>
            <label>
              <input type="radio" value="good" name="visibility" onChange={handleVisibilityChange} />Good
            </label>
            <label>
              <input type="radio" value="ok" name="visibility" onChange={handleVisibilityChange} />Ok
            </label>
            <label>
              <input type="radio" value="poor" name="visibility" onChange={handleVisibilityChange} />Poor
            </label>
        </label>
        <br />
        <label>
          Weather:
            <label>
              <input type="radio" value="sunny" name="weather" defaultChecked onChange={handleWeatherChange} />Sunny
            </label>
            <label>
              <input type="radio" value="rainy" name="weather" onChange={handleWeatherChange} />Rainy
            </label>
            <label>
              <input type="radio" value="cloudy" name="weather" onChange={handleWeatherChange} />Cloudy
            </label>
            <label>
              <input type="radio" value="stormy" name="weather" onChange={handleWeatherChange} />Stormy
            </label>
            <label>
              <input type="radio" value="windy" name="weather" onChange={handleWeatherChange} />Windy
            </label>
        </label>
        <br />
        <label>
          Comment <input type="text" name="comment" value={formData.comment} onChange={handleCommentChange} />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default Form
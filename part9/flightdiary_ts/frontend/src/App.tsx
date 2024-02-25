import { useEffect, useState } from "react"
import { DiaryEntry, NewDiaryEntry } from "./types"

import { createDiaryEntry, getAllDiaries } from "./services/diaryService"
import Form from "./components/Form"
import Entries from "./components/Entries"

const App = () => {
  const [diary, setDiary] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiary(data)
    })
  }, [])

  const diaryCreation = (entry: NewDiaryEntry) => {
    createDiaryEntry(entry).then(data => {
      setDiary(diary.concat(data));
    });
  };

  return (
    <div>
      <h1>Hello World!</h1>
      <Form onSubmit={diaryCreation} />
      <Entries diary={diary} />
    </div>
  )

}

export default App

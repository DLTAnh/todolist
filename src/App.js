import { useState, useRef } from "react";
import { FaPenSquare, FaTrash } from "react-icons/fa"

function App() {

  const [date, setDate] = useState('')

  const storageJobs = JSON.parse(localStorage.getItem(`${date}`));

  const [job, setJob] = useState('')
  const [jobs, setJobs] = useState([]);
  const [update, setUpdate] = useState('');
  const [indexJob, setIndexJob] = useState(0);
  const inputRef = useRef()
  const updateRef = useRef()


  const handleSubmit = () => {
    if (date === '') {
      alert('Bạn chưa chọn ngày')
    }
    else {
      setJobs(prev => {
        const newJobs = [...prev, job]

        const jsonJobs = JSON.stringify(newJobs)
        localStorage.setItem(`${date}`, jsonJobs)

        return newJobs
      })
      setJob('')
      inputRef.current.focus()
    }
    
  }

  const handleChooseDate = () => {
    console.log(date);
    console.log(storageJobs);
    setJobs(storageJobs ?? [])
  }

  const handleUpdate = (e) => {
    setIndexJob(e)
    setUpdate(storageJobs[e])
    updateRef.current.focus()
  }

  const handleChange = () => {
    const newJobs = [...storageJobs]
    console.log(newJobs)
    console.log(indexJob)
    newJobs[indexJob] = update
    console.log(newJobs)

    setJobs( ()=>{
      const jsonJobs = JSON.stringify(newJobs)
      localStorage.setItem(`${date}`, jsonJobs)

      return newJobs
    })
    setUpdate('')
  }

  const handleRemove = (e) => {
    const newJobs = [...storageJobs]

    newJobs.splice(e, 1)

    setJobs(() => {
      const jsonJobs = JSON.stringify(newJobs)
      localStorage.setItem(`${date}`, jsonJobs)

      return newJobs
    })

  }

  return (
    <div style={{padding: '0 20px'}}>
      <label>Start date:</label>

      <input
        type="date"
        id="start"
        name="trip-start"
        value={date}
        onChange={e => setDate(e.target.value)} />
      <button onClick={handleChooseDate}>Choose Date</button>
      <label>Add Job:</label>
      <input
        ref = {inputRef}
        value={job}
        onChange={e => setJob(e.target.value)}
        placeholder = "Enter new Job"

      />
      <button onClick={handleSubmit}>Add</button>
      
      <label>Change Job:</label>
      <input
        ref={updateRef}
        value={update}
        onChange={e => setUpdate(e.target.value)}
        placeholder = "Change job"

      />
      <button onClick={handleChange}>Change</button>

      <ul>
        {jobs.map((job, index) => (
          <li key={index}>{job}
            <span style={{ cursor: "pointer" }} onClick={() => handleUpdate(index)}>
              <FaPenSquare />
            </span>
            <span onClick={() => handleRemove(index)} style={{ cursor: "pointer" }}>
              <FaTrash />
            </span>
          </li>

        ))}
      </ul>
    </div>
  )
}

export default App;
import { useState } from 'react'

type Subject = {
  name: string
  grade: string
}

const gradePoints: Record<string, number> = {
  'A': 4.0,
  'B+': 3.5,
  'B': 3.0,
  'C+': 2.5,
  'C': 2.0,
  'D+': 1.5,
  'D': 1.0,
  'F': 0.0,
  'W': 0.0,
}

const gradeOptions = Object.keys(gradePoints)

export default function GradeList() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [name, setName] = useState('')
  const [grade, setGrade] = useState('A')
  const [gpa, setGpa] = useState<number | null>(null)

  const addSubject = () => {
    if (!name.trim()) return
    setSubjects([...subjects, { name, grade }])
    setName('')
    setGrade('A')
    setGpa(null)
  }

  const removeSubject = (idx: number) => {
    setSubjects(subjects.filter((_, i) => i !== idx))
    setGpa(null)
  }

  const calculateGPA = () => {
    const validSubjects = subjects.filter(s => s.grade !== 'W')
    if (validSubjects.length === 0) {
      setGpa(0)
      return
    }
    const total = validSubjects.reduce((sum, s) => sum + gradePoints[s.grade], 0)
    setGpa(Number((total / validSubjects.length).toFixed(2)))
  }

  return (
    <div className="grade-list-container">
      <h2 className="grade-list-title">รายชื่อวิชาและเกรด</h2>
      <div className="grade-list-form">
        <input
          type="text"
          placeholder="ชื่อวิชา"
          value={name}
          onChange={e => setName(e.target.value)}
          className="grade-list-input"
        />
        <select
          value={grade}
          onChange={e => setGrade(e.target.value)}
          className="grade-list-select"
        >
          {gradeOptions.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <button className="grade-list-add-btn" onClick={addSubject}>เพิ่มรายวิชา</button>
      </div>
      <ul className="grade-list-ul">
        {subjects.map((s, idx) => (
          <li
            key={idx}
            className={`grade-list-li${s.grade === 'F' ? ' grade-list-fail' : ''}`}
          >
            <span>{s.name}</span>
            <span className="grade-list-grade">{s.grade}</span>
            <button className="grade-list-del-btn" onClick={() => removeSubject(idx)}>ลบ</button>
          </li>
        ))}
      </ul>
      <button className="grade-list-calc-btn" onClick={calculateGPA}>คำนวณ GPA</button>
      {gpa !== null && (
        <div className="grade-list-gpa">
          <strong>GPA: {gpa}</strong>
        </div>
      )}
    </div>
  )
}
import Statistics from './Statistics'

const All = ({good, neutral, bad}) => {

    const total = good + bad + neutral
  
    if (total === 0) {
      return (
        <div>
          No feedback given
        </div>
      )
    }
  
    return (
      <div>
        <Statistics text="Good" code={good} />
        <Statistics text="Neutral" code={neutral} />
        <Statistics text="Bad" code={bad} />
        <Statistics text="Total" code={total}/>
        <Statistics text="Average" code={(good - bad) / total}/>
        <Statistics text="Positive" code={(100 * good) / total}/>
      </div>
    )
  
  }

export default All;
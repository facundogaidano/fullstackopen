const Statistics = ({text, code}) => {
    return(
      <div>
        <table>
          <tbody>
            <tr>
              <td>{text}</td> 
              <td>{code}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

export default Statistics;
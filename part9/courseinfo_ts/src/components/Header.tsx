interface CourseName {
  name: string
}

const Header = (props: CourseName) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

export default Header
import { CoursePart } from "../types"

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((part, index) => (
        <div key={index}>
          {(() => {
            switch (part.kind) {
              case 'basic':
                return (
                  <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <em>{part.description}</em>
                  </div>
                )
              case 'group':
                return (
                  <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p>Group project count: {part.groupProjectCount}</p>
                  </div>
                )
              case 'background':
                return (
                  <div>
                    <p>Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a></p>
                  </div>
                )
              default:
                return null;
            }
          })()}
        </div>
      ))}
    </div>
  )
}

export default Content
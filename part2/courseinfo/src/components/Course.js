import Part from "./Part";
import Total from "./Sum";

const Course = ({course}) => {
    const total = course.parts.reduce((acc, crr) => crr.exercises + acc, 0);

    return (
        <>
            <h2>{course.name}</h2>
            {course.parts.map(item => 
                <Part part={item} key={item.id} />
            )}
            <Total total={total} />
        </>
    )
}

export default Course;
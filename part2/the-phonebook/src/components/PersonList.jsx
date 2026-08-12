const PersonList = ({searchResult, handleDelete}) => {
    return (
        <ul>
        {/*{persons.map(person => <li>{person.name}</li>)}*/}
        {searchResult.map(person => 
        <li key={person.name}>{person.name} {person.number}<button onClick={() => handleDelete(person.id)}>delete</button></li>)}</ul>
    )
}

export default PersonList
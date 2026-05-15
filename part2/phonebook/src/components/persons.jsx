import PersonDetails from "./personDetails";

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <PersonDetails
          key={person.id || person.name}
          person={person}
          deletePerson={deletePerson}
        />
      ))}
    </ul>
  );
};

export default Persons;

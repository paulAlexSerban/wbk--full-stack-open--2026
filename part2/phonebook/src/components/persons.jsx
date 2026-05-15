import PersonDetails from "./personDetails";

const Persons = ({ personsToShow }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <PersonDetails key={person.id || person.name} person={person} />
      ))}
    </ul>
  );
};

export default Persons;

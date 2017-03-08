const fs = require('fs');

fs.readFile('stuff.json', (err, buff) => {
  const data = JSON.parse(buff);
  // const people = data.people;
  const { people, anotherPerson } = data;
  
  const peopleUnder32 = people.filter((person) => {
    return person.age < 32;
  });
  console.log(peopleUnder32);

  const names = people.map((person) => {
    return person.name;
  });
  console.log(names);

  people.push(anotherPerson);
  const tom = people.pop();
  console.log(tom);

  const me = people.shift();
  console.log(me);

  people.unshift(anotherPerson);
  const tom2 = people.shift();

  const jamie = people.filter((p) => p.name == "jamie").pop();
});
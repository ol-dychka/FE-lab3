import { randomUserMock, additionalUsers } from "./FE4U-Lab3-mock.js";

// PART 1
const joinUsers = (users, usersAdditional) => {
  const courses = [
    "Mathematics",
    "Physics",
    "English",
    "Computer Science",
    "Dancing",
    "Chess",
    "Biology",
    "Chemistry",
    "Law",
    "Art",
    "Medicine",
    "Statistics",
  ];
  const coursesLength = courses.length;

  const usersFormatted = users.map((user, index) => {
    const rnd = Math.floor(Math.random() * coursesLength);

    return {
      gender: user.gender,
      title: user.name.title,
      full_name: `${user.name.first} ${user.name.last}`,
      city: user.location.city,
      state: user.location.state,
      country: user.location.country,
      postcode: user.location.postcode,
      coordinates: user.location.coordinates,
      timezone: user.location.timezone,
      email: user.email,
      b_date: user.dob.date,
      age: user.dob.age,
      phone: user.phone,
      picture_large: user.picture.large,
      picture_thumbnail: user.picture.thumbnail,
      id: index,
      favorite: false,
      course: courses[rnd],
      bg_color: "#000000",
      note: null,
    };
  });

  return usersFormatted.concat(usersAdditional);
};

// PART 2
const validateUsers = (users) => {
  const usersValidated = users.map((user) => {
    const newUser = {
      ...user,
      full_name: validateName(user.full_name),
      gender: validateString(user.gender),
      note: validateString(user.note),
      state: validateString(user.state),
      city: validateString(user.city),
      country: validateString(user.country),
      age: validateAge(user.age, user.b_date),
      phone: validatePhone(user.phone),
      email: validateEmail(user.email),
    };
    return newUser;
  });
  return usersValidated;
};

// PART 2 - validate fields
const validateName = (str) => {
  if (typeof str !== "string") return "";
  if (str.match(/[A-Z][a-z]* [A-Z][a-z]*/)) return str;
  str = str.replace(/^[a-z]/, (char) => char.toUpperCase()); //capitalize first part
  str = str.replace(/\s[a-z]/, (char) => char.toUpperCase()); //capitalize second part
  return str;
};
const validateString = (str) => {
  if (typeof str !== "string") return "";
  if (str.match(/[A-Z].*/)) return str;
  str = str.replace(/^[a-z]/, (char) => char.toUpperCase()); //capitalize first letter
  return str;
};
const validateAge = (age, bDate) => {
  if (typeof age === "number") return age;
  var ageDifMs = Date.now() - bDate;
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
const validatePhone = (phone) => {
  if (!phone) return "";
  //match only digits, "-", "(", ")", NO LETTERS
  if (phone.match(/^[0-9\-\(\)]*$/)) return phone;
  return "";
};
const validateEmail = (email) => {
  if (!email) return "";
  if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) return email;
  return "";
};

// PART 3
const filterUsers = (users, parameters) => {
  for (const parameter of parameters) {
    users = users.filter((user) => user[parameter.field] === parameter.value);
  }
  return users;
};

// PART 4
const sortUsers = (users, field, direction = 1) => {
  if (direction === 1) {
    //ascending
    users.sort((a, b) => compareFunction(a, b, field));
    return users;
  } else {
    //descending
    users.sort((a, b) => compareFunction(b, a, field));
    return users;
  }
};
const compareFunction = (a, b, field) => {
  if (field === "age" || field === "b_day") {
    return a[field] - b[field];
  } else {
    return a[field] > b[field] ? 1 : -1;
  }
};

// PART 5
const findOneUser = (users, parameter) => {
  if (parameter.field === "age") {
    // number
    return users.find((user) => {
      return user[parameter.field] === parameter.value;
    });
  } else {
    // string values
    return users.find((user) => {
      return user[parameter.field].includes(parameter.value);
    });
  }
};

// PART 6
const getUserPercentage = (users, parameter) => {
  const l = users.length;
  if (parameter.field === "age") {
    if (parameter.search === "less") {
      const found = users.reduce((count, user) => {
        if (user.age < parameter.value) {
          return count + 1;
        }
        return count;
      }, 0);
      return found / l;
    } else if (parameter.search === "more") {
      return (
        users.reduce((count, user) => {
          if (user.age > parameter.value) {
            return count + 1;
          }
          return count;
        }, 0) / l
      );
    } else if (parameter.search === "equal") {
      const found = users.reduce((count, user) => {
        if (user.age === parameter.value) {
          return count + 1;
        }
        return count;
      }, 0);
      console.log(found);
      return found / l;
    } else {
      return null;
    }
  } else if (parameter.field === "course") {
    return (
      users.reduce((count, user) => {
        if (user.course === parameter.value) {
          return count + 1;
        }
        return count;
      }, 0) / l
    );
  } else {
    return null;
  }
};

// MAIN
// 1
const allUsers = joinUsers(randomUserMock, additionalUsers);
//console.log(allUsers);

// 2
const validatedUsers = validateUsers(allUsers);
//console.log(validatedUsers);

// 3
const filteredByGenderMale = filterUsers(validatedUsers, [
  { field: "gender", value: "Male" },
  { field: "favorite", value: true },
]);
//console.log(filteredByGenderMale);

// 4
const sortedByNameAsc = sortUsers(validatedUsers, "full_name", -1);
//console.log(sortedByNameAsc);

// 5
const foundUser1 = findOneUser(validatedUsers, {
  field: "full_name",
  value: "B",
});
const foundUser2 = findOneUser(validatedUsers, { field: "age", value: 40 });
//console.log(foundUser1);
//console.log(foundUser2);

// 6
const userAgePercentage1 = getUserPercentage(validatedUsers, {
  field: "age",
  value: 30,
  search: "less",
});
const userAgePercentage2 = getUserPercentage(validatedUsers, {
  field: "age",
  value: 30,
  search: "equal",
});
const userAgePercentage3 = getUserPercentage(validatedUsers, {
  field: "age",
  value: 30,
  search: "more",
});
const userCoursePercentage = getUserPercentage(validatedUsers, {
  field: "course",
  value: "Mathematics",
});
//console.log(userAgePercentage1);
//console.log(userAgePercentage2);
//console.log(userAgePercentage3);
//console.log(userCoursePercentage);

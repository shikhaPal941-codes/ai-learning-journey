const student = {
    name: "YourName",
    marks: [80, 90, 70]
  }
  const marksArray = student.marks;
  const totalMarks = marksArray.reduce((acc, mark) => acc + mark, 0);
  const averageMarks = totalMarks / marksArray.length;
  console.log(student);
  console.log("Total Marks:", totalMarks);
  console.log(`${student.name} scored average ${averageMarks} marks`);
  const numbers = [1, 2, 3]

const newNumbers = [...numbers, 4, 5]

console.log(newNumbers)
const user = { name: "Rahul", age: 25 }

const updatedUser = { ...user, age: 26 }
console.log(updatedUser)

const sum = (...numbers) => {
    return numbers.reduce((acc, num) => acc + num, 0)
  }
  
  console.log(sum(1,2,3,4))

  const user1 = {
    profile: {
      name: "Rahul"
    }
  }
  
  console.log(user1.profile?.name)

  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1")
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log("Error:", error)
    }
  }
  fetchData()
  // Exercise 1 :
  const calculateAverage = ({ name, marks }) => {
    const average = marks.reduce((acc, mark) => acc + mark, 0) / marks.length
    return `${name} scored average ${average} marks`
  }
  console.log(calculateAverage(student))
  // Exercise 2
  const user2 = { name: "Aman", age: 20 }
  const updatedUser2 = { ...user2, age: user2.age + 1, isActive: true }
  console.log("age", updatedUser2)

  // Exercise 3
  const fetchData1 = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
      const data = await response.json()
      console.log("FETCHED DATA:", data?.name)
    } catch (error) {
      console.log("Error:", error)
    }
  }
  fetchData1()
  
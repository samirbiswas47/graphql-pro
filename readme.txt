
install
------------------
npm install
npm run server



GraphQl Query
------------------
mutation{
  addBook(name:"The Da Vinci Code", genre:"Mystery", authorId:"687130ee2131bd9a8a65eadc"){
    name
    genre
   
  }
}

mutation{
  addAuthor(name:"Sanjukta", age:24){
    name
    age
  }
}

{
  books{
    name
    genre
  }
}

{
  book(id: "68713322132fea6cbac93c3f"){
    name
    genre
  }
}

{
  book(id: "68713322132fea6cbac93c3f"){
    name
    genre
    author {
      id
    }
  }
}

{
  author(id: "6871314238b818e6bec56f20"){
    name
    age
    books{
      name
    	genre
    }
  }
}
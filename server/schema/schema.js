const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLString, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLID, GraphQLSchema } = graphql;



//dummy data 

const books = [
    {name: "name of the world", authorId: "1", genre: "Fantasy", id: "1"},
    {name: "The final empire", authorId: "2", genre: "Fantasy", id: "2"},
    {name: "The long earth", authorId: "3", genre: "Sci-Fi", id: "3"},
    {name: "The Hero of Ages", genre: "fantasy", id: "4", authorId: "2"},
    {name: "The color of magic", genre: "fantasy", id: "5", authorId: "3"},
    {name: "The Light Fantastic", genre: "fantasy", id: "6", authorId: "3"},
]


const authors = [
    {name: "patrick rothfuss", age: 44, id: "1"},
    {name: "bradon sanderson", age: 42, id: "2"},
    {name: "Terry pratchett", age: 66, id: "3"},
];


const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {
            type: GraphQLID 
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        }, 
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
})

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorId})
            } 
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args){
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args){
                return _.find(authors, {id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
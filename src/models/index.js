//sequelize is an ORM

const Sequelize = require('sequelize')

const db = new Sequelize({
    database: 'newdb',
    username: 'james',
    password: 'pass',
    dialect: 'mysql'
})


// ORM way of creating tables 

const Users = db.define('user',{
    email: {
        type: Sequelize.STRING,
        validate:{
            isEmail: true
        },
        unique:true,
        allowNull:false
    },
    username:{
        type: Sequelize.STRING,
        primaryKey:true //automatically makes it unique
    },
    bio:Sequelize.STRING,
    image:{
        type:Sequelize.STRING,
        allowNull:true,
        validate:{
            isUrl:true
        }
    }
})

const Articles = db.define('article', {
    "slug": {
      type: Sequelize.STRING,
      primaryKey: true
    },
    "title": {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    "description": {
      type: Sequelize.STRING(100),
    },
    "body": Sequelize.STRING,
})
  
const Comments = db.define('comment', {
    body: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Tags = db.define('tag', {
    name: {
        type: Sequelize.STRING,
        primaryKey: true
    }
})


Comments.belongsTo(Articles)
Articles.hasMany(Comments)

Comments.belongsTo(Users,{as:'author'})

Articles.belongsTo(Users,{as:'author'})
Users.hasMany(Articles)

 // many to many relationships : one user can favourite multiple articles
 // and one article can be favourited by many users. 

 // to implement this we take the help of a table - favourites

 Articles.belongsToMany(Users,{through: 'favourites'})
 Users.belongsToMany(Articles,{through: 'favourites'})

 Articles.belongsToMany(Tags,{through: 'article_tags'})
 Tags.belongsToMany(Articles,{through: 'article_tags'})

 module.exports = {
     db,Users,Articles,Comments,Tags
 }



  
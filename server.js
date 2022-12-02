if(process.env.Node_ENV !=='production'){
    require('dotenv').config()
}


const express = require ('express') 
const app = express ()
const bcrypt = require ('bcrypt')
const passport = require('passport')
const flash = require ('express-flash')
const session = require ('express-session')
const methodOverride = require ('method-override')


const initializePassport = require ('./passport-config')
const { session } = require('passport')
const { name } = require('ejs')


initializePassport (passport ,
     email =>  users.find(user =>user.email === email),
     id =>  users.find(user =>user.id === id))

const port = 3000

const users = []

    app.set('view-engine' , 'ejs')
    app.use(express.urlencoded({extended : false}))
    app.use (flash())
    app.use(session({
        secret:process.env.SESSION-SECRET,
        resave:false, 
        //resave the session variables if nothing has changed :no
        saveUninitialized:false
        //save an empty value in this session :no

    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(methodOverride('_method'))


    app.get ('/', checkAuthenticated,(req, res) => {
            res.render('index.ejs',{name:req.user.name  })
            } )  

        app.get ('/login',checkNotAuthenticated,(req, res) => {
        res.render('login.ejs')
        })

        app.post ('/login',checkNotAuthenticated, passport.authenticate('local',
        //pass a list of options to things we want to modify 
        {
            successRedirect :'/',
            failureRedirect : './login',
            failureFlash : true 
        }
        ))

        app.get ('/register',checkNotAuthenticated,(req, res) => {
            res.render('register.ejs')
            })

        app.post ('/register',checkNotAuthenticated, async (req, res) => {
            try  {
                const hashedPassword =  await bcrypt.hash (req.body.password,10 )
            users.push ({
                id: Date.now().toString(),
                name:req.body.name,
                email:req.body.email,
                password: hashedPassword 
            })
            res.redirect('/login')
            }
            catch {
                res.redirect('register')
            }
            console.log(users)

    })
    app.delete ('logout',(req , res) => {
        req.logOut()
        res.redirect('/login')

    }
    )
//npm i method-override 
//allow to not use post 
 function checkAuthenticated (res,req,next){
    //middelware func 
        if (req.isAuthenticated() ) {
            return next()

    }
    res.redirect('/login')
 }
    //protect all the routes from non loged-in users

function checkNotAuthenticated (res,req,next){
        if (req.isAuthenticated() ){
            return res.redirect('/')

}   next()

//if they are authenticated redirect them
    }

        app.listen(port, () => {
            console.log(`Examlpe app Listening on port ${port} `)

})
const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); 
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET;


// Routes


/*

Check LOGIN

*/
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}



// GET
// ADMIN

router.get('/admin', async (req, res) => { 
    try {
        
        const locals = {
            title: 'Admin',
            description: 'The Inclusive Friends Association Website',
            keywords: ['website', 'about', 'brand']
        }
        const data = await Post.find();
        res.render('admin/login', { locals, layout: adminLayout});

    } catch (error) {
        console.log(error);
    }
})

/*
GET 
ADMIN DASHBOARD

*/

router.get('/admin/dashboard', authMiddleware , async (req, res) => { 
    try {
        
        const locals = {
            title: 'Admin - Dashboard',
            description: 'The Inclusive Friends Association Website',
            keywords: ['website', 'about', 'brand']
        }
        const data = await Post.find();
        res.render('admin/dashboard', { 
            locals, 
            layout: adminLayout, 
            data 
         });

    } catch (error) {
        console.log(error);
    }
})


/*
GET
ADMIN CREATE NEW POST

*/
router.get('/admin/add-post', authMiddleware , async (req, res) => { 
    try {
        
        const locals = {
            title: 'Admin - Add New Post',
            description: 'The Inclusive Friends Association Website',
            keywords: ['website', 'about', 'brand']
        }
        const data = await Post.find();
        res.render('admin/add-post', { 
            locals, 
            layout: adminLayout
         });

    } catch (error) {
        console.log(error);
    }
})

/*

post
ADD NEW POST
*/

router.post('/admin/add-post', authMiddleware, async (req, res)=> {
    try {

        console.log(req.body);
        try {
            const newPost = new Post({
                title: req.body.title,
                body: req.body.body
            }); 
            await Post.create(newPost);
            res.redirect('/admin/dashboard')
        } catch (error) {
            
        }
    } catch (error) {
        console.log(error);
    }
})


/*GET
GET
ADMIN EDIT POST

*/
router.get('/admin/edit-post/:id', authMiddleware, async (req, res) => { 
    try {
        
        const locals = {
            title: 'Admin - Edit Post',
            description: 'The Inclusive Friends Association Website',
            keywords: ['website', 'about', 'brand']
        }
        const data = await Post.findOne({ _id: req.params.id });
        res.render('admin/edit-post', {
            locals,
            data,
            layout: adminLayout
        });
    } catch (error) {
        console.log(error);
    }
})


/*PUT

ADMIN EDIT POST

*/
router.put('/admin/edit-post/:id', authMiddleware, async (req, res) => { 
    try {
        
        const locals = {
            title: 'Admin - Edit Post',
            description: 'The Inclusive Friends Association Website',
            keywords: ['website', 'about', 'brand']
        }
        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        })
        res.redirect(`/admin/edit-post/${req.params.id}`);
    } catch (error) {
        console.log(error);
    }
})





// CREATE ADMIN 
router.get('/admin/create', async (req, res) => { 
    try {
        
        const locals = {
            title: 'Create Admin',
            description: 'The Inclusive Friends Association Website',
            keywords: ['website', 'about', 'brand']
        }
        const data = await Post.find();
        res.render('admin/create', { locals, layout: adminLayout});

    } catch (error) {
        console.log(error);
    }
})


// Routes

// POST
// ADMIN - Check Login

router.post('/admin', async (req, res) => {
    try {
        const {username, password} = req.body;
        
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(401).json( { message: 'Invalid Credentials'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json( { message: 'Invalid Credentials'});
        }
        
        const token = jwt.sign({ userId: user._id}, jwtSecret);
        res.cookie('token', token, { httpOnly: true });
        // res.send('Something');
        res.redirect('admin/dashboard');
        
        
    } catch (error) {
        console.log(error);
    }
})

// ADmin Dashboard
// router.get('admin/dashboard', async (req, res) => {
    
//     res.render('/admin/dashboard');

// });


// router.post('/admin', (req, res) => {
//     try {
        
//         const {username, password} = req.body;
        
//         if (req.body.username === 'admin' && req.body.password === 'password') {
//             // res.redirect('/admin');
//             res.send("You are logged in")
//         }
//         else {
//             res.send("Invalid username or password")
//         }


//         // res.redirect('/admin');
//     } catch (error) {
//         console.log(error);
//     }
// })


router.post('/admin/create', async (req, res) => {
    try {
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        try {
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json({ message: 'user Created', user });
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: 'User already in use'});
            }
            res.status(500).json({ message: 'Internal Server Error'});
        }
        
    } catch (error) {
        console.log(error);
    }
})



/*DELETE

ADMIN DELETE POST

*/
router.delete('/delete-post/:id', authMiddleware, async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id } )
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.log(error);
    }
})

/*GET

ADMIN LOGOUT

*/

router.get('/admin/logout', (req, res)=>{
    res.clearCookie('token');
    res.redirect('/admin');
})


module.exports = router;